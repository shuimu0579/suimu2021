# 0.根据分数打印出成绩等级

# from random import randrange
# dice = randrange(0, 101)

# if (dice <= 60):
#     print(f'{dice}对应的成绩是 E')
# elif (60 < dice <= 70):
#     print(f'{dice}对应的成绩是 D')
# elif (70 < dice <= 80):
#     print(f'{dice}对应的成绩是 C')
# elif (80 < dice <= 90):
#     print(f'{dice}对应的成绩是 B')
# elif (dice > 90):
#     print(f'{dice}对应的成绩是 A')

# 1.计算一组数的最大值、最小值、平均值

# arr = [45, 576, 899, 12, 56, -100]

# max = max([45, 576, 899, 12, 56, -100])
# min = min([45, 576, 899, 12, 56, -100])
# ava = sum([45, 576, 899, 12, 56, -100]) / len(arr)
# print(f'这组数里面的最大值是{max}，最小值是{min}，平均值是{ava}')

# 2.找出文中的藏头诗

# poem_x = """热风吹雨洒江天爱闲能有几人来自作清歌传皓齿学诗谩有惊人句"""
# poem_y = """向年时也自曾破千金学炼出个金刚计我终岁需"""

# str01 = ''
# for item in range(0, len(poem_x), 7):
#     str01 += poem_x[item]

# str02 = ''
# for item in range(4, len(poem_y), 5):
#     str02 += poem_y[item]

# print(f'{str01}\n{str02}')

# 3.for循环嵌套=带来的计算量

# import datetime
# start_time = datetime.datetime.now()
# print(start_time, "start")

# n = 10
# for i in range(n):
#     for j in range(n):
#         for k in range(n):
#             for l in range(n):
#                 print(i, j, k)
# end_time = datetime.datetime.now()
# print(end_time, "all is done.")
# run_time = end_time - start_time
# print("共运行秒数", run_time)  # 共运行秒数 0:00:03.103639

# 4.用两种方法输入10~40的偶数

# for i in range(10, 41):
#     if (i % 2 == 0):
#         print(i)

# for i in range(10, 41, 2):
#     print(i)
# print([5 for i in range(3)])
