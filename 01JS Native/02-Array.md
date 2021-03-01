### Array.properties

> #### Array.length

> #### Array.prototype
Array.prototype itself is an Array
```javascript
Array.isArray(Array.prototype); // true
```
<br/>
<br/>
<br/>
<br/>

### Array.method()

> #### Array.from(arrayLike[, mapFn[, thisArg]])  
create a new,shallow-copied Array instance from an array-like or iterable object.

> #### Array.isArray()
the method determine whether the passed value is an Array<br/>
<b>instanceof vs isArray--</b><br/>
When checking for Array instance,Array.isArray is preferred over instanceof because it works through iframes.
<br/>
<br/>
<br/>
<br/>
### Array.prototype.method()

> #### 不会改变原数组的方法

> #### Array.prototype.concat()
当array 里面的item 是一种引用类型的时候（比如 数组或者对象），当改变原引用类型的值时，concat之后的新函数，也会改变。
```javascript
const num1 = [[1]];
const num2 = [2, [3]];

const numbers = num1.concat(num2);

console.log(numbers);
// results in [[1], 2, [3]]

// modify the first element of num1
num1[0].push(4);

console.log(numbers);
// results in [[1, 4], 2, [3]]
```

> #### Array.prototype.entries()<br/>返回的是一个新的数组遍历器对象。
> #### Array.prototype.keys()<br/>
> #### Array.prototype.values()<br/>


```javascript
var array1 = ['a', 'b', 'c'];

var iterator1 = array1.entries();
console.log(iterator1)
//expected output : Object {  }
console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```
```javascript
var array1 = ['a', 'b', 'c'];
var iterator = array1.keys(); 
console.log(iterator) // expected output: Object {  }
for (let key of iterator) {
  console.log(key); // expected output: 0 1 2
}
```

> #### Array.prototype.every(callback[, thisArg])<br/>value to use as this when executing callback.
> #### Array.prototype.some(callback[, thisArg])

> #### Array.prototype.fill(value[, start[, end]])<br/>the method fills all the elements of an array from a start index(default zero) to an end index (default array length) with a static value.it returns the modified array.

```javascript

var array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill('nihao', 2, 3));
// expected output: [1, 2, "nihao", 4]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]

//vs   下面的这种操作手法， 其实就可以用上面的fill method 来处理

function replaceIndex(index, arr = [], replacement) {
  try {
    if (index.constructor !== Number) throw TypeError('Required argument must be type numeric.')

    return [
      ...arr.slice(0, index),
      replacement,
      ...arr.slice(index + 1)
    ]
    // return [
    //   ...arr.fill(replacement, index, index+1 )
    // ]

  } catch (error) {
    throw error
  }
}
```
> #### Array.prototype.filter()  <br/> 不改变原数组 <br/>the methods creates a new array with all elements that pass the test implemented by the provided function

> #### Array.prototype.find() <br/> return the value of the first element in the array
> #### Array.prototype.findIndex()<br/>return the index of the first element in the array

```javascript
const inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

const result = inventory.find( fruit => fruit.name === 'cherries' );

console.log(result) // { name: 'cherries', quantity: 5 }
```

> #### Array.prototype.flat([depth])<br/>不改变原数组<br/>create a new array with all sub-array elements concatenated into it recursively up to the specified depth.<br/>将sub-array elements 展开，递归到一定的深度.<br/>默认的深度为1，即是一个二维数组
> #### Array.prototype.flatMap([depth])<br/>maps each element using a mapping function <br/>depth 为 1 ，不能操作depth > 1 的，即二维以上的数组

<b>下面的这几种方法都是alternative（可供替代的选择）</b> 

```javascript
——————————
var arr1 = [1, 2, [3, 4]];
// arr1.flat();

//运用reduce 和 concat 也能达到 arr1.flat()的效果
//to flat single level array
arr2 = arr1.reduce((acc, val) => {
  console.log(acc)
  console.log(val)
  return acc.concat(val)
}, []);

console.log(arr2) // [1, 2, 3, 4]
——————————   
//to enable deep level flatten use recursion with reduce and concat 
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];

function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => {
     console.log(acc)
     console.log(val)
     return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)
                                    }, []);
}
flattenDeep(arr1);// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
——————————    
//non recursive flatten deep using a stack
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
function flatten(input) {
  const stack = [...input];
  const res = [];
  
  while (stack.length) {
    console.log(stack.length)
    console.log(stack)
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
      console.log('Array',next)
      
    } else {
      res.push(next);
      console.log('nonArray',res)
    }
  }
  //reverse to restore input order
  return res.reverse();
}
flatten(arr1) ;// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
—————————— 
```

```javascript
let arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// only one level is flattened
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]
—————————— 
var arr1 = [1, 2, 3, 4];

arr1.flatMap(x => [x * 2]);
// is equivalent to
arr1.reduce((acc, x) => acc.concat([x * 2]), []);
// [2, 4, 6, 8]
```
> #### Array.prototype.includes
> #### Array.prototype.indexOf
> #### Array.prototype.lastIndexOf
> #### Array.prototype.join
> #### Array.prototype.reduce
> #### Array.prototype.reduceRight
> #### Array.prototype.slice
> #### Array.prototype.toLocalestring
> #### Array.prototype.toString
<br/>
<br/>

> #### 可遍历的方法

> #### Array.prototype.forEach
> #### Array.prototype.map
<br/>
<br/>

> #### 改变原数组的方法

> #### Array.prototype.reverse <br/>删除<b>最后</b>将元素的顺序调转<br/>改变了原数组
> #### Array.prototype.sort <br/>数组排序<br/>改变了原数组
> #### Array.prototype.splice <br/>数组排序<br/>改变了原数组
> #### Array.prototype.pop <br/>删除<b>最后</b>一个元素并返回删除的这个元素
> #### Array.prototype.shift<br/>删除<b>第一个</b>一个元素并返回删除的这个元素
> #### Array.prototype.push<br/>在数组的<b>最后增加</b>一个元素，并返回 新 数组的长度
> #### Array.prototype.unshift<br/>在数组的<b>最开始</b>增加一个元素，并返回 新 数组的长度





















