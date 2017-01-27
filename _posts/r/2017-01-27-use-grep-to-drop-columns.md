---
layout: post
title: "Use Grep to Drop Columns"
date: 2017-01-27 
comments: true
categories: r
keywords: "R, grep, drop variables, drop columns"
published: true
share: true
ads: true
---

It's very easy to drop columns from a data frame using the `grep()` function. The following example shows you how.

{% highlight r %}
# print the first 3 records of the iris dataset 
head(iris, 3)
{% endhighlight %}



{% highlight text %}
##   Sepal.Length Sepal.Width Petal.Length Petal.Width Species
## 1          5.1         3.5          1.4         0.2  setosa
## 2          4.9         3.0          1.4         0.2  setosa
## 3          4.7         3.2          1.3         0.2  setosa
{% endhighlight %}



{% highlight r %}
# grep the indices of the columns with "Sepal" in their names
sepal_col_num = grep("Sepal", names(iris))

# drop these columns
iris_sub = iris[, -sepal_col_num]
head(iris_sub, 3)
{% endhighlight %}



{% highlight text %}
##   Petal.Length Petal.Width Species
## 1          1.4         0.2  setosa
## 2          1.4         0.2  setosa
## 3          1.3         0.2  setosa
{% endhighlight %}

You can also use `grep()` to extract column names.

{% highlight r %}
# grep the names of the columns with "Petal" in their names
grep("Petal", names(iris), value=T)
{% endhighlight %}



{% highlight text %}
## [1] "Petal.Length" "Petal.Width"
{% endhighlight %}
