#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
__author__ = 'Flynn'
__time__ = '2018-08-08'

八皇后问题(回溯算法)
"""
def queen(arr, cur=0):
    if cur == len(arr):
        # print(arr)
        global sum
        sum += 1
        return 0
    #遍历所有列
    for col in range(len(arr)):
        arr[cur], flag = col, True
        #遍历当前行之前所有行
        for row in range(cur):
            #行冲突 or 斜冲突
            if abs(col - arr[row]) in (0, cur - row):
                flag = False
                break
        if flag:
            # 下一行
            queen(arr, cur+1)
# main
sum = 0
queen([None]*8)
print(sum)