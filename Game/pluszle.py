#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
__author__ = 'Flynn'
__time__ = '2018-08-08'
pluszle 暴力解题
玩游戏解不出来 生气了
"""
import time
#回溯
def pluszle(arr, pos):
    if pos[0] == size:
        show_result(arr)
        return 0
    for i in range(2):
        x, y = pos[0], pos[1]
        arr[x][y] = problem[x][y] if i == 0 else 0
        if (check_cur(arr, (x, y))):
            if y == size - 1:
                x += 1
                y = 0
            else:
                y += 1
            pluszle(arr, (x, y))

#检查行与列之和
def check_cur(arr, pos):
    x, y = pos[0], pos[1]
    row_sum, col_sum = 0, 0
    for i in range(size):
        row_sum += arr[x][i]
        col_sum += arr[i][y]
    if row_sum <= row_sum_arr[x] and col_sum <= col_sum_arr[y]:
        if x < size - 1 and y < size - 1:
            return True
        if y == size - 1 and row_sum == row_sum_arr[x] and x == size - 1 and col_sum == col_sum_arr[y]:
            return True
        if y == size - 1 and row_sum == row_sum_arr[x]:
            return True
        if x == size - 1 and col_sum == col_sum_arr[y]:
            return True
    return False

#显示答案
def show_result(arr):
    for i in range(size):
        print(arr[i])

# main
problem = [[5,9,8,9,7,6,3,8],
           [3,9,7,7,4,5,3,6],
           [6,1,2,1,9,7,9,9],
           [4,5,4,1,7,5,7,6],
           [7,5,2,7,7,1,8,9],
           [1,5,6,5,6,5,9,1],
           [8,7,4,5,9,3,2,1],
           [4,3,3,6,3,4,2,6]]
row_sum_arr = [18,23,15,10,21,6,12,11]
col_sum_arr = [20,34,6,22,11,4,12,7]
size = len(problem)
arr = [([0] * size) for i in range(size)]
pluszle(arr, (0, 0))
