#encoding:UTF-8

import re
import requests,json
from bs4 import BeautifulSoup


# get html
def getHtml(url):
	#html = urllib.request.urlopen(url).read().decode('UTF-8')
    html = requests.get(url,verify=False).content
    return html

def getJsonByGetUrl(url,data):
    result = json.loads(requests.get(url,params=data).text)
    return result
#
def get_douyu_player(data):
    player_list = []
    for i in data.get("data"):
        player = {}
        player['title'] = i.get("room_name")
        player['name'] =i.get("nickname")
        player['num'] = int(i.get("online"))
        player['img'] = i.get("room_src")
        player['href'] = douyu_boot+i.get("url")
        if int(player['num']) > 1000:
            player_list.append(player)
    return player_list

def get_panda_player(data):
    player_list = []
    for i in data.get("data").get("items"):
        player = {}
        player['title'] = i.get("name")
        player['name'] =i.get("userinfo").get("nickName")
        player['num'] = int(i.get("person_num"))
        player['img'] = i.get("pictures").get("img")
        player['href'] = panda_boot+i.get("id")
        if int(player['num']) > 1000:
            player_list.append(player)
    return player_list

def get_cc_player(data):
    player_list = []
    for i in data.get("lives"):
        player = {}
        player['title'] = i.get("title")
        player['name'] =i.get("nickname")
        player['num'] = int(i.get("webcc_visitor"))
        player['img'] = i.get("poster")
        player['href'] = cc_boot+str(i.get("cuteid"))
        if int(player['num']) > 1000:
            player_list.append(player)
    return player_list

def get_zhanqi_player(data):
    player_list = []
    for i in data.get("data").get("rooms"):
        player = {}
        player['title'] = i.get("title")
        player['name'] =i.get("nickname")
        player['num'] = int(i.get("online"))
        player['img'] = i.get("spic")
        player['href'] = zhanqi_boot+i.get("url")
        if player['num'] > 1000:
            player_list.append(player)
    return player_list

# def get_panda_player(html):
#     player_list = []
#     soup = BeautifulSoup(html, "lxml")
#     player_div=soup.select("li.video-no-tag")
#     for div in player_div:
#         player = {}
#         if div.select(".video-nickname"):
#             player['name']= div.select(".video-nickname")[0].get_text()
#         else:
#             player['name'] = div.select(".userinfo-nickname")[0].get_text()
#
#         num = str(div.select("span.video-number")[0].string)
#         ren = "人"
#         if ren in num:
#             index = num.find(ren)
#             num = num[0:index]
#         wan = "万"
#         if wan in num:
#             index=num.find(wan)
#             num=float(num[0:index])*10000
#         player['num'] = int(num)
#
#         title = div.select("span.video-title")[0].string
#         player['title'] = str(str(title).strip())
#
#         player['img'] = div.select("img.video-img")[0]['data-original']
#
#         player['href'] =panda_boot + str(div.select("a")[0]['href'])
#
#         if player['num'] > 1000:
#             player_list.append(player)
#     return player_list


#re 正则
def getRe(html):
    #eg <span class="dy-name ellipsis fl">XXX</span>
	#reg = r'<span class="dy-name ellipsis fl">[^<]*</span>'
    name_restr = r'<span class="dy-name ellipsis fl">(.*?)</span>'
    name_remode = re.compile(name_restr)
    name_list = re.findall(name_remode,html)
    return name_list

def main():
    player_list = []

    douyu_json = getJsonByGetUrl(douyu_api,douyu_data)
    douyu_player_list = get_douyu_player(douyu_json)
    player_list.extend(douyu_player_list)

    panda_html = getJsonByGetUrl(panda_api,panda_data)
    panda_player_list = get_panda_player(panda_html)
    player_list.extend(panda_player_list)

    cc_html = getJsonByGetUrl(cc_api,cc_data)
    cc_player_list = get_cc_player(cc_html)
    player_list.extend(cc_player_list)

    zhanqi_html = getJsonByGetUrl(zhanqi_api,zhanqi_data)
    zhanqi_player_list = get_zhanqi_player(zhanqi_html)
    player_list.extend(zhanqi_player_list)

    player_list = sorted(player_list, key=lambda x: x['num'], reverse=True)[0:100]
    #for player in player_list:
        #print(player)
    return player_list

#
douyu_url = "https://www.douyu.com/directory/game/How"
douyu_boot = 'https://www.douyu.com'
douyu_api = "http://capi.douyucdn.cn/api/v1/live/2?&limit=20&offset=0"
douyu_data = {
    'limit': 20,
    'offset': 0
}

panda_url = "https://www.panda.tv/cate/hearthstone"
panda_boot = 'https://www.panda.tv/'
panda_api = "https://api.m.panda.tv/ajax_get_live_list_by_cate"
panda_data= {
          "pageno": 1,
          "pagenum": 20,
          "__plat": "h5",
          "cate": "hearthstone"
        }
cc_boot = 'http://cc.163.com/'
cc_api = "https://cc.163.com/category/list/"
cc_data= {
          "gametype": 1005,
          "format": "json",
          "start": 0,
          "size": 20
        }
zhanqi_boot = "http://www.zhanqi.tv"
zhanqi_api = "https://m.zhanqi.tv/api/static/game.lives/9/20-1.json"
zhanqi_data = {
}


if __name__ == '__main__':
    main()


