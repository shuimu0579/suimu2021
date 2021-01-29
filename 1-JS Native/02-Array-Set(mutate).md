### Array and Set Compare?
> Array实例化之后，返回的是是一个纯数组，<br>
Set 实例化之后，返回的是一个  array-like object(类数组对象)

Set convert to array
```javascript
// converting between Set and Array
mySet2 = new Set([1, 2, 3, 4]);
mySet2.size; // 4
[...mySet2]; // [1, 2, 3, 4]


// convert Set object to an Array object, with Array.from
var myArr = Array.from(mySet); // [1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}]

```