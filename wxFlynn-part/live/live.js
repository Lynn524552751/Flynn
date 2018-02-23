//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
var data_len = []
Page({
  data: {
    name: 'live',
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
        url: 'https://api.live.bilibili.com/room/v1/area/getRoomList',
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
    tags: ["斗鱼", "熊猫", "战旗", "CC", "B站"],
    list: [],
    live: {
      data: {
        douyu: [],
        panda: [],
        zhanqi: [],
        cc: [],
        bili: [],
      },
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
        data: {
          douyu: [],
          panda: [],
          zhanqi: [],
          cc: [],
          bili: [],
        },
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
          var list = []
          var data = result.data.data
          for (var i in data) {
            var item = {}
            item.title = data[i].room_name
            item.name = data[i].nickname
            item.sum = Number(data[i].online)
            item.img = data[i].room_src
            item.url = data[i].url
            list.push(item)
          }
          var liveData = this.data.live.data
          liveData.douyu = list
          this.setData({
            live: {
              data: liveData,
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
          var list = []
          var data = result.data.data.items
          for (var i in data) {
            var item = {}
            item.title = data[i].name
            item.name = data[i].userinfo.nickName
            item.sum = Number(data[i].person_num)
            item.img = data[i].pictures.img
            item.url = data[i].id
            list.push(item)
          }
          var liveData = this.data.live.data
          liveData.panda = list
          this.setData({
            live: {
              data: liveData,
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
          var list = []
          var data = result.data.lives
          for (var i in data) {
            var item = {}
            item.title = data[i].title
            item.name = data[i].nickname
            item.sum = Number(data[i].webcc_visitor)
            item.img = data[i].poster
            item.url = data[i].cuteid
            list.push(item)
          }
          var liveData = this.data.live.data
          liveData.cc = list
          this.setData({
            live: {
              data: liveData,
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
          var list = []
          var data = result.data.data.rooms
          for (var i in data) {
            var item = {}
            item.title = data[i].title
            item.name = data[i].nickname
            item.sum = Number(data[i].online)
            item.img = data[i].spic
            item.url = data[i].url
            list.push(item)
          }
          var liveData = this.data.live.data
          liveData.zhanqi = list
          this.setData({
            live: {
              data: liveData,
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
          var list = []
          var data = result.data.data
          for (var i in data) {
            var item = {}
            item.title = data[i].title
            item.name = data[i].uname
            item.sum = data[i].online
            item.img = data[i].user_cover
            item.url = data[i].link
            list.push(item)
          }
          var liveData = this.data.live.data
          liveData.bili = list
          this.setData({
            live: {
              data: liveData,
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
    var data = []
    var list = []
    if (index != 0 || (index == 0 && len == max)) {
      switch (index) {
        case 0:
          data = data.concat(this.data.live.data.douyu)
          data = data.concat(this.data.live.data.panda)
          data = data.concat(this.data.live.data.zhanqi)
          data = data.concat(this.data.live.data.cc)
          data = data.concat(this.data.live.data.bili)
          break;
        case 1:
          data = data.concat(this.data.live.data.douyu)
          break;
        case 2:
          data = data.concat(this.data.live.data.panda)
          break;
        case 3:
          data = data.concat(this.data.live.data.zhanqi)
          break;
        case 4:
          data = data.concat(this.data.live.data.cc)
          break;
        case 5:
          data = data.concat(this.data.live.data.bili)
          break;
        default:
          break
      }
      data.sort((a, b) => {
        return b.sum - a.sum;
      })
      for (var i in data) {
        if (data[i].sum > 1000) {
          if (data[i].sum > 10000) {
            data[i].online = (data[i].sum / 10000).toFixed(1) + "W"
          }else{
            data[i].online = data[i].sum
          }
          list.push(data[i])
        }
      }
      this.setData({
        list: list,
        loading: false,
      })
      wx.hideNavigationBarLoading() //完成停止加载
    }
  },
  activeTab: function (e) {
    var index = e.currentTarget.dataset.index
    index = index == this.data.activeId ? 0 : index
    this.setData({
      activeId: index
    })
    this.setShowData()
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(e =>{
      this.updateAllData()
      // complete
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 500);
  },
})