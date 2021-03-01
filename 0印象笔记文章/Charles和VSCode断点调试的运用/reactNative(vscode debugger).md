> 点开爬虫按钮 - 绿色箭头 - 添加配置 - Attach to packger

![step1](./step1.png)
```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to packager",
      "cwd": "${workspaceFolder}/../react-native",
      "type": "reactnative",
      "request": "attach"
    }
  ]
}
```

 ![step2](./step2.png)

> 再一次点击绿色按钮    然后就出现了下图中的4，此时就可以调试了。

![step3](./step3.png)

## 最重要的是，手机上的Remote JSDebugger  一定要开启
## 还有一点就是， VScode 里面一定要 开启 代码调试。 
## 不然仅仅是 开启Remote JSDebugger，而不点击绿色按钮的话（代码调试没有打开的话），有时候变异都会有问题。