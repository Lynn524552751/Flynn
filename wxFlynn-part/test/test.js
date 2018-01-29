//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
// console.log(encodeURI("热门")) 
// console.log(decodeURI("%E7%88%B1%E6%83%85"))
Page({
  data: {
    name: 'test',
    loading: true,
    loadMore: true,
    api: {
      url: 'https://movie.douban.com/j/search_subjects?type={type}&tag={tag}&page_limit=50&page_start=0',
      tv_url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0',
      variety_url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BB%BC%E8%89%BA&page_limit=50&page_start=0'
    },
    list: [],
    img: '../../static/images/douban.jpg',
    page: 1,
    per: 3 * 5,
  },
  onLoad: function (options) {
    switch (options.name) {
      case "movie":
        this.updateData("movie")
        break;
      case "tv":
        this.updateData("tv")
        break;
      case "variety":
        this.updateData("tv","综艺")
        break;
      default:
        break
    }
  },
  getData: function () {
    var data = wx.getStorageSync(this.data.name)
    var today = sysUtil.dateFormat(new Date(), "MM-dd")
    if (!(data && today == data.save_time)) {
      return this.updateData()
    }
    return this.setShowData(data)
  },
  getTags: function () {
    sysUtil.http.get(this.data.api.tagUrl)
      .then(result => {
        console.log(result)
      })
      .catch(e => {
        console.error(e)
      })
  },
  updateData: function (type, tag = "热门") {
    var url = this.data.api.url.replace("{type}", type).replace("{tag}", encodeURI(tag))
    console.log(url)
    sysUtil.http.get(url)
      .then(result => {
        result.data.save_time = sysUtil.dateFormat(new Date(), "MM-dd")
        wx.setStorageSync(this.data.name, result.data)
        if (this.setShowData) {
          this.setShowData(result.data)
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  setShowData: function (data, page = 1) {
    var list = data.subjects
    var loadMore = list.length <= page * this.data.per
    list = list.slice(0, page * this.data.per)
    console.log(list)
    this.setData({
      list: list,
      loading: false,
      page: page,
      loadMore: loadMore
    })
  },
  onReachBottom: function () {
    if (this.data.loadMore) { return }
    setTimeout(e=>{
      if (this.setShowData) {
        this.setShowData(wx.getStorageSync(this.data.name), this.data.page + 1)
      }
    },500)
    
  },
  clickImage: function () {
    // wx.previewImage({
    //   current: "static/images/douban.jpg",
    //   urls: ["static/images/douban.jpg"],
    //   success: result=>{
    //     console.log("success")
    //   },
    //   fail: e =>{
    //     console.log("fail")
    //   },
    // })
  }
})