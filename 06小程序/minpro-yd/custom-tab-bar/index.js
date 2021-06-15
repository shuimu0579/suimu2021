Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#5582F3",
    list: [{
      pagePath: "/pages/wxmininative/native",
      text: "首页",
      iconPath: "/static/image/homeIcon.png",
      selectedIconPath: "/static/image/homeIcon_active.png"
    },
    {
      "pagePath": "/pages/app/app",
      "text": "应用",
      "iconPath": "/static/image/appIcon.png",
      "selectedIconPath": "/static/image/appIcon_active.png"
    },
    {
      "pagePath": "/pages/me/me",
      "text": "我的",
      "iconPath": "/static/image/meIcon.png",
      "selectedIconPath": "/static/image/meIcon_active.png"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset

      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }

  }
})