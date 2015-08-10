---
layout: post
title: "How to easily make stacked area chart with ezplot - Part 9"
date: 2015-08-09 15:51:49 -0400
comments: true
categories: R
keywords: "R, ezplot, ggplot, ggplot2, stacked area charts, continuous x-axis"
published: true
share: true

---

Stacked area chart isn't something I use often. However, I see Economists use it a lot. For example, if you open the book <a href="http://www.amazon.com/gp/product/067443000X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=067443000X&linkCode=as2&tag=cabaceo-20&linkId=VFX64EPFR3YKA7OG">Capital in the Twenty-First Century</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=cabaceo-20&l=as2&o=1&a=067443000X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />, you'll find many stacked area charts. By the way, it's a thought-provoking book. A stacked area chart is the continuous analog of a stacked bar chart. We can use it to show how different components of the whole vary over time. The reason I don't like it is because as you move up the stacks, it becomes increasingly hard to see the patterns. Therefore, it's very important
to choose the order in which the different components are stacked. Nonetheless, I added a function `mk_areaplot()` to the ezplot package. This function can save you a lot of time in case you ever need to make a stacked area chart. Let's see how to use it.

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

# we also need to load the following libraries for some data wrangling
library(dplyr)
library(tidyr)
{% endhighlight %}

The ezplot package includes a dataset of annual online advertising revenues between 2000 and 2014, broken down by 13 different revenue channels. We'll make a stacked area chart to show how each type of revenue progressed from 2000 to 2014.

#### First, we need to change the data to long format.

{% highlight r %}
# original data
str(ads)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	15 obs. of  13 variables:
##  $ year           : int  2014 2013 2012 2011 2010 2009 2008 2007 2006 2005 ...
##  $ search         : num  18.8 18.4 16.8 14.9 11.7 ...
##  $ mobile         : num  12.38 7.28 3.29 1.59 0.78 ...
##  $ banner         : num  7.92 8.13 7.69 6.66 5.98 4.99 4.91 4.45 3.72 2.5 ...
##  $ digital_video  : num  3.47 3 2.2 1.9 1.3 0.91 0.7 0.42 0 0 ...
##  $ classifieds    : num  2.48 2.57 2.56 2.54 2.6 2.27 3.28 3.39 3.04 2.13 ...
##  $ lead_generation: num  1.98 1.71 1.83 1.59 1.3 1.36 1.64 1.48 1.35 0.75 ...
##  $ rich_media     : num  1.49 1.28 1.1 1.27 1.56 1.59 1.64 1.7 1.18 1 ...
##  $ sponsorship    : num  0.99 0.86 0.73 1.27 0.78 0.45 0.47 0.64 0.51 0.63 ...
##  $ email          : num  0 0 0 0.32 0.26 0.23 0.47 0.42 0.34 0.25 ...
##  $ referals       : num  0 0 0 0 0 0 0 0 0 0 ...
##  $ slotting_fees  : num  0 0 0 0 0 0 0 0 0 0.13 ...
##  $ other          : num  0 0 0 0 0 0 0 0 0 0 ...
{% endhighlight %}



{% highlight r %}
# wide format to long format
dat = ads %>% gather(type, rev, -year)
str(dat)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	180 obs. of  3 variables:
##  $ year: int  2014 2013 2012 2011 2010 2009 2008 2007 2006 2005 ...
##  $ type: Factor w/ 12 levels "search","mobile",..: 1 1 1 1 1 1 1 1 1 1 ...
##  $ rev : num  18.8 18.4 16.8 14.9 11.7 ...
{% endhighlight %}



{% highlight r %}
head(dat)
{% endhighlight %}



{% highlight text %}
##   year   type   rev
## 1 2014 search 18.81
## 2 2013 search 18.40
## 3 2012 search 16.84
## 4 2011 search 14.90
## 5 2010 search 11.70
## 6 2009 search 10.67
{% endhighlight %}



{% highlight r %}
tail(dat)
{% endhighlight %}



{% highlight text %}
##     year  type  rev
## 175 2005 other 0.00
## 176 2004 other 0.00
## 177 2003 other 0.00
## 178 2002 other 0.00
## 179 2001 other 0.00
## 180 2000 other 0.25
{% endhighlight %}

#### Next, we can easily draw a stacked area chart using `mk_areaplot()`.

{% highlight r %}
plt = mk_areaplot(dat)
p = plt("year", "rev", fillby = "type", ylab = "Revenue (in Billions of USD)",
        main = "Internet Advertising Revenue")

# make x-axis look nice and use brewer colors instead of default
p + ggplot2::scale_x_continuous(limit = c(2000, 2014),
                                breaks = seq(2000, 2014, 2)) +
        ggplot2::scale_fill_brewer(palette = "Set3")
{% endhighlight %}

![center](/../figs/2015-08-09-how-to-easily-make-stacked-area-chart-with-ezplot-part9/unnamed-chunk-3-1.png) 

We can also visualize the percentage of each revenue channel over the years.

#### First, we calculate the percentages of the revenue channels for each year.

{% highlight r %}
dat2 = dat %>% group_by(year) %>% mutate(total = sum(rev), pct = rev / total)
head(dat2)
{% endhighlight %}



{% highlight text %}
## Source: local data frame [6 x 5]
## Groups: year
## 
##   year   type   rev total       pct
## 1 2014 search 18.81 49.52 0.3798465
## 2 2013 search 18.40 43.23 0.4256303
## 3 2012 search 16.84 36.24 0.4646799
## 4 2011 search 14.90 32.04 0.4650437
## 5 2010 search 11.70 26.26 0.4455446
## 6 2009 search 10.67 22.47 0.4748554
{% endhighlight %}

#### Next, we run the same code, replacing "rev" by "pct".

{% highlight r %}
plt = mk_areaplot(dat2)
p = plt("year", "pct", fillby = "type", 
        main = "Percent of Overall Online Ads Revenue")

# change the y-axis to display percent instead of decimals
p = scale_axis(p, "y", scale = "pct")
p + ggplot2::scale_x_continuous(limit = c(2000, 2014), 
                                breaks = seq(2000, 2014, 2)) +
        ggplot2::scale_fill_brewer(palette = "Set3")
{% endhighlight %}

![center](/../figs/2015-08-09-how-to-easily-make-stacked-area-chart-with-ezplot-part9/unnamed-chunk-5-1.png) 

I created [ezplot](https://github.com/gmlang/ezplot) because there are too many detailed commands to remember when making and customizing a ggplot. I hope ezplot can improve your productivity. If you enjoyed reading this post, please share it with your friends. 
