---
layout: post
title: "Install XGBoost on Mac"
date: 2017-01-18 2:24:00 -0400
comments: true
categories: r
keywords: "R, xgboost multi-thread Mac OSX El Capitan installation, gradient boosting, GBM"
published: true
share: true

---

[XGBoost](https://xgboost.readthedocs.io/en/latest/) is probably the most cutting-edge and optimized implementation of the gradient boosting algorithms. If you're a R user, you probably used GBM in the past. XGBoost is generally over 10 times faster than GBM. Unfortunately, its official installation document for R users on a Mac OS isn't clear. In this post, I'm going to walk you through how to install the multi-thread version of the XGBoost R package on a Mac OS X El Capitan. You want the multi-thread version because you want to have the option of using more than 1 core of your machine simultaneously to run the algorithms in parallel.

Step 1. Open up your terminal and run the following cmd.

1. install gcc-6.x.x with openmp. This can take a while (~ 30 minutes).

`brew install gcc --without-multilib`

2. clone the repository.

`git clone --recursive https://github.com/dmlc/xgboost`

3. build xgboost.

`cd xgboost; cp make/config.mk ./config.mk; make -j4`

4. make an empty Makevars file and open it.

```
mkdir ~/.R

touch ~/.R/Makevars

open -a TextEdit ~/.R/Makevars

```

5. paste the following into the Makevars file

```
CC = gcc-6
CXX = g++-6
CXX1X = g++-6

SHLIB_OPENMP_CFLAGS = -fopenmp
SHLIB_OPENMP_CXXFLAGS = -fopenmp
SHLIB_OPENMP_FCFLAGS = -fopenmp
SHLIB_OPENMP_FFLAGS = -fopenmp

```

6. save and close the file.

Step 2. Open Rstudio and install the xgboost package.

`install.packages("xgboost")`

Done! Now you can start with some [tutorials](https://xgboost.readthedocs.io/en/latest/tutorials/index.html). 