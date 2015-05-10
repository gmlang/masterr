---
layout: post
title: "An Easy Way to Make Ggplot2 Plots, ezplot - Part 1"
date: 2015-04-21 14:04:49 -0400
comments: true
categories: R
keywords: "R, ggplot, ggplot2, ezplot, barchart, barplot"
published: true
share: true

---

Do you love [ggplot2](http://ggplot2.org) plots? If you've worked with ggplot2 before, you know that to get a satisfying plot, you often need to use many detailed ggplot2 syntaxes, which are difficult to remember and time consuming to look up. Wouldn't it be awesome if there're simpler and intuitive syntaxes? The answer is yes and the package [ezplot](https://github.com/gmlang/ezplot) does exactly that. In this and the next few posts, I'll demo how to use ezplot.

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

#### Make some fake data

{% highlight r %}
# make some data
df = read.table(header=TRUE, text='
student grade
Joe 90
Mary 75
Alex 50')
df$pct = df$grade / sum(df$grade)
print(df)
{% endhighlight %}



{% highlight text %}
##   student grade       pct
## 1     Joe    90 0.4186047
## 2    Mary    75 0.3488372
## 3    Alex    50 0.2325581
{% endhighlight %}

#### Create simple barplots

{% highlight r %}
barplt = mk_barplot(df)
barplt("student", "grade", "student") 
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-3-1.png) 

{% highlight r %}
barplt("student", "grade", "student", legend=F) 
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-3-2.png) 

{% highlight r %}
p = barplt("student", "pct", "student", legend=F) 
scale_axis(p, use_pct=T)
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-3-3.png) 

{% highlight r %}
scale_axis(p, use_pct=T, pct_jump=0.3)
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-3-4.png) 

#### Make some fake data again

{% highlight r %}
df2 = read.table(header=TRUE, text='
group level val
A      small 1.8
A      medium 2.2
A      large 1.5
B      small 2.0
B      medium 2.6
B      large 1.0
C      small 2.5
C      medium 1.3
C      large 2.9')

# Calculate the percentage of the levels within each group
library(tidyr)
library(dplyr)

pct = df2 %>% spread(level, val)
temp = pct[, 2:4]
pct = cbind(group=pct[, 1], temp / apply(temp, 1, sum))
pct = pct %>% gather(level, pct, -group)
pct$level = factor(pct$level, levels=c("small", "medium", "large"))
{% endhighlight %}

#### Make stacked barplots

{% highlight r %}
# display counts
barplt = mk_barplot(df2)
barplt("group", "val", "level") 
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-5-1.png) 

{% highlight r %}
# display percentages
barplt = mk_barplot(pct)
p = barplt("group", "pct", "level")
p = scale_axis(p, use_pct=T)
print(p)
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-5-2.png) 

{% highlight r %}
# use color-blind friendly palettes
cbPalette = palette("cb_gray")
p + ggplot2::scale_fill_manual(values=cbPalette)
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-5-3.png) 

{% highlight r %}
# use customized palettes
red = palette("red")
purple = palette("purple")
green = palette("green")
p + ggplot2::scale_fill_manual(values=c(red, purple, green))
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-5-4.png) 

I'm the creator of ezplot, if you have any questions, just drop a comment below. 