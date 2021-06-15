
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
    inputId: "",// 搜索框id
    catList: [], //搜索渲染推荐数据
    goUrl: '../me/me',
    clearsearch: false,
    timer: null,
    entInfo: {
      name: '',
      id: '',
    },
    applicant: "",
    applyNote: "",
    contactWay: "",
    lastIndex: null,
    firstView: true
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
    // 0:wxlogin进来,1:me进来
    this.setData({
      goUrl: options.from === '0' ? '../app/app' : '../me/me'
    })

  },
  // 键盘抬起事件2
  inputTyping: function (e) {
    var value = e.detail.value
    var that = this;
    that.setData({
      clearsearch: true,
      entInfo: {
        name: '', id: ''
      }
    })
    let load = function () {
      api.searchByName({
        enterpriseName: value,
        userId: app.globalData.userInfo.id,
        vtenant: wx.getStorageSync('fromVtenant') != '' ? wx.getStorageSync('fromVtenant') : 'yundee'
      }).then(res => {
        if (res.data.length > 0) {
          let myEnt = app.globalData.enterpriseInfo;
          let searchEnt = res.data
          let arr = searchEnt.filter(item => !myEnt.some(ele => ele.enterpriseId === item.enterpriseId))
          // searchEnt.map((item, index) => {
          //   myEnt.map($item => {
          //     if (item.enterpriseId == $item.enterpriseId)
          //       searchEnt.splice(index, 1)
          //   })
          // })
          that.setData({
            viewShowed: true,
            catList: arr.splice(0, 10)
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
      entInfo: {
        name: '', id: ''
      },
      catList: []
    })
  },
  // 获取选中推荐列表中的值
  name: function (res) {
    var index = res.currentTarget.dataset.index
    const _this = this
    if (index == this.data.lastIndex) {
      let catListTemp = this.data.catList.map((item, $index) => {
        return { ...item, 'check': false }
      })
      this.setData({
        catList: catListTemp,
        lastIndex: null,
        entInfo: {
          name: '', id: ''
        },
      })
      return
    }
    let catListTemp = this.data.catList.map((item, $index) => {
      return (index === $index) ? { ...item, 'check': true } : { ...item, 'check': false }
    })
    // console.log(catListTemp);
    setTimeout(() => {
      _this.setData({
        entInfo: {
          name: _this.data.catList[index].enterpriseName,
          id: _this.data.catList[index].enterpriseId

        },
        catList: catListTemp,
        lastIndex: index
      })
    }, 0);
  },
  encode(data) {
    return encodeURIComponent(data)
  },
  debounce(fn) {
    let _self = this;
    if (_self.data.timer !== null) {
      clearTimeout(_self.data.timer);
    }
    _self.data.timer = setTimeout(fn, 500);
  },
  goDetail() {
    const _this = this
    if (!this.data.entInfo.id) {
      wx.showToast({
        title: "企业不存在",
        icon: "error",
        duration: 2000
      })
    } else {
      _this.setData({
        firstView: false
      })
    }
  },
  onChange(event) {
    let value = event.detail
    let key = event.target.dataset.value
    this.setData({
      key: value
    })
  },
  addEnt: function () {
    let _self = this
    const { applicant, applyNote, contactWay } = _self.data
    if (!_self.data.entInfo.id || !applicant || !applyNote || !contactWay) {
      wx.showToast({
        title: "企业信息不完整",
        icon: "error",
        duration: 2000
      })
    } else {
      wx.request({
        url: app.globalData.baseurl + app.globalData.platformId + 'kapi/app/icpf/getPortalApi',
        data: {
          enterpriseId: _self.data.entInfo.id,
          method: 'applyAddEnterprise',
          applicant: applicant,
          applyNote: applyNote,
          contactWay: contactWay,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', 'accessToken': wx.getStorageSync('accessToken')
        },
        success: function (res) {
          if (res.data.success) {
            wx.showModal({
              content: '您的申请已经提交给管理员\n审核完成后即可进入应用',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  if (_self.data.goUrl == '../app/app') {
                    wx.navigateTo({ url: `../cqlogin/cqlogin?url=${_self.encode(app.globalData.baseurl + app.globalData.service)}&backUrl=/pages/app/app&token=${wx.getStorageSync('accessToken')}&ticket=${wx.getStorageSync('ticket')}` })
                  } else {
                    wx.switchTab({
                      url: _self.data.goUrl,
                    })
                  }
                }
              }
            })
          } else {
            wx.showModal({
              content: res.data.message,
              showCancel: false,
              success(res) {
                if (res.confirm) {
                }
              }
            })
          }
          _self.setData({
            inputVal: '',
            inputId: '',
          })
        }
      })
    }
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