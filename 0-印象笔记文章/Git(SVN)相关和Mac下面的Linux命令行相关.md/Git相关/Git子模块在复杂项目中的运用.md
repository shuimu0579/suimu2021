# 在一个复杂项目中，如何运用子模块开发模式

> [子模块开发模式参考文档]（https://juejin.im/post/5c1c5d305188256a272aa0ec）
- 根目录下有一个 .gitmodules 文件
- 文件夹里面的详细内容

```md
[submodule "react-native"]
	path = react-native
	url = ssh://git.XXX.git

[submodule "App/base_ios"]
	path = App/base_ios
	url = ssh://git.XXX.git
[submodule "flutter"]
	path = flutter
	url = ssh://git.XXX.git
```

- ZA Bank App 就是这么弄的

> 有子模块的情况下， 需要配合 sourceTree 这个可视化的工具，来处理各分支的切换和拉取 最新分支代码
- [下载sourceTree](https://www.sourcetreeapp.com/)
- 登陆sourceTree 的账号 shuimu0579@gmail.com / 你懂的