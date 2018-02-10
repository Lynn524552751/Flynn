//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
Page({
  data: {
    name: 'test',
    loading: true,
    api: {
      douyu:{
        url: 'http://capi.douyucdn.cn/api/v1/live/2',
      },
      panda:{
        url: 'https://m.panda.tv/type.html?cate=hearthstone&pdt=2.2.1.0.2h1e3aigt5b'
      }
    },
    list: [],
    cate_id:2,
    shortName: "game"
  },
  onLoad: function (options) {
      this.updateData()
  },
  getData: function () {
    var data = wx.getStorageSync(this.data.name)
    var today = sysUtil.dateFormat(new Date(), "MM-dd")
    if (!(data && today == data.save_time)) {
      return this.updateData()
    }
    return this.setShowData(data)
  },
  updateData: function () {
    var url = this.data.api.douyu.url
    var data = {
      limit:20 ,
      offset:0
    }
    sysUtil.http.get(url,data)
      .then(result => {
        result.data.save_time = sysUtil.dateFormat(new Date(), "MM-dd")
        wx.setStorageSync(this.data.name, result.data)
        console.log(result)
        if (this.setShowData) {
          this.setShowData(result.data)
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  setShowData: function (data) {
    var list = data.data
    console.log(list)
    this.setData({
      list: list,
      loading: false,
    })
  },
})