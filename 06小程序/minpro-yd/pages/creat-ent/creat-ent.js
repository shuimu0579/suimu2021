
const app = getApp();
const api = require("../../utils/api.js")
const utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewShowed: false, //显示结果view的状态
    inputVal: "", // 搜索框值
    catList: [], //搜索渲染推荐数据
    timer: null,
    entInfo: '',
    lastIndex: null
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
  },

  // 键盘抬起事件2
  inputTyping: function (e) {
    var value = e.detail.value
    var that = this;
    that.setData({
      inputVal: value,
      clearsearch: true,
    });
    let load = function () {
      that.data.entInfo = ''
      api.SearchEntByName({ name: value }).then(res => {
        if (res.data.length > 0) {
          that.setData({
            viewShowed: true,
            catList: res.data.splice(0, 10)
          });
        } else {
          that.setData({
            catList: []
          });
        }
      })
    }
    if (value != '' && e.detail.cursor) {
      //e.detail.cursor表示input值当前焦点所在的位置
      that.debounce(load)
    } else if (value == '') {
      that.setData({
        catList: []
      });
    }
  },
  inputfocus: function (e) {
    this.setData({
      clearsearch: true,
    })
  },
  inputblur: function (e) {
    this.setData({
      clearsearch: false,//删除按钮显示隐藏
    })
  },
  // 清空筛选
  clearsearch: function (e) {
    this.setData({
      inputVal: '',
      clearsearch: false,
      entInfo: '',
      catList: []
    })
  },
  debounce(fn) {
    let _self = this;
    if (_self.data.timer !== null) {
      clearTimeout(_self.data.timer);
    }
    _self.data.timer = setTimeout(fn, 1000);
  },
  // 获取选中推荐列表中的值
  name: function (res) {
    var index = res.currentTarget.dataset.index
    if (index == this.data.lastIndex) {
      let catListTemp = this.data.catList.map((item, $index) => {
        return { ...item, 'check': false }
      })
      this.setData({
        catList: catListTemp,
        lastIndex: null,
        entInfo: ''
      })
      return
    }
    let catListTemp = this.data.catList.map((item, $index) => {
      return (index === $index) ? { ...item, 'check': true } : { ...item, 'check': false }
    })
    this.setData({
      entInfo: this.data.catList[index].name,
      catList: catListTemp,
      lastIndex: index
    }, res => {
      console.log("成功", this.data.entInfo);
    })
  },
  addEnt: function () {
    let _self = this
    let value = this.data.entInfo != '' ? this.data.entInfo : this.data.inputVal
    if (!_self.data.inputVal) {
      wx.showToast({
        title: "请输入您的企业",
        icon: "error",
        duration: 2000
      })
    } else {
      let data = {
        casTicket: wx.getStorageSync('ticket'),
        enterpriseName: value,
        userphone: app.globalData.userInfo.phone,
      }
      api.bussiness(data).then(res => {
        wx.showToast({
          title: '成功',
          icon: "success",
          duration: 2000
        })
        _self.setData({
          inputVal: '',
        })
      })

      _self.goisExperience()
    }
  },
  getEnterprise() {
    let _self = this
    let load = api.getEnterprise;
    load({
      userNumber: app.globalData.userInfo.userNumber,
      ticket: wx.getStorageSync('ticket')
    }).then(res => {
      app.globalData.enterpriseInfo = res.data
      if (app.globalData.enterpriseInfo) {
        app.globalData.enterpriseInfo.map((item, index) => {
          if (item.isCurrent) {
            app.globalData.currentEnt = item
            wx.setStorageSync('vtenant', item.vtenant);
            wx.setStorageSync('fromVtenant', item.fromVtenant);
            app.globalData.enterpriseInfo.splice(index, 1)
            app.globalData.enterpriseInfo.unshift(item)
          }
        })
        setTimeout(() => {
          // wx.switchTab({
          //   url: '../wxmininative/native',
          // })
          wx.navigateTo({ url: `../cqlogin/cqlogin?url=${_self.encode(app.globalData.baseurl + app.globalData.service)}&backUrl=/pages/wxmininative/native&token=${wx.getStorageSync('accessToken')}&ticket=${wx.getStorageSync('ticket')}` })
        }, 1000);
      }
    })
  },
  encode(data) {
    return encodeURIComponent(data)
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
  }
  ,
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
