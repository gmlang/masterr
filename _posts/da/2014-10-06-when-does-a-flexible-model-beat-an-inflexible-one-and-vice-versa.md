---
layout: post
title: "When Does A Flexible Model Beat An Inflexible One and Vice Versa"
date: 2014-10-06 10:13:17 -0400
comments: true
categories: da
keywords: "when does a flexible statistical learning method perform better than an inflexible one, when does an inflexible statistical learning method perform better than a flexible one"
published: true
share: true
ads: true

---
Machine Learning or Statistical Learning methods fall into a spectrum according to their flexibility. At the left end of the spectrum, for example, when dealing with a regression problem where the response variable is quantitative, you have lasso and linear regression, which are very restrictive and hence inflexible since they impose a linear structure onto what the true model looks like. Moving to the right, you have splines models which allow non-linearity, and hence are more flexible. Similarly, when facing a classification problem where the response variable is qualitative, you can use $$k$$-nearest neighbors (KNN) algorithm, where a bigger $$k$$ corresponds to a less flexible model. When $$k=1$$, the model is the most flexible.

In general, the more flexible your model is, the less bias (in absolute value) and the more variance you'll get when predicting on a test dataset. Because your goal is to minimize the sum of the squared bias and the variance, you're really facing a tradeoff problem between the bias and the variance. In some situations, a more flexible model will perform better than a less flexible one. In other situations, an inflexible model will produce a smaller overal test error than a more flexible one. Here's a list of four common situations. For each situation, can you generally expect whether a flexible model will perform better or worse than an inflexible model?

1. The sample size is large and the number of predictors is small.
2. The number of predictors is large and the sample size is small.
3. The relationship between the predictors and response is highly non-linear.
4. The variance of the errors is large.

Here're my answers:

1. A flexible model will perform better in general. Because of the large sample size, we're less likely to overfit even when using a more flexible model. Meanwhile, a more flexible model tends to reduce bias. 
2. An inflexible model will perform better in general. A flexible model will cause overfitting because of the small sample size. This usually means a bigger inflation in variance and a small reduction in bias.
3. A flexible model will perform better in general because it'll be necessary to use a flexible model to find the non-linear effect.
4. An inflexible model will perform better in general. Because a flexible model will capture too much of the noise in the data due to the large variance of the errors. 