# SEO相关的技巧

> meta、 title、 link优化

- [配合vue-meta-info插件](https://zhuanlan.zhihu.com/p/29148760?group_id=890298677627879424)

> [h1-h6标签优化](https://www.xiuzhanwang.com/bcyy/2710.html)

- H1标签的权重要比其他的标签（比如a标签）都要高， 一个页面只能有一个H1标签，H1标签中应该包裹最重要的信息（比如关键字文本信息、官网logo）

- 如果是官网logo的话，一定要在img的alt里面加上关键字 `<img alt="关键字" />`，不然一张光秃秃的图片，是没什么用的

- h2到h6是越来越不重要，所以h3以后就用的很少了

> a标签优化

- a标签

> 首页千万不要重定向

```js
{
    path: "/",
    name: "home",
    redirect: '/home',  //这句不能加上！
    component: () => import("./views/Home.vue"),
},
```

> Header、Footer优化
