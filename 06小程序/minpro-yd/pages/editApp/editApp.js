// pages/wxmininative/native.js
const app = getApp();
const api = require("../../utils/api.js")
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMenu: [],
    appList: []
  },
  /**
   * 生命周期函数--监听页面显示
   */
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
    let _self = this;
    api.getUserMenu({
      vtenant: wx.getStorageSync('fromVtenant'),
      casTicket: wx.getStorageSync("ticket")
    }).then(res => {
      if (res.errorCode === 200) {
        _self.setData({
          userMenu: res.data
        })
        api.getWxMenu({
          enterpriseId: app.globalData.currentEnt.enterpriseId,
          casTicket: wx.getStorageSync('ticket')
        }).then(res => {
          let arr = util.translateDataToTree(res.data)
          _self.filterData(arr)
        })
      }
    })
  },
  filterData(arr) {
    let _self = this
    let userMenu = _self.data.userMenu;
    if (!userMenu || userMenu.length === 0) {
      _self.setData({
        appList: arr
      });
    } else {
      arr.map(item => {
        let children = item.children
        if (children)
          children.map((i, $index) => {
            userMenu.map((j, _index) => {
              if (i.menuNumber === j.menuNumber) i.disabled = true; //children.splice($index, 1)
            })
          })
      })
      _self.setData({
        appList: arr
      });
    }
  },
  addApp(item) {
    let target = item.currentTarget.dataset.index
    if (target.disabled) return
    let arr = this.data.appList
    let userArr = this.data.userMenu;
    arr.map(item => {
      let children = item.children
      if (children)
        children.map((i, $index) => {
          if (i.menuNumber === target.menuNumber) i.disabled = true;//children.splice($index, 1)
        })
    })
    userArr.push(target)
    this.setData({
      appList: arr,
      userMenu: userArr
    });
  },
  removeApp(item) {
    let target = item.currentTarget.dataset.index
    let arr = this.data.appList
    let userArr = this.data.userMenu;
    userArr.map((item, $index) => {
      if (item.menuNumber === target.menuNumber) userArr.splice($index, 1)
    })
    arr.map(item => {
      let children = item.children
      if (children) {
        children.map((i, $index) => {
          if (i.menuNumber === target.menuNumber) i.disabled = false;//children.splice($index, 1)
        })
      } else {
        if (item.menuNumber === target.parentMenuNumber)
          children.push(target)
      }
    })
    this.setData({
      appList: arr,
      userMenu: userArr
    });
  },
  saveApp() {
    let menuList = this.data.userMenu.map(item => {
      return item.menuNumber
    })
    api.saveApp({
      casTicket: wx.getStorageSync('ticket'),
      menuList: menuList
    }).then(res => {
      wx.switchTab({
        url: '../wxmininative/native',
      })
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