let app = getApp()
let dbstorelist = wx.cloud.database().collection("storelist")
let tools = require('../../tools/tools')
Page({
    data: {
        storeList:[],
        storeBach: 0,
        gettedAll: false,
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
    // 删除店铺
    delStore(event){
        // 先删除图片
        this.delFile(this.data.storeList[event.currentTarget.dataset.index].storeimg)
        dbstorelist.doc(this.data.storeList[event.currentTarget.dataset.index]._id).remove({
            success: res =>{
                tools.showRightToast("删除成功!")
                this.data.storeList.splice(event.currentTarget.dataset.index,1)
                this.setData({
                    storeList: this.data.storeList
                })
            },
            fail: res =>{
                tools.showErrorToast("开了小差..")
            }
        })
    },
    // 前往店铺详细页面
    gotoStoreDetail(event){
        let info = this.data.storeList[event.currentTarget.dataset.index]
        // 把当前商品信息转化为字符串传递到另外一个页面
        let data = JSON.stringify(info)
        wx.navigateTo({
            url: "/pages/storedetail/storedetail?info=" + data,
        })
    },
    // 获取店铺列表
    getStoreList(){
        wx.cloud.callFunction({
            name:"getMystore",
            data:{
                openid: app.globaldata.openid,
                index: this.data.storeBach,
            },
            success: res =>{
                if(res.result.data.length !=0){
                    this.data.storeBach += 1
                    for(let i = 0; i < res.result.data.length; i++){
                        this.data.storeList.push(res.result.data[i])
                    }
                    this.setData({
                        storeList: this.data.storeList
                    })
                }else{
                    this.data.gettedAll = true
                    console.log("获取完")
                }
            }
        })
    },
    onLoad: function (options) {
        this.getStoreList()
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(!this.data.gettedAll){
            this.getStoreList()
        }
    },
})