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

function showLoadToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/loading.png'
  })
}
module.exports = {
    showErrorToast,
    showRightToast,
    showLoadToast
}
