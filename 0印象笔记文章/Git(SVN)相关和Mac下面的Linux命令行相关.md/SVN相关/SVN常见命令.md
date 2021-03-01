# SVN

> [TortoiseSVN 打分支、合并分支、切换分支](https://blog.csdn.net/justry_deng/article/details/82259470)

> [SVN 基本使用（这篇写的很详细）](https://www.jianshu.com/p/242ebd7253bc)

## SVN 在 vscode 中提交流程

> 当新建了一个 branch 的时候，当有文件新增的时候，此时我们应该

- 点击左侧面板的+号，就能够把 unversioned 的文件提交添加到本地版本控制 将项目所有文件添加到本地版本控制
- 在终端（TERMINAL）中输入 svn commit -m 'XXX' 提交本地项目到远程服务器

## SVN Merge 的过程(这个很容易出错

> [SVN Merge 这篇也确实写的不错](https://blog.csdn.net/wenwen111111/article/details/54924498)

> 注意的第一点：

- 注意两个分支之间，一定是要平行的关系，比如 branch01: AA/BB/CC/project; branch02: AA/BB/CC/project-bugfix1223。
- 而不是 branch01: AA/BB/CC/project; branch02: AA/BB/CC/project/bugfix1223

> 注意的第二点：

- 注意 from 是修改前的 branch（原始版本）， to 是修改后的 branch（修改后的版本），From 原始版本需要将代码与 To 修改后的版本同步。

## SVN 常见命令

> [创建/切换/合并/删除](https://blog.csdn.net/mxdzchallpp/article/details/73224862)
> 创建分支

- 右击已经存在的 SVN 项目->branch/tag,弹出框的 to path 输入新的分支名称,建议/branch/xxx,点击 OK 就创建出 xxx 分支.(建议创建前先 svn update)

> 切换分支

- 右击已经存在的 SVN 项目->switch,弹出框的 to path 输入分支名称,上面新建了/branch/xxx 分支,如果想要切换/branch/xxx 分支,则输入/branch/xxx 点击 OK.

> 合并分支

- 右击已经存在的 SVN 项目->merge->merge a range of revisions->URL to merge from 选择需要合并的代码分支,specific range 输入框选择 show log 选择需要合并的版本号区间,然后一路 next 完成合并,如果有冲突解决完代码冲突,需要 svn commit 才能完成合并.

> 删除分支

- 右击已经存在的 SVN 项目->repo browser,弹出框的左边选择需要删除的分支右击->delete
- 一定不要手动删除文件

(1) svn remove filename 或者 svn delete filename 从本地版本控制以及对应文件删除

(2) svn commit -m "注释"  : 提交本地操作到服务器, 使服务器也删除对应的文件

> svn status

查看当前工作空间内, 所有 有变化的文件 的状态

如果执行此命令什么都没输出, 代表本地没有东西要提交

> svn log

查看当前版本的操作日志(什么人, 什么时间, 做了什么操作)

## svn 命令行方式拉取远程仓库代码

- svn checkout url path
- 首次登录会要求输入远程仓库账号和尼玛

```text
url : 服务器地址
path: 要拷贝到电脑的哪个目录下
```
