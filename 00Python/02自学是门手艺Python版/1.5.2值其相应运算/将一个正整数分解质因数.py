#随机生成一个正整数
# import random
# n = random.randint(1,1000000)
n = 90
print(f"获得一个随机的正整数 {n}", end=", ")

#求出该整数的所有因数
ns = []
for i in range(2, n):
    if n % i == 0:
        ns.append(i)

print(f"它的因数有 {ns}", end=", ")

#找出因数中的质数
nst = []
for s in ns:
    for j in range(2, s):
        if s % j == 0:
            break
    else:
        nst.append(s)

print(f"其中质因数有 {nst}")