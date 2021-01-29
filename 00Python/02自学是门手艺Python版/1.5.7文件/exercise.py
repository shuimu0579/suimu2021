import os

if os.path.isdir('E:\\test'):  # 先判断有没有这个文件夹
    pass
else:
    os.mkdir('E:\\test')

# f = open('E:\\test\\file01.txt', "w")
# f.write("first\nsecond\nthird\n")
# f.close()

with open('E:\\test\\file01.txt', 'w') as result:
    result.write("first\nsecond\nthird\nfirst\nsecond\nthird\nfirst\nsecond\nthird\nfirst\nsecond\nthird\nfirst\nsecond\nthird\nfirst\nsecond\nthird\nfirst\nsecond\nthird\n")



