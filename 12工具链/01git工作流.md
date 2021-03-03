# git 工作流

如果项目在外网，点击外网网址 http://git.kingdee.com/yundee/yundee-web 账号密码就是你的邮箱账号密码(比如账号为 xizhang_wu)。
如果你的项目在内网，点击内网网址 http://rdgit.kingdee.com/yundee/yundee-web 账号和密码 仍然是你的 邮箱账号和密码(比如账号为 xizhang_wu)。
登录进入 gitLab 官网之后，可以下载开始项目了。以下载 web3.0 的项目 yundee-multi-web 为例：
git clone http://rdgit.kingdee.com/yundee/yundee-web/yundee-multi-web.git。输入邮箱账号和密码(比如账号为 xizhang_wu)。

## 开发流程梳理：

我们的分支结构本质上就是一个树型结构 master（不用于发版，作为各个 realease 分支的公共部分）-->各个 realease（yundee 官网 2.0 以及各个地方平台版本的预生产/生产环境的发布）
--> dev（yundee 官网 2.0 以及各个地方平台版本 的 126 等环境）
master-->hotfix,
dev -->feature/fixbug。

项目拉下来之后，git branch –a 可以查看到所以的分支。
其中各个 release 分支 都是基于 master 分支拉取下来的；
feature 分支/fixbug 分支，都是基于 release-yundee-web2.0 拉取的；
hotfix 分支，都是基于 master 分支拉取下来的，master 有更新之后，master 需要同步到各个 release 分支；
1、git branch –a  
2、git checkout –b release-yundee-web2.0 git push  
git push --set-upstream origin release-yundee-web2.0
3、git checkout -b feature-wuxz10.27 git push  
git push --set-upstream origin release-yundee-web2.0
git add . git commit –m ‘’ git push
4、git checkout release-yundee-web2.0 git pull git merge feature-wuxz 10.27
5、fixbug 和 hotfix 参考 feature 分支的，同理。

## 场景一：

怎么开始开发一个新的 feature：
首先我们开发一个新分支 feature 是基于 dev 分支来开发的（比如我要开发 dev-yuyao，就需要基于 dev-yuyao 创建）。
现在我们就需要新建分支，如果是开发新需求，那么就以 feature 打头建立新分支。

## 场景二：

一旦新建了自己的 branch, 那么自己本地有修改，需要提交到远程仓库的时候，可以按照如下步骤：
git pull
git add .
git commit -m 'init cimmit'
git push(需要输入账号和密码的时候，先输入账号和密码)
在场景二中有一个问题，那就是每次 git pull / git push 的时候都要输入密码，这样就会很烦。其实可以通过如下的方来解决：
第一步：git config --global credential.helper store
第二步：git pull 或者输入 git push (这里需要输入用户名和密码，以后就不用了)

## 场景三：

在自己 branch 上完成 feature 开发或者修复好 bug, 那么怎么把自己的修改同步到 release 分支或者 master 分支。
如果开发分支 feature-0911 只有比 dev-yuyao 提前一个 commit 的话，可以使用 cherry-pick 来合并代码。比如当前分支是 feature-0911, 我们可以用 git log 在这个分支上 查看 commitid, 并复制这个 commitid,然后呢？ 然后 git checkout dev-yuyao 切换到 dev-yuyao 分支，在 dev-yuyao 分支里面 git cherry-pick 3e38d6d83da883285d5680d7eae45eb876bfbe92, 最后 git push 提交修改到远程仓库。
如果开发分支 feature-0911 比迭代分支 dev-yuyao 提前多个 commit,那么就可以使用 rebase 来合并代码。当然如果觉得 rebase 太复杂的话,可以使用 git merge。

## 场景四：

新 feature 开发到一半，线上环境突然有了一个紧急 bug，应该怎么处理呢？
首先要保存当前分支 feature-0911 的修改。 git add . , 然后 git stash, 这样修改的部分就被暂存了，git stash list 可以查看被暂存的内容。
然后新建一个分支并切换到新的分支， git checkout -b hotfix-0911, 在 hotfix-0911 分支上开发完之后，切换回 feature-0911 分支， git checkout feature-0911， 然后删除 hotfix-0911 分支, git branch -D hotfix-0911
在新的分支 feature-0911 上, git stash pop 就可以释放掉被暂存的内容，如果暂存区里面有多个被暂存对象的话，那么用 git stash drop XXX 可以删除一些被暂存对象， 比如 git stash drop stash@{1}

## 场景五：

无用的开发分支多的话，包含本地仓库的和远程仓库的，怎么清除？
git branch -a 查看所有的本地和远程分支
git branch -d branchName 删除本地分支
git push origin -d branchName 删除远程分支

## PS:几个工具的介绍

1、git 客户端 sourceTree 软件下载(https://www.sourcetreeapp.com/)，这样使得代码版本管理更加高效。但是在内网是无法使用的，在外网倒是可以使用。在外网使用的时候也需要账号，比如 gmail 邮箱账号等，这样可能需要科学上网。
用 sourceTree 客户端固然很好，用不了也没关系，因此上面的命令行也是很有必要的，理解了上面的命令行，就能够更高效的使用 sourceTree 客户端进行代码管理。
2、vscode 里面的插件 GitLens、 Git History，这两个插件能够追踪代码的修改者、修改时间和代码提交 message，在这里（\\172.17.51.138\public\web）下载 vsix 使用。
3、git 以及客户端 git bush 的下载（\\172.17.51.138\public\web）下载 Git-2.29.1-64-bit
