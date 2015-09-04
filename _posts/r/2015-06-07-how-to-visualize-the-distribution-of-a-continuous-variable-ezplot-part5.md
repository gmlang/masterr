---
layout: post
title: "How to visualize the distribution of a continuous variable, ezplot - Part 5"
date: 2015-06-07 20:14:49 -0400
comments: true
categories: R
keywords: "R, ezplot, histogram, density plots, boxplot, check normality, qq plot, normal Q-Q plot"
published: true
share: true

---

In one of my earlier posts, I showed you how easy it is to make publish-ready [histograms](http://masterr.org/r/an-easy-way-to-make-ggplot2-histograms-ezplot-part3/) and [boxplots](http://masterr.org/r/an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/) using the ezplot package. When we're analyzing a continuous variable, we often also want to know if it's normally distributed. For example, if it's normally distributed, we may use linear regression to model it. A good way to check if a continuous variable is normal is to look at its Q-Q plot. Now, there's an ezplot function that allows you to display the histogram, boxplot, density plot and Q-Q plot all in one figure. Once again, it's super easy to use and it's really handy for exploratory analysis. Let me show you how.

#### Prerequisites
1. Install a set of development tools
* On Windows, download and install [Rtools](http://cran.r-project.org/bin/windows/Rtools/). 
* On Mac, install the [Xcode command line tools](https://developer.apple.com/downloads). 
* On Linux, install the R development package, usually called **r-devel** or **r-base-dev**.
2. Install devtools by running `install.packages("devtools")` in R.

#### Install and Load ezplot

{% highlight r %}
devtools::install_github("gmlang/ezplot")
library(ezplot)
{% endhighlight %}

#### We'll use the cars dataset, which comes with the base R distribution. It has two variables, speed and dist. Both are continuous.

{% highlight r %}
str(cars)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	50 obs. of  2 variables:
##  $ speed: num  4 4 7 7 8 9 10 10 10 11 ...
##  $ dist : num  2 10 4 22 16 10 18 26 34 17 ...
{% endhighlight %}

#### We'll plot dist first. The Q-Q plot shows that it isn't normally distributed. A normal variable would have have most of the blue dots aligned linearly along the 45 degree diagonal line connecting the bottom left corner to the upper right corner. 

{% highlight r %}
f = plt_dist(cars)
f("dist")
{% endhighlight %}

![center](/../figs/2015-06-07-how-to-visualize-the-distribution-of-a-continuous-variable-ezplot-part5/unnamed-chunk-3-1.png) 

#### We'll plot speed next. We see speed is more or less normally distributed.

{% highlight r %}
f("speed")
{% endhighlight %}

![center](/../figs/2015-06-07-how-to-visualize-the-distribution-of-a-continuous-variable-ezplot-part5/unnamed-chunk-4-1.png) 

I created ezplot out of the frustration that there are too many detailed commands to remember when customizing a ggplot. If ezplot has improved your productivity, please tell your friends about it. In addition, I'm writing a book called ezplot: How to Easily Make ggplot2 Graphics for Data Analysis, and it is 20% complete. [Read the sample chapters for FREE](https://leanpub.com/ezplot) and get notified when the book is published.
