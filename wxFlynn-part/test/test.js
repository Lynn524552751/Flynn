//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')
var data_len = []
Page({
  data: {
    name: 'test',
    loading: true,
    api: {
      url: 'https://m.toutiao.com/list/',
      data: {
        tag: "__all__",
        ac: "wap",
        count: 20,
        format: "json_raw",
        min_behot_time:0,
        cp:"5A8B8C3925333E1",
        as:"A1358AB8AB1C953"
      },
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
          this.setShowData(result.data)
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  setShowData: function (data) {
      this.setData({
        list: data.articles,
        loading: false,
      })
  },
  activeTab: function (e) {
    var index = e.currentTarget.dataset.index
  },
})