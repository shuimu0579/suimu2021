const app = getApp();
const api = require("../../utils/api.js")
const utils = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    show1: false,
    from: null
  },
  /**
  * 生命周期函数--监听页面加载
  */

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
    if (options && options.scene) {

    }
    if (options && options.from) {
      this.setData({
        from: options.from
      })
    }
    var _self = this;
    wx.login({
      success: res => {
        if (res.code) {
          api.LoginbyCode({ code: res.code }).then(res => {
            wx.setStorageSync('ticket', res.data.ticket)
            wx.setStorageSync('vtenant', res.data.vtenant)
            wx.setStorageSync('accessToken', res.data.token)
            if (res.data.service) { app.globalData.service = res.data.service }
            if (res.data.callBackUrlType) { app.globalData.callBackUrlType = res.data.callBackUrlType }
            if (res.data.msgStatus) { app.globalData.msgStatus = res.data.msgStatus } //微信公众号开关
            /*中转页
            callBackUrlType:1 公共 
            callBackUrlType:2 第三方
            */
            _self.getUserInfo()
          })
        }
      }
    })
  },
  goAddEnt() {
    wx.navigateTo({
      url: '../add-ent/add-ent'
    })
  },
  goCreatEnt() {
    wx.navigateTo({
      url: '../creat-ent/creat-ent'
    })
  },
  goisExperience() {
    let _self = this
    let user = { username: '13043407621', password: '1234567', vtenant: 'yundee', loginType: 0 }
    // app.globalData.baseurl = 'https://yiyang.yundeeiot.com'
    api.loginWithAccount(user).then(res => {
      if (res.errorCode === 200) {
        let { data } = res;
        wx.setStorageSync("accessToken", data.token);
        wx.setStorageSync("ticket", data.ticket);
        app.globalData.isExperience = true
        _self.getUserInfo()
      }
    })
  },
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
    //用户允许授权
    console.log('手机数据', e.detail);
    let { encryptedData, iv, cloudID } = e.detail;
    let _self = this
    let load = api.getPhoneNumber;
    wx.login({
      success: res => {
        if (res.code) {
          let code = res.code
          load({ encryptedData: encryptedData, iv: iv, cloudID: cloudID, code: code }).then(res => {
            if (_self.data.from === 'message') {
              wx.navigateTo({ url: `../message/message?userId=${wx.getStorageSync('gzhUserId')}&enterpriseId=${wx.getStorageSync('gzhEnterpriseId')}&vtenant=${wx.getStorageSync('gzhVtenant')}` })
              return
            }
            wx.setStorageSync('ticket', res.data.ticket)
            wx.setStorageSync('vtenant', res.data.vtenant)
            wx.setStorageSync('accessToken', res.data.token)
            _self.getUserInfo()
          })
        }
      }
    })
  },
  getUserInfo() {
    let _self = this
    let load = api.getUserInfo;
    load({
      vtenant: wx.getStorageSync('vtenant'),
      ticket: wx.getStorageSync('ticket')
    }).then(res => {
      app.globalData.userInfo = res.data
      _self.getEnterprise(res.data)
    })
  },
  getEnterprise() {
    let _self = this
    let load = api.getEnterprise;
    load({
      userNumber: app.globalData.userInfo.userNumber,
      ticket: wx.getStorageSync('ticket')
    }).then(res => {
      if (res.data.length === 0) {
        app.globalData.enterpriseInfo = res.data
        _self.setData({
          show1: true
        })
      } else {
        app.globalData.enterpriseInfo = res.data
        if (app.globalData.enterpriseInfo)
          app.globalData.enterpriseInfo.map((item, index) => {
            if (item.isCurrent) {
              app.globalData.currentEnt = item
              wx.setStorageSync('vtenant', item.vtenant);
              wx.setStorageSync('fromVtenant', item.fromVtenant);
              app.globalData.enterpriseInfo.splice(index, 1);
              app.globalData.enterpriseInfo.unshift(item)
            }
          })
        wx.navigateTo({ url: `../cqlogin/cqlogin?url=${_self.encode(app.globalData.baseurl + app.globalData.service)}&backUrl=/pages/wxmininative/native&token=${wx.getStorageSync('accessToken')}&ticket=${wx.getStorageSync('ticket')}` })
      }
    })
  },
  encode(data) {
    return encodeURIComponent(data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   userInfo: app.globalData.userInfo
    // });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})