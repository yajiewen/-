// pages/user/user.js
const db = wx.cloud.database().collection("userinfo")
Page({
      /**
     * 页面的初始数据
     */
    data: {
      hasinfo:false,
      userinfo:{},
      delid:""
  },
  // 添加数据测试
  addData(){
    db.add({
      data:{
        uername:"yajie",
        age:19,
      },
      success(res){
        console.log("添加成功",res)
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
  },
  // 查询数据
  getData(){
    db.get({
      success(res){
        console.log("查询成功",res.data)
      }
    })
  },
  // 删除数据
  delData(){
    console.log(this.delid)
    db.doc(this.delid).remove({
      success(res){
        console.log("删除成功",res)
      },
      fail(res){
        console.log("删除失败",res)
      }
    })
  },


    getUserProfile(e){
      wx.login({
        success(result){
          console.log(result.code)
          
        }
      })
        wx.getUserProfile({
            desc: '获取用户信息',
            success: (result) => {
                this.setData({
                    userinfo: result.userInfo,
                    hasinfo:true
                })
            },
            fail: (res) => {},
            complete: (res) => {},
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
