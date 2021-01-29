for i in range(100**100):
    if (int(str((i + 100)**0.5).split('.')[1]) == 0
            and int(str((i + 168)**0.5).split('.')[1]) == 0):
        print(i)  # 156
