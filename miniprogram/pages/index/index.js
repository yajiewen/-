let tools = require('../../tools/tools')
// 获取应用实例
const app = getApp()

Page({

    data:{
        selectindex:0,
    },
    changeStyle(event){
        this.setData({
            selectindex: event.target.dataset.index
        })
      },
})


  