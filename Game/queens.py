# -*- coding: utf-8 -*-

def queen(A, cur=0):
    if cur == len(A):
        print(A)
        return 0
    #col == 列
    for col in range(len(A)):
        A[cur], flag = col, True
        # row == 行
        for row in range(cur):
            #行冲突 or 斜冲突
            if A[row] == col or abs(col - A[row]) == cur - row:
                flag = False
                break
        if flag:
            queen(A, cur+1)

queen([None]*8)