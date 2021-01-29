### React Router

官方文档：
https://reacttraining.com/react-router/web

> 常见的router 的方式

- 他们都是定义在 react-router-dom 里面
- 在react-router 里面包含了 三种重要的 组件：详见 06React Router 例子<br>
\<Router\>组件<br>
\<Route\>(配合 \<Switch\>)组件<br>
\<Link\>(用作导航)组件<br>

他们三者的区别就是<br>
BrowserRouter 是 最常用的 一种路由<br>
HashRouter 会在跳转的地址前面 加上# ，并且 HashRouter 会兼容低版本的路由器<br>
MemoryRouter 一般用于服务器端渲染，路由的状态值储存在内存里面的，不是反映在url上，所以在浏览器地址栏里面，是不能看到路由变化的

```javascript
import { HashRouter as Router, Route, Link } from "react-router-dom";
//或者
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//或者
import { MemoryRouter as Router, Route, Link } from "react-router-dom";
```
> React Router API

- <Link> 普通链接，不会触发浏览器更新
- <NavLink> 类似<Link/> 但是会添加当前选中状态
- <Redirect> 重定向当前页面，例如登录判断
- <Route> 路由配置的核心标记，路由匹配时显示对应组件
- <Switch> 只显示第一个匹配的路由

> 路由参数的传递

详见 06React Router 例子

> 嵌套路由的实现

详见 06React Router 例子


### react 实现刷新的三种方法

- 首先肯定是 ajax 局部刷新 
- this.setState({...params})  这里面用到的是 dom-diff 算法，顶多是组件层面的刷新，而不是页面全局刷新
- 通过react-router 路由，通过 url 的切换，做到了页面的整体刷新


### 用 loadable-components 实现 Code Splitting

https://github.com/smooth-code/loadable-components

### 怎么 运用 Scroll Restortion 来 使得 页面 scrollToTop

```javascript
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);  //window 的这个方法
    }
  }

  render() {
    return this.props.children;
  }
}

// make sure to wrap it in withRouter to give it access to the router’s props:
// Then render it at the top of your app, but below Router
export default withRouter(ScrollToTop); 

Then render it at the top of your app, but below Routerfunction App() {
  return (
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  );
}
```


### withRouter API 到底有什么用呢？

```javascript 
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import InputsManager from '../../../react-coi/inputs/InputsManager'
import havingTroubleSigningIn from '../metadata/havingTroubleSingingIn'
import { Col, Row, Form } from 'react-bootstrap'
import withServices from '../../../services/withServices'
import { verifyIdentity } from '../actions/recoveryActions'
import { recovery } from '../../../content/appContent'
const { RECOVERY_HAVING_TROUBLE_SIGNING_IN, RECOVERY_HAVING_TROUBLE_SIGNING_IN_DESC } = recovery

const origins = {
  alerts: [],
  fields: [...havingTroubleSigningIn]
}

class HavingTroubleSigningIn extends InputsManager {
  constructor(props) {
    super(props)
    this.state = { ...origins }
    const { recovery } = withServices('recovery')
    this.recovery = recovery
  }


  componentWillMount() {
    const { verifyIdentity, match } = this.props 
    //在外围包裹高阶组件withRouter, 就是为了 用到 this.props 下面的match history location 等 参数
    // withRouter does not re-render on route transitions unless its parent component re-renders. （也就是 withRouter 侦听到match history location 的变化 也不会触发 render,）

    //withRouter does not subscribe to location changes like React Redux’s connect does for state changes. (也就是说 connect API 侦听到了 state 变化的话，就会引发 re-render)

    //所以你会发现withRouter(connect({...})(HavingTroubleSigningIn)), withRouter 里面还是增加了connect 方法, 让 state 改变时 ，引发重复渲染

    const { tenant } = match.params

    if (tenant) {
      verifyIdentity()
    }
  }

  render() {

    return (
      <Row className="dbl-padding-top dbl-padding-bottom">
        <Col sm={10} smOffset={1}>
          <Form>
            <Row className="dbl-padding-top base-padding-bottom">
              <Col xs={12} className="text-center">
                <h2>{RECOVERY_HAVING_TROUBLE_SIGNING_IN}</h2>
                <p>{RECOVERY_HAVING_TROUBLE_SIGNING_IN_DESC}</p>
              </Col>
            </Row>
            <Row className="text-center">
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                {this.renderAlert()}
              </Col>
            </Row>
            <Row >
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                {this.renderField('userEmail')}
              </Col>
            </Row>
            <Row >
              <Col xs={10} xsOffset={1} md={8} mdOffset={2} className="text-center">
                {this.renderField('submit')}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }

  async submit() {
    this.clearServerError()
    const email = this.getFieldAttribute('userEmail', 'value')

    try {
      const response = await this.recovery.getUserTenant(email)
      const { href } = response.data.links[0]

      const tenant = href.replace(/.+tenants\//ig, '').replace(/\/.+/, '')

      if (tenant) {
        const urls = window.location.href.split('/ui/')
        const newUrl = `${urls[0]}/ui/tenants/${tenant}/${urls[1]}`
        sessionStorage.setItem('userId', email)
        
        window.location = newUrl
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  }
}

export default withRouter(connect(
  null,
  { verifyIdentity }
)(HavingTroubleSigningIn))
```
