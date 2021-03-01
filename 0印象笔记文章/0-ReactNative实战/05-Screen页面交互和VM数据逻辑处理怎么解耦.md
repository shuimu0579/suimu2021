# Screen负责数据交互， VM负责数据逻辑处理。 怎么能让他们干净的分离

## Screen 和 VM 各司其职

- 那么现在怎么能将Screen 和 VM 剥离干净呢？  
  - 因为 scrollToIndex() 属于UI交互操作，不应该在 BVM.js 里面， 所以应该在AScreen.js里面；
  - 而scrollToIndex()的顺利执行，又需要等到BVM.js 中获取到this.NNN的数据。所以就需要数据在AScreen.js 和 BVM.js 之间的传递。
- 有一个好的方法就是充分利用callback回调

```js
//AScreen.js
componentDidMount () {
  this.MMM.componentDidMount(this)
  this.MMM.HHH(() => {
  // 产品列表 和 使用加息券列表 加载完成后自动滑动
    this.scrollTimer = setTimeout(() => {
      this.BB.scrollToIndex({ viewPosition: 0.5, index: rateListIndex })
    }, 600)
  })
}

//BVM.js
@action
HHH (callback) {
  this.JJJ(this.ccy).then((response) => {
    if (response.value && response.value !== undefined) {
          const { value } = response
        this.NNN = this.LLL(value)
       // do something with a lot of code
        callback()
      } else {
      }
    }
  ).catch(error => {
  })
}
```
