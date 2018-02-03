//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
// console.log(encodeURI("热门")) 
// console.log(decodeURI("%E7%88%B1%E6%83%85"))
Page({
  data: {
    name: 'test',
    loading: true,
    api: {
      url: 'http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0& amp;n={2}&aggr=1&cr=1&loginUin={3}&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p={1}&catZhida=0&remoteplace=sizer.newclient.next_song&w={0}', 
    },
    list: [],
    page: 1,
    per: 3 * 5,
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
    var url = this.data.api.url.replace("{0}", "周杰伦").replace("{1}", "1").replace("{2}", "25").replace("{3}", "0")
    console.log(url)
    sysUtil.http.get(url)
      .then(result => {
        result.data.save_time = sysUtil.dateFormat(new Date(), "MM-dd")
        //wx.setStorageSync(this.data.name, result.data)
        if (this.setShowData) {
          this.setShowData(result.data)
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  setShowData: function (data) {
    var list = data.data.song.list
    console.log(list)
    this.setData({
      list: list,
      loading: false,
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