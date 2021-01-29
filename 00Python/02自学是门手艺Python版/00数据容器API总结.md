# string list tuple set API 总结

- 知识就是知识，它没有任何义务去具备幽默生动的属性；
- 手艺就是手艺，它没有任何义务去具备有趣欢乐的属性。

## 字符串(string)的操作符、函数、与 Method

| **标识**           | ‘...’       | “...”          | """..."""      |                 |              |                  |
| ------------------ | ----------- | -------------- | -------------- | --------------- | ------------ | ---------------- |
| **转义符**         | \'          | \"             | \t             | \n              |              |                  |
| **操作**           | +           | \*             | in             | not in          | len()        | s.join()         |
| **提取**           | s[index]    | s[start:]      | s[:stop]       | s[start:stop]   |              |                  |
| **与数字相互转换** | int()       | float()        | str()          |                 |              |                  |
| **码表**           | ord()       | chr()          | s.encode()     |                 |              |                  |
| **大小写转换**     | s.lower()   | s.upper()      | s.capitalize() | s.title()       | s.swapcase() |                  |
| **去除首尾字符**   | s.strip()   | s.lstrip()     | s.rtrip()      |                 |              |                  |
| **拆分字符串**     | s.split()   | s.splitlines() |                |                 |              |                  |
| **排版**           | s.center()  | s.ljust()      | s.rjust()      | s.zfill()       |              |                  |
| **格式化**         | s.format()  | f-string       |                |                 |              |                  |
| **字符串属性**     | s.isalnum() | s.isalpha()    | s.isascii()    | s.isdecimal()   | s.isdigit()  | s.isnumeric()    |
|                    | s.isower()  | s.isupper()    | s.istitle()    | s.isprintable() | s.isspace()  | s.isidentifier() |

## 列表(List)的操作符、函数、与 Method

| **生成**                 | a=[]           | a=[1,2,3]   | [(expression with x) for x in iterable] |                 |     |     |
| ------------------------ | -------------- | ----------- | --------------------------------------- | --------------- | --- | --- |
| **操作**                 | +              | \*          | in                                      | > >= < <= != == |     |     |
| **提取**                 | a[index]       | a[start:]   | a[:stop]                                | a[start:stop]   |     |     |
| **可使用的内建函数**     | len()          | max()       | min()                                   | del()           |     |     |
| **将其他类型转换为列表** | list()         |             |                                         |                 |     |     |
| **排序**                 | a.sort()       | a.reverse() |                                         |                 |     |     |
| **删除**                 | del()          | a.remove()  | a.pop()                                 |                 |     |     |
| **加入**                 | a.insert(i,x ) | a.append()  | a.extend(t)                             |                 |     |     |
| **复制**                 | a.copy()       |             |                                         |                 |     |     |
| **清除**                 | a = []         | a.clear()   |                                         |                 |     |     |

## 元组(Tuple)的操作符、函数、与 Method

> 在完整掌握 list 之后，再理解元组（Tuole）就更容易了，因为他们之间的区别只有两个

- list 是可变有序容器， tuple 是不可变有序容器
- list 用方括号标识[], tuple 用圆括号标识
  - 创建单个元素的元组，无论是否使用圆括号，在那唯一的元素后面一定要补上一个逗号`,`
  - 元组是不可变序列，所以，你没办法从里面删除元素。但是，你可以在末尾追加元素。所以，严格意义上，对元组来讲，“不可变” 的意思是说，“当前已有部分不可变”
  - 初学者总是很好奇 List 和 Tuple 的区别。首先是使用场景，在将来需要更改的时候，创建 List；在将来不需要更改的时候，创建 Tuple。其次，从计算机的角度来看，Tuple 相对于 List 占用更小的内存。等你了解了 Tuple 的标注方式，你就会发现，range() 函数返回的等差数列就是一个 Tuple。`range(6)`就相当于 (0, 1, 2, 3, 4, 5)。

## 集合（set）的操作符、函数、与 Method

> Frozen Set 之于 Set，正如 Tuple 之于 List，前者是不可变容器（Immutable），后者是可变容器（Mutable），无非是为了节省内存使用而设计的类别

| **创建**     | b = set()                    | set("aef")                                         | set(range(10))                                 | set([ 3, 3, 1])                                                 | set( 'b', 'e', 'b', 'a')               | {x for x in "abcef" if x not in 'abc'} |
| ------------ | ---------------------------- | -------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------- | -------------------------------------- | -------------------------------------- |
| **操作**     | 并集(\|) set.union(\*others) | 交集（&） set.intersection(\*others)               | 差集(-)set.difference(\*others)                | 对称差集(^)set.symmetric_difference(other)                      |                                        |                                        |
| **逻辑运算** | set == other ~~ set != other | isdisjoint(other) ~~ issubset(other)，set <= other | set < other ~~ issuperset(other)，set >= other | set > other                                                     |                                        |                                        |
| **更新**     | add(elem) remove(elem)       | discard(elem) pop(elem)                            | clear() set.update(\*others)                   | set.intersection_update(*others) set.difference_update(*others) | set.symmetric_difference_update(other) |                                        |
| **冻结集合** | Frozen Set                   |                                                    |                                                |                                                                 |                                        |                                        |

