# encoding:UTF-8
import sys,os,io
import argparse
import requests,json
import re
from bs4 import BeautifulSoup
from pymongo import *

sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='gb18030')
class Video(object):
    def __init__(self,id,title,stars):
        self.id = id
        self.title = title
        self.stars = stars

class DB(object):
    def __init__(self):
        self.db = self.initMongodb()

    def initMongodb(self):
        client = MongoClient("localhost", 27017)
        db = client['test-database']
        return db

    def add(self,id,title,stars):
        # v = Video(id,title,stars)
        # print(v.title)
        video = {}
        video["id"] = id
        video["title"] = title
        video["stars"] = stars
        self.db["flynn-video"].update({"id":id},{"$set":video},upsert=True)

    def list(self,page):
        page = int(page)
        # page = 1
        per = 5
        list = self.db["flynn-video"].find().sort([("id",1)]).skip((page-1)*per).limit(per)
        return (list,list.count())

    def find(self,search):
        list = self.db["flynn-video"].find({"id":re.compile(search)}).sort([("id",1)])
        if list.count() == 0:
            list = self.db["flynn-video"].find({"stars": re.compile(search)}).sort([("id", 1)])
        return list

    def delete(self,id):
        _id = self.db["flynn-video"].find_one({"id": id})["_id"]
        self.db["flynn-video"].remove(_id)

    def javmoo(self):
        html = get_html("https://javmoo.net/cn/search/MDS723").content
        soup = BeautifulSoup(html, "lxml")
        if len(soup.select("h3"))>0:
            title = soup.select("h3")[0].get_text()
            print(title)

    def open(self,id):
        for root, dirs, files in os.walk("H:\Lynn", topdown=False):
            for name in files:
                if id.replace("-", "").lower() in name.replace("-", "").lower():
                    print(os.path.join(root, name))
                    os.system("explorer {}".format(root))
                    break

    def test(self):
        for root, dirs, files in os.walk("H:\Lynn", topdown=False):
            for name in files:
                print(os.path.join(root, name))
                os.system("explorer {}".format(dir))


def get_html(url):
    headers = { 'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6'}
    html = requests.get(url, headers=headers)
    return html

SPIT  = "／"

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='视频管理终端')
    parser.add_argument("param", type=str, nargs="*", help="命令对象")
    parser.add_argument("-u","--username", dest="user", help="用户名")
    parser.add_argument("-p","--password", dest="pswd", help="密码")


    args = parser.parse_args()
    param = args.param[1:]
    if args.user:
        print(args.user)
    if args.pswd:
        print (args.pswd)

    argv = sys.argv
    cmd = argv[1]

    db = DB()
    if cmd == "add" or cmd == "save":
        if len(param) >= 3:
            id = param[0]
            title = " ".join(param[1:-1])
            stars = param[-1]
            db.add(id,title,stars)
            print("{} Success !!".format(id))
        else:
            print("参数格式错误（番号，标题，女忧）")

    elif cmd == "find":
        if len(param) >= 1:
            id = param[0]
            list = db.find(id)

            if list.count() != 0:
                for i in list:
                    print(i["id"])
                    print(i["title"])
                    print(i["stars"])
                    print("=" * 12)
            print("查询共有{}个结果".format(list.count()))
        else:
            print("参数格式错误（番号或者女忧）")

    elif cmd == "delete":
        if len(param) >= 1:
            id = param[0]
            db.delete(id)
            print("{} 删除成功".format(id))
        else:
            print("参数格式错误（番号）")

    elif cmd == "list":
        page = param[0] if len(param) == 1 else 1
        (list,count) = db.list(page)

        if list.count() != 0:
            for i in list:
                print(i["id"])
                print(i["title"])
                print(i["stars"])
                print("=" * 12)
        print("当前第{}页，共有{}个结果".format(page,list.count()))

    elif cmd == "open":
        if len(param) >= 1:
            id = param[0]
            db.open(id)
        else:
            print("参数格式错误（番号）")

    elif cmd == "test":
        db.test()


