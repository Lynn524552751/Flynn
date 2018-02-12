//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
var data_len = []
Page({
  data: {
    name: 'test',
    loading: true,
    api: {
      douyu: {
        url: 'https://capi.douyucdn.cn/api/v1/live/2',
        data: {
          limit: 20,
          offset: 0
        },
        cate_id: 2,
        shortName: "game"
      },
      panda: {
        url: 'https://api.m.panda.tv/ajax_get_live_list_by_cate',
        data: {
          pageno: 1,
          pagenum: 20,
          __plat: "h5",
          cate: "hearthstone"
        }
      },
      zhanqi: {
        url: 'https://m.zhanqi.tv/api/static/game.lives/9/20-1.json',
        data: {
        }
      },
      cc: {
        url: 'https://cc.163.com/category/list/',
        data: {
          gametype: 1005,
          format: "json",
          start: 0,
          size: 20
        }
      }
    },
    list: [],
    live: {
      data: [],
      len: 0,
    },
    live_max: 4,
    activeId: 0
  },
  onLoad: function () {
    this.updateAllData()
  },
  updateAllData: function () {
    this.setData({
      live: {
        data: [],
        len: 0,
      },
      activeId: 0
    })
    this.updateDouyuData()
    this.updatePandaData()
    this.updateCCData()
    this.updateZhanqiData()

  },
  updateDouyuData: function () {
    sysUtil.http.get(this.data.api.douyu.url, this.data.api.douyu.data)
      .then(result => {
        console.log(result)
        if (this.setShowData) {
          var list = this.data.live.data
          var data = result.data.data
          for (var i in data) {
            var item = {}
            item.title = data[i].room_name
            item.name = data[i].nickname
            item.sum = data[i].online
            item.img = data[i].room_src
            item.url = data[i].url
            list.push(item)
          }
          this.setData({
            live: {
              data: list,
              len: this.data.live.len + 1,
            }
          })
          this.setShowData()
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  updatePandaData: function () {
    sysUtil.http.get(this.data.api.panda.url, this.data.api.panda.data)
      .then(result => {
        console.log(result)
        if (this.setShowData) {
          var list = this.data.live.data
          var data = result.data.data.items
          for (var i in data) {
            var item = {}
            item.title = data[i].name
            item.name = data[i].userinfo.nickName
            item.sum = data[i].person_num
            item.img = data[i].pictures.img
            item.url = data[i].id
            list.push(item)
          }
          this.setData({
            live: {
              data: list,
              len: this.data.live.len + 1,
            }
          })
          this.setShowData()
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  updateCCData: function () {
    sysUtil.http.get(this.data.api.cc.url, this.data.api.cc.data)
      .then(result => {
        console.log(result)
        if (this.setShowData) {
          var list = this.data.live.data
          var data = result.data.lives
          for (var i in data) {
            var item = {}
            item.title = data[i].title
            item.name = data[i].nickname
            item.sum = data[i].webcc_visitor
            item.img = data[i].poster
            item.url = data[i].cuteid
            list.push(item)
          }
          this.setData({
            live: {
              data: list,
              len: this.data.live.len + 1,
            }
          })
          this.setShowData()
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  updateZhanqiData: function () {
    sysUtil.http.get(this.data.api.zhanqi.url, this.data.api.zhanqi.data)
      .then(result => {
        console.log(result)
        if (this.setShowData) {
          var list = this.data.live.data
          var data = result.data.data.rooms
          for (var i in data) {
            var item = {}
            item.title = data[i].title
            item.name = data[i].nickname
            item.sum = data[i].online
            item.img = data[i].spic
            item.url = data[i].url
            list.push(item)
          }
          this.setData({
            live: {
              data: list,
              len: this.data.live.len + 1,
            }
          })
          this.setShowData()
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  setShowData: function () {
    var index = this.data.activeId
    var len = this.data.live.len
    var max = this.data.live_max
    if (index != 0 || (index == 0 && len == max)) {
      var data = this.data.live.data
      data.sort((a, b) => {
        return b.sum - a.sum;
      })
      this.setData({
        list: this.data.live.data,
        loading: false,
      })
    }
  },
  activeTab: function (e) {
    var s = {
      0: this.updateAllData(),
      1: this.updateDouyuData(),
      2: this.updatePandaData(),
      3: this.updateAllData()
    }
    var index = e.currentTarget.dataset.index
    this.setData({
      activeId: index
    })
    s[index]
  },
})