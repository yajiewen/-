let app = getApp()
let tools = require('../../tools/tools')
let db = wx.cloud.database()
let dbstorelist = db.collection("storelist")
let dbthinglist = db.collection("thinglist")

Page({
  data: {
    // 商户image
    imgList: [],
    tmpImgList: [],
    // 个人image
    imgList2: [],
    tmpImgList2: [],
    // 商户data
    storename: "",
    youhuiinfo: "",
    address: "",
    // 个人data
    userconnect:"", //wexin
    userphone:"",
    thingname: "",
    thinginfo: "",
    thingprice: "",
    thingoriginprice: "",
    thingtranprice: "",
    facetoface: "facetoface",
    nofacetoface: "nofacetoface",
    // upbar 样式
    storesend: true,
    personsend: false,
    // button disable
    button1: false,
    button2: false,
    // 商品类别
    leibie: ["学习类", "生活类", "数码类", "化妆品", "衣品类", "其他"],
    selectedindex: 0
  },
  getUserPhone(event){
    this.data.userphone = event.detail.value
  },
  getUserConnect(event){
    this.data.userconnect = event.detail.value
  },
  // 刷新商铺信息
  clearStoreInfo() {
    this.setData({
      imgList: [],
      tmpImgList: [],
      storename: "",
      youhuiinfo: "",
      address: "",
    })
  },
  // 刷新商品信息
  clearThingInfo() {
    this.setData({
      imgList2: [],
      tmpImgList2: [],
      thingname: "",
      thinginfo: "",
      thingprice: "",
      thingoriginprice: "",
      thingtranprice: "",
      userconnect:"",
      userphone:"",
      facetoface: "facetoface",
      nofacetoface: "nofacetoface",
    })
  },
  getSelectedIndex(event) {
    // 这种设置数据的方式才会渲染
    this.setData({
      selectedindex: event.detail.value
    })
  },

  getThingName(event) {
    this.data.thingname = event.detail.value
    console.log("名字:", this.data.thingname)
  },
  getThingInfo(event) {
    this.data.thinginfo = event.detail.value
    console.log("描述:", this.data.thinginfo)
  },
  getThingPrice(event) {
    this.data.thingprice = event.detail.value
    console.log("价格:", this.data.thingprice)
  },
  getThingOriginPrice(event) {
    this.data.thingoriginprice = event.detail.value
    console.log("yuan价格:", this.data.thingoriginprice)
  },
  getThingTranPrice(event) {
    this.data.thingtranprice = event.detail.value
    console.log("运费价格:", this.data.thingtranprice)
  },

  changeStyle() {
    this.setData({
      storesend: !this.data.storesend,
      personsend: !this.data.personsend
    })
  },
  getStoreName(event) {
    this.data.storename = event.detail.value
  },
  getYouHuiInfo(event) {
    this.data.youhuiinfo = event.detail.value
  },
  getStoreAddr(event) {
    this.data.address = event.detail.value
  },

  onClose() {
    wx.navigateBack({
      delta: 1
    });
  },
  // 商家图片添加
  addImage() {
    let that = this;
    let remain = 6 - this.data.imgList.length;
    console.log('上传图片')
    wx.chooseImage({
      count: remain,
      success(res) {
        let length = res.tempFiles.length
        // tempFilePath可以作为img标签的src属性显示图片        
        let tempFilePaths = res.tempFilePaths
        let tempFiles = res.tempFiles
        that.setData({
          tmpImgList: that.data.tmpImgList.concat(tempFilePaths)
        })
        for (var i = 0; i < length; i++) {
          that.data.imgList.push('false');
          var index = that.data.imgList.length - 1
          that.setData({
            imgList: that.data.imgList
          })
          if (tempFiles[i].size > 4500000) {
            console.log("图片太大")
            that.compressImg(tempFilePaths[i], index)
          } else {
            console.log("上传到图床")
            that.uploadFile(tempFilePaths[i], index)
          }
        }
        console.log(res)
        console.log(that.data.imgList);
      },
      fail(res) {
        console.log(res);
      },
    })
  },
  // 个人物品图片添加
  addImage2() {
    let that = this;
    let remain = 6 - this.data.imgList2.length;
    console.log('上传图片')
    wx.chooseImage({
      count: remain,
      success(res) {
        let length = res.tempFiles.length
        // tempFilePath可以作为img标签的src属性显示图片        
        let tempFilePaths = res.tempFilePaths
        let tempFiles = res.tempFiles
        that.setData({
          tmpImgList2: that.data.tmpImgList2.concat(tempFilePaths)
        })
        for (var i = 0; i < length; i++) {
          that.data.imgList2.push('false');
          var index = that.data.imgList2.length - 1
          that.setData({
            imgList2: that.data.imgList2
          })
          if (tempFiles[i].size > 4500000) {
            console.log("图片太大")
            that.compressImg(tempFilePaths[i], index)
          } else {
            console.log("上传到图床")
            that.uploadFile2(tempFilePaths[i], index)
          }
        }
        console.log(res)
        console.log(that.data.imgList2);
      },
      fail(res) {
        console.log(res);
      },
    })
  },
  // 商家图片上传
  uploadFile(fileUrl, i) {
    let timespan = Date.parse(new Date())
    wx.cloud.uploadFile({
      cloudPath: "storeimg" + i + app.globaldata.openid + timespan + ".png",
      filePath: fileUrl,
      success: res => {
        console.log(res)
        this.data.imgList[i] = res.fileID
        this.setData({
          imgList: this.data.imgList
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  // 个人图片上传
  uploadFile2(fileUrl, i) {
    let timespan = Date.parse(new Date())
    wx.cloud.uploadFile({
      cloudPath: "personthing" + i + app.globaldata.openid + timespan + ".png",
      filePath: fileUrl,
      success: res => {
        console.log(res)
        this.data.imgList2[i] = res.fileID
        this.setData({
          imgList2: this.data.imgList2
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  delFile(fileIdList) {
    wx.cloud.deleteFile({
      fileList: fileIdList
    }).then(res => {
      console.log("删除成功", res.fileList)
    }).catch(error => {

    })
  },
  // 商家图片压缩上传
  compressImg(url, i) {
    wx.compressImage({
      src: url, // 图片路径
      quality: 50, // 压缩质量
      success() {
        console.log("压缩后重新上传")
        this.uploadFile(url, i)
      },
      fail(res) {
        console.log(res)
        console.log("压缩失败 ")
      }
    })
  },
  // 个人图片压缩上传
  compressImg(url, i) {
    wx.compressImage({
      src: url, // 图片路径
      quality: 50, // 压缩质量
      success() {
        console.log("压缩后重新上传")
        this.uploadFile2(url, i)
      },
      fail(res) {
        console.log(res)
        console.log("压缩失败 ")
      }
    })
  },
  // 商家图片云端删除
  removeImg(event) {
    console.log("删除元素")
    let index = event.currentTarget.dataset.index
    let fileIdList = []
    fileIdList.push(this.data.imgList[index])
    this.data.imgList.splice(index, 1)
    this.data.tmpImgList.splice(index, 1)
    this.setData({
      imgList: this.data.imgList,
      tmpImgList: this.data.tmpImgList,
    })
    // 删除云端文件
    this.delFile(fileIdList)
  },
  // 个人图片云端删除
  removeImg2(event) {
    console.log("删除元素")
    let index = event.currentTarget.dataset.index
    let fileIdList = []
    fileIdList.push(this.data.imgList2[index])
    this.data.imgList2.splice(index, 1)
    this.data.tmpImgList2.splice(index, 1)
    this.setData({
      imgList2: this.data.imgList2,
      tmpImgList2: this.data.tmpImgList2,
    })
    // 删除云端文件
    this.delFile(fileIdList)
  },

  // 商家图片预览
  preview(event) {
    let url = event.currentTarget.dataset.url
    let urls = [];
    let imgList = this.data.imgList
    for (var index in imgList) {
      if (imgList[index] != 'false') {
        urls.push(imgList[index])
      }
    }
    wx.previewImage({
      current: url,
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 个人图片预览
  preview2(event) {
    let url = event.currentTarget.dataset.url
    let urls = [];
    let imgList2 = this.data.imgList2
    for (var index in imgList2) {
      if (imgList2[index] != 'false') {
        urls.push(imgList2[index])
      }
    }
    wx.previewImage({
      current: url,
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 处理交易方式
  dealway(event) {
    this.setData({
      facetoface: "facetoface",
      nofacetoface: "nofacetoface"
    })

    if (event.detail.value == "facetoface") {
      this.setData({
        facetoface: true,
        nofacetoface: false
      })
    } else if (event.detail.value == "nofacetoface") {
      this.setData({
        nofacetoface: true,
        facetoface: false,
      })
    }
  },
  // 商户上传
  onPost() {
    if (this.data.storename.trim() == "") {
      tools.showErrorToast("请填写店铺名称")
      return
    }
    if (this.data.address.trim() == "") {
      tools.showErrorToast("请填写商铺地址")
      return
    }
    if (this.data.youhuiinfo.trim() == "") {
      tools.showErrorToast("请填写优惠信息")
      return
    }
    this.setData({
      button1: !this.data.button1
    })
    dbstorelist.where({
      _openid: app.globaldata.openid,
      storename: this.data.storename,
    }).get({
      success: res => {
        console.log("查询数据", res.data)
        if (res.data.length != 0) // 已存在则更新
        {
          // 先把原来的图片删除
          if (res.data[0].storeimg.length != 0) {
            console.log("del image")
            wx.cloud.deleteFile({
              fileList: res.data[0].storeimg
            }).then(res => {
              console.log("删除成功", res.fileList)
            }).catch(error => {
            })
            dbstorelist.where({
              _openid: app.globaldata.openid,
              storename: this.data.storename,
            }).update({
              data: {
                openid: app.globaldata.openid,
                storename: this.data.storename,
                storeaddress: this.data.address,
                storeinfo: this.data.youhuiinfo,
                storeimg: this.data.imgList
              },
              success: res => {
                tools.showRightToast("更新成功")
                this.setData({
                  button1: !this.data.button1
                })
                this.clearStoreInfo()
              }
            })
          } else { // 更新信息
            dbstorelist.where({
              _openid: app.globaldata.openid,
              storename: this.data.storename,
            }).update({
              data: {
                openid: app.globaldata.openid,
                storename: this.data.storename,
                storeaddress: this.data.address,
                storeinfo: this.data.youhuiinfo,
                storeimg: this.data.imgList
              },
              success: res => {
                tools.showRightToast("更新成功")
                this.setData({
                  button1: !this.data.button1
                })
                this.clearStoreInfo()
              }
            })
          }
        }else{
          dbstorelist.add({
            data: {
              username: app.globaldata.userinfo.nickName,
              userimg: app.globaldata.userinfo.avatarUrl,
              openid: app.globaldata.openid,
              storename: this.data.storename,
              storeaddress: this.data.address,
              storeinfo: this.data.youhuiinfo,
              storeimg: this.data.imgList
            },
            success: res => {
              tools.showRightToast("上传成功")
              this.setData({
                button1: !this.data.button1
              })
              this.clearStoreInfo()
            }
          })
        }
      },
      fail: res => {
        // 查询失败把上传的图片删除
        this.delFile(this.data.imgList)

        this.setData({
          imgList: [],
          tmpImgList: [],
          button1: !this.data.button1
        })
        tools.showErrorToast("上传失败")
      }
    })
  },
  // 个人上传
  onPost2() {
    if (this.data.thingname.trim() == "") {
      tools.showErrorToast("请填写物品名称")
      return
    }
    if (this.data.thinginfo.trim() == "") {
      tools.showErrorToast("请填写物品描述信息")
      return
    }
    if (this.data.thingprice == "") {
      tools.showErrorToast("请填写出售价格")
      return
    }
    if (this.data.thingoriginprice == "") {
      tools.showErrorToast("请填写物品原价")
      return
    }
    if (this.data.thingtranprice == "") {
      tools.showErrorToast("请填写物品运费")
      return
    }
    if (this.data.facetoface == "facetoface" || this.data.nofacetoface == "nofacetoface") {
      tools.showErrorToast("请选择交易方式")
      return
    }
    this.setData({
      button2: !this.data.button2
    })
    dbthinglist.add({
      data: {
        username: app.globaldata.userinfo.nickName,
        userimg: app.globaldata.userinfo.avatarUrl,
        userconnect: this.data.userconnect,
        userphone: this.data.userphone,
        openid: app.globaldata.openid,
        thingname: this.data.thingname,
        thinginfo: this.data.thinginfo,
        thingclass: this.data.leibie[this.data.selectedindex],
        thingprice: this.data.thingprice,
        thingoriginprice: this.data.thingoriginprice,
        thingtranprice: this.data.thingtranprice,
        thingimg: this.data.imgList2,
        facetoface: this.data.facetoface,
        nofacetoface: this.data.nofacetoface,

      },
      success: res => {
        tools.showRightToast("上传成功")
        this.setData({
          button2: !this.data.button2
        })
        this.clearThingInfo()
      }
    })
  },
  onLoad() {
    if (app.globaldata.openid == "") {
      tools.showErrorToast('请先登陆')
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 1000)
    }
  },
  onShow() {
    if (app.globaldata.openid == "") {
      tools.showErrorToast('请先登陆')
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 1000)
    }
  }
})