# window.onbeforeunload 局部页面提示 而不是全局页面提示

- [vue 单页面：当前页面刷新或跳转时提示保存](https://juejin.im/entry/5bebc4b3e51d4575125a39bb)

```js

// BizmodelMgr.vue   src\views\transactionRecordManagement\BizmodelMgr.vue

mounted() {
  // 提醒用户是否离开当前页面 path = '/bizmodel'
  const _self = this;
  window.onbeforeunload = function(e) {
    if (_self.$route.fullPath == "/bizmodel") {// 这里的 _self.$route.fullPath == "/bizmodel" 就是 限定只有在这个页面下才会 弹框提示。而不是全局提示。
      var event = window.event || e;
      event.returnValue = "确定离开当前页面吗？";
    } else {
      window.onbeforeunload = null;
    }
  };
    destroyed() {
  window.onbeforeunload = null;
},


// 如果想要在全局 提示的话，就可以在 index.html 里面设置

<script>
window.onbeforeunload=function(e) {
　　var e = window.event||e;
　　e.returnValue=("确定离开当前页面吗？");
}
</script>
```
