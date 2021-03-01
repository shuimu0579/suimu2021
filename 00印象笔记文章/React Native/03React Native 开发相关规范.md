# react native 相关规范

### 运用tsx语法， 
- gamma0.7 比较老，但是是原版的代码，但是代码齐全
- develop 作为开发分支，从develop下拉取代码，而且 base_rn 中的组件也比较新。所以还需要拉取develop分支 来看看相关代码


### 存款相关页面
- C:\Users\xizhang.wu\Desktop\code\VB-Requirement-master-a9ec1b63a2f4449622eaf12091dbbb9d7dd19205\08银行UI改版\002银行UI文档\20190716存入-B2\links

### 下载sourceTree
- 需要先翻墙 http://webproxy.oa.com/proxy_nginx.pac
- 然后注册 sourceTree
- 在sourceTree里面就能够加载这些子程序包

### react native 跨平台
- 代码分支 先从master 分支切换到  gamma0.7， 然后进行下面的步骤。
> iso平台 
- 在根目录下 引入 [react native](ssh://git@159.138.64.19:35000/intl-mobile/react-native.git)
- 在react native目录下 引入 [base_rn](ssh://git@159.138.64.19:35000/intl-mobile/base_rn.git)
- 在app目录下 引入 [za_base](ssh://git@159.138.64.19:35000/intl-mobile/za_base.git)

> android平台
- 在根目录下 引入 [react native](ssh://git@159.138.64.19:35000/intl-mobile/react-native.git)
- 在react native目录下 引入 [base_rn](ssh://git@159.138.64.19:35000/intl-mobile/base_rn.git)
- 在App目录下 引入 [base_ios](ssh://git@159.138.64.19:35000/intl-mobile/base_ios.git)

### 关于分支管理
> 长期保留分支
- master (发布分支，与线上环境对应)
- develop (开发集成分支，用来完成自动化的单元测试、接口测试)

> 短周期分支（短期分支不需要长期保留，请开发负责人定期清理)
- feature/* (开发人员进行开发的分支，使用 git flow feature start xxx 创建)
- release/* (提测分支,使用 git flow release start xxx 创建)
- hotfix/* (线上bug处理分支,使用 git flow hotfix start 创建)

> 权限
- developer 角色 (可以创建和使用短周期分支，长期保留分支中 可向 develop 分支 merge。不可push 到长期保留分支)
