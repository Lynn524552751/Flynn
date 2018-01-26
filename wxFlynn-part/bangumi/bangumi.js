//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')

Page({
  data: {
    name: 'bangumi',
    loading: true,
    api: {
      url: 'https://bangumi.bilibili.com/web_api/timeline_global',
    },
    bangumi: [],
    img: '../../static/images/bangumi.jpg',
    today_index: 6,
    activeId: 1,
  },
  onLoad: function () {
    this.getData()
  },
  getData: function () {
    var data = wx.getStorageSync(this.data.name)
    var today = sysUtil.dateFormat(new Date(), "M-dd")
    if (!(data && today == data.save_time)) {
      return this.updateData()
    }
    return this.setShowData(data)
  },
  setShowData: function (data) {
    data = data.result
    data = data.slice(this.data.today_index - 1, this.data.today_index + 3)
    data.map(item => {
      item.week_string = this.int2StrByWeek(item.day_of_week)
    })
    console.log(data)
    this.setData({
      bangumi: data,
      loading: false
    })
  },
  updateData: function () {
    sysUtil.http.get(this.data.api.url)
      .then(result => {
        result.data.save_time = sysUtil.dateFormat(new Date(), "M-dd")
        wx.setStorageSync(this.data.name, result.data)
        if (this.setShowData) {
          this.setShowData(result.data)
        }
      })
      .catch(e => {
        console.error(e)
      })
  },
  int2StrByWeek: function (day_of_week) {
    var week_string = ""

    switch (day_of_week) {
      case 1:
        week_string = "周一"
        break;
      case 2:
        week_string = "周二"
        break;
      case 3:
        week_string = "周三"
        break;
      case 4:
        week_string = "周四"
        break;
      case 5:
        week_string = "周五"
        break;
      case 6:
        week_string = "周六"
        break;
      case 7:
        week_string = "周日"
        break;
      default:
        break
    }
    return week_string
  },
  activeTab: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      activeId: index,
    })
  },
})