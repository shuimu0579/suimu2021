# bowserHistory

> [BrowserRoute服务器配置](https://blog.csdn.net/weixin_30487701/article/details/97124073)

- 在nginx.conf文件里面配置如下代码:

```js
// nginx.conf 文件中配置
server {
    server_name react.thinktxt.com;
    listen 80;

    root /Users/txBoy/WEB-Project/React-Demo/dist;
    index index.html;
    location / {
        try_files $uri /index.html;
      }
}
```

- Nignix方式
- [Ngnix服务器安装及详细配置](https://blog.csdn.net/ixiaoyou/article/details/79161714)