//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
Page({
  data: {
    name: 'test',
    loading: true,
    api: {
      url: 'http://capi.douyucdn.cn/api/v1/live/2?&limit=20&offset=0', 
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
    var url = this.data.api.url
    var data = {}
    console.log(url)
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
  onReachBottom: function () {
    return
    if (this.data.loadMore) { return }
    setTimeout(e=>{
      if (this.setShowData) {
        this.setShowData(wx.getStorageSync(this.data.name), this.data.page + 1)
      }
    },500)
    
  },
})