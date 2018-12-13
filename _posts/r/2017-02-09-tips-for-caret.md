---
layout: post
title: "Tips for Caret"
date: 2017-02-09 
comments: true
categories: r
keywords: "R, caret, tips, resampling, probability threshold optimization, preProcess, Optimizing probability thresholds for class imbalances"
published: true
share: true
ads: true
---

We all love the caret package because it has made training predictive models so much easier. However, if you're new to caret, there're some things you probably don't know but should know. Here's a list.

* When using a resampling approach inside `caret::train()`, for example, 10 fold cross validation with 5 repeats, the returned object contains the model trained using the best tuning parameters and on the entire training dataset (not just the resampled dataset). In other words, it'll return the production model that you can just use directly to predict on the validation or holdout set. No need to re-fit yourself.
* Do pre-processing by specifying the `preProcess` argument of the `caret::train()` function. This will perform the specified pre-processing steps during the resampling process. Here's a pop quiz. Why don't you want to perform pre-processing outside of the resampling process? Hint: there're two major reasons. Doing pre-processing this way will also enable the same pre-processing steps to be applied to the validation set when applying the best model resulted from `caret::train()` to it.
* For binary classification problems, we often also need to choose the optimal probability threshold for deciding the classes. You should write self-defined functions to incorporate the search of optimal threshold into the resampling process. As a result, the optimal threshold will be amongst the best parameters returned by `caret::train()`. Here's an [example](https://topepo.github.io/caret/using-your-own-model-in-train.html#Illustration5) of the self-defined functions for random forest. 
