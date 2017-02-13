---
layout: post
title: "Data Preprocessing and Xgboost"
date: 2017-02-13
comments: true
categories: da
keywords: "R, data preprocess, XGboost, zero variance predictors, near zero variance predictors, center, scaling, variable transformation, highly correlated variables, PCA, create dummy variables, imputation"
published: true
share: true
ads: true

---

We all know we need to pre-process data before we build models. However, if you're building a XGboost model, you can avoid many of the pre-processing steps. I've done some google search and book reading, and the following list summarizes my findings. 

* Remove zero or near-zero variance predictors. (Don't do it for xgboost or any tree based methods)
* Remove highly correlated predictors. (Not needed for xgboost or other tree based ensemble methods)
* BoxCox, Yeo-Johnson, exponential transformation of Manly (1976) and other type of transformations of the same spirit on the predictors. (Not needed for xgboost)
* Centering and scaling the predictors. (Not needed for xgboost)
* Missing data imputation. (Not needed for xgboost as it supports missing internally by default)
* One-hot encoding or dummy variable creation of categorical predictors (Needed for xgboost) 
* PCA (May help with performance for xgboost)

The phrase "not needed" means, by and large, doing it won't improve (or worsen) model performance.