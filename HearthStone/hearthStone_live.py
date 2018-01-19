#encoding:UTF-8

import re
import requests
from bs4 import BeautifulSoup


# get html
def getHtml(url):
	#html = urllib.request.urlopen(url).read().decode('UTF-8')
    html = requests.get(url,verify=False).content
    return html

#
def get_douyu_player(html):
    player_list = []
    soup = BeautifulSoup(html, "lxml")
    player_div=soup.select("a.play-list-link")
    for div in player_div:
        player = {}

        player['name']= div.select("span.dy-name")[0].string

        num = div.select("span.dy-num")[0].string
        wan = "万"
        if wan in num:
            index=num.find(wan)
            num=float(num[0:index])*10000
        player['num'] = int(num)

        title = div.select("h3.ellipsis")[0].get_text()
        player['title'] = str(title).strip()

        player['img'] = div.select("img")[0]['data-original']

        player['href'] =douyu_boot + str(div['href'])

        if player['num'] > 1000:
            player_list.append(player)

    return player_list

def get_panda_player(html):

    player_list = []
    soup = BeautifulSoup(html, "lxml")
    player_div=soup.select("li.video-no-tag")
    for div in player_div:
        player = {}
        if div.select(".video-nickname"):
            player['name']= div.select(".video-nickname")[0].get_text()
        else:
            player['name'] = div.select(".userinfo-nickname")[0].get_text()

        num = str(div.select("span.video-number")[0].string)
        ren = "人"
        if ren in num:
            index = num.find(ren)
            num = num[0:index]
        wan = "万"
        if wan in num:
            index=num.find(wan)
            num=float(num[0:index])*10000
        player['num'] = int(num)

        title = div.select("span.video-title")[0].string
        player['title'] = str(str(title).strip())

        player['img'] = div.select("img.video-img")[0]['data-original']

        player['href'] =panda_boot + str(div.select("a")[0]['href'])

        if player['num'] > 1000:
            player_list.append(player)
    return player_list


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

    douyu_html = getHtml(douyu_url)
    douyu_player_list = get_douyu_player(douyu_html)
    player_list.extend(douyu_player_list)

    panda_html = getHtml(panda_url)
    panda_player_list = get_panda_player(panda_html)
    player_list.extend(panda_player_list)

    player_list = sorted(player_list, key=lambda x: x['num'], reverse=True)[0:20]
    #for player in player_list:
        #print(player)
    return player_list
#
douyu_url = "https://www.douyu.com/directory/game/How"
douyu_boot = 'https://www.douyu.com'
panda_url = "https://www.panda.tv/cate/hearthstone"
panda_boot = 'https://www.panda.tv'
if __name__ == '__main__':
    main()


