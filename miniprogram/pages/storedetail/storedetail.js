// pages/storedetail/storedetail.js
Page({
    data:{
        username:"",
        userimg:"",
        storename: "",
        storeaddress: "",
        storeinfo: "",
        storeimg: ""
    },
    // preview 图片
    seeImg(event){
        wx.previewImage({
            current: event.currentTarget.dataset.url,
            urls: this.data.storeimg
          })
    },
    onLoad(option){
        // 把字符串解析为对象
        let objInfo = JSON.parse(option.info)
        console.log(objInfo)
        this.setData({
            username: objInfo.username,
            userimg: objInfo.userimg,
            storename: objInfo.storename,
            storeaddress: objInfo.storeaddress,
            storeinfo: objInfo.storeinfo,
            storeimg: objInfo.storeimg
        })
        console.log(this.data)
    }
})