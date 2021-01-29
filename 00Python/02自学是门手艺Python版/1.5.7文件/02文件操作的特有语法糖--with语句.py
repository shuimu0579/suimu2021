import os

if os.path.isdir('E:\\test'):  # 先判断有没有这个文件夹
    pass
else:
    os.mkdir('E:\\test')

with open('E:\\test\\test-file.txt', 'w') as f:
    f.write('first line\nsecond line\nthird line\n')

with open('E:\\test\\test-file.txt', 'r') as f:
    for line in f.readlines():
        print(line)

# if os.path.exists(f.name):
#     os.remove(f.name)
#     print(f'{f.name} deleted.')
# else:
#     print(f'{f.name} does not exist.')

# 上面那样做的好处是什么？
# 1.就可以把针对当前以特定模式打开（比如 'w' 'r'）的某个文件的各种操作都写入同一个语句块了
# 2.就是不用写 file.close() 了
