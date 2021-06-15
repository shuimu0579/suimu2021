/* 公共request 方法 */
const app = getApp();
const requestUrl = (
  url,
  params,
  success,
  method = "post"
) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  let server = app.globalData.baseurl;
  let accessToken = wx.getStorageSync("accessToken"),
    that = this;
  if (accessToken != "" && accessToken != null) {
    var header = { 'content-type': 'application/json', 'accessToken': accessToken }
  } else {
    var header = { 'content-type': 'application/json' }
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: server + url,
      method: method,
      data: params,
      header: header,
      success: (res) => {
        wx.hideLoading();
        if ((res.data.data && res.data.errorCode !== 200) || res.statusCode !== 200) {
          switch (res.data.errorCode) {
            case 10001:
              wx.showToast({
                title: '登录凭证过期',
                icon: 'none',
                duration: 1500,
                mask: true
              })
              wx.setStorageSync('ticket', "")
              wx.setStorageSync('vtenant', "")
              wx.setStorageSync('accessToken', "")
              wx.setStorageSync('fromVtenant', "")
              wx.setStorageSync('isExperience', false)
              wx.reLaunch({
                url: '../wxLogin/wxLogin',
                success: function (e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
              break;
            case 10008://未绑定信息用户
              resolve(res.data)
              break;
            // 其他错误，直接抛出错误提示
            default:
              wx.showToast({
                title: res.data.message || '网络错误',
                icon: 'none',
                duration: 1500,
                mask: true
              })
              return
          }
        }
        resolve(res.data)
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data) {
          wx.showToast({
            title: res.data.message || '',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else if (res.errMsg.includes("timeout")) {
          wx.showToast({
            title: '连接超时!',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else {
          wx.showToast({
            title: '连接服务器失败!',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
        reject(res.data)
      }
    })
  })
    .catch((res) => {
      wx.hideLoading()
    })
}
/* 公共showTotast  loading 方法 */
module.exports = {
  requestUrl: requestUrl
}
