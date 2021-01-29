# 1.5.4 函数

# 1.数组去重
# arr = ["b", "c", "d", "c", "b", "a", "a"]
# newArr = list(set(["b", "c", "d", "c", "b", "a", "a"]))
# print(f'{newArr}')

# def has_duplicates(lst):
#     return len(lst) != len(set(lst))

# x = [1, 2, 3, 4, 5, 5]
# y = [1, 2, 3, 4, 5]
# print(has_duplicates(x))
# print(has_duplicates(y))

# 2.将字符串下划线命名 转换为 驼峰民命名  re正则表达式的使用 re.sub的使用
# import re

# def camel(s):
#     print(re.sub(r"(\s|_|-)+", " ", s))
#     print(re.sub(r"(\s|_|-)+", " ", s).title())
#     s = re.sub(r"(\s|_|-)+", " ", s).title().replace(" ", "")
#     return s[0].lower() + s[1:]

# print(camel("some_database_field_name"))
# print(camel("Some label that needs to be camelized"))
# print(camel("some-javascript-property"))
# print(camel("some-mixed_string with spaces_underscores-and-hyphens"))

# import re

# def snake(s):
#     return "_".join(
#         re.sub("([A-Z][a-z]+)", r" \1",
#                re.sub("([A-Z]+)", r" \1", s.replace("-",
#                                                     " "))).split()).lower()

# snake("camelCase")
# snake("some text")
# snake("some-mixed_string With spaces_underscores-and-hyphens")
# snake("AllThe-small Things")

# 2.该函数接收一个字符串，并将该字符串中所有数字替换为空格，非数字转换为大写形式，最后把整个字符串反转过来（比如xuecn经过反转是nceux），然后返回处理后的字符串。
# 请随意定义一个较复杂的字符串，并调用该函数。

# import re

# def camel(s):
#     s = re.sub(r"(\d)+", " ", s).replace(" ", "")
#     a = ''
#     for i in range(len(s)):
#         a = a + s[i].upper()

#     return a[::-1]

# print(camel("dfsrg23543sgs4heu6 rgwr365dhd ry543 "))

# 3.编写一个函数生成16位数的随机字符串   python内置函数random.choice
# import random
# import string

# string01 = ''
# for i in range(16):
#     string01 = random.choice(string.ascii_letters + string.digits) + string01

# print(string01)

# 4.总结一下关于位置参数和关键字参数：
# 位置参数必须放在关键字参数前面；
# 调用的时候，如果指定关键字参数（如：name='Mike'),则该关键字参数的后面的所有关键字参数也要指定，否则会被理解成位置参数造成报错；
# 指定的关键字参数可以交换位置（前提是在位置参数之后）

# def make_sentence(age, name="Ann", sex="boy"):
#     print(f"{name} is {age} years old and is a {sex}.")

# make_sentence("8", "Kate", "girl")
# make_sentence("9", name="Mike", sex='hehhe')
# make_sentence(age="8", name="Jiaming", sex="boy")

# 5.求平均数
# def average_by(lst, fn=lambda x: x):
#     print(list(map(fn, lst)))
#     return sum(list(map(fn, lst)), 0.0) / len(lst)

# print(average_by([{"n": 4}, {"n": 2}, {"n": 8}, {"n": 6}], lambda x: x["n"]))

# 6.将数组分开，分为二维数组
# def bifurcate(lst, filter):
#     return [[x for (i, x) in enumerate(lst) if filter[i] == True],
#             [x for (j, x) in enumerate(lst) if filter[j] == False]]

# print(bifurcate(["beep", "boop", "foo", "bar"], [True, True, False, True]))

# def bifurcate_by(lst, fn):
#     return [[x for x in lst if fn(x)], [x for x in lst if not fn(x)]]

# print(bifurcate_by(["beep", "boop", "foo", "bar"], lambda x: x[0] == "b"))

# def byte_size(s):
#     return len(s.encode("utf-8"))

# print(byte_size("馃榾"))
# print(byte_size("Hello World"))

# 7.map方法的使用
# from math import ceil

# def chunk(lst, size):
#     # print(list(range(0, ceil(len(lst) / size))))
#     # 通过下标来截取列表
#     print(lst[0:2])

