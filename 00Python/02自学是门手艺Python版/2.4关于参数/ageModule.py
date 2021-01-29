def age(num=1):
    if (num == 1):
        return 10
    else:
        return age(num - 1) + 2
