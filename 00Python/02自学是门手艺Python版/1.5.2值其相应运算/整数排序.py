def sort(arr, reserved=True):
    for i in range(1, len(arr)):
        for j in range(0, len(arr) - 1):
            if (reserved):
                if (arr[j + 1] > arr[j]):
                    tmp = arr[j + 1]
                    arr[j + 1] = arr[j]
                    arr[j] = tmp
            else:
                if (arr[j + 1] < arr[j]):
                    tmp = arr[j + 1]
                    arr[j + 1] = arr[j]

                    arr[j] = tmp
    return arr


sort([11, 3, 9])
sort([11, 3, 9], False)