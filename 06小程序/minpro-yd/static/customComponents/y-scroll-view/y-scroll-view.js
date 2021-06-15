// components/xing/x-scroll-view/x-scroll-view.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pullText: {
      type: String,
      value: '下拉可以刷新',
    },
    releaseText: {
      type: String,
      value: '松开立即刷新',
    },
    loadingText: {
      type: String,
      value: '正在刷新数据中',
    },
    finishText: {
      type: String,
      value: '刷新完成',
    },
    loadmoreText: {
      type: String,
      value: '正在加载更多数据',
    },
    nomoreText: {
      type: String,
      value: '已经全部加载完毕',
    },
    pullDownHeight: {
      type: Number,
      value: 60,
    },
    refreshing: {
      type: Boolean,
      value: false,
      observer: '_onRefreshFinished',
    },
    nomore: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    pullDownStatus: 0,
    lastScrollEnd: 0,
    onTop:true,
    touchS: [0, 0],
    touchE: [0, 0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onScroll: function (e) {
      this.triggerEvent('scroll', e.detail);
      const scrollTop = e.detail.scrollTop;
      //判断是否在顶部，如果在顶部可触发下拉刷新
      if (scrollTop <= 10) {
        this.data.onTop=true;
      }  else {
        this.data.onTop = false;
      }
    },
    pulldownrefresh:function(){
      console.log("pulldownrefresh")
    },
    touchStart: function (e) {
      // console.log(e.touches[0].pageX)
      let sx = e.touches[0].pageX
      let sy = e.touches[0].pageY
      this.data.touchS = [sx, sy]
    },
    touchMove: function (e) {
      let start = this.data.touchS
      let sx = e.touches[0].pageX;
      let sy = e.touches[0].pageY;
      if (this.data.onTop) {
        const status = this.data.pullDownStatus;
        if (status === 3 || status == 4) return;
        const height = this.properties.pullDownHeight;
        let targetStatus;
        if (start[1] > sy - 30) {
          targetStatus = 1;
        } else if (start[1] < sy - height) {
          targetStatus = 2;
        }
        if (targetStatus!=undefined && status != targetStatus) {
          this.setData({
            pullDownStatus: targetStatus,
          })
        }
      }
      this.data.touchE = [sx, sy]
    },
    touchEnd: function (e) {
      if(this.data.onTop){
        const status = this.data.pullDownStatus;
        if (status === 3 || status == 4) return;
        if (status === 2) {
          this.setData({
            pullDownStatus: 3,
          })
          this.properties.refreshing = true;
          setTimeout(() => {
            this.triggerEvent('pulldownrefresh');
          }, 500);
        }else{
          this.setData({
            pullDownStatus: 0,
          })
        }
      }
      
    },

    _onRefreshFinished(newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        this.properties.nomore = false;
        this.setData({
          nomore: false,
        })
        this.setData({
          pullDownStatus: 4,
          lastScrollEnd: 0,
        })
        setTimeout(() => {
          this.setData({
            pullDownStatus: 0,
          })
        }, 500);
      }
    },

    _onLoadmore() {
      if (!this.properties.nomore) {
        let query = wx.createSelectorQuery().in(this);
        query.select('.scroll-view').fields({
          size: true,
          scrollOffset: true,
        }, res => {
          if (Math.abs(res.scrollTop - this.data.lastScrollEnd) > res.height) {
            this.setData({
              lastScrollEnd: res.scrollTop,
            })
            this.triggerEvent('loadmore');
          }
        }).exec();
      }
    },
  },
})
