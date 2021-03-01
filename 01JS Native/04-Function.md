### 有哪些 bulit-in object 是 Inheritence from Function

> Array<br>
Boolean<br>
Date<br>
Error<br>
Generator<br>
Map<br>
Number<br>
<b style="font:#159">Object<b><br>
Promise<br>
RegEpx<br>
Set<br>
String<br>
WeakMap<br>
WeakSet<br>

### Function properties

> Function.length


### Function methods

> function.apply(thisArg, [argsArray]) <br>
> function.call(thisArg, arg1, arg2, ...)
<br><br>the call() accept an argument list,
<br>the apply() accepts a single array of arguments.
```javascript
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

> function.bind(thisArg[, arg1[, arg2[, ...]]])<br><br>
这个bind() 创建一个新的绑定函数。<br>
The bind() function creates a new bound function, which is an exotic function object (a term from ECMAScript 2015) that wraps the original function object. Calling the bound function generally results in the execution of its wrapped function.


bind  & apply & call 的联系与区别
> 用bind()指定 this <br>
用Apply & call 借用函数

> bind 返回对应函数，便于稍后调用；<br>apply,call 是立即调用。

















