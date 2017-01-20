---
layout: post
title: "How to Easily Sort A Data Frame"
date: 2014-08-22
comments: true
categories: r
keywords: "R, sort a data frame, sort a data frame by multiple variables"
published: true
share: true
ads: true
---

How do you sort a data frame by one or more of its variables? This is one of the activities I do a lot when analyzing a dataset, so I wrote a function to take care of the details. It uses two other functions, `do.call()` and `order()`. `do.call()` takes in two arguments: a function and a list of arguments that can be passed to it. `order()` does the sorting, and you can look up how it works by running `?order`. Here's the function I wrote that can make sorting data frames much easier.

{% highlight r %}
# sortframe is a function that sorts a data frame by any of its variables in
# ascending order by default.
# when used inside a function allowing multiple unnamed arguments,
# list(...) creates a list containing all the unnamed arguments.
sortframe = function (df,...) df[do.call(order,list(...)),]
{% endhighlight %}

Here's how you use it:

{% highlight r %}
# sort iris by Sepal.Length in ascending order
temp = with(iris, sortframe(iris, Sepal.Length))
head(temp, 3)
{% endhighlight %}



{% highlight text %}
##    Sepal.Length Sepal.Width Petal.Length Petal.Width Species
## 14          4.3         3.0          1.1         0.1  setosa
## 9           4.4         2.9          1.4         0.2  setosa
## 39          4.4         3.0          1.3         0.2  setosa
{% endhighlight %}



{% highlight r %}
# sort iris by Sepal.Length in descending order
temp = with(iris, sortframe(iris, Sepal.Length, decreasing=TRUE))
head(temp, 3)
{% endhighlight %}



{% highlight text %}
##     Sepal.Length Sepal.Width Petal.Length Petal.Width   Species
## 132          7.9         3.8          6.4         2.0 virginica
## 118          7.7         3.8          6.7         2.2 virginica
## 119          7.7         2.6          6.9         2.3 virginica
{% endhighlight %}



{% highlight r %}
# sort iris first by Sepal.Length and then by Sepal.Width in ascending order
temp = with(iris, sortframe(iris, Sepal.Length, Sepal.Width))
head(temp, 3)
{% endhighlight %}



{% highlight text %}
##    Sepal.Length Sepal.Width Petal.Length Petal.Width Species
## 14          4.3         3.0          1.1         0.1  setosa
## 9           4.4         2.9          1.4         0.2  setosa
## 39          4.4         3.0          1.3         0.2  setosa
{% endhighlight %}
