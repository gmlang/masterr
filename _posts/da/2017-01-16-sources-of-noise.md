---
layout: post
title: "Sources of Noise That Cause Poor Model Performance"
date: 2017-01-16 
comments: true
categories: da
keywords: "da mondays, noise, model quality, model performance, errors, noise source"
published: true
share: true
ads: true

---

There's signal and there's noise. When building a predictive model, we like signal and we hate noise. Here're the common sources of noise in most data sets. 

* Noise in the predictors or the response (e.g., labeling errors) that are caused by underlying measurement systems.
* Inclusion of non-informative predictors.

It's really hard to combat the first kind of noise, especially when they occur systemically. We can try to eliminate the second type of noise by filtering out predictors that have no relationship with the response before model building or choose models that can automatically filter out the irrelevant predictors. 