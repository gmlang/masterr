---
layout: post
title: "Resampling"
date: 2017-03-13
comments: true
categories: da
keywords: "da, resampling techniques, k-fold cross validation, repeated training/test splits, bootstrap, variance and bias trade-off, efficiency, when to use which resampling method"
published: true
share: true
ads: true
---

When training a model for prediction purpose, resampling is used to 

1. estimate model performance on unseen data,
2. choose the optimal tuning parameters for a particular model, and
3. choose the best model among different kinds of models.

Here're some common resampling techniques:

1. K-Fold Cross-Validation. When the outcome is categorical and imbalanced, make sure use stratified random sampling to select the k partitions in a way that makes the folds balanced with respect to the outcome. The choice of k is usually 5 or 10, and as k gets larger, the bias (difference between estimated and true values of performance) becomes smaller, the variance (repeating the resampling procedure may produce a very different value) gets larger, and the computation becomes slower.

2. Repeated Training/Test Splits. This method is also known as "leave-group-out" cross-validation or "Monte Carlo cross-validation." A rule of thumb for the percent of training subset is 75-80% and for the number of repetitions is 50-200. The more repetition, the smaller the variance and hence the more precise the estimates of model performance.

3. Bootstrap. By and large, bootstrap error rates have less uncertainty than k-fold cross-validation, but bootstrap method has bias similar to 2-fold cross-validation. The "632+ method" can be used to reduce the bias. And the bias will decrease as training set size become bigger. 

K-fold cross-validation usually has bigger variance than the other methods. Repeated k-fold cross-validation can  effectively increase the precision of the estimates while still maintaining a small bias. I find 10-fold cross-validation with 5 repeats usually works well for data of dimension less than 5,000 x 300 when using ensemble tree model implementation such as xgboost running in parallel, but the computation cost becomes too much when data size becomes larger. 

When shall we use which method? It depends. If the sample  size is small and the goal is to estimate model performance, repeated 10-fold cross-validation will work very well. If the goal is to choose amongst models, the bootstrap method will work better due to its tiny variance. For large datasets, the potential issues with variance and bias become less pronounced among different methods and computation time becomes more important, and 10-fold cross-validation is a good choice.


