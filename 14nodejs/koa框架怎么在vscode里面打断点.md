# koa 框架怎么在 vscode 里面打断点

## [在 VScode 下调试 Koa](http://www.shanzhonglei.com/?p=1704)

- launch.json 文件

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to node",
      "restart": true,
      "processId": "${command:PickProcess}"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "debug-app",
      "runtimeExecutable": "nodemon",
      "program": "${workspaceRoot}/app.js",
      "restart": true,
      "console": "integratedTerminal",
      "skipFiles": ["${workspaceRoot}/node_modules/**/*.js", "<node_internals>/**/*.js"]
    }
  ]
}
```

- 在浏览器里面，输入 url 发送请求到后端的话(比如浏览器里面输入 http://localhost:3000/goods/goods?page_index=1&page_size=200&category_id=1 )
- 在 vscode 里面打的断点，就可以进入了。这样 vscode 就可以调试 koa 框架编写的 node.js 的代码了。
