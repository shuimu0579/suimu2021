### Object and 原生Map(mutate)   compared

the same
> Map 和 Object 都是 mutatable 的。

the difference

> object的 keys 只能是 String 或者 Symbol, 但是在一个Map里面， keys可以是一个函数，一个对象等等。<br><br>
> Map对象有property Symbol(Symbol.iterator)，可以直接遍历， 但是 Object 却不可以直接遍历。<br><br>
> the keys in Map are ordered while keys to object is not




