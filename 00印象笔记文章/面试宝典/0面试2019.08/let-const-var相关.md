# var 和 let 的理解

```js

// 分别打印出 6 6 6 6 6 ，每隔一秒打印出一次
for(var i = 1; i<=5; i++){
  setTimeout(() => {
    console.log(i)
  }, i*1000)
}

// 分别打印 1 2 3 4 5 ，每隔一秒打印一次
for(let i = 1; i<=5; i++){
  setTimeout(() => {
    console.log(i)
  }, i*1000)
}
```
