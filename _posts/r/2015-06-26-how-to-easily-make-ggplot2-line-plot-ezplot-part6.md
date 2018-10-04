---
layout: post
title: "How to easily make ggplot2 type of line plot, ezplot - Part 6"
date: 2015-06-26
comments: true
categories: r
keywords: "R, ezplot, ggplot, ggplot2, time series plot, line plot"
published: true
share: true
ads: true
---

### Updated October 4, 2018

Today I'm going to show you how to make line plots using ezplot. We'll use
the `mk_lineplot()` function. Make sure you first install ezplot by running the 
command `devtools::install_github("gmlang/ezplot")`.

{% highlight r %}
library(ezplot)
library(dplyr)
{% endhighlight %}

The ezplot package comes with a films dataset containing annual boxoffice/budget 
ratios between 1913 and 2014. Let's plot these ratios over the years. 

{% highlight r %}
plt = mk_lineplot(bo_bt_ratio_by_year)
p = plt("year", "bo_bt_ratio")
add_labs(p, ylab="boxoffice/budget ratio", xlab = NULL)
{% endhighlight %}

![center](/../figs/2015-06-26-how-to-easily-make-ggplot2-line-plot-ezplot-part6/unnamed-chunk-2-1.png)

For another example, let's plot annual budget and boxoffice over the years.

{% highlight r %}
plt = mk_lineplot(btbo_by_year)
p = plt("year", "tot", "type")
add_labs(p, ylab = "USD (billion)", xlab = NULL,
         title = "Annual Budget and Boxoffice from 1913 to 2014")
{% endhighlight %}

![center](/../figs/2015-06-26-how-to-easily-make-ggplot2-line-plot-ezplot-part6/unnamed-chunk-3-1.png)

If you liked these how-to blog posts, you may want to check out my [ezplot](https://leanpub.com/ezplot) book. If ezplot has improved your 
productivity, please tell your friends about it.
