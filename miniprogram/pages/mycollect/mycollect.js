let app = getApp()
let dbthinglist = wx.cloud.database().collection("thinglist")
let dbcollect = wx.cloud.database().collection("collect")
let tools = require('../../tools/tools')
Page({

    data: {
        thingList: [],
        thingInfoList: [],
        thingBath: 0,
        gettedAll: false
    },
    // 展示加载
    showLoad() {
        wx.showLoading({
            title: '加载中',
        })
    },
    // 关闭加载
    closeLoad() {
        wx.hideLoading({
            success: (res) => {},
        })
    },
    // 取消收藏
    cancelCollect(event) {
        dbcollect.doc(this.data.thingList[event.currentTarget.dataset.index]._id).remove({
            success: res => {
                console.log(res)
                tools.showRightToast("取消成功!")
                this.data.thingList.splice(event.currentTarget.dataset.index, 1)
                this.data.thingInfoList.splice(event.currentTarget.dataset.index, 1)
                this.setData({
                    thingInfoList: this.data.thingInfoList
                })
            },
            fail: res => {
                tools.showErrorToast("开了小差..")
            }
        })
    },
    gotoThingDetail(event) {
        let info = this.data.thingInfoList[event.currentTarget.dataset.index]
        // 把当前商品信息转化为字符串传递到另外一个页面
        let data = JSON.stringify(info)
        wx.navigateTo({
            url: "/pages/thingdetail/thingdetail?info=" + data,
        })
    },
    getThingList() {
        wx.cloud.callFunction({
            name: "getMyCollect",
            data: {
                index: this.data.thingBath,
                openid: app.globaldata.openid
            },
            success: res => {
                console.log(res.result.data.length)
                console.log(res)
                console.log(this.data.thingList)
                if (res.result.data.length != 0) {
                    this.data.thingBath += 1
                    for (let i = 0; i < res.result.data.length; i++) {
                        this.data.thingList.push(res.result.data[i])
                        // 获取商品信息
                        dbthinglist.where({
                            _id: res.result.data[i].thingid,
                        }).get({
                            success: res => {
                                console.log(res)
                                if (res.data.length != 0) {
                                    this.data.thingInfoList.push(res.data[0])
                                    this.setData({
                                        thingInfoList: this.data.thingInfoList
                                    })
                                }
                            },
                            fail: res => {
                                tools.showErrorToast("开了小差...")
                            }
                        })
                    }
                    this.setData({
                        thingList: this.data.thingList,
                    })
                    // 关闭load
                    this.closeLoad()
                } else {
                    // 关闭load
                    this.closeLoad()
                    this.data.gettedAll = true
                }
                console.log(this.data.thingList)
                console.log(this.data.thingInfoList)
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
            console.log("已获取完")
        }
    },
})