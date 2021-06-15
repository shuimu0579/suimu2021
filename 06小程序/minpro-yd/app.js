//app.js G53BZ-PM4YP-4ODDC-V6KJI-5BM77-4QBMU
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     // console.log(res);
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("用户授权了");
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }

    })

  },
  globalData: {
    application: "",
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    apiUri: (function () {
      var appname = wx.getStorageSync("appname")
      if (appname == "icem") {
        return "icemXjApi";
      }
      else {
        return "api";

      }
    })(),
    userInfo: {},
    enterpriseInfo: null,
    currentEnt: '',
    // baseurl: "https://www.yundeeiot.com/iic" // 正式域名需调整http为https的域名
    baseurl: (function () {
      switch (__wxConfig.envVersion) {
        case 'develop': //开发版->91
          return "https://yundeetest.kingdee.com"
        case 'trial': //测试版
          return "https://yiyang.yundeeiot.com"
        case 'release': //生产
          return "https://yundeetest.kingdee.com"
      }
    })(),
    //测试域名
    platformId: (function () {
      switch (__wxConfig.envVersion) {
        case 'develop': //开发版
          return '/yundeetest91/'
        case 'trial': //测试版
          return '/yundeepre/'
        case 'release': //生产
          return '/yundeetest91/'
      }
    })(),
    hostUrl: '',
    hashPath: 'home',
    mpType: '4',
    service: '/mobleLogin',
    callBackUrlType: '1',   //中转页 1: 公共 2: 第三方
    msgStatus: '0' //公众号消息接收 1:开 0:关
  }
})