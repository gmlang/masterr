---
layout: post
title: "An Easy Way to Make Ggplot2 Histograms and Density Plots, ezplot - Part 3"
date: 2015-05-07
comments: true
categories: r
keywords: "R, ggplot, ggplot2, ezplot, histograms and density plots"
published: true
share: true
ads: true
---

### Updated October 4, 2018

Previously, I gave examples of ezplot [barcharts](https://masterr.org/r/an-easy-way-to-make-ggplot2-plots-ezplot-part1/) and [boxplots](https://masterr.org/r/an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/). In today's post, I'll discuss two common charts for displaying distributions of numeric variables, namely, the histogram and the density plot. By the end of this article, you'll know how to make sophisticated histograms and density plots using ezplot. And once again, you'll be amazed how simple it is. Let's get started.

#### Load ezplot

Make sure you first install ezplot by running the command `devtools::install_github("gmlang/ezplot")`.

{% highlight r %}
library(ezplot)
library(dplyr)
{% endhighlight %}

#### Histogram

First, we pass the `iris` data frame into the function `mk_histogram()` to get a plotting function that for drawing histograms of any numeric variables in `iris`. 

{% highlight r %}
plt = mk_histogram(iris)
{% endhighlight %}

If you haven't noticed, all the `mk_xxx()` functions in ezplot takes one and only one argument, namely, a data frame. They all return plotting functions that take names of variables from the data frame as input. This design came from the simple idea that [functions can return functions](https://masterr.org/r/functions-that-return-functions-part-2/). 

Let's draw a histogram for `Sepal.Length`.

{% highlight r %}
plt("Sepal.Length")
{% endhighlight %}

![center](/../figs/2015-05-07-an-easy-way-to-make-ggplot2-histograms-ezplot-part3/unnamed-chunk-3-1.png)

{% highlight r %}
# adjust bin width
plt("Sepal.Length", binw = 0.2)
{% endhighlight %}

![center](/../figs/2015-05-07-an-easy-way-to-make-ggplot2-histograms-ezplot-part3/unnamed-chunk-3-2.png)

{% highlight r %}
# remove the vertical line at the mean
plt("Sepal.Length", add_vline_mean = F)
{% endhighlight %}

![center](/../figs/2015-05-07-an-easy-way-to-make-ggplot2-histograms-ezplot-part3/unnamed-chunk-3-3.png)

#### Density plots

Density plots and histograms are twins. They show the same information. In ezplot, we use
the `mk_densityplot()` function to make density plots. For example, let's make a density plot for `Sepal.Length`.

{% highlight r %}
plt = mk_densityplot(iris)
plt("Sepal.Length")
{% endhighlight %}

![center](/../figs/2015-05-07-an-easy-way-to-make-ggplot2-histograms-ezplot-part3/unnamed-chunk-4-1.png)

{% highlight r %}
# don't remove tails
plt("Sepal.Length", cut_tail = 0)
{% endhighlight %}

![center](/../figs/2015-05-07-an-easy-way-to-make-ggplot2-histograms-ezplot-part3/unnamed-chunk-4-2.png)

The iris data has a variable called "Species". Wouldn't it be nice if we can see how Sepal Length is distributed across different Species? This is super easy to do with ezplot.

{% highlight r %}
plt("Sepal.Length", yvar = "Species")
{% endhighlight %}



{% highlight text %}
## Picking joint bandwidth of 0.181
{% endhighlight %}

![center](/../figs/2015-05-07-an-easy-way-to-make-ggplot2-histograms-ezplot-part3/unnamed-chunk-5-1.png)

I made [ezplot](https://leanpub.com/ezplot) out of the frustration that there are too many details to remember when customizing a ggplot. It has greatly improved my productivity. Please drop a comment below if you have questions.
