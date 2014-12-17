---
layout: post
title: "How to Make Faceted Ordered Bar Charts in R"
date: 2014-09-09 12:59:59 -0400
comments: true
categories: R
keywords: "R, factor, factors in R, ordered bars, barchart, barplot,
rank, order, ggplot2"
published: true
share: true
ads: true

---
Previously, I showed [two examples](http://gmlang.com/r/how-to-work-with-factors-in-r/) of how to make ordered bar charts using ggplot2. Sometimes, you want to create multiple facets and put on each facet an ordered bar chart. Here's how you can do that using ggplot2.

{% highlight r %}
suppressMessages({library(ggplot2)})

# make fake data
df = data.frame(val = rnorm(10, mean=5),
                cat = gl(5, 2, labels = letters[1:5, drop=T]),
                group = gl(2, 1, 10, labels = c("group1", "group2")))

# combine cat and group into a new factor called group.cat
df = transform(df, group.cat = factor(paste(group, cat)))

# reorder the levels of group.cat by the increasing order of val
df = transform(df, group.cat = reorder(group.cat, rank(val)))

# make barplot
ggplot(df, aes(group.cat, val)) +
        geom_bar(aes(fill = cat), stat = "identity") +
        facet_grid(. ~ group, scales = "free_x") +
        scale_x_discrete(labels=df$cat, breaks=df$group.cat) + 
        labs(x = "", size=2)
{% endhighlight %}

![center](/../figs/2014-09-09-how-to-make-faceted-ordered-bar-charts-in-r/unnamed-chunk-1-1.png) 
