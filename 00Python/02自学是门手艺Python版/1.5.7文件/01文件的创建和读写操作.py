# 1.新建一个文本文件到指定的目录  比如 E:\test\test-file.txt

import os

if os.path.isdir('E:\\test'):
    pass
else:
    os.mkdir('E:\\test')

f = open('E:\\test\\test-file.txt', 'w')  # 1.1 创建文件
print(f.name)
f.close()  # 关闭文件，否则无法删除文件

# if os.path.exists(f.name):  # 1.2 删除文件
#     os.remove(f.name)
#     print(f'{f.name} deleted.')
# else:
#     print(f'{f.name} does not exist.')

f = open('E:\\test\\test-file.txt', 'w')  # 1.3 在文件中写
f.write('first line\nsecond line\nthird line\n')
f.close()

f = open('E:\\test\\test-file.txt', 'r')  # 1.4 将文件中内容读出
s = f.read()
print(s)
f.close()

f = open('E:\\test\\test-file.txt', 'w')  # 1.5 readline (没有s) 将文件内容读出一行
f.write('first line\nsecond line\nthird line\n')
f.close()

f = open('E:\\test\\test-file.txt', 'r')  # 1.6 readlines (有s) 将文件内容作为列表 读出
s = f.readline().strip()  # 返回的是 'first line\n'
print(s)
s = f.readline().strip()  # 返回的是 'second line\n'
print(s)
f.close()

f = open('E:\\test\\test-file.txt', 'w')
f.write('first line\nsecond line\nthird line\n')
f.close()

f = open('E:\\test\\test-file.txt', 'r')
s = f.readlines()  # 返回的是一个列表，注意，readlines，最后的 's'
print(s)
f.close()

a_list = ['first line\n', 'second line\n',
          'third line\n']  # 1.7 将一个列表 写进 文本文件中
f = open('E:\\test\\test-file.txt', 'w')
f.writelines(a_list)
f.close()

f = open('E:\\test\\test-file.txt', 'r')
for line in f.readlines():
    print(line)
f.close()
