//weather.js
const sysUtil = require('../../utils/sysUtil.js')

Page({
  data: {
    name : 'Flynn',
    loading : true,
    api : {
      url : 'https://bangumi.bilibili.com/web_api/timeline_global',
    },
    bangumi : {}
  },
  onLoad: function () {
    this.searchList()
  },
  searchList: function () {
    wx.request({
      url: this.data.api.url, 
      success: result => {     
        var data = result.data
        var today_index = this.getTodayIndex(data.result)
        if (today_index != -1){
          data.result = data.result.slice(today_index - 1, today_index + 3)
          data.result = this.setWeekString(data.result)
          console.log(data)
        }
        this.setData({
          bangumi: data,
          loading : false
        })
      }
    })
  },
  getTodayIndex: function (list) {
    var index = -1
    for(var i in list){
      if(list[i].is_today == 1){
        index = i
        break
      }
    }
    return Number(index) 
  },
  setWeekString: function (list) {   
    for (var i in list) {
      var day_of_week = list[i].day_of_week
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
      list[i].week_string = week_string
    }
    return list
  },
  activeTab: function (e) {  
    var index = e.currentTarget.dataset.index
    console.log(index)
   }
})