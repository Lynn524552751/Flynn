#!/usr/bin/python3

import cv2
import numpy as np

class Image(object):
    def __init__(self, file):
        if not file is None:
            self.img = cv2.imread(file)
            self.W, self.H, _ = self.img.shape
            self.showImage("source", self.img)
        else:
            self.img = None
            #self.W, self.H, _ = 0

    def copyImage(self, img):
        self.img = np.zeros(img.shape,np.uint8)
        self.img = img.copy()

    def showImage(self, name, img):
        cv2.imshow(name, img)

    def invert (self):
        """
        反相
        """
        #out = self.img / 255
        self.img =  cv2.addWeighted(self.img,-1,255,1,0)
        self.showImage("invert", self.img)

    def gaussianBlur(self, ksize=(5, 5), sigmaX=1.5):
        """
        高斯模糊
        """
        self.img = cv2.GaussianBlur(self.img, ksize=ksize,sigmaX=sigmaX);
        self.showImage("gaussianBlur", self.img)

    def cvtColor(self, code=cv2.COLOR_BGR2GRAY):
        """
        转换
        """
        self.img = cv2.cvtColor(self.img,code=cv2.COLOR_BGR2GRAY);
        self.showImage("cvtColor", self.img)

    def colorDodge(self,a,b):
        """
        颜色减淡
        """
        width, height = self.img.shape
       # for x in range(width):
        #    for y in range(height):
        #        a1 = a.img[x,y]
        #        b1 = b.img[x,y]
                #self.img[x,y] =  min(int(a1 + (a1 * b1) / (255 - b1)),255)
        self.img = np.minimum((a.img + (a.img * b.img) // (255 - b.img)), 255)
        self.img = np.minimum(self.img,255)
        print(self.img)
        self.showImage("colorDodge", self.img)

if __name__ == "__main__":
    img1 = Image("demo.jpg")
    img1.cvtColor(cv2.COLOR_BGR2GRAY)
    img2 = Image(None)
    img2.copyImage(img1.img)
    img2.invert()
    img2.gaussianBlur()
    img3 = Image(None)
    img3.copyImage(img1.img)
    img3.colorDodge(img1,img2)

    key = (cv2.waitKey(0) & 0xff)
    if key == ord('s'):
        cv2.imwrite(name, img)
    cv2.destroyAllWindows()
