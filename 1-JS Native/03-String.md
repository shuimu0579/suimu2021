### String.properties




### String.methods
> ### String.prototype.methods

> #### String.properties.charAt(index) <br/>根据index下标 来返回 一个新的character字符。

> #### String.properties.charCodeAt(index) <br/>根据index下标 来返回 新字符的  UTF-16 字符码

> #### String.properties.concat(string2[, string3, ..., stringN]) <br/>根据index下标 来返回 新字符的  UTF-16 字符码

> #### String.properties.startWith(searchString[, position]) <br/>判断string是不是以 searchString 开始的。

> #### String.properties.endWith(searchString[, length]) <br/>判断string是不是以 searchString 结尾的。

> #### String.properties.includes(searchString[, position]) <br/>判断一个字符串 是不是 包含在另一个字符串 之内

> #### String.properties.indexOf(searchValue[, fromIndex]) <br/>返回特定字符串的下标<br/>从左到右

> #### String.properties.lastIndexOf(searchValue[, fromIndex]) <br/>返回特定字符串的下标<br/>从右到左

> #### String.properties.slice(beginIndex[, endIndex]) <br/>返回截取的字符串<br/>if beginIndex and endIndex is negative, it treat as  <br/>strLength + (beginIndex) && strLength + (endIndex)

```javascript
var str = 'The morning is upon us.';
console.log(str.length)
console.log(str.slice(-11, 16)) // => "is u";
console.log(str.slice(12, -7)) // => "is u";
```

> #### String.properties.substring(indexStart[, indexEnd]) <br/>返回截取的字符串<br/>if either or both of the arguments are negative or NaN, the substring() method treats them as if they were 0 

> #### String.properties.slice([separator[, limit]]) <br/>用separator 作为分割器 将一个string  分割为 一个  数组。<br>这个separator可以是 一个regExp.
```javascript
var names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';

console.log(names);

var re = /\s*(?:;|$)\s*/;
var nameList = names.split(re);

console.log(nameList);
```

> #### String.properties.trim()<br/>return the string stripped of whitespace from both ends.
> #### String.properties.toUpperCase()<br/>将string转为小写
> #### String.properties.toLowerCase()<br/>将string转为大写


> ### String.prototype.methods <b style= 'color: #159;font-size: 24px'>With Regular Expression</b>

> #### String.properties.match(regexp) <br/><br/>

- 如果 有 g标记符的话，所有的匹配到的结果将会被返回，但是 捕获组不会被返回。
- 如果 没有 g标记符的话，只有第一个被匹配到的结果将会被返回，同时 其捕获组也将会被返回。
- 如果 你设置了 g标记符的话， 同时你想获取 捕获组 ，那么你应该 用 RegExp.exec()

```javascript
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);

// logs [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]

// 'see Chapter 3.4.5.1' is the whole match.
// 'Chapter 3.4.5.1' was captured by '(chapter \d+(\.\d)*)'.
// '.1' was the last value captured by '(\.\d)'.
// The 'index' property (22) is the zero-based index of the whole match.
// The 'input' property is the original string that was parsed.
```
```javascript
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);

console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```


> #### String.properties.replace(regexp|substr, newSubstr|<b>function</b>) <br/><br/>

关于这个 function， 
- the arguments to the function are as follows:
- match: the matched substring
- p1,p2,p3,p4... :在捕获组里面的 the nth string.
- offset: 被匹配的substring 在 整个 string 里面 的偏移距离


```javascript
function styleHyphenFormat(propertyName) {
  function upperToHyphenLower(match, offset, string) {
    console.log(offset)  
    // 5
    // 11
    return (offset > 0 ? '-' : '') + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}

styleHyphenFormat('bordeRwertyTop')
```

> #### String.properties.search(regexp) <br/>返回的是the index  of the first match.












