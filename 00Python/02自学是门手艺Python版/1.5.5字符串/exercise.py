# 1.str.replace()

# a = """Roses are red,
# Violets are blue,
# Sugar is sweet,
# And so are you."""

# b = a.replace('are', 'were')
# print(b)

# 2. i.isdigit()  a.index(i) 方法的使用
# a = 'abc120dfg09'

# for i in a:
#     if (i.isdigit()):
#         print(f'{i}的下标是{a.index(i)}')

# 3. random.choice(text * 100) 随机获取一个字符
# # Import the compression module
# import random
# import zlib

# # Create a string that we wish to compress
# text = """
# Welcome, dear Rosencrantz and Guildenstern!
# Moreover that we much did long to see you,
# The need we have to use you did provoke
# Our hasty sending. Something have you heard
# Of Hamlet"s transformation; so call it,
# Sith nor the exterior nor the inward man
# Resembles that it was. What it should be,
# More than his father"s death, that thus hath put him
# So much from the understanding of himself,
# I cannot dream of: I entreat you both,
# That, being of so young days brought up with him,
# And sith so neighbour"d to his youth and havior,
# That you vouchsafe your rest here in our court
# Some little time: so by your companies
# To draw him on to pleasures, and to gather,
# So much as from occasion you may glean,
# Whether aught, to us unknown, afflicts him thus,
# That, open"d, lies within our remedy."""

# # Convert Python string to bytes and check type

# string01 = ''
# for i in range(len(text)):
#     string01 = random.choice(text * 100) + string01

# print(string01)

# text_bytes = string01.encode("utf-8")
# print(type(text_bytes))
# # Get number of bytes used to store string
# print("Number of bytes for uncompressed string:", len(text_bytes))

# # Compress string and get number of byes used for compressed string
# text_comp = zlib.compress(text_bytes)
# print("Number of bytes for compressed string:", len(text_comp))

# # Display the compression efficiency
# print("Compression efficiency: ", len(text_comp) / len(text_bytes))

# # Decompress the string
# text_decomp = zlib.decompress(text_comp)

# # Check that original and decompressed string are the same (more on aseret)
# if text != text_decomp.decode("utf-8"):
#     print("Problem: original and decompressed string differ.")

# 4. string.index()， 切片s[start:end]
# s = "pressone is very good"
# t = "is"
# start = s.index(t)
# print(start)
# end = start + len(t)
# s[start:end]
# print(s[start:end])

# str.rjust() 和 str.zfill()  的使用
# s = "pressone is very good"

# print(s.rjust(50, "~").zfill(len(s)))

#  5.string slicing(切片)
# def capitalize(s, lower_rest=False):
#     return s[:1].upper() + (s[1:].lower() if lower_rest else s[1:])

# print(capitalize("fooBar"))  # 'fooBar'
# print(capitalize("fooBar", True))  # 'Foobar'

# 6.isinstance 判断 值的类型
# def cast_list(val):
#     return list(val) if isinstance(val, (tuple, list, set, dict)) else [val]

# cast_list("foo")
# cast_list([1])
# cast_list(("foo", "bar"))

# x = 'aafagr sgsh'
# print(x.split(','))
# print('%'.join(x.split(',')))
# print('%'.join(x.split(',')) == x)
