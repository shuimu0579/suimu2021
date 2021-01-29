# Nginx 的学习

-[Web 服务 之 Nginx--李骏老师](https://www.bilibili.com/video/BV1B7411d7dY)

- [Nginx 学习——nginx 的下载、安装和启动](https://blog.belonk.com/c/nginx_download_install.html)
- [nginx 实现跨域访问(案例 cookie 实现跨域,)多方案实现](https://blog.csdn.net/tomcatAndOracle/article/details/80590080)

```text
start nginx 启动 nginx
nginx.exe -s reload  重新加载修改后的nginx

记得修改nginx.conf文件  nginx-1.12.2\conf\nginx.conf
如下所示：
```

```json
{
	server：{
		listen            9093;   //代理之后的端口
		server_name       localhost; //代理之后的host
		location  / {
			proxy_pass http://localhost:8080;      //被代理的本地地址
		}
		location /ierp/ {
			proxy_pass http://nextierp/ierp/;
			proxy_connect_timeout    500s;
			proxy_read_timeout       500s;
			proxy_send_timeout       500s;
			proxy_set_header  Host  $host:$server_port;
			proxy_set_header  X-Real-IP  $remote_addr;
			proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
			#proxy_set_header tenantAlias 1002;
			proxy_set_header tenantAlias yundeetest;
			proxy_set_header InternetSite http://172.19.112.207:8080/ierp/;
		}
	}
}

```
