---
layout: post
title: "A Super Easy Way to Make Ggplot2 Bar Charts with Labels, ezplot - Part 4"
date: 2015-05-22 
comments: true
categories: r
keywords: "R, ggplot, ggplot2, ezplot, bar plots, bar charts, bar charts with labels, label the bars, bars with labels"
published: true
share: true
ads: true

---

In my very first tutorial on the ezplot R package, I showed you how easy and quick it is to make nice looking ggplot2 [bar charts](http://masterr.org/r/an-easy-way-to-make-ggplot2-plots-ezplot-part1/) using ezplot. In this post, I'll show you how to easily add labels on the bars. Let's get started.

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

We'll use the diamonds data in the ggplot2 package. First, we count each clarity and calculate the percentages.

{% highlight r %}
tbl = table(ggplot2::diamonds$clarity) # use diamonds data in the ggplot2 library
tbl_cnt = data.frame(cbind(freq=tbl))
tbl_cnt$clarity = row.names(tbl_cnt)
row.names(tbl_cnt) = NULL

# add percentages
tbl = within(tbl_cnt, {pct = freq / sum(freq)})
tbl
{% endhighlight %}



{% highlight text %}
##    freq clarity        pct
## 1   741      I1 0.01373749
## 2  9194     SI2 0.17044865
## 3 13065     SI1 0.24221357
## 4 12258     VS2 0.22725250
## 5  8171     VS1 0.15148313
## 6  5066    VVS2 0.09391917
## 7  3655    VVS1 0.06776047
## 8  1790      IF 0.03318502
{% endhighlight %}

We want to make a bar chart displaying either the count or the percent of the clarities, and we want to label the bars with either the count or the percent. To do that, we first need to append columns of the label positions to the data frame `tbl`. We can easily do that using the `add_bar_label_pos()` function in ezplot. Run `?add_bar_label_pos` in R to learn more about it, or `add_bar_label_pos` to see the function body.

{% highlight r %}
# make a function that can be used to add columns of label positions to tbl
f = add_bar_label_pos(tbl)

# add columns of label positions based on freq
tbl_w_pos = f("clarity", "freq", vpos=500)
tbl_w_pos
{% endhighlight %}



{% highlight text %}
##    freq clarity        pct freq_pos_top freq_pos_mid
## 1   741      I1 0.01373749         1241        370.5
## 2  1790      IF 0.03318502         2290        895.0
## 3 13065     SI1 0.24221357        13565       6532.5
## 4  9194     SI2 0.17044865         9694       4597.0
## 5  8171     VS1 0.15148313         8671       4085.5
## 6 12258     VS2 0.22725250        12758       6129.0
## 7  3655    VVS1 0.06776047         4155       1827.5
## 8  5066    VVS2 0.09391917         5566       2533.0
{% endhighlight %}



{% highlight r %}
# make a function that can be used to add columns of label positions to tbl_w_pos
f = add_bar_label_pos(tbl_w_pos)

# add columns of label positions based on pct
tbl_w_pos = f("clarity", "pct", vpos=0.01)
tbl_w_pos
{% endhighlight %}



{% highlight text %}
##    freq clarity        pct freq_pos_top freq_pos_mid pct_pos_top
## 1   741      I1 0.01373749         1241        370.5  0.02373749
## 2  1790      IF 0.03318502         2290        895.0  0.04318502
## 3 13065     SI1 0.24221357        13565       6532.5  0.25221357
## 4  9194     SI2 0.17044865         9694       4597.0  0.18044865
## 5  8171     VS1 0.15148313         8671       4085.5  0.16148313
## 6 12258     VS2 0.22725250        12758       6129.0  0.23725250
## 7  3655    VVS1 0.06776047         4155       1827.5  0.07776047
## 8  5066    VVS2 0.09391917         5566       2533.0  0.10391917
##   pct_pos_mid
## 1 0.006868743
## 2 0.016592510
## 3 0.121106785
## 4 0.085224323
## 5 0.075741565
## 6 0.113626251
## 7 0.033880237
## 8 0.046959585
{% endhighlight %}

Next, we make a function that can be used to draw bar charts based on variables in `tbl_w_pos`. If you've been reading the tutorials, this step should be familiar.

{% highlight r %}
barplt = mk_barplot(tbl_w_pos)
{% endhighlight %}

Now, we're ready to draw bar charts. First, we draw a bar chart where y is freq and label the bars with freq, by default, it places the labels at the middle of the bars.

{% highlight r %}
p = barplt("clarity", "freq", fillby="clarity", legend=F, barlab="freq") 
p = scale_axis(p, scale = "comma")
print(p)
{% endhighlight %}

![center](/../figs/2015-05-22-a-super-easy-way-to-make-ggplot2-barcharts-with-labels-ezplot-part4/unnamed-chunk-5-1.png) 

If you think it's difficult to read the labels, you can easily place them at the top of the bars by passing in the argument `barlab_at_top=T`.

{% highlight r %}
p = barplt("clarity", "freq", fillby="clarity", legend=F, barlab="freq",
            barlab_at_top=T) 
p = scale_axis(p, scale = "comma")
print(p)
{% endhighlight %}

![center](/../figs/2015-05-22-a-super-easy-way-to-make-ggplot2-barcharts-with-labels-ezplot-part4/unnamed-chunk-6-1.png) 

Another cool thing you can do is to label the bars with percent although the y-axis is frequency count. This is super easy too!

{% highlight r %}
# label the bars with pct instead of freq
p = barplt("clarity", "freq", fillby="clarity", legend=F, barlab="pct",
            barlab_use_pct=T) 
p = scale_axis(p, scale = "comma")
print(p)
{% endhighlight %}

![center](/../figs/2015-05-22-a-super-easy-way-to-make-ggplot2-barcharts-with-labels-ezplot-part4/unnamed-chunk-7-1.png) 

Finally, you can draw a bar chart where y is percent and label the bars with percent.

{% highlight r %}
p = barplt("clarity", "pct", fillby="clarity", legend=F, barlab="pct",
            barlab_use_pct=T) 
p = scale_axis(p, scale="pct", pct_max=0.3, pct_jump=0.05)
print(p)
{% endhighlight %}

![center](/../figs/2015-05-22-a-super-easy-way-to-make-ggplot2-barcharts-with-labels-ezplot-part4/unnamed-chunk-8-1.png) 

{% highlight r %}
# place the labels at the top of the bars
p = barplt("clarity", "pct", fillby="clarity", legend=F, barlab="pct",
            barlab_use_pct=T, barlab_at_top=T) 
p = scale_axis(p, scale = "pct", pct_max=0.3, pct_jump=0.05)
print(p)
{% endhighlight %}

![center](/../figs/2015-05-22-a-super-easy-way-to-make-ggplot2-barcharts-with-labels-ezplot-part4/unnamed-chunk-8-2.png) 

I created ezplot out of the frustration that there are too many detailed commands to remember when customizing a ggplot. If ezplot has improved your productivity, please share it with your friends, and you're always welcome to drop a comment below. In addition, I'm writing a book called ezplot: How to Easily Make ggplot2 Graphics for Data Analysis, and it is 20% complete. [Take a sneak peek](https://leanpub.com/ezplot) and get notified when the book is published.
