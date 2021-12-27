// pages/storedetail/storedetail.js
Page({
    data: {
        username: "",
        userimg: "",
        storename: "",
        storeaddress: "",
        latitude: "",
        longitude: "",
        storeinfo: "",
        storeimg: ""
    },
    // 展示加载
    showLoad() {
        wx.showLoading({
            title: '加载中',
        })
    },
    // 关闭加载
    closeLoad() {
        wx.hideLoading({
            success: (res) => {},
        })
    },
    // 地图
    openMap() {
        wx.openLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            scale: 18,
            address: this.data.storeaddress
        })
    },
    // preview 图片
    seeImg(event) {
        wx.previewImage({
            current: event.currentTarget.dataset.url,
            urls: this.data.storeimg
        })
    },
    onLoad(option) {
        // 把字符串解析为对象
        let objInfo = JSON.parse(option.info)
        console.log(objInfo)
        this.setData({
            username: objInfo.username,
            userimg: objInfo.userimg,
            storename: objInfo.storename,
            storeaddress: objInfo.storeaddress,
            latitude: objInfo.latitude,
            longitude: objInfo.longitude,
            storeinfo: objInfo.storeinfo,
            storeimg: objInfo.storeimg
        })
        console.log(this.data)
    }
})