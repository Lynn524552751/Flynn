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
      },
      bili: {
        url: 'http://api.live.bilibili.com/room/v1/area/getRoomList',
        data: {
          parent_area_id: 2,
          cate_id: 0,
          area_id: 91,
          sort_type: "online",
          page: 1,
          page_size: 20
        }
      }
    },
    tags: ["斗鱼", "熊猫", "战旗", "CC","B站"],
    list: [],
    live: {
      data: [],
      len: 0,
    },
    live_max: 5,
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
    this.updateBiliData()
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
  updateBiliData: function () {
    sysUtil.http.get(this.data.api.bili.url, this.data.api.bili.data)
      .then(result => {
        console.log(result)
        if (this.setShowData) {
          var list = this.data.live.data
          var data = result.data.data
          for (var i in data) {
            var item = {}
            item.title = data[i].title
            item.name = data[i].uname
            item.sum = data[i].online
            item.img = data[i].system_cover
            item.url = data[i].link
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
      for (var i in data) {
        if (data[i].sum > 10000) {
          data[i].sum = (data[i].sum / 10000).toFixed(1) + "W"
        }
      }
      this.setData({
        list: this.data.live.data,
        loading: false,
      })
    }
  },
  activeTab: function (e) {
    var index = e.currentTarget.dataset.index
    if (index == this.data.activeId) {
      this.updateAllData()
    } else {
      this.setData({
        live: {
          data: [],
          len: 0,
        },
        activeId: index
      })
      switch (index) {
        case 1:
          this.updateDouyuData()
          break;
        case 2:
          this.updatePandaData()
          break;
        case 3:
          this.updateZhanqiData()
          break;
        case 4:
          this.updateCCData()
          break;
        case 5:
          this.updateBiliData()
          break;
        default:
          break
      }
    }
  },
})