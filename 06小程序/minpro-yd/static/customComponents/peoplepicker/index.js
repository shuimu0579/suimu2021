// static/customComponents/peoplepicker/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showDialog: {
      type:Boolean,
      value:false
    },
    items:{
      type:Array,
      value:[]
    },
    //选中类型 single单选 multi多选
    mode:{
      type:String,
      value:"sigle"
    },
    //默认选中值
    current:{
      type:Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectdata:[],
    isChanage:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    handleClickSure() {
      if (this.data.selectdata.length == 0) {
        wx.showToast({
          title: '请选择人员',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        return;
      }
      this.setData({
        showDialog:false
      })
      let ids;
      let names;
      if (this.properties.mode === "multi"){
        ids = this.data.selectdata.map(function (item) {
          var d = item.split('#');
          return d[0];
        })
        let name = this.data.selectdata.map(function (item) {
          var d = item.split('#');
          return d[1];
        })
        names=name.join(",")
      }else{
        var d = this.data.selectdata.split('#');
        ids=d[0];
        names=d[1];
      }
    
      this.triggerEvent('sure', { id: ids, name: names, isChanage: this.data.isChanage});
    },
    handleClickCancel() {
      this.setData({
        showDialog: false
      })
      this.triggerEvent('cancel');
    },
    loadMore(){
      this.triggerEvent('loadMore');
    },
    selectChange({detail}){
      this.setData({
        selectdata:detail.value,
        isChanage:true
      })
    },
  },
  lifetimes: {
    // 组件生命周期声明对象，将组件的生命周期收归到该字段进行声明，
    //原有声明方式仍旧有效，如同时存在两种声明方式，则lifetimes字段内声明方式优先级最高
    created: function () {
    },
    attached: function () {
      
    },
    ready: function () {
      let that = this;
      if (this.properties.mode === 'multi') {
        if (that.properties.current.length > 0) {
          this.setData({
            selectdata: that.properties.current
          })
        }

      } else {
        if (that.properties.current.length > 0) {
          this.setData({
            selectdata: that.properties.current[0]
          })
        }
      }
    },
    moved: function () {
    },
    detached: function () {
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 

    },
    hide: function () { },
    resize: function () { },
  },
})
