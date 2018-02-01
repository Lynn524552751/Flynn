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
    },
    list: [],
    img: '../../static/images/douban.jpg',
    page: 1,
    per: 3 * 5,
  },
  onLoad: function (options) {
    var title = ""
    switch (options.name) {
      case "movie":
        title = "电影"
        this.updateData("movie")
        break;
      case "tv":
        title = "电视剧"
        this.updateData("tv")
        break;
      case "variety":
        title = "综艺"
        this.updateData("tv","综艺")
        break;
      default:
        break
    }
    wx.setNavigationBarTitle({
      title: title
    })
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
  previewImage: function (e) {
    wx.previewImage({
      // current: "",
      urls: [ e.target.dataset.src],
      success: result=>{
        // console.log("success")
      },
      fail: e =>{
        // cosnsole.log("fail")
      },
    })
  }
})