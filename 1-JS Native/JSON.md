### 哪些可以被称作JSON：

> Array:
```javascript
[
  1,2,3,4
]
```
> object:
```javascript
{
  "1": "one"
}
```
key和value必须要 用 双引号，在JSON对象的最后面
<br>在对象里面，其末尾 不要用尾随的 的逗号。

> 文本: <br>注意外面的双引号必须是<b>英文状态</b>下的。
<br>比如 "hello"、"你好"
```javascript
"你好"
```

> Number:
```javascript
0.2
```
> boolean
```javascript
false
```
> null
```javascript
null
```
Tips: 在Json里面不应该 有 注释。

### JSON方法：
> JSON.parse()
<br>parse a string as JSON
<br>比如sessionStorage返回过来的数据就是 一个json 字符串，需要call parse methods.

> JSON.stringify()
<br>return a json string corresponding to the specified value.






