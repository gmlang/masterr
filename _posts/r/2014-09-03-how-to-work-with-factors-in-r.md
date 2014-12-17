---
layout: post
title: "How to Work with Factors in R"
date: 2014-09-03 15:18:44 -0400
comments: true
categories: R
keywords: "R, factor, factors in R, ordered bars, barchart, barplot, rank, order"
published: true
share: true
ads: true

---
If you want to deal with categorical variables in R, you need to use a data structure called factor. A factor is just a numeric vector with a special attribute called levels. You can think of the levels as labels for the values. Given a character vector, you can turn it into a factor using the factor() function, for example,

{% highlight r %}
(x = factor(letters))
{% endhighlight %}



{% highlight text %}
##  [1] a b c d e f g h i j k l m n o p q r s t u v w x y z
## Levels: a b c d e f g h i j k l m n o p q r s t u v w x y z
{% endhighlight %}

We can subset a factor, and depending on how you want it, you can get a sub-factor that either preserves the original levels or has simplified levels that only appear in the sub-factor. Continue with the example, say we want to subset the first 4 letters. 

{% highlight r %}
# subset while preserving the levels
x[1:4]
{% endhighlight %}



{% highlight text %}
## [1] a b c d
## Levels: a b c d e f g h i j k l m n o p q r s t u v w x y z
{% endhighlight %}



{% highlight r %}
# subset and dropping levels that don't appear in the subset
(z = x[1:4, drop=TRUE])
{% endhighlight %}



{% highlight text %}
## [1] a b c d
## Levels: a b c d
{% endhighlight %}

We can re-order the values of a factor. For example, we can reverse the order of the values in z.

{% highlight r %}
str(rev(z))
{% endhighlight %}



{% highlight text %}
##  Factor w/ 4 levels "a","b","c","d": 4 3 2 1
{% endhighlight %}



{% highlight r %}
str(z)
{% endhighlight %}



{% highlight text %}
##  Factor w/ 4 levels "a","b","c","d": 1 2 3 4
{% endhighlight %}



{% highlight r %}
rev(z)[1]
{% endhighlight %}



{% highlight text %}
## [1] d
## Levels: a b c d
{% endhighlight %}



{% highlight r %}
z[1]
{% endhighlight %}



{% highlight text %}
## [1] a
## Levels: a b c d
{% endhighlight %}
Note the values are reversed to “4 3 2 1” from the original “1 2 3 4”, while the labels remain the same order.

We can also re-order the levels of a factor. For example, we can reverse the order of the levels in z.

{% highlight r %}
# before
str(z)
{% endhighlight %}



{% highlight text %}
##  Factor w/ 4 levels "a","b","c","d": 1 2 3 4
{% endhighlight %}



{% highlight r %}
z[1]
{% endhighlight %}



{% highlight text %}
## [1] a
## Levels: a b c d
{% endhighlight %}



{% highlight r %}
# reverse the levels
levels(z) = rev(levels(z))

# after
str(z)
{% endhighlight %}



{% highlight text %}
##  Factor w/ 4 levels "d","c","b","a": 1 2 3 4
{% endhighlight %}



{% highlight r %}
z[1]
{% endhighlight %}



{% highlight text %}
## [1] d
## Levels: d c b a
{% endhighlight %}
Note the labels are reversed to “d, c, b, a” from the original “a, b, c, d”, while the values remain the same order. 

Now let's make some fake numeric data for the levels of z and make a ggplot2 bar chart. 

{% highlight r %}
suppressMessages({ library(ggplot2) })

# make fake data
df = data.frame(cat=z, val=c(50,45,70,30))

# make barplot
ggplot(df, aes(x=cat, y=val)) +
        geom_bar(aes(fill=cat), stat="identity") +
        geom_text(aes(label=val, y=val+1), size=3)
{% endhighlight %}

![center](/../figs/2014-09-03-how-to-work-with-factors-in-r/unnamed-chunk-5-1.png) 

It'd be nice if we order the bars from tallest to shortest. To do that, we can make a factor specifying its levels to be the categories corresponding to the descending order of val. 

{% highlight r %}
# sort by val in descending order
df = df[order(-df$val),]

# notice that we need to pass the cat sorted by val into the factor function
df$cat = factor(df$cat, levels=df$cat)

# make bar chart
ggplot(df, aes(x=cat, y=val)) +
        geom_bar(aes(fill=cat), stat="identity") +
        geom_text(aes(label=val, y=val+1), size=3)
{% endhighlight %}

![center](/../figs/2014-09-03-how-to-work-with-factors-in-r/unnamed-chunk-6-1.png) 

Alternatively, we can use `reorder()` and `rank()` to merely reorder the levels of cat by the descending order of val.

{% highlight r %}
# make fake data
df = data.frame(cat=z, val=c(50,45,70,30))

# reorder the levels of cat by decreasing order of val
df = transform(df, cat = reorder(cat, rank(-val)))

# make barplot
ggplot(df, aes(x=cat, y=val)) +
        geom_bar(aes(fill=cat), stat="identity") +
        geom_text(aes(label=val, y=val+1), size=3)
{% endhighlight %}

![center](/../figs/2014-09-03-how-to-work-with-factors-in-r/unnamed-chunk-7-1.png) 

Notice that `rank()` returns the ranking order of each value in its input vector, whereas `order()` returns the indices that would put its input vector in order.
