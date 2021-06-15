// pages/wxmininative/native.js
const app = getApp();
const api = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enterTime: 0, // 进入主页时间戳
    isFirst: true,
    exitApp: false,
    userMenu: [],
    background: ['/static/image/banner2.png', '/static/image/banner.png']
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
  },
  onShow: function () {
    var _this = this;
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0  //这个数字是当前页面在tabBar中list数组的索引
      })
    }
    let load = api.getUserMenu
    load({
      vtenant: wx.getStorageSync('fromVtenant') || 'yundee',
      casTicket: wx.getStorageSync("ticket")
    }).then(res => {
      if (res.errorCode === 200)
        _this.setData({
          userMenu: res.data
        })
    })
  },
  goEdit: function () {
    if (!app.globalData.enterpriseInfo || app.globalData.enterpriseInfo.length === 0) {
      api.applyFrom({ casTicket: wx.getStorageSync('ticket') }).then(res => {
        if (res.data) {//申请过企业
          wx.showModal({
            content: '您的申请已经提交给管理员\n审核完成后即可进入应用',
            showCancel: false,
            success(res) {
              if (res.confirm) {
              }
            }
          })
          return
        }
      })
    } else {
      wx.navigateTo({
        url: '../editApp/editApp'
      })
    }

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