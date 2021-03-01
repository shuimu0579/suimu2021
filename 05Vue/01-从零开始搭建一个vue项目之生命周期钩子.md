# 从零开始搭建一个 vue 项目之 生命周期钩子

## Vue 生命周期钩子

> [生命周期钩子官方文档](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90) > [详解 vue 生命周期](https://segmentfault.com/a/1190000011381906#comment-area) > [生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

- 不能使用箭头函数来定义一个生命周期
- 一些常见的生命周期钩子
  - beforeCreated
  - created API 接口的调用
  - beforeMount
  - mounted el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子. **不会承诺**所有组件都被挂载，如果想要所有组件都被挂载，可以使用vm.$nextTick 替换掉 mounted
  - beforeUpdate
  - updated(一般用 computed 或者 watch 更改状态)
  - beforeDestroy 将 setTimeout 清除掉
  - destoryed

```js
//created
created() {
  this.findPlan();
},
findPlan() {
    let _self = this;
    getRequest(getmodellist, {peid: _self.eid}).then(ret => {
        let data = ret.data
        if (200 === data.code) {
            data.data.forEach((item) => {
                const obj = {
                    label: item.mname,
                    value: item.mid,
                    frwtype: item.rwtype
                };
                _self.configForm.planList.push(obj);
            })
        }
    })
},

// mounted
mounted() {
  const _this = this;
  _this.jsPlumb = jsPlumb.getInstance();
  _this.$nextTick(() => { // 当整个视图都渲染完成之后，才开始调用 initJsPlumb
      _this.initJsPlumb();
      _this.flow = new flowData(_this.jsPlumb);
  });
}

// beforeDestroy
beforeDestroy () {
  if (this.Datatimer) {
    clearInterval(this.Datatimer);
  }
}
```
