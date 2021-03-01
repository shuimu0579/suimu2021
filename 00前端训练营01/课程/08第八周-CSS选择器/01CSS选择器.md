# CSS 选择器

## 复合选择器和复杂选择器

> 复合选择器

- <简单选择器><简单选择器><简单选择器>
- \*或者 div 必须写在最前面
  > 复杂选择器(由复合选择器组成)
- <复合选择器> space <复合选择器>
- <复合选择器> ">" <复合选择器>
- <复合选择器> "~" <复合选择器>
- <复合选择器> "+" <复合选择器>
- <复合选择器> "||" <复合选择器>

```js
//选择器的优先级 练习
div#a.b .c[id=x]    [0,1,3,1]
#a:not(#b) [0,2,0,0]   :not这个伪类是不参与优先级计算的
*.a  [0,0,1,0] *也是不参与优先级计算的
div.a  [0]
```

> 复杂选择器

## 伪类和伪元素

> [伪类](https://www.html.cn/qa/css3/16548.html)

- 动态伪类 :hover :link :active :visited
- 结构伪类 :first-child :last-child :nth-child(n) :nth-last-child(n)
- 元素状态伪类 :checked :enabled :disabled
- 语言伪类 :lang(language)
- 逻辑型伪类 :not(type="submit") :where :has
- 目标伪类 :target

> 伪元素

- ::before ::after ::first-line ::first-letter
