# git故障处理方法

- `unable to access 'https://github.com/shuimu0579/suimu2021.git/': OpenSSL SSL_connect: Connection was reset in connection to github.com:443`, 使用编辑本地hosts文件的方法：https://www.cnblogs.com/sunjinggege/p/14430828.html

- git config --global http.proxy http://127.0.0.1:1080
- git config --global https.proxy http://127.0.0.1:1080
- git config --global --unset https.proxy
- git config --global --unset http.proxy