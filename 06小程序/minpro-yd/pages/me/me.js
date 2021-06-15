// pages/me/me.js
const app = getApp();
const api = require("../../utils/api.js")
const utils = require("../../utils/util.js")
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    switchChecked: false,
    pickIndexArr: '',
    enterpriseList: [],
    currentEnt: {},
    viewShowed: false, //显示结果view的状态
    inputVal: "", // 搜索框值
    inputId: "",// 搜索框id
    isExperience: false,
    msgStatus: '0', //公众号消息接收开关
    qcCode: '',  //小程序码
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
  goAddEnt() {
    if (this.data.isExperience) return
    wx.navigateTo({
      url: '../add-ent/add-ent?from=1'
    })
  },
  goCreatEnt() {
    if (this.data.isExperience) return
    wx.navigateTo({
      url: '../creat-ent/creat-ent'
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
  bindPickerChange(e) {
    if (this.data.isExperience) return
    let _self = this;
    var index = e.detail.value
    wx.request({
      url: app.globalData.baseurl + app.globalData.platformId + 'kapi/app/base/switchDefaultEnterprise',
      data: {
        enterpriseId: _self.data.enterpriseList[index].enterpriseId,
        traceId: _self.setUuid()
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', 'api': 'true', 'accessToken': wx.getStorageSync('accessToken')
      },
      success: function (res) {
        if (res.data.success) {
          _self.setData({
            currentEnt: _self.data.enterpriseList[index],
          })
          e.detail.value = 0
          _self.getEnterprise()
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
  getEnterprise() {
    let _self = this
    let load = api.getEnterprise;
    load({
      userNumber: app.globalData.userInfo.userNumber,
      ticket: wx.getStorageSync('ticket')
    }).then(res => {
      app.globalData.enterpriseInfo = res.data
      app.globalData.enterpriseInfo.map((item, index) => {
        if (item.isCurrent) {
          app.globalData.currentEnt = item
          wx.setStorageSync('vtenant', item.vtenant);
          wx.setStorageSync('fromVtenant', item.fromVtenant);
        }
      })
      _self.setData({
        enterpriseList: app.globalData.enterpriseInfo,
      })
    })
    if (wx.getStorageSync('isExperience')) {
      wx.navigateTo({ url: `../cqlogin/cqlogin?url=${_self.encode(app.globalData.baseurl + app.globalData.service)}&backUrl=/pages/wxmininative/native&token=${wx.getStorageSync('accessToken')}&ticket=${wx.getStorageSync('ticket')}` })
    }
  },
  encode(data) {
    return encodeURIComponent(data)
  },
  //开启公众号消息推送 关闭公众号消息推送
  bindGetUserInfo(e) {
    let _self = this
    let { encryptedData, iv, cloudID } = e.detail;
    wx.login({
      success: res => {
        if (res.code) {
          const data = {
            code: res.code,
            userId: app.globalData.userInfo.id,
            encryptedData: encryptedData,
            iv: iv,
            cloudID: cloudID,
            msgStatus: _self.data.msgStatus === '0' ? '1' : '0'
          }
          api.messageSwitch(data).then(result => {
            if (result.data === true) {
              app.globalData.msgStatus = _self.data.msgStatus === '0' ? '1' : '0'
              this.setData({
                msgStatus: _self.data.msgStatus === '0' ? '1' : '0'
              })
            }
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2  //这个数字是当前页面在tabBar中list数组的索引
      })
    }

    this.setData({
      enterpriseList: app.globalData.enterpriseInfo,
      currentEnt: app.globalData.currentEnt,
      isExperience: wx.getStorageSync('isExperience'),
      msgStatus: app.globalData.msgStatus
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
  loginExperience: function () {
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
  loginout: function () {
    wx.setStorageSync('ticket', "")
    wx.setStorageSync('accessToken', "")
    wx.setStorageSync('vtenant', "")
    wx.setStorageSync('fromVtenant', "")
    wx.setStorageSync('isExperience', false)
    app.globalData.userInfo = {}
    app.globalData.enterpriseInfo = {}
    app.globalData.currentEnt = ''
    wx.reLaunch({
      url: '../wxLogin/wxLogin',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  createQrcode: function () {
    let _this = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        grant_type: 'client_credential',
        appid: 'wx81e0317640582953',
        secret: 'f9bc1ab7f677fc1ea46e45745ce59156'
      },
      method: 'GET',
      success: function (res) {
        let ACCESS_TOKEN = res.data.access_token
        const entId = app.globalData.currentEnt.enterpriseId
        const platformId = wx.getStorageSync('fromVtenant');
        wx.request({
          url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${ACCESS_TOKEN}`,
          data: {
            scene: `${entId}&${platformId}`
          },
          method: 'POST',
          success: function (resImg) {
            _this.setData({
              qcCode: resImg.data
            })
            Dialog.alert({
              message: '弹窗内容',
            }).then(() => {
              // on close
            });
          }
        })
      }
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