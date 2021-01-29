/**
 * 冒泡，插入，选择排序
 *
 * Author: nameczz
 */

// 冒泡排序
const bubbleSort = (arr) => {
    if (arr.length <= 1) return
    for (let i = 0; i < arr.length; i++) {
        let hasChange = false
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                hasChange = true
            }
        }
        // 如果false 说明所有元素已经到位
        if (!hasChange) break
    }
    console.log(arr)
}

// const test = [4, 5, 6, 3, 2, 1]
// bubbleSort(test)

//第一轮 [4, 5, 6, 3, 2, 1] -> [4, 5, 3, 6, 2, 1] -> [4, 5, 3, 2, 6, 1] -> [4, 5, 3, 2, 6, 1] -> [4, 5, 3, 2, 1, 6] 
//第二轮 [4, 5, 3, 2, 1, 6] -> [4, 3, 5, 2, 1, 6] -> [4, 3, 2, 5, 1, 6] -> [4, 3, 2, 1, 5, 6]
//第三轮 [4, 3, 2, 1, 5, 6] -> [3, 4, 2, 1, 5, 6] -> [3, 2, 4, 1, 5, 6] -> [3, 2, 1, 4, 5, 6]
//第四轮 [3, 2, 1, 4, 5, 6] -> [2, 3, 1, 4, 5, 6] -> [2, 1, 3, 4, 5, 6]
//第五轮 [2, 1, 3, 4, 5, 6] -> [1, 2, 3, 4, 5, 6]  -> 完毕

// 插入排序
const insertionSort = (arr) => {
    if (arr.length <= 1) return
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i]
        let j = i - 1
            // 若arr[i]前有大于arr[i]的值的化，向后移位，腾出空间，直到一个<=arr[i]的值
        for (j; j >= 0; j--) {
            if (arr[j] > temp) {
                arr[j + 1] = arr[j]
            } else {
                break
            }
        }
        arr[j + 1] = temp
        console.log(arr)
    }
    console.log(arr)
}

// const testSort = [4, 1, 6, 3, 2, 1]
// insertionSort(testSort)

// [4]  [ 1, 6, 3, 2, 1] -> [1, 4] [ 6, 3, 2, 1] -> [1, 4，6] [3, 2, 1] -> [1,2,3,4,6] [1] ->  [1,1,2,3,4,6] []  -> 结束

// 选择排序
const selectionSort = (arr) => {
    if (arr.length <= 1) return
        // 需要注意这里的边界, 因为需要在内层进行 i+1后的循环，所以外层需要 数组长度-1
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j // 找到整个数组的最小值
            }
        }
        const temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    console.log(arr)
}

const testSelect = [4, 8, 6, 3, 2, 1, 0, 12]
selectionSort(testSelect)

//[4, 8, 6, 3, 2, 1, 0, 12] -> [0, 8, 6, 3, 2, 1, 4, 12] -> [0, 1, 6, 3, 2, 8, 4, 12] -> [0, 1, 2, 3, 6, 8, 4, 12]
// -> [0, 1, 2, 3, 4, 8, 6, 12] -> [0, 1, 2, 3, 4, 6, 8, 12]