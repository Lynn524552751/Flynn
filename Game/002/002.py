#coding:utf-8

#抓了a,b,c,d4名犯罪嫌疑人.其中有一名是小偷，审讯中：
#       a说我不是小偷
#       b说c是小偷
#       c说小偷肯定是d
#      	d说c胡说！
#其中有3个人说的是实话，一个人说的是假话，编程推断谁是小偷。
#（用穷举法和逻辑表达式）

for thief in ['a','b','c','d']:
	sum = (thief != 'a') + (thief == 'c') + (thief == 'd') + (thief !='d')
	if sum == 3:
		print("小偷是 : %c"%thief)
