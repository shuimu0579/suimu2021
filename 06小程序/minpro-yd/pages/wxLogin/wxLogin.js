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
    background: ['/static/image/banner2.png', '/static/image/banner.png'],
    userMenu: [{ "id": 2, "tenantCode": "yundee", "menuName": "采购订单", "menuNumber": "cgdd", "menuSort": 1, "menuLevel": 1, "parentMenuNumber": "adopt_pin_synergy", "isDelete": 0, "menuIcon": "https://yiyang.yundeeiot.com/yundeepre/cas/cgxtwx.png" }, { "id": 3, "tenantCode": "yundee", "menuName": "客户订单", "menuNumber": "khdd", "menuSort": 2, "menuLevel": 1, "parentMenuNumber": "adopt_pin_synergy", "isDelete": 0, "menuIcon": "https://yiyang.yundeeiot.com/yundeepre/cas/khddwx.png" }, { "id": 4, "tenantCode": "yundee", "menuName": "客户退货", "menuNumber": "khth", "menuSort": 3, "menuLevel": 1, "parentMenuNumber": "adopt_pin_synergy", "isDelete": 0, "menuIcon": "https://yiyang.yundeeiot.com/yundeepre/cas/khthwx.png" }]
  },
  /**
  * 生命周期函数--监听页面加载
  */

  onLoad: function (options) {
    wx.setStorageSync("isExperience", false);
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
    app.globalData.baseurl = (function () {
      switch (__wxConfig.envVersion) {
        case 'develop': //开发版
          return "https://yundeetest.kingdee.com"
        case 'trial': //测试版
          return "https://yiyang.yundeeiot.com"
        case 'release': //生产
          return "https://yundeetest.kingdee.com"
      }
    })()
    //测试域名
    app.globalData.platformId = (function () {
      switch (__wxConfig.envVersion) {
        case 'develop': //开发版
          return '/yundeetest91/'
        case 'trial': //测试版
          return '/yundeepre/'
        case 'release': //生产
          return '/yundeetest91/'
      }
    })()
    // if (options && options.scene) {
    //   wx.reLaunch({
    //     url: '../qrcodelogin/qrcodelogin?' + unescape(options.scene),
    //   })
    //   return
    // }
    var _self = this;
    wx.login({
      success: res => {
        if (res.code) {
          api.LoginbyCode({ code: res.code }).then(res => {
            if (res.errorCode === 10008) {
              wx.reLaunch({
                url: '../loginFirst/loginFirst',
              })
              return
            }
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
    let _self = this
    if (!app.globalData.enterpriseInfo || app.globalData.enterpriseInfo.length === 0) {
      api.applyFrom({ casTicket: wx.getStorageSync('ticket') }).then(res => {
        if (res.data === false) {//未申请过企业
          wx.navigateTo({
            url: '../add-ent/add-ent?from=0'
          })
        } else {
          wx.navigateTo({ url: `../cqlogin/cqlogin?url=${_self.encode(app.globalData.baseurl + app.globalData.service)}&backUrl=/pages/app/app&token=${wx.getStorageSync('accessToken')}&ticket=${wx.getStorageSync('ticket')}` })
        }
      })
    } else {
      wx.navigateTo({ url: `../cqlogin/cqlogin?url=${_self.encode(app.globalData.baseurl + app.globalData.service)}&backUrl=/pages/app/app&token=${wx.getStorageSync('accessToken')}&ticket=${wx.getStorageSync('ticket')}` })
    }
  },
  goCreatEnt() {
    //先验证是否已经录入商机
    api.exitBussiness({ casTicket: wx.getStorageSync('ticket') }).then(res => {
      if (res.data === true) {
        wx.navigateTo({
          url: '../creat-ent/creat-ent'
        })
      } else {
        this.goisExperience()
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
  setUuid() {
    //随机32位uuid
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23];
    var uuid = s.join("");
    return uuid;
  },

  goisExperience() {
    let _self = this
    let user = { username: '13043407621', password: '1234567' }
    api.LoginbyCode(user).then(res => {
      let { data } = res;
      wx.setStorageSync("accessToken", data.token);
      wx.setStorageSync("ticket", data.ticket);
      wx.setStorageSync("isExperience", true);
      if (res.data.service) { app.globalData.service = res.data.service }
      if (res.data.callBackUrlType) { app.globalData.callBackUrlType = res.data.callBackUrlType }
      if (res.data.msgStatus) { app.globalData.msgStatus = res.data.msgStatus } //微信公众号开关
      /*中转页  
      callBackUrlType:1 公共 
      callBackUrlType:2 第三方
      */
      _self.getUserInfo()
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