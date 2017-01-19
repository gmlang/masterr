---
layout: post
title: "Examples of Predicate Functionals"
date: 2016-03-19 11:47:00 -0400
comments: true
categories: r
keywords: "R, predicate functional, Filter, where, Find, Position"
published: true
share: true
ads: true

---

A predicate is a function that returns a single TRUE or FALSE, for example, `is.factor()`, `all()`, or `is.NULL()`. A predicate functional is a function that applies a predicate to each element of a list or data frame. For example, we can define a predicate functional `where()` that checks the type of each column in a data frame.


{% highlight r %}
where = function(f, x) {
        # Applies a predicate function to every element of a list or data frame.
        # f: a predicate function
        # x: a list or data frame
        #
        # Returns a logical vector.
        vapply(x, f, logical(1))
}
{% endhighlight %}

Here's how you'd use it.


{% highlight r %}
# make a example data frame
df = data.frame(x = 1:3, y = c("a", "b", "c"), z = c("Alex", "Bob", "Chris"))

# check if each column of the data frame is a factor
where(is.factor, df)
{% endhighlight %}



{% highlight text %}
##     x     y     z 
## FALSE  TRUE  TRUE
{% endhighlight %}



{% highlight r %}
# check if each column of the data frame is an integer
where(is.integer, df)
{% endhighlight %}



{% highlight text %}
##     x     y     z 
##  TRUE FALSE FALSE
{% endhighlight %}



{% highlight r %}
# check if each column of the data frame is a character
where(is.character, df)
{% endhighlight %}



{% highlight text %}
##     x     y     z 
## FALSE FALSE FALSE
{% endhighlight %}

There're 3 common predicate functionals already defined in base R, namely, Filter(), Find(), Position(). Here's how you can use them.


{% highlight r %}
# filter the factors in a data frame
subdf = Filter(is.factor, df)
subdf
{% endhighlight %}



{% highlight text %}
##   y     z
## 1 a  Alex
## 2 b   Bob
## 3 c Chris
{% endhighlight %}



{% highlight r %}
str(subdf) # note: Filter() returns a data frame
{% endhighlight %}



{% highlight text %}
## 'data.frame':	3 obs. of  2 variables:
##  $ y: Factor w/ 3 levels "a","b","c": 1 2 3
##  $ z: Factor w/ 3 levels "Alex","Bob","Chris": 1 2 3
{% endhighlight %}



{% highlight r %}
# find the 1st factor starting from the Left in a data frame
x_factor = Find(is.factor, df)
x_factor
{% endhighlight %}



{% highlight text %}
## [1] a b c
## Levels: a b c
{% endhighlight %}



{% highlight r %}
str(x_factor) # note: Find() returns the first factor it finds from the left
{% endhighlight %}



{% highlight text %}
##  Factor w/ 3 levels "a","b","c": 1 2 3
{% endhighlight %}



{% highlight r %}
# gives the position of the 1st factor starting from the Right in a data frame
Position(is.factor, df, right=T)
{% endhighlight %}



{% highlight text %}
## [1] 3
{% endhighlight %}

This article is inspired by Hadley's book "Advanced R", you can <a rel="nofollow" href="http://www.amazon.com/gp/product/1466586966/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1466586966&linkCode=as2&tag=cabaceo-20&linkId=2GDWMZSF4NX32QIO">buy it from Amazon</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=cabaceo-20&l=as2&o=1&a=1466586966" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
or read it [online](http://adv-r.had.co.nz/Functions.html) for FREE.
