#coding:utf-8
import pylab as pl
import numpy as np
from scipy import stats
from scipy.special import comb, perm
import math


n=16
p=1/3
print(p)
#k=np.arange(15,16)
#binomail = stats.binom.pmf(k,n,p)
#print(binomail)
print( comb(15, 12)*math.pow( perm(3, 1), 3))
print(math.pow( perm(3, 1), 15))
res=comb(15, 12)/math.pow( perm(3, 1), 15 )
print(res*100)
print(math.pow( 1/3, 12)*comb(15, 12))


