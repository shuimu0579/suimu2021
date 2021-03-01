# flatList实战

> 在flatList中经常被用来作为列表页的展示。其中有一个问题，列表页需要自动移动到某一个特定的item,这个可以怎么处理？
> 疑难点分析：

- 列表页自动移动到某一处，是在什么时机下进行的呢？
  -1. 必须要在此flatList的真实DOM形成的时候，也就是说在componentDidMount的时候。
  -2. 必须要将scrollToIndex()回调函数放在setTimeout延时器里面，不然真实的DOM没有形成的话，就会出现crash
- 在某些安卓机器上，哪怕设置了上面的两条，还是会出现crash
  - 此时可以在flatList组件里面加上onScrollToIndexFailed={() => {}}, 也就是错误出现错误时候的回调。
  - [这样的话，哪怕出现了错误，也不会出现严重的crash](https://stackoverflow.com/questions/54129743/crash-when-doing-scrolltolocation-on-sectionlist)

```js
// Screen中FlatList组件  加上onScrollToIndexFailed属性
// componentDidMount 里面调用 方法
<FlatList
  style={styles.container}
  ref={(ref) => { this.aaa = ref }}
  data={data}
  renderItem={this.renderItem}
  refreshing={false}
  key='depositRateList'
  horizontal
  showsHorizontalScrollIndicator={false}
  initialScrollIndex={0}
  onScrollToIndexFailed={() => {}}
/>

componentDidMount () {
  this.aaa && this.demoVM.bbb(this.aaa, index, 700, arr)
}

// 处理逻辑的 demoVM.js
bbb (faltListDOM, index, timer, arr) {
  setTimeout(() => {
    this.currentLayout = Layer.CONTENT
    if (!arr.length) {
      return false
    }
    if (index > -1 && index < arr.length) {
      faltListDOM && faltListDOM.scrollToIndex({ viewPosition: 0.5, index })
    }
  }, timer)
}
```
