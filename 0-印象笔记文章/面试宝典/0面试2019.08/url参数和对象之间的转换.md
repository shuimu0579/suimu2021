# 对象和url参数之间的转换

- entries = Object.entries(obj)

- params.replace()
- Object.defineProperty(output, name, {
        value, enumerable: true, writable: false, configurable: true
  })

## 对象转换成url

```js
export const objectToUrlParams = (obj = {}) => {
  const entries = Object.entries(obj)
  if (!entries.length) return ''

  let params = '?'

  entries.forEach((entry, index) => {
    const ampersand = (index < entries.length - 1) ? '&' : ''
    params = `${params}${entry[0]}=${entry[1]}${ampersand}`
  })

  return params
}
```

## url参数转换成对象

```js
// https://mbd.baidu.com/newspage/data/landingsuper?context=aaa&n_type=bbb&p_from=ccc
// ?context=aaa&n_type=bbb&p_from=ccc
export function urlParamsToObject(params = SEARCH) {
  const output = {}

  if (!params) return output

  params.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    (match, name, value) => {
      Object.defineProperty(output, name, {
        value, enumerable: true, writable: false, configurable: true
      })
    }
  )

  return output
}
```
