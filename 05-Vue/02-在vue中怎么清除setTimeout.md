# vue 中清除延时器

## vue 中使用防抖，引出问题 怎么清除 SetTimeout

- 使用场景：
  - 用防抖可以防止用户暴力点击
  - 可以防止动画抖动 eCharts

```js
  methods: {
    // 方法的定义
    debounce1(errorMessage) {
      const _this = this;
      _this.debounce(() => {
        _this.$message.error(errorMessage);
      }, 2000);
    },

    debounce(fn, wait) {
      // this.timer = null  //千万不要加
      console.log("timeout...", this.timer); //一定要用this.timer 而不是timer
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        fn();
      }, wait);
      console.log("timeout1111...", this.timer);
    },

    //在methods 别的方法里面使用
    _this.debounce1(res.data.message, 3000);
  }
```
