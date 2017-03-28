---
layout: post
title: "When n < p"
date: 2017-03-20
comments: true
categories: da
keywords: "da, sample size, number of predictors, multivariate regression analysis, multiple linear regression, linear discriminant analysis, partial least squares regression, recursive partitioning, regression tree, classification tree, K-nearest neighbors, KNNs, k nearest neighbors algorithm, predictive modeling, predictive analysis, predictive analytics solutions"
published: true
share: true
ads: true

---

The relationship between the number of rows (n) and the number of columns (p) is important for choosing which predictive modeling techniques to use when providing predictive analytics solutions. If n < p, there's always a risk that a relevant predictor found in the training data set will not be reproducible. In addition, some predictive modeling techniques such as multiple linear regression (and multivariate regression analysis for more than one outcome variables) or linear discriminant analysis cannot be directly used when n < p. Yet, some models such as regression tree, classification tree, random forest and the k nearest neighbors algorithm (KNNs) can be used directly when n < p.

When p is big, i.e., when there're many predictors, we're almost guaranteed to have some of them correlated. Predictive models such as partial least squares regression manages correlated predictors by default but is more stable if the predictors are on similar scales. Recursive partitioning such as tree based models has a less stable partitioning structure when facing correlated predictors but is immune to predictors of different scales. 