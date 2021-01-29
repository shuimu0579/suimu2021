for n in range(2, 100):
    if n == 2:
        print(n)
        continue
    for i in range(2, n):
        if (n % i) == 0:
            break
    else:               # 下一行的 print(n) 事实上属于语句块 for i in range(2, n):
        print(n)        # 整个循环结束，都没有发生 break 的情况下，才执行一次 print(n)


for n in range(2, 100):
    if n == 2:
        print(n)
        continue
    for i in range(2, n):
        if (n % i) == 0:
            break
    print(n)
# 事实上相当于针对 range(2, 100) 中每个 n 都执行了一次 print(n)
# 这个 print(n) 属于语句块 for n in range(2, 100)



for n in range(2, 100):
    if n == 2:
        print(n)
        continue
    for i in range(2, n):
        if (n % i) == 0:
            break
        print(n)            # 事实上相当于针对 range(2, n) 中每个 i 都执行了一次 print(n)