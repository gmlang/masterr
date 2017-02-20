---
layout: post
title: "Data Characteristics"
date: 2017-02-20
comments: true
categories: da
keywords: "R, data characteristics, continuous, categorical, response, outcome, predictors, missing values, sparse, unbalanced"
published: true
share: true
ads: true

---

The most basic setup of a dataset consists of one response variable (also called outcome, target, or dependent variable) and a bunch of predictors (also called attributes, features, or independent variables).

When looking at the response, remember to ask yourself:

* Is it categorical or continuous?
* Is it balanced/symmetric or unbalanced/skewed?
* Are its values independent? For example, if you have repeated measures for each subject, then the measured values for the same subject are not independent, and they are correlated. 

When looking at the predictors, remember to ask yourself:

* Are they categorical or continuous?
* Is this predictor count data?
* Does this predictor have any missing values?
* Is this predictor sparse?
* Are there any correlations among the predictors?
* What's the unit of this predictor? 
* Do the predictors have different scales?
