# git 仓库创建和代码推送

## 怎么将本地的代码 推送到 git 远程仓库

- **开始的开始** 如果 这个项目原来 git init 过的话，
  - 要么删除根目录下的隐藏文件.git
  - 要么打开.git 目录下的 config 文件,将 [remote "origin"] 下的 url 替换过来

```text
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = https://github.com/shuimu0579/suimu2020.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

- 在 github 上创建一个新的仓库 **注意：** 不要勾选 Initialize this repository with a README
- git init
- git add README.md
- git commit -m "first commit"
- git remote add origin https://github.com/shuimu0579/suimu2020.git
- git push -u origin master
- git push
