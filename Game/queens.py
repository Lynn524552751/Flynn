# -*- coding: utf-8 -*-

sum = 0

def queen(A, cur=0):
    if cur == len(A):
        print(A)
        global sum
        sum = sum+1
        return 0
    #遍历所有列
    for col in range(len(A)):
        A[cur], flag = col, True
        #遍历当前行之前所有行
        for row in range(cur):
            #行冲突 or 斜冲突
            if abs(col - A[row]) in (0, cur - row):
                flag = False
                break
        if flag:
            # 下一行
            queen(A, cur+1)

queen([None]*8)
print(sum)