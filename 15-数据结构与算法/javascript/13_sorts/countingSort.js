const countingSort = array => {
    if (array.length <= 1) return

    const max = findMaxValue(array)
    const counts = new Array(max + 1)

    for (let i = 0; i < max + 1; ++i) {
        counts[i] = 0;
    }
    console.log(counts)
        // 计算每个元素的个数，放入到counts桶中
        // counts下标是元素，值是元素个数
    array.forEach(element => {
        if (!counts[element]) {
            counts[element] = 0
        }
        counts[element]++
    })
    console.log(array)
    console.log(counts)

    // 依次累加 
    for (let i = 1; i <= max; ++i) {
        console.log(counts[i - 1])
        console.log(counts[i])
        counts[i] = counts[i - 1] + counts[i];
    }
    console.log(counts)

    const r = new Array(array.length)
    for (let i = array.length - 1; i >= 0; --i) {
        let index = counts[array[i]] - 1;
        r[index] = array[i]
        counts[array[i]]--
    }
    console.log(r)
        // 将结果拷贝给a数组 
    for (let i = 0; i < array.length; ++i) {
        array[i] = r[i];
    }

    return array
}

function findMaxValue(array) {
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i]
        }
    }
    return max
}

const array = [11, 8, 3, 9, 7, 1, 2, 5, 6, 15, 8, 3, 9, 7, 1, 2, 5, 6, 15, 1, 2, 5, 6, 15]
const sortedArr = countingSort(array)
console.log('sortedArr', sortedArr)