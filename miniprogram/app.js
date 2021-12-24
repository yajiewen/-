// app.js
App({
  globaldata:{
    openid:"",
    userinfo:{}
  },

  onLaunch() {
    // 云数据库初始化
    wx.cloud.init({
      env:"cloud1-2gm9nq427383349e"
    })
  }
})
