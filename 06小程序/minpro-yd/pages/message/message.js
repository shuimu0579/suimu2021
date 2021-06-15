const app = getApp();
const api = require("../../utils/api.js")
import log from '../../utils/log';
Page({
  //公众号推送进入
  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },
  onLoad: function (options) {
    var _self = this;
    if (options && options.userId && options.enterpriseId && options.vtenant) {
      wx.setStorageSync('gzhUserId', options.userId);
      wx.setStorageSync('gzhEnterpriseId', options.enterpriseId);
      wx.setStorageSync('gzhVtenant', options.vtenant);
      log.info("options:", options)
      log.info("gzhUserId:", wx.getStorageSync('gzhUserId'))
      log.info("gzhVtenant:", wx.getStorageSync('gzhVtenant'))

      wx.login({
        success: res => {
          if (res.code) {
            api.LoginbyCode({ code: res.code, userId: wx.getStorageSync('gzhUserId'), vtenant: wx.getStorageSync('gzhVtenant') }).then(res => {
              if (res.errorCode === 10008) {
                wx.navigateTo({
                  url: '../qrcodelogin/qrcodelogin?from=message'
                })
              }
              wx.setStorageSync('ticket', res.data.ticket)
              wx.setStorageSync('vtenant', res.data.vtenant)
              wx.setStorageSync('accessToken', res.data.token)
              if (res.data.service) { app.globalData.service = res.data.service }
              if (res.data.callBackUrlType) { app.globalData.callBackUrlType = res.data.callBackUrlType }
              if (res.data.msgStatus) { app.globalData.msgStatus = res.data.msgStatus } //微信公众号开关

              let url = (`/pages/message/message?cqUrl=${(options.url)}`)
              wx.setStorageSync('cqUrl', decodeURIComponent(options.url));
              _self.setData({
                goUrl: `${decodeURIComponent(options.backUrl)}?vtenant=${options.vtenant}&backUrl=${url}&userId=${options.userId}&enterpriseId=${options.enterpriseId}&token=${wx.getStorageSync('accessToken')}&ticket=${wx.getStorageSync('ticket')}`,
              })
              // console.log(_self.data.enterpriseId, _self.data.vtenant, _self.data.userId);
              // console.log(this.data.goUrl);
              _self.getUserInfo()
            })
          }
        }
      })
    }
    if (options && options.cqUrl) {
      _self.setData({
        url: wx.getStorageSync('cqUrl')
      });
    }
  },
  getUserInfo() {
    let _self = this
    let load = api.getUserInfo;
    load({
      vtenant: wx.getStorageSync('vtenant'),
      ticket: wx.getStorageSync('ticket')
    }).then(res => {
      app.globalData.userInfo = res.data
      _self.getEnterprise()
    })
  },
  getEnterprise() {
    let _self = this
    let load = api.getEnterprise;
    load({
      userNumber: app.globalData.userInfo.userNumber,
      ticket: wx.getStorageSync('ticket')
    }).then(res => {
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
      _self.switchEnt()
    })
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
  switchEnt() {
    let _self = this;
    wx.request({
      url: app.globalData.baseurl + app.globalData.platformId + 'kapi/app/base/switchDefaultEnterprise',
      data: {
        enterpriseId: wx.getStorageSync('gzhEnterpriseId'),
        traceId: _self.setUuid()
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', 'api': 'true', 'accessToken': wx.getStorageSync('accessToken')
      },
      success: function (res) {
        if (res.data.success) {
          _self.setData({
            url: _self.data.goUrl
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000
          })
        }
      }
    })
  },
})