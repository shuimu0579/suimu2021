## url params 转换成 object

```js
// 方法一
export function urlParamsToObject(params = SEARCH) {
  const output = {}

  if (!params) return output

  params.replace(/[?&]+([^=&]+)=([^&]*)/gi, (match, name, value) => {
    Object.defineProperty(output, name, {
      value,
      enumerable: true,
      writable: false,
      configurable: true,
    })
  })

  return output
}

//方法二
function urlParamsToObject01(params) {
  const output = {}

  if (!params) return output

  const a = params.split('?')[1]

  if (a.indexOf('&')) {
    a.split('&').forEach((item) => {
      Object.defineProperty(output, item.split('=')[0], {
        value: item.split('=')[1],
        enumerable: true,
        writable: false,
        configurable: true,
      })
    })
  } else {
    Object.defineProperty(output, a.split('=')[0], {
      value: a.split('=')[1],
      enumerable: true,
      writable: false,
      configurable: true,
    })
  }
  return output
}
```

## object 转换成 url params

```js
export const objectToUrlParams = (obj = {}) => {
  const entries = Object.entries(obj)
  if (!entries.length) return ''

  let params = '?'

  entries.forEach((entry, index) => {
    const ampersand = index < entries.length - 1 ? '&' : ''
    params = `${params}${entry[0]}=${entry[1]}${ampersand}`
  })

  return params
}
```
