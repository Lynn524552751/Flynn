//bangumi.js
const util = require('../../utils/util.js')
const sysUtil = require('../../utils/sysUtil.js')

Page({
  data: {
    name: 'test',
    loading: true,
    api: {
      url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0',
    },
    list: [],
    img: '../../static/images/douban.jpg',
  },
  onLoad: function () {
    this.updateData()
    
  },
  getData: function () {
  },
  updateData: function () {
    sysUtil.http.get(this.data.api.url)
      .then(result => { 
        console.log(result)
        this.setData({
          list: result.data.subjects,
          loading: false
        })
        console.log(this.data.list)
      })
      .catch(e => {
        console.error(e)
      })
  },
})