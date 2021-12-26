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

function showLoginToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/login.png'
  })
}
module.exports = {
    showErrorToast,
    showRightToast,
    showLoadToast,
    showLoginToast
}
