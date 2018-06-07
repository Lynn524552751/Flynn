#coding:utf-8

num = 0
xx = [2,3,5,6,8,9]
#bw-百位 sw-十位 gw-各位 h2-后两位
for i in range(10,100):
    for j in range(10, 100):
        num = i*j;
        if num<2000:
            bw = int(num % 1000)
            bw = int(bw/100)
            h2w = int(num % 100)
            sw = int(h2w/10)
            gw = int(h2w%10)
            if sw == 4 and gw in xx and bw in xx:
                isw = int(i / 10)
                igw = int(i % 10)
                jsw = int(j / 10)
                jgw = int(j % 10)
                if isw in xx and igw in xx and jsw in xx and jgw in xx:
                    print('%s X %s = %s'%(str(i),str(j),str(num)))
#print(num)

#28 X 66 = 1848
#32 X 39 = 1248
#33 X 56 = 1848
#39 X 32 = 1248
#56 X 33 = 1848
#66 X 28 = 1848