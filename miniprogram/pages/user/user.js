// pages/user/user.js
let app = getApp()
Page({
    data: {
      hasinfo:false,
      userinfo:{},
      delid:"",
      name:"",
      imageurl:"",
      isdisable: false,
  },
  // 前往我发布的店铺页面
  gotoMystore(){
    wx.navigateTo({
      url: '/pages/mystore/mystore',
    })
  },
  // 前往我发布的商品页面
  gotoMythings(){
    wx.navigateTo({
      url: '/pages/mythings/mythings',
    })
  },
  // 前往我的收藏
  gotoMycollect(){
    wx.navigateTo({
      url: '/pages/mycollect/mycollect',
    })
  },
    // 获取openId
    getOpenid(){
      wx.cloud.callFunction({
        name:"getOpenId",
        success:res =>{
          app.globaldata.openid = res.result.openid
        },
        fail(res){
          console.log("请求失败",res)
        }
      })
    },
  // 获取用户信息
  getUserProfile(){
      this.setData({
        isdisable: true,
      })
      wx.getUserProfile({
          desc: '获取用户信息',
          success: (result) => {
            this.getOpenid()
            this.setData({
              userinfo: result.userInfo,
              hasinfo: true
          })
          app.globaldata.userinfo = result.userInfo
          },
          fail: (res) => {},
          complete: (res) => {},
        })
        setTimeout(res =>{
          this.setData({
            isdisable: false,
          })
        },1000)
  },
})
