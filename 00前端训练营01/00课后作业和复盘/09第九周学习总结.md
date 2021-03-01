# CSS 动画、渲染和 HTML、DOM

## CSS 动画

### CSS 动画之 transform

```css
transform: translate(50%, 50%);
```

### CSS 动画之 transition

```js
img{
    transition: 1s 1s height ease;
}
// <=> 上面和下面是的相互等价的
img{
    transition-property: height;
    transition-duration: 1s;
    transition-delay: 1s;
    transition-timing-function: ease;
}
```

> transition 的局限

- transition 需要事件触发，所以没法在网页加载时自动发生。

- transition 是一次性的，不能重复发生，除非一再触发。

- transition 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

- 一条 transition 规则，只能定义一个属性的变化，不能涉及多个属性。

### CSS 动画之 animation

- animation 就能解决 上面 transition 的问题

```css
// 在这里定义关键帧
@-webkit-keyframes rainbow {
  0% {
    background: #c00;
  }
  50% {
    background: orange;
  }
  100% {
    background: yellowgreen;
  }
}
@keyframes rainbow {
  0% {
    background: #c00;
  }
  50% {
    background: orange;
  }
  100% {
    background: yellowgreen;
  }
}

// 在这里使用动画, animation中可以传入很多参数，但是必传的是 timer(1s) 和 name(rainbox),
div:hover {
  -webkit-animation: 1s rainbow;
  animation: 1s rainbow;
}
```

## HTML 和 DOM

### HTML

> HTML 合法元素

- Element: <tagname>...</tagname>
- Text:text
- Comment:<!--conments-->
- DocumentType: <!Document html>
- ProcssingInstruction: <?a1?>
- CDATE: <![CDATE[]]>

> 字符引用

- &#161;
- &amp;
- &lt;
- &quot;

### DOM

> DOM 组成部分

- Node

  - Element：元素性节点，跟标签相对应
    - HTMLElement
    - SVGElement
  - Document：文档根节点
  - CharacterData：字符数据
    - Text:文本节点
    - Comment: 注释
    - ProcssingInstruction：处理信息
  - DocumentFragment：文档片段
  - DocumentType：文档类型

- DOM 导航类操作

  - parentNode
  - childNodes
  - firstChild
  - lastChild
  - nextSibiling
  - previousSibling

- DOM 修改操作
  - appendChild
  - insertBefore
  - removeChild
  - replaceChild
- DOM 高级操作
  - compareDocumentPosition 用于比较两个节点中关系的函数
  - contains 检查一个节点是否包含另一个节点的函数
  - isEqualNode 检查两个节点是否完全相同
  - isSameNode 检查两个节点是否是同一个节点
  - cloneNode 复制一个节点，如果传入的参数为 true,就会连同子元素做深拷贝

> DOM Event

- DOM 事件触发机制是捕获与冒泡，先捕获再冒泡
