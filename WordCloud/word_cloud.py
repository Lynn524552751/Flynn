#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
__author__ = 'Flynn'
__time__ = '2017-12-30'

获取哔哩哔哩(bilibili)视频弹幕作成词云
"""
import os, sys
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as et
import jieba
from scipy.misc import imread
import numpy as np
from PIL import Image
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import matplotlib.pyplot as plt

id = "av17231855"
# 弹幕文件链接
video_format = "https://www.bilibili.com/video/{}/"
danmu_format = "http://comment.bilibili.com/{}.xml"
# 保存（输出）文件
save_dir = "output"
save_format = os.path.join(save_dir, "cloud-{}.jpg")
# 字体文件
font_dir = "font"
font_name = "simsun.ttc"
font_file = os.path.join(font_dir, font_name)
# 背景图片
mask_dir = "mask"
mask_file = "germany.jpg"
mask_format = os.path.join(mask_dir, "{}")


# 从B站视频地址获取弹幕id
def get_danmu_cid(id):
    html = requests.get(video_format.format(id)).content
    soup = BeautifulSoup(html, "lxml")
    cid = str(soup.select("#bofqi")[0]).split("cid=")[-1].split("&")[0]
    return cid


# 获取B站弹幕XML
def get_danmu_xml(cid):
    url = danmu_format.format(cid)
    xml = requests.get(url).content.decode('utf-8')
    return xml


# 获取弹幕文本
def get_danmu_text(xml):
    root = et.fromstring(xml)
    list = []
    for i in root.findall('d'):
        list.append(i.text)
    text = " ".join(list)
    return text


# jieba 分词
def cut_text(text):
    # 默认精准模式
    list = jieba.cut(text)
    words = " ".join(list)
    return words


# 制作词云图片
def word_cloud(words):
    color_mask = np.array(Image.open(os.path.join(os.path.dirname(__file__), mask_file)))
    wc = WordCloud(font_path=os.path.join(os.path.dirname(__file__), font_file),  # 字体文件的路径
                   background_color='white',  # 设置底色white or black
                   mask=color_mask,  # 设置背景图片
                   stopwords=STOPWORDS.add("said"),  # 屏蔽词
                   max_words=5000,  # 最大词数
                   max_font_size=40,  # 字体最大值
                   prefer_horizontal=0.9,  # 水平出现的频率
                   relative_scaling=0.25,  # 词频和字体大小的相对比例
                   scale=2  # 图像间的比例
                   )
    wc.generate(words)  # 从文本中生成词云
    image_colors = ImageColorGenerator(color_mask)  # 从背景图片生成颜色值
    word_cloud = wc.recolor(color_func=image_colors)  # 现有输出重新着色
    wc.to_file(save_file)  # 输出到文件
    return word_cloud


# 显示图片
def show_img(img):
    plt.figure()
    plt.imshow(img)
    plt.axis("off")
    plt.show()


if __name__ == '__main__':
    if len(sys.argv) > 1:
        id = sys.argv[1]
    else:
        id = "av17231855"
    # 从B站视频地址获取弹幕id
    cid = get_danmu_cid(id)
    # 获取B站弹幕XML
    xml = get_danmu_xml(cid)
    # 获取弹幕文本
    text = get_danmu_text(xml)
    # jieba 分词
    words = cut_text(text)
    # 制作词云图片
    mask_file = mask_format.format("love.jpg")
    save_file = save_format.format(id)
    img = word_cloud(words)
    # show_img(img)
