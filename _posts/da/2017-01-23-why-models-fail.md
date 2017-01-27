---
layout: post
title: "Why Models Fail"
date: 2017-01-23 
comments: true
categories: da
keywords: "da mondays, reasons why predictive models fail"
published: true
share: true
ads: true

---

I tend to be cautious when building predictive models, and the more models I build, the more I think about possible reasons why they may fail. Here's a list. 

* Incomplete data. In practice, we often just work with whatever data we have. This is good as long as we keep in mind that the model obtained may be limited because of that and we should probably spend more time thinking about what other data we can collect. 
* Insufficient data preparation. There're a lot going on when doing data prep. For example, missing data treatment, zero-variance treatment, outlier detection, correlation treatment, feature engineering, and etc. It depends on the problem as well as on the models you will build. 
* Inadequate or erroneous backtesting. Although the general idea is to set aside a dataset for this purpose only and not to contaminate it with model training, there're many details on how to do this correctly, and things can become tricky when for example, data are collected over time.
* Overfitting to existing data. This almost surely leads to poor performance when predicting on new data. Once again, you have to be really careful when implementing strategies to prevent overfitting. Sometimes, an overlook of a tiny detail can cause unexpected overfitting. 
* Over extrapolation. This means applying the model in areas with different underlying data generation processes.