---
layout: post
title: "How to check normality of a continuous variable, ezplot - Part 5"
date: 2015-06-07 
comments: true
categories: r
keywords: "R, ezplot, histogram, density plots, boxplot, check normality, qq plot, normal Q-Q plot"
published: true
share: true
ads: true
---

### Updated October 4, 2018

In an earlier post, I showed you how easy it is to make high quality [histograms](https://masterr.org/r/an-easy-way-to-make-ggplot2-histograms-ezplot-part3/) and [boxplots](https://masterr.org/r/an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/) using ezplot. When we're analyzing a continuous variable, we often want to check if it's normally distributed. Q-Q plot is a good tool to do that.

Make sure you first install ezplot by running the command `devtools::install_github("gmlang/ezplot")`.

{% highlight r %}
library(ezplot)
library(dplyr)
{% endhighlight %}

We'll use the cars dataset, which comes with the base R distribution. It has 
two variables, `speed` and `dist`. Both are continuous. Let's first create a 
normal Q-Q plot for `dist`.

{% highlight r %}
plt = mk_qqplot(cars)
p = plt("dist", detrend = F)
square_fig(p)
{% endhighlight %}

![center](/../figs/2015-06-07-how-to-check-normality-of-a-continuous-variable-ezplot-part5/unnamed-chunk-2-1.png)

We see `dist` is approximately normal because most of the data points are aligned 
linearly along the 45 degree diagonal line and within the confidence band. Next, 
we make a detrended normal Q-Q plot for `speed` and observe it's also 
normally distributed because all data points are randomly scattered around 
$y = 0$ and within the confidence band.  

{% highlight r %}
plt("speed")
{% endhighlight %}

![center](/../figs/2015-06-07-how-to-check-normality-of-a-continuous-variable-ezplot-part5/unnamed-chunk-3-1.png)

If you liked these how-to blog posts, you may want to check out my [ezplot](https://leanpub.com/ezplot) book. 
