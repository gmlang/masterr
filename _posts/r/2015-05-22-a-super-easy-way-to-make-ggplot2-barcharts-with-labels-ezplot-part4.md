---
layout: post
title: "A Super Easy Way to Make Ggplot2 Bar Charts with Labels, ezplot - Part 4"
date: 2015-05-22 
comments: true
categories: r
keywords: "R, ggplot, ggplot2, ezplot, bar plots, bar charts, bar charts with labels, label the bars, bars with labels"
published: true
share: true
ads: true
---

### Updated October 4, 2018

Previously, I showed how to use the `mk_barplot_resp()` function to make [bar charts](http://masterr.org/r/an-easy-way-to-make-ggplot2-plots-ezplot-part1/). 
In this post, I'll show you how to use the `mk_barplot_freq()` function.

Make sure you first install ezplot by running the command `devtools::install_github("gmlang/ezplot")`.

{% highlight r %}
library(ezplot)
library(dplyr)
{% endhighlight %}

We'll use the diamonds data in the ggplot2 package. 

{% highlight r %}
plt = mk_barplot_freq(ggplot2::diamonds)
{% endhighlight %}

Let's make a bar chart to show the frequency distribution of the clarities.
Notice the bars are automatically labeled with both counts and percents.

{% highlight r %}
plt("clarity")
{% endhighlight %}

![center](/../figs/2015-05-22-a-super-easy-way-to-make-ggplot2-barcharts-with-labels-ezplot-part4/unnamed-chunk-3-1.png)

We can also choose to show relative frequencies (%) on the y-axis. Just set
`show_pct = TRUE`

{% highlight r %}
plt("clarity", show_pct = TRUE)
{% endhighlight %}

![center](/../figs/2015-05-22-a-super-easy-way-to-make-ggplot2-barcharts-with-labels-ezplot-part4/unnamed-chunk-4-1.png)

If [ezplot](https://leanpub.com/ezplot) has improved your productivity, please 
share it with your friends.
