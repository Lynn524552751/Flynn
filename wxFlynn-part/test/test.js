//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
var data_len = []
Page({
  data: {
    name: 'test',
    loading: true,
    api: {
      url: 'https://www.qiushibaike.com/text/',
      data: {
        page: 1
      },
      cate_id: 2,
      shortName: "game"
    },
    tags: [],
    list: [],
    activeId: 0
  },
  onLoad: function () {
    this.updateData()
  },
  updateData: function () {
    sysUtil.http.get(this.data.api.url, this.data.api.data)
      .then(result => {
        console.log(result)
        if (this.setShowData) {
          this.setShowData()
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  setShowData: function (data) {
      this.setData({
        list: this.data.data,
        loading: false,
      })
  },
  activeTab: function (e) {
    var index = e.currentTarget.dataset.index
  },
})