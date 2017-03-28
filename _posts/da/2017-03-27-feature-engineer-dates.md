---
layout: post
title: "How to Feature Engineer Dates"
date: 2017-03-27
comments: true
categories: da
keywords: "da, feature engineering, dates, data preprocess, data cleaning, seasonality"
published: true
share: true
ads: true

---

Feature engineering is almost situational because generating useful features for prediction purpose often require deep domain knowledge and familiarity with the data at hand. But Having dates (of the format mm-dd-yyyy for example) occuring in a data set is typical, and there're at least three ways of feature engineering a date variable: 

* Calculate the number of days since a reference date.
* Extract the year, quarter, month, week, and day as separate features. Year, quarter, month and week can be used as grouping variable or seasonality component to be removed from the model.
* Calculate the numeric day of the year. For example, March 27, 2017 is 86th day of the year 2017. In orther words, its numeric day of the year is 86. If it appears that there's a seasonal component to the data, the numeric day of the year is the best.

As an example, see how Hadley feature engineered his date variables in this [talk](https://www.rstudio.com/resources/webinars/pipelines-for-data-analysis-in-r/).