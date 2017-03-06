---
layout: post
title: "Data Preprocessing and Linear Regression"
date: 2017-03-06
comments: true
categories: da
keywords: "da, data science concept, data preprocessing, linear regression"
published: true
share: true
ads: true
---

This article summarizes data preprocessing steps when using linear regression for prediction purpose.

1. Separate y and X, where y is continuous and X has both continuous and categorical variables, and the categorical variables are NOT encoded as dummy binary variables.
2. Preprocess y: check if it's symmetric or normally distributed. If not, apply Box-Cox (if y has all positive values) or Yeo-Johnson or Manly's exponential (if y has both positive and negative values) transformation.
3. Preproces X in this order (apply these operations only to continuous features if not explicitly mentioned otherwise): 
	* remove linear dependency
	* remove constant features (both continuous and categorical one)
	* remove near zero variance features (situational)
	* remove highly correlated features (situational)
	* apply Box-Cox, Yeo-Johnson or Manly's exponential transformation (situational)
	* center and scale (situational)
	* range (NOT used often, and cannot be done together with centering and scaling)
	* imputation (median, knn or bagged tree methods)
	* PCA (situational)
	* ICA (situational, avoid using PCA and ICA together and click [here](https://www.quora.com/What-is-the-difference-between-PCA-and-ICA) for their differences)
11) 
	* Spatial Sign Transformation (situational, use it to deal with outliers)

If you use caret to train the model, you will need to turn the categorical features into dummy variables. You don't need to do this if you use the lm function.
