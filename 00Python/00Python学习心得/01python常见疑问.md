# Python 常见疑问

> VSCode 运行代码的规则

- 运行方法：
- 全选代码，然后 SHIFT+ENTER。
- CTRL+~ 调出终端，输入 python test.py 回车运行文件.

> 数字和字符串之间的转换

```py
a = "3.1415926"

# 把 a 转换为 浮点数int
x = float(a)
print( "{}转换为 浮点数：{}".format(a, x) )  # 3.1415926转换为 浮点数：3.1415926

# 把 a 转换为整数
y = int(float(a))
print( "{}转换为 浮点数：{}".format(a, y) )  # 3.1415926转换为 浮点数：3

# 把 a 转换为整数，再转换为浮点数
z = float(int(float(a)))
print( "{}转换为 浮点数：{}".format(a, z) )  # 3.1415926转换为 浮点数：3.0

# 把 a 转换为仅有两个小数位的字符串
i =("%.2f" % float(a))
print( "{}转换为 浮点数：{}".format(a, i) )  # 3.1415926转换为 浮点数：3.14
```

> 判断一个方法是不是可调用的

```py
a = callable(float)
print(a)
```

> 一个整数，它加上 100 后是一个完全平方数，再加上 168 又是一个完全平方数，请问符合条件的整数有多少个？请打印出符合条件的整数。

```py
for i in range(100**100):
    if(int(str(( i+100)**0.5).split('.')[1]) == 0 and int(str(( i+168)**0.5).split('.')[1]) == 0):
        print(i)      # 156
```
