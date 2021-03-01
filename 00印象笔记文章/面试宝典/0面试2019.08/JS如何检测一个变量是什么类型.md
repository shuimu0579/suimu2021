## [JS如何检测一个变量是什么类型](https://blog.csdn.net/weixin_35667203/article/details/86714281)

> typeof 和 instanceof 都是不完全检测
- typeof 适合检测 Number、String、Boolean 类型
- instanceof 适合检测引用对象类型
> Object.prototype.toString.call() 完全检测
```js
const json = {name:“苏”,age:25};
const result = Object.prototype.toString.call(json)
‘[object Object]’ //result
```