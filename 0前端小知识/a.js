function urlParamsToObject01(params) {
    const output = {}

    if (!params) return output

    const a = params.split('?')[1]

    if (a.indexOf("&")) {
        a.split("&").forEach(item => {
            Object.defineProperty(output, item.split("=")[0], {
                value: item.split("=")[1],
                enumerable: true,
                writable: false,
                configurable: true,
            })
        })
    } else {
        Object.defineProperty(output, a.split("=")[0], {
            value: a.split("=")[1],
            enumerable: true,
            writable: false,
            configurable: true,
        })
    }
    return output
}

console.log()