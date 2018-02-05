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
      url: 'https://movie.douban.com/j/search_subjects',
    },
    list: [],
    tag: ["热门", "国产剧", "综艺", "美剧", "日剧", "韩剧", "日本动画", "纪录片"],
    page: 0,
    per: 3 * 5,
    activeId: 0,
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
  updateData: function (type, tag_index = 0) {
    var url = this.data.api.url
    var data = {
      type: type,
      tag: this.data.tag[tag_index],
      page_limit:50,
      page_start:0
    }
    sysUtil.http.get(url,data)
      .then(result => {
        console.log(result)
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
  setShowData: function (data) {
    var page = this.data.page + 1
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
        this.setShowData(wx.getStorageSync(this.data.name))
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
  },
  activeTab: function (e) {
    var index = e.currentTarget.dataset.index
    this.updateData("tv", index)
    this.setData({
      activeId: index
    })

  },
})