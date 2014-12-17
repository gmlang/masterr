---
layout: post
title: "How to Use the Paste and Outer Functions in R"
date: 2014-08-19 14:14:47 -0400
comments: true
categories: R
keywords: "R, outer, paste, roll a dice n times, roll two dies n times,
roll a dice"
published: true
share: true
ads: true

---
Today I want to show you the power of two little R functions: `paste()` and `outer()`. Why should you care? Because you may encounter scenarios like the following.

First, roll a dice 10 times. This can be simulated with one line of R code:

{% highlight r %}
sample(1:6, 10, replace=TRUE)
{% endhighlight %}



{% highlight text %}
##  [1] 3 6 1 1 6 4 4 6 2 3
{% endhighlight %}

Second, how about rolling two dies 10 times? Can you write two lines of R code to accomplish that? Yes, you can if you leverage `paste()` and `outer()`. The `paste()` function allows you to concatenate strings. The `outer()` function returns the outer product of two vectors. If you pass in two numeric vectors, it returns by default the outer product that we learned in linear algebra. But you don't have to pass in numeric vectors, and you can pass in a function as a third parameter. When you do that, `outer()` applies your function to the vectors, and returns the results as cell values of the outer product. For example, we can pass the `paste()` function together with two vectors of 1 to 6 into `outer()`, under the hood, it will convert the numeric vectors to character vectors and concatenate them using `paste()`. The output is a 6 by 6 matrix with values like “1 1”, “1 2” in the cells.

{% highlight r %}
outer(1:6, 1:6, paste)
{% endhighlight %}



{% highlight text %}
##      [,1]  [,2]  [,3]  [,4]  [,5]  [,6] 
## [1,] "1 1" "1 2" "1 3" "1 4" "1 5" "1 6"
## [2,] "2 1" "2 2" "2 3" "2 4" "2 5" "2 6"
## [3,] "3 1" "3 2" "3 3" "3 4" "3 5" "3 6"
## [4,] "4 1" "4 2" "4 3" "4 4" "4 5" "4 6"
## [5,] "5 1" "5 2" "5 3" "5 4" "5 5" "5 6"
## [6,] "6 1" "6 2" "6 3" "6 4" "6 5" "6 6"
{% endhighlight %}

As you can see, this matrix represents all possible outcomes of rolling two dies. Now, to roll two dies 10 times, we can just take a sample of size 10 with replacements from this matrix.

{% highlight r %}
dice = as.vector(outer(1:6, 1:6, paste))
sample(dice, 10, replace=TRUE)
{% endhighlight %}



{% highlight text %}
##  [1] "1 6" "4 6" "3 1" "2 6" "4 4" "2 2" "2 3" "4 2" "1 2" "6 5"
{% endhighlight %}

If you want to know how to efficiently take a random sample from a population of unknown or extremely large size, you can read my post on [reservoir sampling](http://gmlang.com/da/reservoir-sampling-and-algorithm-r/).
