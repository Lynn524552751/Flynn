#coding:utf-8

num = 0
#bw-百位 sw-十位 gw-各位
for i in range(100,1000):
    num = i*3
    if num<1000:
        bw = int(num / 100)
        h2w = int(num % 100)
        sw = int(h2w / 10)
        gw = int(h2w % 10)
        isw = int(i / 10 % 10 )
        if bw==sw and sw==gw and sw==isw:
            print('i = %s , num = %s'%(str(i),str(num)))