## 字典（dictionary）的操作符、函数、与 Method

> 字典这个数据类型之所以叫做 Map(映射)

| **字典生成**             | aDict = {}                | bDict = {'a':1, 'b':2, 'c':3}    |                               |                     |                             |     |
| ------------------------ | ------------------------- | -------------------------------- | ----------------------------- | ------------------- | --------------------------- | --- |
| **更新某个元素**         | +phonebook1['joe'] = 5802 |                                  |                               |                     |                             |     |
| **添加元素**             | phonebook1 = {'ann':6575} | phonebook2 = {'john':9876}       | phonebook1.update(phonebook2) |                     |                             |     |
| **删除某个元素**         | phonebook1 = {'ann':6575} | del phonebook1['ann']            |                               |                     |                             |     |
| **逻辑操作符**           | phonebook1.keys()         | 'stan' in phonebook1.keys()      |                               |                     |                             |     |
| **可用来操作的内建函数** | dic = {'ann':6575}        | len(dic) max(dic)                | min(dic) list(dic)            | tuple(dic) set(dic) | sorted(dic, reverse = True) |     |
| **常用 Methods**         | dic = {'ann':6575}        | dic.copy()【深拷贝】 dic.clear() | dic.popitem() dic.pop()       | dic.get()           | dic.setdefault()            |     |

## 迭代各种容器中的元素

| **range()**                | for i in range(3):                              |                                       |                               |     |     |     |
| -------------------------- | ----------------------------------------------- | ------------------------------------- | ----------------------------- | --- | --- | --- |
| **list**                   | for i in [1, 2, 3]:                             |                                       |                               |     |     |     |
| **迭代的同时获取索引**     | for i, c in enumerate(s):                       |                                       |                               |     |     |     |
| **迭代前排序**             | for i, t in enumerate(sorted(t, reverse=True)): |                                       |                               |     |     |     |
| **同时迭代多个容器**       | chars = 'xyz'                                   | nums = range(1, 4)                    | for c, n in zip(chars, nums): |     |     |     |
| **迭代字典中的元素 key**   | dic = {'ann':6575, }                            | for key in phonebook1:                | print(key, phonebook1[key])   |     |     |     |
| **迭代字典中的元素 items** | dic = {'ann':6575, }                            | for key, value in phonebook1.items(): | print(key, value)             |     |     |     |

## 文件处理

| **创建文件**                   | open('/test-file.txt', 'w')                                       |     |     |     |     |     |
| ------------------------------ | ----------------------------------------------------------------- | --- | --- | --- | --- | --- |
| **删除文件**                   | os.remove(f.name)                                                 |     |     |     |     |     |
| **读文件**                     | s = f.read()                                                      |     |     |     |     |     |
| **读文件的某一行**             | s = f.readline().strip() # 返回的是 'first line'，'\n' 被去掉了…… |     |     |     |     |     |
| **读文件并将文件作为列表返回** | s = f.readlines() # 返回的是一个列表，注意，readlines，最后的 's' |     |     |     |     |     |
| **写文件**                     | f.write('first line\nsecond line\nthird line\n')                  |     |     |     |     |     |
| **将列表写入一个文件中**       | f.writelines(a_list)                                              |     |     |     |     |     |
| **with 语句块**                | with open(...) as f: f.write(...)                                 |     |     |     |     |     |

## Python 关键字

| -       | Python  | Keyword    | List    | -          |
| ------- | ------- | ---------- | ------- | ---------- |
| `and`   | `as`    | `assert`   | `async` | `await`    |
| `break` | `class` | `continue` | `def`   | `del`      |
| `elif`  | `else`  | `except`   | `False` | `finally`  |
| `for`   | `from`  | `global`   | `if`    | `import`   |
| `in`    | `is`    | `lambda`   | `None`  | `nonlocal` |
| `not`   | `or`    | `pass`     | `raise` | `return`   |
| `True`  | `try`   | `while`    | `with`  | `yield`    |

## Python 函数中 每个参数的调用顺序

| -                    | 函数参数                           | Order of Arguments  | 调用顺序                          |
| -------------------- | ---------------------------------- | ------------------- | --------------------------------- |
| Positional(位置参数) | Arbitrary Positional(随意位置参数) | Keyword(关键字参数) | Arbitrary Keyword(随意关键字参数) |

## Python 中递归函数 三原则

| 一个有用、有效的递归（满足递归函数三原则）                  |
| ----------------------------------------------------------- |
| 根据定义，递归函数必须在内部调用自己                        |
| 必须设定一个退出条件                                        |
| 递归过程中必须能够逐步达到退出条件（这一条有可能会 达不到） |

