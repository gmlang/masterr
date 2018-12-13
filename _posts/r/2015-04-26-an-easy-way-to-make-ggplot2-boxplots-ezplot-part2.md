---
layout: post
title: "An Easy Way to Make Ggplot2 Boxplots, ezplot - Part 2"
date: 2015-04-26 
comments: true
categories: r
keywords: "R, ggplot, ggplot2, ezplot, boxplot"
published: true
share: true
ads: true
---

### Updated October 4, 2018

Previously, I introduced the ezplot package and [showed how to use it to make high quality bar charts](https://masterr.org/r/an-easy-way-to-make-ggplot2-plots-ezplot-part1/). Today, I'm going to show you how to make boxplots using ezplot. Once again, it's super simple.

#### Load ezplot

Make sure you first install ezplot by running the command `devtools::install_github("gmlang/ezplot")`.

{% highlight r %}
library(ezplot)
library(dplyr)
{% endhighlight %}

#### Draw boxplots. 

The ezplot package comes with a films dataset obtained from IMBD.com. Let's 
draw a boxplot of `budget` vs. `year_cat`. 

{% highlight r %}
plt = mk_boxplot(films) # plt() is a function that can produce boxplot 

# plot distributions of budget over the years
p = plt("year_cat", "budget") 
print(p)
{% endhighlight %}

![center](/../figs/2015-04-26-an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/unnamed-chunk-2-1.png)

We see the y-axis tick labels are in scientific notations, which makes it difficult to look at. We can use the dollar scale instead.

{% highlight r %}
scale_axis(p, scale = "dollar")
{% endhighlight %}



{% highlight text %}
## Scale for 'y' is already present. Adding another scale for 'y', which
## will replace the existing scale.
{% endhighlight %}

![center](/../figs/2015-04-26-an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/unnamed-chunk-3-1.png)

Notice that all boxes are squashed down, indicating budget is heavily right-skewed. To remedy this, we can use the log10 scale on the y-axis. 

{% highlight r %}
scale_axis(p, scale = "log10")
{% endhighlight %}



{% highlight text %}
## Scale for 'y' is already present. Adding another scale for 'y', which
## will replace the existing scale.
{% endhighlight %}

![center](/../figs/2015-04-26-an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/unnamed-chunk-4-1.png)

Please drop a comment below if you have questions.
