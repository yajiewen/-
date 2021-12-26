let db = wx.cloud.database()
let dbcollect = db.collection("collect")
let app = getApp()
let tools = require('../../tools/tools')
Page({
    data: {
        thingid: "",
        username: "",
        userimg: "",
        userconnect: "",
        thingname: "",
        thinginfo: "",
        thingclass: "",
        thingprice: "",
        thingoriginprice: "",
        thingtranprice: "",
        thingimg: "",
        facetoface: "",
        nofacetoface: "",
    },
    // 放大查看图片
    seeImg(event){
        wx.previewImage({
            current: event.currentTarget.dataset.url,
            urls: this.data.thingimg
          })
    },
    // 复制微信号
    makeCopy(event){
        if(this.data.userconnect != "")
        {
            wx.setClipboardData({
                data: this.data.userconnect,
                success: res =>{
                    tools.showRightToast("复制成功!")
                },
                fail: res =>{
                    tools.showErrorToast("用户未上传")
                }
              })
        }else{
            tools.showErrorToast("该用户没有上传微信号")
        }
    },
    //打电话
    makeCall(event){
            wx.makePhoneCall({
                phoneNumber: this.data.userphone,
                fail: res =>{
                    tools.showErrorToast("用户未上传")
                }
            })
    },
    // 收藏
    collectThing() {
        dbcollect.where({
            _openid: app.globaldata.openid,
            thingid: this.data.thingid,
        }).count({
            success: res =>{
                if (res.total == 0) {
                    dbcollect.add({
                        data: {
                            thingid: this.data.thingid,
                        },
                        success: res => {
                            tools.showRightToast("收藏成功")
                        }
                    })
                } else {
                    tools.showRightToast("宝贝已收藏")
                }
            }
        })
    },
    onLoad(option) {
            // 把字符串解析为对象
            let objInfo = JSON.parse(option.info)
            console.log(objInfo)
            this.setData({
                thingid: objInfo._id,
                username: objInfo.username,
                userimg: objInfo.userimg,
                userconnect: objInfo.userconnect,
                userphone: objInfo.userphone,
                thingname: objInfo.thingname,
                thinginfo: objInfo.thinginfo,
                thingclass: objInfo.thingclass,
                thingprice: objInfo.thingprice,
                thingoriginprice: objInfo.thingoriginprice,
                thingtranprice: objInfo.thingtranprice,
                thingimg: objInfo.thingimg,
                facetoface: objInfo.facetoface,
                nofacetoface: objInfo.nofacetoface,
            })
        console.log(this.data)
    },
  onShow() {
    if (app.globaldata.openid == "") {
      tools.showLoginToast('请先登陆')
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 1000)
    }
  }
})