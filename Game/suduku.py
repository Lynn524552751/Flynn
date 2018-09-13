#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
__author__ = 'Flynn'
__time__ = '2018-09-13'
生成数独题目
"""
import time
import random

def create_full():
    arr[0] = get_shuffle_row()
    for x in range(size):
        while(not padding_row(x)):
            arr[x] = [ 0 for i in range(size)]

def padding_row(x):
    for y in range(size):
        tmp = get_shuffle_row()
        for k in tmp:
            if check_cur(arr, (x, y), k):
                arr[x][y] = k
        if arr[x][y] == 0:
            return False
    return True

def check_cur(arr, pos, k):
    #row
    x,y = pos[0],pos[1]
    for i in range(size):
        # row
        if k == arr[x][i]:
            return  False
        # col
        if k == arr[i][y]:
            return False
        # block
        row = (x//3)*3 + i//3
        col = (y//3)*3 + i%3
        # print("{}|{}".format(row,col))
        if k == arr[row][col]:
            return False
    return True

def get_shuffle_row():
    row = list(range(1, size+1))
    random.shuffle(row)
    return row

#显示答案
def show(arr):
    for i in range(size):
        print(arr[i])

# main
size = 9
char1 = list(range(1, size+1))
arr = [([0] * size) for i in range(size)]
create_full()
show(arr)
