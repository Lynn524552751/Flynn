#coding:utf-8
import  itertools

def run():
    print("Run")
    sum=0
    for i in itertools.permutations(["瑞典","丹麦","英国","德国","挪威"], 5):
        if i.index("挪威") == 0:
            for j in itertools.permutations(["牛奶", "茶", "矿泉水", "咖啡", "啤酒"], 5):
                if i.index("丹麦") == j.index("茶") and j.index("牛奶") == 2:
                    for k in itertools.permutations(["DUNHILL", "BLUE", "PALL", "PRINCE", "混合烟"], 5):
                        if j.index("啤酒") == k.index("BLUE") and i.index("德国") == k.index("PRINCE") and abs(k.index("混合烟") - j.index("矿泉水"))==1:
                            for l in itertools.permutations(["猫", "鱼", "鸟", "马", "狗"], 5):
                                if i.index("瑞典") == l.index("狗") and k.index("PALL") == l.index("鸟") and abs(k.index("混合烟") - l.index("猫"))==1  \
                                    and abs(k.index("DUNHILL") - l.index("马"))==1:
                                    for m in itertools.permutations(["绿色", "红色", "蓝色", "白色", "黄色"], 5):
                                        sum = sum+1
                                        if i.index("英国") == m.index("红色") and m.index("绿色") == m.index("白色")-1 and m.index("绿色") ==j.index("咖啡"):
                                            if k.index("DUNHILL") == m.index("黄色")and abs(i.index("挪威") - m.index("蓝色"))==1:
                                                print("----------------------------")
                                                print(i)
                                                print(j)
                                                print(k)
                                                print(l)
                                                print(m)
                                                print("----------------------------")
                                                return

if __name__ == "__main__":
    print ("Start")
    run()
