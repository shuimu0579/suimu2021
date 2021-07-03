var name = 'World!'
;(function() {
  // 由以下两行代码可知：name === undefined
  console.log('name', name)
  console.log('undefined', undefined)
  // 由以下两行代码可知：typeof name === "undefined"
  console.log('typeof undefined', typeof undefined)
  console.log('typeof name', typeof name)

  console.log(name === undefined)
  console.log(name === 'undefined')
  if (typeof name === 'undefined') {
    var name = 'Jack'
    console.log('Goodbye ' + name)
  } else {
    console.log('Hello ' + name)
  }
})()
