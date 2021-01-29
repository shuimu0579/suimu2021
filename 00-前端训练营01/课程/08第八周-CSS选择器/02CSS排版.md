# CSS 排版

## 盒

- CSS 排版和渲染的基本单位是**盒**，而不是**元素**。
- box-sizing： content-box border-box 两种盒模型

## 正常流

## 脱离正常流

- float 属于脱离文档流，但是其他盒子元素内的文本依然会为 float 元素让出位置，围绕在周围，所以不会看到文本相互叠加的情况。
- position: absolute; position: fixed; 这些属于脱离文档流，同时文本会出现相互叠加。
- position: relative 并没有脱离正常的文档流。

## BFC （Block Formatting Context 块格式化上下文）

- **BFC 具有的特性：如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。**

- 正常流中都会产生 BFC， 它仅仅是一个正常流排列的块级的盒子。
- BFC 的 margin 合并（margin 边距折叠）。

  - 当 BFC 块级盒子中 overflow：visible 的时候，会出现竖向 margin 的合并，也就是边距折叠。
  - 所以消除边距折叠的方法就是 overflow:hidden, 就能够解除 margin 的边距折叠。

- flex 是 block level,不是 block container,所以不产生 bfc
  - block 既是 block level，也是 block container， 会产生 bfc

## block-level 和 block-container 的理解

- block-level 表示可以被放入 bfc （也就是说 lex、table、grid、block 都可以被放入 bfc）
- block-container 表示可以容纳 bfc (也就是说 block、inline-block 可以容纳 bfc)
- block-box = block-level + block-container
- block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并

```js
Block-level boxes：flex、table、grid、block
block containers: block、inline-block
block boxes：block
```

- 也就是说 container 里面是正常流就是 BFC
