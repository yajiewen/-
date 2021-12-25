Page({
    data:{
        username: "",
        userimg: "",
        userconnect:"",
        thingname: "",
        thinginfo: "",
        thingclass: "",
        thingprice: "",
        thingoriginprice: "",
        thingtranprice: "",
        thingimg: "",
        facetoface: "",
        nofacetoface: "",
    },
    onLoad(option){
        // 把字符串解析为对象
        let objInfo = JSON.parse(option.info)
        console.log(objInfo)
        this.setData({
            username: objInfo.username,
            userimg: objInfo.userimg,
            userconnect: objInfo.userconnect,
            userphone: objInfo.userphone,
            thingname: objInfo.thingname,
            thinginfo: objInfo.thinginfo,
            thingclass: objInfo.thingclass,
            thingprice: objInfo.thingprice,
            thingoriginprice: objInfo.thingoriginprice,
            thingtranprice: objInfo.thingtranprice,
            thingimg: objInfo.thingimg,
            facetoface: objInfo.facetoface,
            nofacetoface: objInfo.nofacetoface,
        })
        console.log(this.data)
    }
})