#     return list(
#         map(lambda x: lst[x * size:x * size + size],
#             list(range(0, ceil(len(lst) / size)))))

# print(chunk([1, 2, 3, 4, 5], 2))

# 8.判断一个数是否落在相应的区间
# def clamp_number(num, a, b):
#     return max(min(num, max(a, b)), min(a, b))

# print(clamp_number(2, 3, 5))
# print(clamp_number(1, -1, -5))
# print(clamp_number(-3, -1, -5))

# 9. filter方法的使用
# def compact(lst):
#     return list(filter(lambda item: bool(item), lst))

# print(compact([0, 1, False, 2, "", 3, "a", "s", 34]))

# 10. map方法的使用
# from math import floor

# def count_by(arr, fn=lambda x: x):
#     key = {}
#     for el in map(fn, arr):
#         key[el] = 1 if el not in key else key[el] + 1
#     return key

# print(count_by([6.1, 4.2, 6.3], floor))
# # {6:2, 4:1}

# print(count_by(["one", "two", "three"], len))
# # {3:2 ,5:1}

# 10.1 map方法的使用
# import math

# def group_by(lst, fn):
#     return {key: [el for el in lst if fn(el) == key] for key in map(fn, lst)}

# print(group_by([6.1, 4.2, 6.3], math.floor))
# print(group_by(["one", "two", "three"], len))

# 11.将多维数组 flat 平铺成一维数组
# def spread(arg):
#     ret = []
#     for i in arg:
#         if isinstance(i, list):
#             ret.extend(i)
#         else:
#             ret.append(i)
#     return ret

# def deep_flatten(lst):
#     result = []
#     result.extend(
#         spread(
#             list(map(lambda x: deep_flatten(x)
#                      if type(x) == list else x, lst))))
#     return result

# print(deep_flatten([1, [2], [[3], 4], 5]))

# 11.1 将二维数组 flat 平铺成一维数组
# def flatten(lst):
#     return [x for y in lst for x in y]

# print(flatten([[1, 2, 3, 4], [5, 6, 7, 8]]))

# 12.every方法的逻辑实现
# def every(lst, fn=lambda x: x):
#     return all(map(fn, lst))

# print(every([4, 2, 3], lambda x: x > 1))
# print(every([1, 2, 3]))

# 13.获取所有的偶数
# def every_nth(lst, nth):
#     return lst[nth - 1::nth]

# print(every_nth([1, 2, 3, 4, 5, 6], 2))  # 【2， 4，6】

# 14.递归初探
# def factorial(num):
#     if not ((num >= 0) and (num % 1 == 0)):
#         raise Exception(
#             f"Number( {num} ) can't be floating point or negative ")
#     return 1 if num == 0 else num * factorial(num - 1)

# print(factorial(6))

# 15.斐波那契数列
# def fibonacci(n):
#     if n <= 0:
#         return [0]

#     sequence = [0, 1]
#     while len(sequence) <= n:
#         next_value = sequence[len(sequence) - 1] + sequence[len(sequence) - 2]
#         sequence.append(next_value)

#     return sequence

# fibonacci(7)

# 16. arr.count 计算数组出现次数， set()对数组进行去重
# def filter_non_unique(lst):
#     return [item for item in lst if lst.count(item) == 1]

# print(filter_non_unique([1, 2, 2, 3, 4, 4, 5]))

# def filter_unique(lst):
#     return [x for x in set(item for item in lst if lst.count(item) > 1)]

# print(filter_unique([1, 2, 2, 3, 4, 4, 5]))

# 17. 引入 functools， reduce的使用
# from functools import reduce
# import math

# def gcd(numbers):
#     # return reduce(lambda a, b: a + b, numbers)
#     return reduce(math.gcd, numbers)

# print(gcd([8, 36, 28]))

# set 的交集和并集和差集
# def intersection(a, b):
#     _a, _b = set(a), set(b)
#     # return list(_a & _b)
#     # return list(_a | _b)
#     # return list((_a | _b) - _a)
#     # return list((_a | _b) - _b)
#     return list((_a | _b) - (_a & _b))

# print(intersection([1, 2, 3], [4, 3, 2]))

# string字符串 replace方法   python sorted 内置方法
# def is_anagram(s1, s2):
#     _str1, _str2 = s1.replace(" ", ""), s2.replace(" ", "")
#     if len(_str1) != len(_str2):
#         return False
#     else:
#         return sorted(_str1.lower()) == sorted(_str2.lower())

