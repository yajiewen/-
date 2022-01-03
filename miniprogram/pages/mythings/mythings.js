let app = getApp()
let dbthinglist = wx.cloud.database().collection("thinglist")
let tools = require('../../tools/tools')
Page({
    data: {
        thingList: [],
        thingBath: 0,
        gettedAll: false,
    },
    delAllCollect(id){
        wx.cloud.callFunction({
            name: "delMyCollect",
            data: {
                thingid: id,
            },
            success: res =>{
                console.log("所有收藏已删除")
            }
        })
    },
    // 展示加载
    showLoad(){
        wx.showLoading({
          title: '加载中',
        })
    },
    // 关闭加载
    closeLoad(){
        wx.hideLoading({
          success: (res) => {
          },
        })
    },
    // 图片删除
    delFile(fileIdList) {
        wx.cloud.deleteFile({
            fileList: fileIdList
        }).then(res => {
            console.log("删除图片成功", res.fileList)
        }).catch(error => {

        })
    },
    // 删除商品
    delThing(event) {
        this.delFile(this.data.thingList[event.currentTarget.dataset.index].thingimg)
        // 删除收藏库中数据
        this.delAllCollect(this.data.thingList[event.currentTarget.dataset.index]._id)
        // 删除thinglist库中数据
        dbthinglist.doc(this.data.thingList[event.currentTarget.dataset.index]._id).remove({
            success: res => {
                tools.showRightToast("下架成功!")
                this.data.thingList.splice(event.currentTarget.dataset.index, 1)
                this.setData({
                    thingList: this.data.thingList
                })
            },
            fail: res => {
                tools.showErrorToast("开了小差..")
            }
        })

    },
    // 去详情页面
    gotoThingDetail(event) {
        let info = this.data.thingList[event.currentTarget.dataset.index]
        // 把当前商品信息转化为字符串传递到另外一个页面
        let data = JSON.stringify(info)
        wx.navigateTo({
            url: "/pages/thingdetail/thingdetail?info=" + data,
        })
    },
    // 获取我的发布商品列表
    getThingList() {
        wx.cloud.callFunction({
            name: "getMythings",
            data: {
                index: this.data.thingBath,
                openid: app.globaldata.openid,
            },
            success: res => {
                console.log(res)
                if (res.result.data.length != 0) {
                    for (let i = 0; i < res.result.data.length; i++) {
                        this.data.thingList.push(res.result.data[i]);
                    }
                    this.data.thingBath += 1
                    this.setData({
                        thingList: this.data.thingList,
                    })
                    // 关闭loading
                    this.closeLoad()
                } else {
                    // 关闭loading
                    this.closeLoad()
                    this.data.gettedAll = true
                    console.log("获取完")
                }
            }
        })
    },
    onLoad: function (options) {
        this.getThingList()
        this.showLoad()
    },

    onReachBottom: function () {
        if (!this.data.gettedAll) {
            this.getThingList()
        } else {
            console.log("已经获取完")
        }
    },
})