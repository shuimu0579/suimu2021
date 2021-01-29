# 正则相关的 API

## RegExp.exec() 最重要的

- exec 做词法分析，分析大段的文本

## str.match(regexp) regexp 正则部分 不要加标志位 g

-

```js
'abc'.match(/a(b)c/)
// ["abc", "b", index: 0, input: "abc", groups: undefined]
'abc'.match(/a(b)c/g)
// ["abc"]
```

## str.replace(/a(b)c/, function)

```js
str.replace(/a(b)c/, function (str, \$1) {
  console.log(str, $1)
})
```
