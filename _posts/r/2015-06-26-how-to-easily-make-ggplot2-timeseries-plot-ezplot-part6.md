---
layout: post
title: "How to easily make ggplot2 type of time series plot, ezplot - Part 6"
date: 2015-06-26 16:29:49 -0400
comments: true
categories: R
keywords: "R, ezplot, ggplot, ggplot2, time series plot, line plot"
published: true
share: true

---

Time series plot is commonly used and this post will show you how easy it is to make them using the `mk_lineplot()` function from the ezplot package. 

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

#### The ezplot package comes with a films dataset containing the annual boxoffice/budget ratio between 1913 and 2014. We can plot these ratios over the years. 

{% highlight r %}
plt = mk_lineplot(bo_bt_ratio_by_year)
title = "Boxoffice/Budget Ratio from 1913 to 2014"
p = plt("year", "bo_bt_ratio", ylab="boxoffice/budget ratio", main=title)
print(p)
{% endhighlight %}

![center](/../figs/2015-06-26-how-to-easily-make-ggplot2-timeseries-plot-ezplot-part6/unnamed-chunk-2-1.png) 

#### It might be more informative if we use log10 scale on the y-axis.  

{% highlight r %}
scale_axis(p, use_log10=T)
{% endhighlight %}

![center](/../figs/2015-06-26-how-to-easily-make-ggplot2-timeseries-plot-ezplot-part6/unnamed-chunk-3-1.png) 

#### We can also change the width of the line and the size of the points by passing values to the `linew` and `pt_size` arguments.

{% highlight r %}
p = plt("year", "bo_bt_ratio", ylab="boxoffice/budget ratio", main=title,
        linew=1, pt_size=2)
print(p)
{% endhighlight %}

![center](/../figs/2015-06-26-how-to-easily-make-ggplot2-timeseries-plot-ezplot-part6/unnamed-chunk-4-1.png) 

#### We can also use log scale on the y-axis.

{% highlight r %}
scale_axis(p, use_log=T)
{% endhighlight %}

![center](/../figs/2015-06-26-how-to-easily-make-ggplot2-timeseries-plot-ezplot-part6/unnamed-chunk-5-1.png) 

#### Finally, we can plot two time series and color them differently. For example, we can plot annual total budget and boxoffice over the years on the same plot.

{% highlight r %}
plt = mk_lineplot(btbo_by_year)
title = "Annual Total Budget and Boxoffice from 1913 to 2014"
plt("year", "tot", "type", ylab="total amount ($billion)", main=title)
{% endhighlight %}

![center](/../figs/2015-06-26-how-to-easily-make-ggplot2-timeseries-plot-ezplot-part6/unnamed-chunk-6-1.png) 

I created [ezplot](https://github.com/gmlang/ezplot) because there are too many detailed commands to remember when making and customizing a ggplot. If ezplot has improved your productivity, please tell your friends about it.
