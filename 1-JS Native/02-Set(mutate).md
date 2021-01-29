
### What is Set?

Set objects are collections of values. 
Set objects 是一个值的集合，Set的实例是一个 array-like object.

new Set([iterable]);
> Set 的参数 可以不填写.<br>
> 但是一旦填写就应该是 iterable的，所以 string字符串 是可以作为 Set 参数的。<br>

```javascript
const set1 = new Set('12345');

console.log([...set1]) //Array ["1", "2", "3", "4", "5"]
console.log(set1.has('1'));
// expected output: true

console.log(set1.has('5'));
// expected output: true

console.log(set1.has('6'));
// expected output: false
```

> Set返回的是一个  类数组 对象。
> new Set 返回的 类数组对象 里面，里面的element 都是 unique，所以可以用Set来进行数组去重。
```javascript
// Use to remove duplicate elements from the array 
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]

console.log([...new Set(numbers)]) // [2, 3, 4, 5, 6, 7, 32]
```




