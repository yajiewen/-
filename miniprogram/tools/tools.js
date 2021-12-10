function showErrorToast(msg) {
    wx.showToast({
      title: msg,
      image: '/static/images/icon_error.png'
    })
  }
function showRightToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_right.png'
  })
}
module.exports = {
    showErrorToast,
    showRightToast
}
