# 模块化解决方案

- [CommonJS、AMD、CMD和ES6模块化区别](https://www.cnblogs.com/mengfangui/p/9067111.html)

## Commonjs

- CommonJS规范(用于服务器端模块)： NodeJS 和 Webpack
- AMD(Asynchronous Module Definition)（异步模块定义）(推荐依赖前置)
- CMD(推荐依赖就近)

- ES6模块化。采用静态编译

> ES6模块化 和 CommomJS/AMD 的区别

- ES6模块化 采用静态编译，使得编译时就能确定模块的依赖关系；而 CommomJS/AMD 是运行时才能确定这些依赖关系
- CommonJS支持动态导入，也就是require(...),而ES6却不支持
- CommonJS是同步导入，而ES6模块化是异步导入的
- CommonJS是值拷贝（就算导出的值变了，导入的值也不会变化），ES6模块化是引用拷贝（导入导出值都指向同一个内存地址，所以导入值会跟着导出值变化）
