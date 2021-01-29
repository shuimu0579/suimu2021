
### 原生Map(mutate) and  Map(immutate) compared

```javascript
const { Map } = require('immutable@4.0.0-rc.9')
Map({ key: "value",key3: "value3"}) // Map {"key" => "value", "key3" => "value3"}
Map([ [ "key1", "value1" ] ,[ "key2","value2"]]) //Map {"key1" => "value1", "key2" => "value2"}
```

> the same:

> the difference:
<br>Map is a class, so we need to use <b>new</b> key words when create a new Map instance.While Map(immutable) is only a factory function, so We can't use the new keyword during construction.<br>
<br>Map(mutate)的入参只能是iterbale，而Map(immutate)的入参除了是iterable还可以是object(而object却不是iterbale)<br>
<br>Map(mutate) is ordered while Map(immutate) is not ordered

<br>
### 原生Map（mutate） and  immutable.js orderedMap compared

> the same:
<br>The iteration behavior of OrderedMap is the same as native ES6 Map and JavaScript Object.

> the difference:
<br>Map 是 mutable 的，但是immutable.js 里面的 orderedMap is immutable <br>


<br>
### Map(immutate) and  orderMap(immutate) compared

> the same: 

> the difference:
<br>Map是无序的， orderMap是有序的


