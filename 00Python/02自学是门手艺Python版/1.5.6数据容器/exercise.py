# 1.从一组数中选出满足条件的所有数

# a = [56, 45, 576, 899, 12, 56, 100]

# b = []

# for i in a:
#     if(i < 100):
#         b.append(i)

# print(b)

# 2.对给定列表进行运算后返回字典  数字位数相加：将数字转化为字符串

# a = [56, 45, 576, 899, 12, 100]

# b = {}

# for index, i in enumerate(a):
#     b.update({sum(int(j) for j in str(i)): index})

# print(b)

# 3.求两组数的交集、并集和差集
# set01 = {1, 3, 5}
# set02 = {3, 7, 9}

# print(set01 & set02)
# print(set01 | set02)
# print(set01 - set02)
# print(set01 ^ set02)

# 4.编写一个函数让列表重新排序

# a = [123, 453, 222, 4, 4566, 2435]

# def Sorted(arr):
#     b = map(mapData, arr)
#     return sorted(list(b))

# def mapData(item):
#     c = sum(int(x) for x in str(item))
#     return c

# print(Sorted(a))

# 5.编写一个函数找出列表中哪两个元素之和等于目标数

# arr = [2, 7, 11, 15]
# num = 9

# def matchNum(arr, num):
#     for i, item01 in enumerate(arr):
#         for j, item02 in enumerate(arr):
#             if(i != j and item01+item02 == num):
#                 return (i, j)

# print(matchNum(arr, num))

# 生成一个 18 个元素的列表，每个元素都是 10~90 之间的随机数，再从列表里挑出所有奇数，形成一个新的列表。

# 给定字典 d={"a":6,"b":8,"j":8,"z":1,"n":5}：

# 1.请提取键 "j" 的值；
# 2.将键"j"的值更新为 0；
# 3.添加元素 {"m":10};
# 4.恢复原字典;
# 5.迭代字典 d 中的元素。

# 字典的常见操作

# d = {"a": 6, "b": 8, "j": 8, "z": 1, "n": 5}
# print(d['j'])
# d['j'] = 0
# d.update({"m": 10})

# d.popitem()
# d["j"] = 8
# print("4恢复原字典", d)

# for i in d:
#     print(i)

# tuple的迭代

# names1 = ["Amir", "Barry", "Chales", "Dao"]
# names2 = names1
# names3 = names1[:]

# names2[0] = "Alice"
# names3[1] = "Bob"

# sum = 0
# for ls in (names1, names2, names3):
#     print(ls)
#     if ls[0] == "Alice":
#         sum += 1
#     if ls[1] == "Bob":
#         sum += 10

# print(sum)

# 11.浅拷贝
# aList = [1, 2]
# bList = [3, 4]

# kvps = {"1": aList, "2": bList}
# theCopy = kvps.copy()

# kvps["1"][0] = 5

# sum = kvps["1"][0] + theCopy["1"][0]
# print(sum)

# 11.1深拷贝

# import copy

# aList = [1, 2]
# bList = [3, 4]

# kvps = {"1": aList, "2": bList}
# theCopy = copy.deepcopy(kvps)

# kvps["1"][0] = 5

# sum = kvps["1"][0] + theCopy["1"][0]
# print(sum)

# 将业务逻辑 转化成为列表

# List = [{
#     'index': 1,
#     'name': '小张',
#     'age': 18,
#     'height01': 178,
#     'love': ['篮球', '跑步']
# }, {
#     'index': 2,
#     'name': '小王',
#     'age': 17,
#     'height01': 172,
#     'love': ['足球', '动漫']
# }, {
#     'index': 3,
#     'name': '小刘',
#     'age': 19,
#     'height01': 173,
#     'love': ['乒乓球']
# }, {
#     'index': 4,
#     'name': '小陈',
#     'age': 16,
#     'height01': 168,
#     'love': ['羽毛球', '电影', '篮球']
# }, {
#     'index': 5,
#     'name': '小李',
#     'age': 17,
#     'height01': 174,
#     'love': ['游泳']
# }]

# def aaa(List):
#     rlt1 = ''
#     rlt2 = ''
#     for item in List:
#         print(item)
#         if (item['height01'] > 170):
#             rlt1 = rlt1 + item['name'] + '\n'
#         if '篮球' in item['love']:
#             rlt2 = rlt2 + item['name'] + '\n'

#     print("身高超过170的成员:{} 喜欢篮球的成员：{} ".format(rlt1, rlt2))

# aaa(List)

# a = [1, 2, 3]
# b = [1, 2, 4]
# print(id(a[1]) == id(b[1]))

# 计算这两个列表所表示的向量的内积
# x = [1, 3, 5]
# y = [2, 4, 6]
# print(list(zip(x, y)))  # [(1, 2), (3, 4), (5, 6)]
# print(sum((i * j for i, j in zip(x, y))))

# 计算两个字符串中对应位置字符相等的个数
# x = 'qwertdfh'
# y = 'qwecjjru'
# print(list(1 for i, j in zip(x, y) if i == j))
# print(sum((1 for i, j in zip(x, y) if i == j)))
