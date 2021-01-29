# 在RN里面Screen可以怎么双向通讯

> 运用回调的方法 callback

- navigation.navigate('YYY.ggg', {aaa: AAA, callback: (params) => {}}

```js
// A.js  跳转到screen A
ZZZ = () => {
  const { navigation } = this.props
  navigation.navigate('YYY.ggg', {
    ccy: this.demoVM.ccy,
    ccc: (ooo) => {
      this.rateListRef && this.demoVM.mmm(this.flatList, vvv, 700, this.demoVM.arr)
    }
  })
}

// B.js  返回到screen A
hhh = () => {
    if (this.ccc) { this.ccc(ooo) }
    this.props.navigation.pop()
  }
```
