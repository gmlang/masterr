---
layout: post
title: "Sknewness and Kurtosis"
date: 2014-10-13 12:39:49 -0400
comments: true
categories: da
keywords: "data analysis, da mondays, sknewness, kurtosis"
published: true
share: true
ads: true

---
When analyzing a continuous variable, you often want to look at its distribution using a histogram or density plot and compare it against a benchmark distribution (a common choice is the normal distribution). In addition, you also want to quantify its shape characteristics:

1. where is the distribution centered at?
2. what is the spread about the center?
3. how symmetric/sknewed is the distribution?
4. how likely an extreme value can happen under the distribution?

People often use **mean** and **standard deviation** to answer the first two questions. To answer the last two questions, you need something called **skewness** and **kurtosis**.

## Given a continuous variable of size $$n$$, how can we calculate its skewness and kurtosis? 

1. center and scale the variable by first subtracting its mean from every value and then dividing by its standard deviation. Call the resulting variable $$y$$.
2. skewness is defined as the mean [^1] of $$y^3$$.
3. kurtosis is defined as the mean [^1] of $$y^4$$.

## Intuition behind Skewness
If the variable has more values that are much larger than the mean than smaller than the mean, its centered-and-scaled version will have more positive values than negative ones, cube them and take their mean will produce a number bigger than 0. In this case, we say the distribution is right skewed, and its density plot will show a long right tail.

On the other hand, if the variable has more values that are much smaller than the mean than larger than the mean, its centered-and-scaled version will have more negative values than positive ones, cube them and take their mean will produce a number smaller than 0. In this case, we say the distribution is left skewed, and its density plot will show a long left tail.

Finally, when a distribution is neither right or left skewed, we say it's symmetric, and its skewness would be 0. For example, the normal distribution has a skewness of 0.

## Intuition behind Kurtosis
If the variable has some extremely large or small values, its centered-and-scaled version will have some extremely big positive or negative values, raise them to the 4th power will amplify the magnitude, and all these amplified bigness contribute to the final average, which will result in some very large number. Conversely, a big kurtosis implies higher chance of getting extreme values. However, how big is big? Once again, we compare to the normal distribution, which has a kurtosis of 3. If your interested variable has a kurtosis > 3, then your variable follows a distribution under which extremely values are more likely to happen than under the normal distribution. And its density curve will have fatter tails than the normal curve.

Click [here](http://gmlang.com/r/sknewness-and-kurtosis-examples/) for some example calculations using stock market data.

[^1]: divide by (n-1) instead of n