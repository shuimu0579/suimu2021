# react 组件动态可配置化

-[react 组件动态可配置展示](https://blog.csdn.net/qq_38656496/article/details/90670532)

```text
记项目中遇到的一个小问题吧，有一天产品提出要将首页打造成可自定义配置的页面，通过公司后台来控制页面有哪些模块，这些模块位置、数量都不固定
假设我们默认写一个页面从上到下的顺序为：banner - 页内导航 - 内容 - 底部导航，现在提出需求又后台来配置显示内容，后台可能配置：导航-banner-内容 -banner-底部导航 - xxx 等
```

```js
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { observer, inject } from 'mobx-react'
import First from './moreComponent/First'
import Second from './moreComponent/Second'
import Third from './moreComponent/Third'

@inject('FirstData')
@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      obj: [
        { name: 'First', Component: First },
        { name: 'Second', Component: Second },
        {
          name: 'Third',
          Component: Third,
        },
      ],
      asyncObj: [
        { style: 2, name: 'First' },
        { style: 2, name: 'Third' },
        { style: 2, name: 'Second' },
        {
          style: 2,
          name: 'Third',
        },
        { style: 2, name: 'First' },
      ],
    }
  }

  componentDidMount() {
    this.initComponent()
  }

  initComponent() {
    let asyncObj = this.state.asyncObj
    let obj = this.state.obj
    let data = asyncObj.map((ele, index) => {
      obj.map((secEle, secIndex) => {
        if (ele.name == secEle.name) {
          ele = { ...ele, Component: secEle.Component }
        }
      })
      return React.createElement(ele.Component, { key: `dom_${index}`, userSet: '1' })
    })
    ReactDom.render(data, document.getElementById('index-main'))
  }

  render() {
    // console.log(this.props);
    return (
      <div className="App">
        <div id={'index-main'}></div>
      </div>
    )
  }
}

export default App
```
