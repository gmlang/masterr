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

### Install and Load ezplot

{% highlight r %}
# First install devtools if you don't already have it installed, with:
# install.packages("devtools")
devtools::install_github("gmlang/ezplot")
library(ezplot)
{% endhighlight %}

### Make some fake data

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

### Create simple barplots

{% highlight r %}
barplt = mk_barplot(df)
p = barplt("student", "grade", "student") 
{% endhighlight %}



{% highlight text %}
## Error in Scales$new: could not find function "loadMethod"
{% endhighlight %}



{% highlight r %}
print(p)
{% endhighlight %}



{% highlight text %}
## Error in print(p): object 'p' not found
{% endhighlight %}



{% highlight r %}
barplt("student", "grade", "student", legend=F) 
{% endhighlight %}



{% highlight text %}
## Error in Scales$new: could not find function "loadMethod"
{% endhighlight %}



{% highlight r %}
barplt("student", "pct", "student", legend=F, ypct=T) 
{% endhighlight %}



{% highlight text %}
## Error in Scales$new: could not find function "loadMethod"
{% endhighlight %}



{% highlight r %}
barplt("student", "pct", "student", legend=F)
{% endhighlight %}



{% highlight text %}
## Error in Scales$new: could not find function "loadMethod"
{% endhighlight %}

### Make some fake data again

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

### Make stacked barplots

{% highlight r %}
# display counts
barplt = mk_barplot(df2)
barplt("group", "val", "level") 
{% endhighlight %}



{% highlight text %}
## Error in Scales$new: could not find function "loadMethod"
{% endhighlight %}



{% highlight r %}
# display percentages
barplt = mk_barplot(pct)
p = barplt("group", "pct", "level", ypct=T)
{% endhighlight %}



{% highlight text %}
## Error in Scales$new: could not find function "loadMethod"
{% endhighlight %}



{% highlight r %}
print(p)
{% endhighlight %}



{% highlight text %}
## Error in print(p): object 'p' not found
{% endhighlight %}



{% highlight r %}
# use color-blind friendly palettes
cbPalette = palette("cb_gray")
p + ggplot2::scale_fill_manual(values=cbPalette)
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): object 'p' not found
{% endhighlight %}



{% highlight r %}
# use customized palettes
red = palette("red")
purple = palette("purple")
green = palette("green")
p + ggplot2::scale_fill_manual(values=c(red, purple, green))
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): object 'p' not found
{% endhighlight %}

I'm the creator of ezplot, if you have any questions, just drop a comment below. 
