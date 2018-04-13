#encoding:UTF-8
import requests,json
import datetime
import pymongo
from bs4 import BeautifulSoup
from pymongo import *
# get html
class HearthstoneClass(object):

    def __init__(self):
        self.cards = []
        self.played = {}
        self.included = {}
        self.db = self.initMongodb()

    def getCardInfo(self,id):
        info = {}
        for i, val in enumerate(self.cards):
            if val.get("dbfId") == id:
                info = val
        return info

    def getCardPlayedInfo(self,id,deckClass):
        info = {}
        for i, val in enumerate(self.data.get(deckClass)):
            if val.get("dbf_id") == id:
                info = val
        return info

    def getCardIncludedInfo(self,id,deckClass):
        info = {}
        for i, val in enumerate(self.data2.get(deckClass)):
            if val.get("dbf_id") == id:
                info = val
        return info

    def fiterCards(self,db,deckClass="ALL",gameType="ARENA",cardCost=0,cardType=None):
        list = []
        deck_set = ["EXPERT1","CORE","ICECROWN","UNGORO","GANGS","KALA","OG"]
        result = db["cards"].find({"rarity":{"$exists":True},"collectible":{"$exists":True},"set":{"$in":deck_set},"cost":0})
        for i in result:
            list.append(i)
        return list

    def queryCardByName(self,name,deck_class,db,showLog=False):
        card_info = db["cards"].find_one({"name": name})
        id = card_info.get("dbfId")
        print(id)
        info = {"card":card_info,
                "played":db["played_"+deck_class].find_one({"dbf_id":id}),
                "included": db["included_" + deck_class].find_one({"dbf_id": id})}
        if showLog:
            print("卡牌名称：{}".format(info.get("card").get("name")))
            print("选择率：{}%".format(round(info.get("included").get("popularity"), 1)))
            print("包含胜率：{}%".format(round(info.get("included").get("winrate"), 1)))
            print("打出胜率：{}%".format(round(info.get("played").get("winrate"), 1)))
        return info

    def sortTabel(self,tabel,sortBy,sortDirection="desc"):
        return tabel.sort(key=lambda x: x.get('included').get("popularity"), reverse=True)

    def initMongodb(self):
        client = MongoClient('localhost', 27017)
        db = client['test-database']
        return db

    def updateData(self,db):
        #card_data = self.getCardDataByGetUrl()
        played_data = self.getPlayedDataByGetUrl().get("series").get("data")
        included_data = self.getIncludedDataByGetUrl().get("series").get("data")
        deck_class_list = ["all","druid","hunter"]
        #db["cards"].remove()
        #db["cards"].insert(card_data)
        for i in deck_class_list:
            db["played_"+i].remove()
            db["played_"+i].insert(played_data.get(i.upper()))
            db["included_" + i].remove()
            db["included_" + i].insert(included_data.get(i.upper()))
        return True

    def getCardDataByGetUrl(self):
        CARD_URL = "https://api.hearthstonejson.com/v1/latest/zhCN/cards.json"
        print("get hsreplay cards")
        data = getJsonByGetUrl(CARD_URL)
        print(len(data))
        return data

    def getPlayedDataByGetUrl(self):
        PLAYED_URL = "https://hsreplay.net/analytics/query/card_played_popularity_report/?GameType=ARENA&RankRange=ALL&TimeRange=LAST_14_DAYS"
        print("get hsreplay played")
        data = getJsonByGetUrl(PLAYED_URL)
        print(len(data.get("series").get("data").get("ALL")))
        return data

    def getIncludedDataByGetUrl(self):
        INCLUDED_URL = "https://hsreplay.net/analytics/query/card_included_popularity_report/?GameType=ARENA&RankRange=ALL&TimeRange=LAST_14_DAYS"
        print("get hsreplay included")
        data = getJsonByGetUrl(INCLUDED_URL)
        print(len(data.get("series").get("data").get("ALL")))
        return data

    def getArenaWinrateList(self):
        INDEX_URL = "https://hsreplay.net/"
        now = datetime.datetime.now().replace(hour=0,minute=0,second=0,microsecond=0)
        list = self.findArenaWinrate(now)
        if list.count()==0:
            list = self.getArenaWinrateListByHsreplay()
            list = self.updateArenaWinrate(list)
        service_list = []
        for i in list:
            service_list.append({"class_name":i.get("class_name"),"winrate":i.get("winrate")})
        return service_list

    def getArenaWinrateListByHsreplay(self):
        INDEX_URL = "https://hsreplay.net/analytics/query/player_class_performance_summary/"
        now = datetime.datetime.now().replace(hour=0,minute=0,second=0,microsecond=0)
        list = []
        tile_list = getJsonByGetUrl(INDEX_URL)
        tile_list = tile_list["series"]["data"]
        for key in tile_list:
            tile_obj = {}
            tile_obj["class_name"] = key.capitalize()
            for i in tile_list[key]:
                if i["game_type"] == 3:
                    tile_obj["winrate"] = i["win_rate"]
                    tile_obj["popularity"] = i["popularity"]
                    break
            tile_obj["date"] = now
            list.append(tile_obj)
        return list

    def findArenaWinrate(self,time):
        list = self.db["arena_winrate"].find({"date": {"$gte":time+datetime.timedelta(days=-1)}})
        return list

    def updateArenaWinrate(self,list):
        self.db["arena_winrate"].remove()
        self.db["arena_winrate"].insert(list)
        return list

def getJsonByGetUrl(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6'}
    data = json.loads(requests.get(url,headers=headers).text)
    return data

def getHtmlByGetUrl(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6'}
    html = requests.get(url,headers=headers).content
    return html

if __name__ == '__main__':
    hs = HearthstoneClass()
    print("init DB")
    db = hs.initMongodb()
    # print("updata DB")
    # #hs.updateData(db)
    # for i in db["cards"].find():
    #     hs.cards.append(i)
    #
    # #table = hs.fiterCards(db)
    # #print(len(table))
    # #for i in table:
    #     #print(i.get("name"))
    #
    # #card_info = hs.queryCardByName("阿彻鲁斯老兵","all",db,True)
    # card_info = hs.queryCardByName("巨型黄蜂", "all", db, True)
    # #card_info = hs.queryCardByName("剑齿追猎者", "all", db, True)
    # print("end")

    print(hs.getArenaWinrateList())