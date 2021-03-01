# 第十三周总结

## Proxy 与 双向数据绑定

## 使用 Range 实现 DOM 精确操作

## 组件基础

> Attribute / Property / state /config 的区别

- Attribute 强调描述性； Property 强调从属关系

| ---        | ---    | 如何设计组件状态 | ---               | ---       |
| ---------- | ------ | ---------------- | ----------------- | --------- |
| Markup set | JS set | JS Change        | User Input Change | ---       |
| NO         | YES    | YES              | ?                 | property  |
| YES        | YES    | YES              | ?                 | attribute |
| NO         | NO     | NO               | YES               | state     |
| NO         | YES    | NO               | NO                | config    |

> 组件的生命周期

> 组件的 Children: 分为 Content 型 Children 和 Template 型 Children

> 组件的 event

> 组件的 methods

### 组件化的逻辑抽象（以 Carousel 为例）

> 一个组件中需要考虑的方面

- Carousel

  - state
    - activeIndex
  - property
    - loop time imgList color forward
  - attribute
    - startIndex loop time imgList color forward
  - children
    - 子组件的 append remove add
  - event
    - change click hover swipe resize dbclick
  - method
    - next() prev() goto() play() stop()
  - config
    - mode "useRAF" "useTimeout"
