const app = getApp();
const api = require("../../utils/api.js");
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appList: [],
  },
  onLoad(options) {
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
    api.getWxMenu({
      enterpriseId: app.globalData.currentEnt.enterpriseId,
      casTicket: wx.getStorageSync('ticket')
    }).then(res => {
      let arr = util.translateDataToTree(res.data)
      this.setData({
        appList: arr
      });
    })
  },
  //刷新
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getAppList();
  },
  //网络请求，获取数据
  getAppList() {
    let _this = this
    api.getWxMenu({
      enterpriseId: app.globalData.currentEnt.enterpriseId,
      casTicket: wx.getStorageSync('ticket')
    }).then(res => {
      let arr = util.translateDataToTree(res.data)
      _this.setData({
        appList: arr
      });
      //隐藏loading 提示框
      wx.hideLoading();
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    })

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    this.onRefresh();
  },
  goApp(item) {
    if (!app.globalData.enterpriseInfo || app.globalData.enterpriseInfo.length === 0) {
      api.applyFrom({ casTicket: wx.getStorageSync('ticket') }).then(res => {
        if (res.data) {//申请过企业
          wx.showModal({
            content: '您的申请已经提交给管理员\n审核完成后即可进入应用',
            showCancel: false,
          })
          return
        }
      })
    } else {
      api.getAppUrl({
        menuNumber: item.currentTarget.dataset.index,
        vtenant: wx.getStorageSync('fromVtenant'),
        tenant: wx.getStorageSync('vtenant'),
        casTicket: wx.getStorageSync('ticket')
      }).then(res => {
        if (res.data.status === 0) {
          wx.navigateTo({ url: '../appdetail/appdetail?backUrl=' + getCurrentPages()[0].route + '&url=' + this.encode(res.data.url) })
        } else {
          wx.showModal({
            title: res.data.statusTitle || '错误',
            content: res.data.statusMsg || '错误',
            showCancel: false
          })
        }
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1  //这个数字是当前页面在tabBar中list数组的索引
      })
    }
  },
  encode(data) {
    return encodeURIComponent(data)
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