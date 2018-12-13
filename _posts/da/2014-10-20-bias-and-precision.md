---
layout: post
title: "Bias and Precision"
date: 2014-10-20 
comments: true
categories: da
keywords: "data analysis, da mondays, bias, precision"
published: true
share: true
ads: true

---
Statistics, by and large, deals with the "known unknowns." The "unknowns" have to do with the population, while samples are "known." Although it's impossible or impractical to completely get to know the population, statistics allows us to learn about it using samples. Moreover, it provides tools to measure how well we do it. There're two such measures, namely, bias and precision. Don't be scared off by these two technical words. Their meanings are actually very intuitive. Let me explain.

Imagine you have one population and one sample taken from the population. Suppose you want to know the population average. Because all you have is a sample, you naturally calculate the sample average and use it as your best guess to the population average. Born with a skeptical nature, you doubt its accurarcy because after all, it's calculated from ONE random sample. So you take another sample and calculate its sample average. Indeed, you get a different number. So you take a 3rd sample and obtain a 3rd different sample average. Half a day passes, you've taken 100 samples and calculated 100 sample averages. Your persistence has touched God deeply and right before you're about to draw the 101th sample, God told you the population average. Born with a curious nature, you say to yourself, "let me see which of the 100 samples gives the closest guess." So you start subtracting the population average from each of those 100 sample averages. You notice some differences are close to zero, some are big positive numbers, and some are big negative numbers. Your curiosity tells you to average the differences, and to your surprise, you get 0. Statisticians would say it's a *bias* of 0. In other words, sample average is an unbiased estimator of the population mean. So *bias* measures on average how close sample estimates are to the population truth. Note although I used the mean (of the population and samples) to make my point, the concept of bias doesn't depend on it. In fact, it doesn't depend on any particular summary statistic. For example, it also makes sense to talk about the bias of the median, standard deviation, correlation, and etc.

Coming back to our example, if you take the squared root of the mean squared differences between the sample averages and the population average, you'd get the *precision*. Similarly, precision doesn't depend on any particular summary statistic like the mean. It also makes sense to talk about the precision of the median, standard deviation, correlation and so on. Intuitively, *precision* measures the average spread of the sample estimates to the population truth, and hence it quantifies the accuracy of any one typical random sample estimate to the population truth. A smaller precision implies a higher accuracy and a bigger precision implies a lower accuracy. 

You may wonder, "In practice, we often don't know the value of the population parameter. How do we calculate bias and precision?" The answer lies in a method called *bootstrap*, and you can read it [here](https://masterr.org/r/an-example-of-the-bootstrap-method/).   