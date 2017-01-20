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

Previously, I introduced the ezplot package and [demoed how to use it to make nice looking ggplot2 bar charts easily and quickly](http://masterr.org/r/an-easy-way-to-make-ggplot2-plots-ezplot-part1/).   Today, I'm going to show you how to make nice looking boxplots. Once again, the code is super simple.

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

#### The ezplot package comes with a films dataset obtain from IMBD.com, and I'll use it to demo boxplots. 

First, let's draw boxplots of budget vs. years. 

{% highlight r %}
# call the films dataset make a function that will draw boxplots 
# using the variables in the films data set
plt = mk_boxplot(films)

# plot distributions of budget over the years
title1 = "Annual Distribution of Budget from 1913 to 2014"
p = plt("year_cat", "budget", ylab="budget", main=title1)
print(p)
{% endhighlight %}

![center](/../figs/2015-04-26-an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/unnamed-chunk-2-1.png) 

We see the y-axis tick labels are expressed in scientific notations. This makes it difficult to read. We can use the comma scale on the y-axis, which will display the numbers in 000,000 format.

{% highlight r %}
scale_axis(p, "y", scale = "comma")
{% endhighlight %}

![center](/../figs/2015-04-26-an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/unnamed-chunk-3-1.png) 

We also observe that all the boxes are squashed down, indicating budget is heavily right-skewed. We can use either the log scale or the log10 scale on the y-axis. Once again, this can be easily done using the function `scale_axis()`.

{% highlight r %}
scale_axis(p, "y", scale = "log")
{% endhighlight %}

![center](/../figs/2015-04-26-an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/unnamed-chunk-4-1.png) 

{% highlight r %}
scale_axis(p, "y", scale = "log10")
{% endhighlight %}

![center](/../figs/2015-04-26-an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/unnamed-chunk-4-2.png) 

I'm writing a book called ezplot: How to Easily Make ggplot2 Graphics for Data Analysis, and it is 20% complete. [Take a sneak peek](https://leanpub.com/ezplot) and get notified when the book is published.
