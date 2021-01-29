# HTTP相关

## rest API 法则

- [怎样用通俗的语言解释REST](https://www.zhihu.com/question/28557115)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

> REST 的定义

- REpresentational State Transfer
  - 之所以晦涩是因为前面主语被去掉了，全称是 Resource Representational State Transfer
  - Resource：资源，即数据（前面说过网络的核心）。比如 newsfeed，friends等；
  - Representational：某种表现形式，比如用JSON，XML，JPEG等；
  - State Transfer：状态变化。通过HTTP动词实现。
- 说人话的就是：
  - 看Url就知道要什么
  - 看http method就知道干什么
  - 看http status code就知道结果如何

> REST 增删改查方案

- 与数据库的增删改查 相对应。
- GET 获取资源（查找）
- POST 添加一个资源（增加）
- PUT/PATCH 修改一个资源（修改）
  - PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）
  - PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）
- DELETE 删除一个资源（删除）

- REST 是面向资源的，这个概念非常重要，而资源是通过 URI 进行暴露。 - 左边是错误的设计，右边是正确的。
  - GET /rest/api/getDogs --> GET /rest/api/dogs 获取所有小狗狗 
  - GET /rest/api/addDogs --> POST /rest/api/dogs 添加一个小狗狗 
  - GET /rest/api/editDogs/:dog_id --> PUT /rest/api/dogs/:dog_id 修改一个小狗狗
  - GET /rest/api/deleteDogs/:dog_id --> DELETE /rest/api/dogs/:dog_id 删除一个小狗狗
- REST很好地利用了HTTP本身就有的一些特征，如HTTP动词、HTTP状态码、HTTP报头等等

## get请求和post请求的区别

- GET参数通过URL传递，POST放在Request body中。
- GET产生一个TCP数据包;POST产生两个TCP数据包。
- 对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200(返回数据);而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok(返回数据)。

## [http状态码及相关](https://www.cnblogs.com/starof/p/5035119.html)

> 100:Continue继续，在发送post请求之后，已经发送了http header之后，服务器将返回此信息表示确认，之后发送具体参数信息

> 200:服务器成功处理了请求，并返回了请求的网页
> 204:服务器成功处理了请求，但没有返回任何内容。

> 301:请求的网页已永久移动到新位置
> 302:服务器从不同位置的网页响应请求
> 304:请求的网页未修改过

> 400:服务器不理解请求的语法（错误请求）
> 404:服务器找不到请求的网页

> 500:服务器遇到错误，无法完成请求
> 505:服务器不支持请求中所用到的协议版本

## [缓存头Cache-Control的含义和使用](https://blog.csdn.net/grapelove01/article/details/82810238)

> [缓存控制与缓存校验](https://blog.csdn.net/u012375924/article/details/82806617)

- 在http中，控制缓存开关的字段有两个: Pragma 和 Cache-Control
- 如果一个报文中同时出现Pragma和Cache-Control时，以Pragma为准。同时出现Cache-Control和Expires时，以Cache-Control为准。即优先级从高到低是 Pragma -> Cache-Control -> Expires

> 在Chche-control中，一些常用的参数

- 可缓存性 public / private / no-cache
- 过期时间 max-age=200
- 重新验证 must-revalidate
- 不可以存储缓存 no-store
- 不允许进行格式转换 no-transform