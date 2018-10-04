---
layout: post
title: "An Easy Way to Make Ggplot2 Plots, ezplot - Part 1"
date: 2015-04-21 
comments: true
categories: r
keywords: "R, ggplot, ggplot2, ezplot, barchart, barplot"
published: true
share: true
ads: true
---

### Updated October 4, 2018

Do you love [ggplot2](http://ggplot2.org)? If you've worked with ggplot2 before, you know 
it often takes many lines of code to get a satisfying plot. The ggplot2 language has too many "words" and "expressions", which are difficult to remember and time consuming to look up. Wouldn't it be awesome if there's a simpler tool? The answer is [ezplot](https://github.com/gmlang/ezplot). It's a package based off ggplot2 that allows user to create high quality ggplot2 charts with zero or minimal effort of customization. In this and the next few posts, I'll demo how to use ezplot.

#### Prerequisites
1. Install a set of development tools
* On Windows, download and install [Rtools](http://cran.r-project.org/bin/windows/Rtools/). 
* On Mac, install the [Xcode command line tools](https://developer.apple.com/downloads). 
* On Linux, install the R development package, usually called **r-devel** or **r-base-dev**.
2. Install devtools by running `install.packages("devtools")` in R.
3. Install ezplot by running `devtools::install_github("gmlang/ezplot")` in R.

#### Load ezplot and dplyr

{% highlight r %}
library(ezplot)
library(dplyr)
{% endhighlight %}

#### Generate some fake data

{% highlight r %}
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

#### Make simple bar chart

{% highlight r %}
plt = mk_barplot_resp(df)
plt("student", "grade", label_decimals = 0) 
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-3-1.png)

{% highlight r %}
plt("student", "pct", show_pct = T) 
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-3-2.png)

#### Generate some fake data again

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
{% endhighlight %}

#### Make dodged bar chart

{% highlight r %}
# plot val 
plt = mk_barplot_resp(df2)
plt("group", "val", fillby = "level") 
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-5-1.png)

{% highlight r %}
# calc pct of val of each level within each group
dat = df2 %>% group_by(group) %>% mutate(pct = val / sum(val))

# plot pct
plt = mk_barplot_resp(dat)
plt("group", "pct", fillby = "level", show_pct = T)
{% endhighlight %}

![center](/../figs/2015-04-21-an-easy-way-to-make-ggplot2-plots-ezplot-part1/unnamed-chunk-5-2.png)

I wrote ezplot to improve efficiency. Hope it can also help you. Drop a comment below if you have any questions. 
