//index.js
//获取应用实例
const app = getApp()
const sysUtil = require('../../utils/sysUtil.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  redirectView: function(e) {
    // console.log(e)
    var nav = e.currentTarget.dataset.nav
    var param = e.currentTarget.dataset.param
    var url = '../{nav}/{nav}'.replace('{nav}', nav).replace('{nav}', nav)
    if (param){
      url = url + "?name=" + param
    }
    wx.navigateTo({
      url: url
    })
  },
  onLoad: function () {  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else {     
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setNavigationBarTitle({
            title: this.data.userInfo.nickName
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
