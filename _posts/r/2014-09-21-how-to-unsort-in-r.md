---
layout: post
title: "How to Unsort in R"
date: 2014-09-21 
comments: true
categories: r
keywords: "R, sort, unsort, undo a sort in R"
published: true
share: true
ads: true
---

When doing data analysis in R, we often want to sort a vector or [data frame](http://masterr.org/r/how-to-easily-sort-a-data-frame/). Sometimes, we want to undo the sorting. This usually happens inside of a function where you want to first sort the input object, do some operations and undo the sorting before you return the output object. 

It's fairly simple to unsort a vector in R. Here's an example:

{% highlight r %}
x = c("b", "c", "a")
ascend.order = order(x)

# sort x in ascending order
x = x[ascend.order]
print(x)
{% endhighlight %}



{% highlight text %}
## [1] "a" "b" "c"
{% endhighlight %}



{% highlight r %}
# reverse the operation, unsort and get back x in original order 
x[ascend.order] = x
print(x)
{% endhighlight %}



{% highlight text %}
## [1] "b" "c" "a"
{% endhighlight %}
