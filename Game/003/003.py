#coding:utf-8
import  itertools

def run():
    print("Run")
    util(x,1)


def util(x,times):
    for i in range(4):
        for d in ["l", "r"]:
            x=step(list[times-1][:],i,d)
            list[times] = x[:]
            #print(list)
            if x==xx:
                print("result: {0}".format(list))
                return
            if times<3:
                util(x,times+1)

def step(x,i,d):
    a = x[i]
    del x[i]
    b = x[i]
    del x[i]
    if d=="l":
        x.insert(0,b)
        x.insert(0,a)
    else:
        x.append(a)
        x.append(b)
    return x

x=[1,2,3,4,5]
xx=[5,4,3,2,1]
list={}
list[0]=x[:]

def keng(x):
    y=x[:2]
    return y

if __name__ == "__main__":
    print ("Start")
    run()


