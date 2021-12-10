// pages/user/user.js
let app = getApp()
Page({
      /**
     * 页面的初始数据
     */
    data: {
      hasinfo:false,
      userinfo:{},
      delid:"",
      name:"",
      imageurl:"cloud://cloud1-2gm9nq427383349e.636c-cloud1-2gm9nq427383349e-1308697825/yajie.png"
  },
    // 获取openId
    getOpenid(){
      wx.cloud.callFunction({
        name:"getOpenId",
        success:res =>{
          app.globaldata.openid = res.result.openid
          this.setData({
            hasinfo:true
        })
        },
        fail(res){
          console.log("请求失败",res)
        }
      })
    },
  // 获取用户信息
  getUserProfile(){
      wx.getUserProfile({
          desc: '获取用户信息',
          success: (result) => {
            this.setData({
              userinfo: result.userInfo,
          })
              this.getOpenid()
          },
          fail: (res) => {},
          complete: (res) => {},
        })
  },
})
