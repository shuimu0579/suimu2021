Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录中转页'
    })
    let baseurl = this.decodeurl(options.url)
    let backUrl = this.decodeurl(options.backUrl)
    let ticket = this.decodeurl(options.ticket)
    let token = this.decodeurl(options.token)
    let url = `${baseurl}?token=${token}&backUrl=${backUrl}&casTicket=${ticket}&ticket=${ticket}`
    console.log(url);
    this.setData({
      url: url,
    });
  },
  decodeurl(data) {
    return decodeURIComponent(data)
  }

})