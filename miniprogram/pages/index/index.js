let tools = require('../../tools/tools')
// 获取应用实例
const app = getApp()

Page({
    data: {
        selectindex: 0, // 导航下标
        // 店铺列表
        storeList: [],
        // 店铺信息批次
        storeBatch: 0,
        // 商品列表
        thingList: [[],[],[],[],[],[]],
        // 店铺信息批次
        thingBatch: [0,0,0,0,0,0],
        // 商品类别
        leibie: ["学习类", "生活类", "数码类", "化妆品", "衣品类", "其他"],
    },
    // 上拉刷新
    refreshInfoList(event){
        if(this.data.selectindex == 0){ //当前市商家列表
            this.getStoreList()
        }else{ // 否则刷新商品列表
            this.getThingList()
        }
    },
    getThingList(event) {
        console.log(this.data.leibie[ this.data.selectindex -1 ])
        // 云函数获取数据
        wx.cloud.callFunction({
            name: "getThingInfoList",
            data: {
                index: this.data.thingBatch[ this.data.selectindex -1 ], // 获取对应商品类别的batch
                leibie: this.data.leibie[ this.data.selectindex -1 ] // 获取商品类别
            },
            success: res => {
                for (let i = 0; i < res.result.data.length; i++) {
                    // 把数据依次加入对应的商品类别的列表
                    this.data.thingList[this.data.selectindex -1].push(res.result.data[i])
                }
                if(res.result.data.length != 0){
                    // 获取到数据 batch 才++
                    this.data.thingBatch[this.data.selectindex - 1] += 1
                }
                // 使用setData渲染新数据
                this.setData({
                    thingList: this.data.thingList,
                    thingBatch: this.data.thingBatch
                })
                console.log(this.data.thingList)
                console.log(this.data.thingBatch)
            },
            fail(res) {
                console.log("请求失败", res)
            }
        })
    },
    getStoreList(event) {
        wx.cloud.callFunction({
            name: "getStoreInfoList",
            data: {
                index: this.data.storeBatch
            },
            success: res => {
                let newstoreList = this.data.storeList
                for (let i = 0; i < res.result.data.length; i++) {
                    newstoreList.push(res.result.data[i])
                }
                if(res.result.data.length != 0){
                    this.data.storeBatch += 1
                }
                this.setData({
                    storeList: newstoreList,
                    storeBatch: this.data.storeBatch
                })
                console.log(this.data.storeList)
                console.log(this.data.storeBatch)
            },
            fail(res) {
                console.log("请求失败", res)
            }
        })
    },
    changeStyle(event) {
        this.data.selectindex = event.target.dataset.index
        console.log(this.data.selectindex)
        this.setData({
            selectindex: event.target.dataset.index
        })
        // 个人物品对应类别若还没获取数据则获取数据
        if(this.data.thingBatch[this.data.selectindex - 1] == 0){
            this.getThingList()
        }
    },
    onLoad() {
        // 获取商家列表
        this.getStoreList()
    }
})