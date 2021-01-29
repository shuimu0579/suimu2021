# Promise 和 Fetch 相关的

## Fetch相关的问题

> [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

- Promise<Response> fetch(input[, init]);
- 参数一：input 定义要获取的资源
  - 一个url
  - 或者一个Request对象

- 参数二：init 一个配置项对象，包括所有对请求的设置

```js
var myImage = document.querySelector('img');

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'image/jpeg');

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request('flowers.jpg');

fetch(myRequest,myInit).then(function(response) {
  ...
})
```

> [Fetch使用中常见问题](https://segmentfault.com/a/1190000008484070)

- fetch默认不携带cookie
  - 若要fetch请求携带cookie信息，只需设置一下credentials选项即可，例如fetch(url, {credentials: 'include'})

- fetch不支持JSONP

```shell
npm install fetch-jsonp --save-dev
```

```js
// 安装好了之后，就像下面这样执行
fetchJsonp('/users.jsonp', {
    timeout: 3000,
    jsonpCallback: 'custom_callback'
  })
  .then(function(response) {
    return response.json()
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

- fetch跨域问题

> Fetch什么时候才算是调用成功

- 需要满足两个条件：promise的状态是resolved(在try里面说明就是resolved的状态) 而且Response.ok为true

```js
try {
  const response = await fetch('flowers.jpg');
  if (!response.ok) { // 判断状态
    throw new Error('Network response was not ok.');
  }
  const myBlob = await response.blob();
  const objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
} catch (error) {
  console.log('There has been a problem with your fetch operation: ', error.message);
}
```

> Fetch里面怎么配置 超时时间timeout

- 运用Promise.race() 方法

```js
// race赛跑，谁先到达执行谁
Promise.race([
    fetch(URL),
    new Promise(function(resolve,reject){
        setTimeout(()=> reject(new Error('request timeout')),2000)
    })])
    .then((data)=>{
        //请求成功
    }).catch(()=>{
        //请求失败
})
```
