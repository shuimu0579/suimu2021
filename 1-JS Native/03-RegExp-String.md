### regExp.property

### regExp.prototype.methods
> #### regExp.prototype.exec()  
- 如果 有 g标记符的话，所有的匹配到的结果将会被返回，但是 捕获组不会被返回。
- 如果 没有 g标记符的话，只有第一个被匹配到的结果将会被返回，同时 其捕获组也将会被返回。
- 如果 你设置了 g标记符的话， 同时你想获取 捕获组 ，那么你应该 用 RegExp.exec()


```javascript
// Match "quick brown" followed by "jumps", ignoring characters in between
// Remember "brown" and "jumps"
// Ignore case
var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');

console.log(re)
console.log(result)

```

> #### regExp.prototype.test()<br/> executes a search for a match between a regular expression and a specified string.
