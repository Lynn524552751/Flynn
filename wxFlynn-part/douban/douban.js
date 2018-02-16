//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
// console.log(encodeURI("热门")) 
// console.log(decodeURI("%E7%88%B1%E6%83%85"))
Page({
  data: {
    name: 'douban',
    loading: true,
    loadMore: true,
    api: {
      url: 'https://movie.douban.com/j/search_subjects',
    },
    list: [],
    tags: [],
    page: 0,
    per: 3 * 5,
    activeId: 0,
  },
  onLoad: function (options) {
    var title = ""
    var tags = []
    switch (options.name) {
      case "movie":
        title = "电影"
        tags = ["热门", "最新", "豆瓣高分", "冷门佳片", "华语", "欧美", "韩国", "日本"]
        break;
      case "tv":
        title = "电视剧"
        tags = ["热门", "国产剧", "综艺", "美剧", "日剧", "韩剧", "日本动画", "纪录片"]   
        break;
      default:
        break
    }
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      name: options.name,
      tags: tags,
      activeId:0
    })
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
  getTags: function () {
    sysUtil.http.get(this.data.api.tagUrl)
      .then(result => {
        console.log(result)
      })
      .catch(e => {
        console.error(e)
      })
  },
  updateData: function () {
    var url = this.data.api.url
    var tag = this.data.tags[this.data.activeId]
    var data = {
      type: this.data.name,
      tag: tag,
      page_limit:50,
      page_start:0
    }
    sysUtil.http.get(url,data)
      .then(result => {
        console.log(result.statusCode)
        result.data.save_time = sysUtil.dateFormat(new Date(), "MM-dd")
        wx.setStorageSync(this.data.name, result.data)
        if (this.setShowData) {
          this.setShowData(result.data,false)
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  setShowData: function (data, more) {
    var page = more ? this.data.page + 1 : 1 
    var list = data.subjects.slice(0, page * this.data.per)
    var loadMore = data.subjects.length <= page * this.data.per   
    console.log(list.length)
    this.setData({
      list: list,
      loading: false,
      page: page,
      loadMore: loadMore,
    })
  },
  onReachBottom: function () {
    if (this.data.loadMore) { return }
    setTimeout(e=>{
      if (this.setShowData) {
        this.setShowData(wx.getStorageSync(this.data.name), true, this.data.activeId)
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
    this.setData({
      activeId: index
    })
    this.updateData()
  },
})