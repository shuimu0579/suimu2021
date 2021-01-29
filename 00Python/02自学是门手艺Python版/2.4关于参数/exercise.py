# 1.变量的作用域

# def increase_one(n):
#     n += 1
#     return n

# n = 1
# print(increase_one(n))  # 2
# print(n)  # 1

# 2.可以接收一系列值的位置参数
# def say_hi(*names):
#     for name in names:
#         print(f'Hi, {name}!')

# names = ('mike', 'john', 'zeo')
# say_hi(names)  # Hi, ('mike', 'john', 'zeo')!
# say_hi(*names)  # Hi, mike! # Hi, john! # Hi, zeo!

# def say_hi(*names):
#     for name in names:
#         print(f'Hi, {name}!')

# a_string = 'Python'
# say_hi(*a_string)

# a_range = range(10)
# say_hi(*a_range)

# a_list = list(range(10, 0, -1))
# say_hi(*a_list)

# a_dictionary = {'ann': 2321, 'mike': 8712, 'joe': 7610}
# say_hi(*a_dictionary)

# 2、闰年的计算方法
# def is_leap(year):
#     leap = False
#     if (year % 4 == 0):
#         leap = True
#         if (year % 100 == 0 and year % 400 != 0):
#             leap = False
#     return leap

# is_leap(11)

# 3.eval的用法
# def demo(x, y, op):
#     return eval(str(x) + op + str(y))

# print(demo(3, 5, '+'))

# def say_hi(greeting, *names):
#     for name in names:
#         print(f"{greeting}, {name.capitalize()}!")

# say_hi("Hello", "mike", "john", "zeo")

# 匿名函数 lambda
# add = lambda n: n + 2
# n = 1
# print(add(n))

# 以什么方式排序
# pairs = [(4, "four"), (2, "two"), (3, "three"), (1, "one")]
# pairs.sort(key=lambda x: x[1])
# print(pairs)

# def test_incrementor(n):
#     return lambda x: x + n

# f = test_incrementor(42)
# f
# t = test_incrementor
# id(test_incrementor)
# id(f)

# github_url = lambda user_id: "https://github.com/" + user_id
# url = github_url("xiaolai")
# print(url)

# a = ["324.1208", "23", "98.12"]
# print(list(map(lambda x: float(format(float(x), ".2f")), a)))

# d = lambda p: p * 2
# t = lambda p: p * 3
# x = 2
# x = d(x)
# x = t(x)
# x = d(x)
# print(x)

# print(list(filter(lambda x: x % 2 == 0, range(10))))

# a = lambda x, y: (y, x)

# print(a(1, 2))

# 递归的实现 详细过程

# def f(n):
#     print('\tn =', n)
#     if n == 1:
#         print('Returning...')
#         print('\tn =', n, 'return:', 1)
#         return 1
#     else:
#         r = n * f(n - 1)
#         print('\tn =', n, 'return:', r)
#         return r

# print('Call f(5)...')
# print('Get out of f(n), and f(5) =', f(5))

# def aaa(n):
#     if (n == 1):
#         return 1
#     else:
#         return n * aaa(n - 1)

# print(aaa(5))

# 递归函数实现反向打印字符
# def bbb(str01):
#     if (str01 == ''):
#         return ''
#     else:
#         return str01[-1] + bbb(str01[:-1])

# print(bbb('abcd'))

# 递归求解年龄
# def age(num=1):
#     if (num == 1):
#         return 10
#     else:
#         return age(num - 1) + 2

# print(age(5))

# import datetime

# def clean_a_data(i):
#     print("小美把单个数据处理封装为该函数，具体代码细节此处略去")

# for i in range(100):
#     print(datetime.datetime.now(), i, "条数据开始处理")
#     try:
#         clean_a_data(i)
#     except:
#         print(f"第{i}条数据出现错误")
#     print(datetime.datetime.now(), i, "条数据处理完毕")

# def is_leap(year):
#     r = False
#     if year % 4 == 0:
#         r = True
#         if (year % 100 == 0 & year % 400 != 0):
#             r = False

#     return r

# print(is_leap(2020))

# class parent:
#     def __init__(self, param):
#         self.v1 = param

# class child(parent):
#     def __init__(self, param):
#         self.v2 = param

# obj = child(11)
# print(obj.v1 + " " + obj.v2)

# self.id id的区别
# class Account:
#     def __init__(self, id):
#         self.id = id
#         id = 666

# acc = Account(123)
# print(acc.id)

# import pickle

# class account:
#     def __init__(self, id, balance):
#         self.id = id
#         self.balance = balance

#     def deposit(self, amount):
#         self.balance += amount

#     def withdraw(self, amount):
#         self.balance -= amount

# myac = account("123", 100)
# myac.deposit(800)
# myac.withdraw(500)

# fd = open("archive", "wb")
# pickle.dump(myac, fd)
# fd.close()

# myac.deposit(200)
# print(myac.balance)

# fd = open("archive", "rb")
# myac = pickle.load(fd)
# fd.close()

# print(myac.balance)
