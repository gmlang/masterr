---
layout: post
title: "How to easily make ggplot2 type of scatterplot, ezplot - Part 7"
date: 2015-07-27 09:29:49 -0400
comments: true
categories: R
keywords: "R, ezplot, ggplot, ggplot2, scatterplot, regression line"
published: true
share: true

---

When you have two continuous variables and want to see their relationship, you'd draw a scatterplot by putting one variable on the x-axis and the other variable on the y-axis. In this post, we'll look at how to draw scatterplots using the `mk_scatterplot()` function from the ezplot package. We'll also use the `scale_axis()` function, which allows us to easily change the scale of the x-axis or y-axis. Let's get started. 

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

#### The ezplot package comes with a films dataset containing the annual boxoffice/budget ratio between 1913 and 2014. We want to see how boxoffice is related to budget. We can make a scatterplot by putting boxoffice on the y-axis and budget on the x-axis.

{% highlight r %}
# mk_scatterplot() returns a function that we can use to draw scatterplots
plt = mk_scatterplot(films)

# draw a scatterplot
p = plt("budget", "boxoffice", xlab="budget", ylab="boxoffice",
        main="Boxoffice vs. Budget")

# use comma scale so that a number like "10000" is displayed as "10,000"
p = scale_axis(p, "y", scale = "comma")
p = scale_axis(p, "x", scale = "comma")
print(p)
{% endhighlight %}

![center](/../figs/2015-07-27-how-to-easily-make-ggplot2-scatterplot-ezplot-part7/unnamed-chunk-2-1.png) 

#### It might be more informative if we use log10 scale instead.  

{% highlight r %}
p = plt("budget", "boxoffice", xlab="budget", ylab="boxoffice", 
        pt_alpha=0.2, pt_size=1.5, add_line=T, linew=0.8)
p = scale_axis(p, "x", scale = "log10")
p = scale_axis(p, "y", scale = "log10")
print(p)
{% endhighlight %}

![center](/../figs/2015-07-27-how-to-easily-make-ggplot2-scatterplot-ezplot-part7/unnamed-chunk-3-1.png) 

Note we also changed the transparency and size of the points by passing values to the `pt_alpha` and `pt_size` arguments. And we added a regression line by setting `add_line=T` and gave it a narrower width by setting `linew=0.8`.

#### Finally, the dataset contains a variable called "made_money", indicating if a film made money or not. We can use it to separate the points into two groups, where each group has its own regression line. 

{% highlight r %}
p = plt("budget", "boxoffice", fillby="made_money", ylab="boxoffice", 
        xlab="budget", add_line=T, linew=0.5)
p = scale_axis(p, "x", scale = "log10")
p = scale_axis(p, "y", scale = "log10")

# use color-blind friendly color
red = cb_color("reddish_purple")
green = cb_color("bluish_green")
p + ggplot2::scale_color_manual(values=c(red, green))
{% endhighlight %}

![center](/../figs/2015-07-27-how-to-easily-make-ggplot2-scatterplot-ezplot-part7/unnamed-chunk-4-1.png) 

See how easy it is? All we need is to pass the name of the grouping variable,
"made_money", to the `fillby` argument. 

I created [ezplot](https://github.com/gmlang/ezplot) because there are too many detailed commands to remember when making and customizing a ggplot. If ezplot has improved your productivity, please tell your friends about it.
