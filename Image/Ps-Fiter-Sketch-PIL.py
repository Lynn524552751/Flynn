#!/usr/bin/python3

import sys, os
import matplotlib.pyplot as plt
from PIL import Image
import cv2

def sketch(img, thr):
    """
    素描
    param img: Image实例
    param threshold: 介于0到100
    """
    thr = max(thr, 0)
    thr =min(thr,100)

    width, height = img.size
    #grayscale mode
    # L = R * 299/1000 + G * 587/1000 + B * 114/1000
    img = img.convert('L')
    # load
    pix = img.load()
    #ergodic
    for w in range(width):
        for h in range(height):
            if w == width - 1 or h == height - 1:
                continue

            src = pix[w, h]
            dst = pix[w + 1, h + 1]
            diff = abs(src - dst)
            if diff >= thr:
                pix[w, h] = 0
            else:
                pix[w, h] = 255
    return img

if __name__ == "__main__":
    #阈值
    thr=30
    img = Image.open("demo.jpg")
    img = sketch(img, thr)
    img.save("output-PIL.jpg", 'JPEG')
    #img.show()

    img = cv2.imread("output-PIL.jpg")
    cv2.imshow("output", img)
    key = (cv2.waitKey(0) & 0xff)
    cv2.destroyAllWindows()