## Python 中函数工具

| **迭代器（Iterator）**                                             | **生成器（Generator）**                                         | **装饰器（高阶函数，化整为零，有利于函数的复用）（Decorator）**                                                                 |
| ------------------------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| iter()-->把一个`可迭代对象`转换成`迭代器`                          | yield 与 return 最明显的不同就是：在 yield 之后的语句依然被执行 | 对象也是函数，函数也可以入参。                                                                                                  |
| 迭代器怎么使用呢？用 next()函数                                    | 生成器函数被 next() 调用后，执行到 yield 生成一个值返回         | 装饰器最常用的场景就是用来改变其它函数的行为。                                                                                  |
| 迭代器是一个 new 出来的 Object,所以需要写一个创建迭代器的 Class 类 | 生成器表达式，下面的 even 就是用**生成器**创造的**迭代器**      | 装饰器的执行顺序是 “自下而上” —— 其实是 “由里到外” 更为准确。                                                                   |
| iter()-->把一个`可迭代对象`转换成`迭代器`                          | even = (e for e in range(10) if not e % 2)                      | (\*args, \*\*kwargs) 非常强大，它可以匹配所有函数传进来的所有参数。 \* 和 \*\* 类似于 js 里面的扩展运算符，承担着结构赋值的作用 |

## Python 中操作符的优先级

| **Operator**                                           | **Description**                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| `:=`                                                   | Assignment expression                                                      |
| `lambda`                                               | Lambda expression                                                          |
| `if – else`                                            | Conditional expression                                                     |
| `or`                                                   | Boolean OR                                                                 |
| `and`                                                  | Boolean AND                                                                |
| `not` x                                                | Boolean NOT                                                                |
| in, not in, is, is not, <, <=, >, >=, !=, ==           | Comparisons, including membership tests and identity tests                 |
| `|`                                                    | Bitwise OR                                                                 |
| `^`                                                    | Bitwise XOR                                                                |
| `&`                                                    | Bitwise AND                                                                |
| `<<`, `>>`                                             | Shifts                                                                     |
| `+`, `-`                                               | Addition and subtraction                                                   |
| `*`, `@`,`/`,`//`,`%`                                  | Multiplication, matrix multiplication, division, floor division, remainder |
| `+x`, `-x`,`~x`                                        | Positive, negative, bitwise NOT                                            |
| `**`                                                   | Exponentiation                                                             |
| await x                                                | Await expression                                                           |
| x[index], x[index:index], x(arguments...), x.attribute | Subscription, slicing, call, attribute reference                           |

| (expressions...),[expressions...], {key: value...}, {expressions...} | Binding or parenthesized expression, list display, dictionary display, set display |

## Python 正则表达式的 操作符优先级

| **排列** | **原子与操作符优先级**              | **（从低到高）**                                                      | **备注**                          |
| -------- | ----------------------------------- | --------------------------------------------------------------------- | --------------------------------- |
| 1        | 原子（Atoms）                       | `a` `[^abc]` `\t` `\r` `\n` `\d` `\D` `\s` `\S` `\w` `\W` `.`         | 操作元，即被计算的值， 被称作原子 |
| 2        | 或（Alternation）                   | `a|b|c`                                                               | 或`操作符`                        |
| 3        | 序列和定位（Sequence and Anchor）   | `abc` `$` `^` `\b` `\B`                                               | 原子                              |
| 4        | 数量（Quantifiers）                 | `a*` `a+` `a?` `a{n,m}`                                               | 数量`操作符`                      |
| 5        | 分组、捕获（Grouping or Capturing） | `(...)` `( ?: ...)` `( ?= ...)` `( ?! ...)` `( ?<= ...)` `( ?<! ...)` |                                   |
| 6        | 转义符号（Escaping Symbol）         | `\`                                                                   |

> 原子: 本意原子、集合原子、类别原子、边界原子、组合原子

- 集合原子：`[abc]` `[a-z]` `[^abc]`
- 类别原子：`\d`=`[0-9]` `\D`=`[^0-9]` `\w`=`[a-zA-Z0-9_]` `\W`=`[^a-zA-Z0-9_]` `\s`=`[\f\n\r\t\v]` `\S`=`[^\f\n\r\t\v]` `.`=`[^\r\n]`
- 边界原子：`^` `$` `\b` `\B`
- 组合原子： `(...)`

> 捕获匹配与非捕获匹配

- 捕获并匹配
  - 在 re.sub() 中调用被匹配的值，用的索引方法是 \1、\2…… 以此类推。
- 非匹配捕获
  - (?:...)
  - 非捕获匹配中还有这些（这些预查都不消耗 字符）：(?=pattern) (?!pattern) (?<=pattern) (?<!pattern)
    - 例如 Windows(?!95|98|NT|2000) 能匹配 Windows3.1 中的 Windows，但不能匹配 Windows2000 中的 Windows
