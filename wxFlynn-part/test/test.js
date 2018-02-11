//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
var data_len = []
Page({
  data: {
    name: 'test',
    loading: true,
    api: {
      douyu:{
        url: 'http://capi.douyucdn.cn/api/v1/live/2',
        data: {
          limit: 20,
          offset: 0
        },
        cate_id: 2,
        shortName: "game"
      },
      panda:{
        url: 'https://api.m.panda.tv/ajax_get_live_list_by_cate',
        data: {
          pageno: 1,
          pagenum: 20,
          __plat:"h5",
          cate:"hearthstone"
        }
      }
    },
    list: [],
    live:{
      data: [],
      len: 0,
      
    },
    live_max: 2
  },
  onLoad: function (options) {
    this.updateDouyuData()
    this.updatePandaData()
  },
  updateDouyuData: function () {
    sysUtil.http.get(this.data.api.douyu.url, this.data.api.douyu.data)
      .then(result => {
        console.log(result)
        if (this.setShowData) {
          var list = this.data.live.data
          var data = result.data.data
          for (var i in data){
            var item = {}
            item.title = data[i].room_name
            item.name = data[i].nickname
            item.sum = data[i].online
            item.img = data[i].room_src
            item.url = data[i].url
            list.push(item)
          }
          this.setData({
            live:{
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
  setShowData: function () {
    if (this.data.live.len == this.data.live_max){
      var data = this.data.live.data
      data.sort((a, b)=>{
        return b.sum - a.sum;
      })
      this.setData({
        list: this.data.live.data,
        loading: false,
      })
    }
    
  },
})