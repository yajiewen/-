// app.js
App({
  onLaunch() {
    // 云数据库初始化
    wx.cloud.init({
      env:"cloud1-2gm9nq427383349e"
    })
  },
  globalData: {
    userInfo: null
  }
})