# print(is_anagram("anagram", "Nag a ram"))

# 将命名改为 短横线命名
# import re

# def kebab(s):
#     return re.sub(
#         r"(\s|_|-)+", "-",
#         re.sub(
#             r"[A-Z]{2,}(?=[A-Z][a-z]+[0-9]|\b)|[A-Z]?[a-z]+[0-9]|[A-Z]|[0-9]+",
#             lambda mo: mo.group(0).lower(), s))

# print(kebab("camelCase"))
# print(kebab("some text"))
# print(kebab("some-mixed_string With spaces_underscores-and-hyphens"))
# print(kebab("AllThe-small Things"))

# math.gcd 求最大公约数   arr.extend()

# from functools import reduce
# import math

# def spread(arg):
#     ret = []
#     for i in arg:
#         if isinstance(i, list):
#             ret.extend(i)
#         else:
#             ret.append(i)
#     return ret

# def lcm(*args):
#     numbers = []
#     numbers.extend(spread(list(args)))

#     def _lcm(x, y):
#         return int(x * y / math.gcd(x, y))

#     return reduce((lambda x, y: _lcm(x, y)), numbers)

# print(lcm(12, 7))
# print(lcm([1, 3, 4], 5))

# def longest_item(*args):
#     return max(args, key=len)

# print(longest_item("this", "is", "a", "testcase"))
# print(longest_item([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]))
# print(longest_item([1, 2, 3, 9, 9, 9, 9], "foobar"))

# max中key是一个函数，作为判断set,list等最大的依据，list.count计算数组中元素出现的次数
# def most_frequent(list):
#     print(set(list))
#     print([2, 1, 1, 1, 3, 1, 1, 4, 2].count)
#     return max(set(list), key=list.count)

# print(most_frequent([1, 1, 1, 1, 3, 2, 1, 4, 2]))

# def none(lst, fn=lambda x: x):
#     return all(not fn(x) for x in lst)

# print(none([0, 1, 2, 0], lambda x: x >= 2))
# print(none([0, 0, 0]))

# deepcopy 深拷贝
# from copy import deepcopy
# from random import randint

# def shuffle(lst):
#     temp_lst = deepcopy(lst)
#     m = len(temp_lst)
#     while (m):
#         m -= 1
#         i = randint(0, m)
#         temp_lst[m], temp_lst[i] = temp_lst[i], temp_lst[m]
#     return temp_lst

# foo = [1, 2, 3, 4, 5, 6, 7]
# print(shuffle(foo))

# some方法的使用

# def some(lst, fn=lambda x: x):
#     return any(map(fn, lst))

# print(some([0, 1, 2, 0], lambda x: x >= 2))  # True
# print(some([0, 0, 1, 0]))  # True

# zip() 函数用于将可迭代的对象作为参数，将对象中对应的元素打包成一个个元组，然后返回由这些元组组成的列表。
# list tuple dict 前面加*号，就相当于解构赋值一样
# def transpose(lst):
#     return list(zip(*lst))

# transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]])

# dict 里面的keys方法  values方法

# def values_only(dict):
#     return list(dict.values())

# ages = {
#     "Peter": 10,
#     "Isabel": 11,
#     "Anna": 9,
# }
# values_only(ages)

# zip 方法的实现过程
# def zip(*args, fillvalue=None):
#     max_length = max([len(lst) for lst in args])
#     result = []
#     for i in range(max_length):
#         result.append([
#             args[k][i] if i < len(args[k]) else fillvalue
#             for k in range(len(args))
#         ])
#     return result

# print(zip(["a", "b"], [1, 2], [True, False]))
# print(zip(["a"], [1, 2], [True, False]))
# print(zip(["a"], [1, 2], [True, False], fillvalue="_"))

# age = input('Please tell me your age: ')

# if age < 18:
#     print('I can not sell you drinks...')
# else:
#     print('Have a nice drink!')

# input输入框 最终的结果是 字符串
# age = int(input('''Please tell me your age:
#  an int number , e.g: 22
# '''))
# if age < 18:
#     print('I can not sell you drinks...')
# else:
#     print('Have a nice drink!')
