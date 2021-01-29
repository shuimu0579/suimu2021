# 我们可能喝过这样一碗鸡汤
#
# 如果把字母 a 计为 1、b 计为 2、c 计为 3 …… z 计为 26，那么：


import os

if os.path.isdir('E:\\englishlist'):  # 先判断 电脑E盘 有没有englishlist这个文件夹
    pass
else:
    os.mkdir('E:\\englishlist')


def sum_of_word(word): // 
    sum = 0
    for char in word:
        sum += ord(char) - 96
    return sum


with open('E:\\englishlist\\result.txt',
          'w') as result:  # 创建一个 result.txt 文本文件 并保存在
    with open('D:\\项目参考\\suimu2020\\00Python\\1.5.7文件\\words_alpha.txt',
              'r') as file:
        for word in file.readlines():
            if sum_of_word(word.strip()) == 100:
                print(word)
                result.write(word)
