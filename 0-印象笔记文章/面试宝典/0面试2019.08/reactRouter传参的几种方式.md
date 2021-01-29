# [React router](https://blog.csdn.net/przlovecsdn/article/details/81740791)  路由传参的几种方法

- 通过params
  - html方式 和 js方式

```html
<Link to={ pathname:' /user/2 ',query:{name:jack},state:{value:123},search:'?sort=name',hash:'#the-hash',abc:'def'}  activeClassName='active'>XXXX</Link>
```

```js
this.props.history.push( { pathname:' /user/2 ',query:{name:jack},state:{value:123},search:'?sort=name',hash:'#the-hash',abc:'def'})
```

- 用户怎么接收呢

```md
通过  this.props.match.params.id        就可以接受到传递过来的参数（id）
```

- 通过query (必须由其他页面跳过来，参数才会被传递过来，query传的参数是加密的)
  - html方式 和 js方式

```html
 <Link to={{ pathname:' /user',query:{name:jack},state:{value:123},search:'?sort=name',hash:'#the-hash',abc:'def'}}>
```

```js
 this.props.history.push({ pathname:' /user',query:{name:jack},state:{value:123},search:'?sort=name',hash:'#the-hash',abc:'def'})
```

- 用户怎么接收呢

```md
this.props.location.query.name //jack

              this.props.location.state.value  //123

              this.props.location.search  //?sort=name

              this.props.location.hash  //#the-hash

              this.props.location.abc  //def  (自定义参数)
```
