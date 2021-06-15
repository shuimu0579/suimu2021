var loadCount = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },
  onLoad: function (options) {
    if (options && options.reload === '1') {
      wx.reLaunch({
        url: '../wxLogin/wxLogin',
        success: function (e) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        }
      })
    }
    let url = this.decodeurl(options.url)
    this.setData({
      url: url,
    });
  },
  decodeurl(data) {
    return decodeURIComponent(data)
  }
  ,
  onShow: function () {
    this.setData({
      url: this.data.url
    })
  },
  onShareAppMessage: function () {
    return {
      title: '云镝智慧助手',
      path: '/pages/wxLogin/wxLogin',
      imageUrl: '/static/image/share.png'
    }
  },
  onShareTimeline: function () {
    return {
      title: '云镝智慧助手',
      query: "reload=1"
    }
  }
})