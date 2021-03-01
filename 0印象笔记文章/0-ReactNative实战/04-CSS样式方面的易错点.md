# CSS的相关问题

> CSS怎么编写

```js
import React, { PureComponent } from 'react'
import {
  StyleSheet
} from 'react-native'

export default class AAA extends PureComponent {
  constructor (props) {
    super(props)
  }
  render () {
    )
  }
}

const styles = StyleSheet.create({
  aaa: {
    maxWidth: 120,
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 17
  }
})
```

> 场景一：在一个flatList里面，如果item里面的字段长度不是确定的，此时可以用maxWidth属性。

- 比如，数据可能是1，可能是1.11，可能是1.1111111。这时候maxWidth就能派上大用处了, maxWidth配合paddingLeft/paddingRight能自适应item的宽度。

```js
AAA: {
  maxWidth: 120,
  color: '#292D4D',
  fontSize: 24,
  lineHeight: 29
}
```
