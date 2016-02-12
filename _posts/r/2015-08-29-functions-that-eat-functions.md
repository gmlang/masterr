---
layout: post
title: "Functions that eat functions"
date: 2015-08-29 15:00:00 -0400
comments: true
categories: r
keywords: "R, functions, how to write R functions, closure"
published: true
share: true

---

We human eat different kind of foods. Similarly, functions can eat different kind of things. We've seen [functions that eat a number](http://masterr.org/r/functions-that-return-functions/), [a data frame](http://masterr.org/r/functions-that-return-functions-part-2/), and [a vector of numbers](http://masterr.org/r/functions-that-return-a-list-of-functions-and-lapply/). Today, I'm going to show you how to create functions that eat functions. By that, I mean functions that take functions as input. For example, look at the following function. 

{% highlight r %}
arg_func = function(func) {
        function(x, f) {
                # x: a numeric vector
                # f: a function
                fvals = vapply(x, f, numeric(1))
                x[fvals == func(fvals)] # notice how func is used
        }
}
{% endhighlight %}

It uses a function as input (`func`) and outputs another function (`function(x, f)`). Notice the output function has two parameters: one is a numeric vector and the other is yet another function! 

We can use `arg_func` to implement a function that takes a vector of numbers and a function as inputs, and returns the elements of the vector where the input function returns the biggest value. 

{% highlight r %}
arg_max = arg_func(max)
{% endhighlight %}

For example, when applying the function $$f(x)=x^2$$ to the vector `-10:5`, it should obtain the biggest value at `x=-10`. And when appling it to `-5:5`, the maximum value should happen at `x=-5` and `x=5`. Let's see if `arg_max()` gives us the same results.

{% highlight r %}
arg_max(-10:5, function(x) x ^ 2)
{% endhighlight %}



{% highlight text %}
## [1] -10
{% endhighlight %}



{% highlight r %}
arg_max(-5:5, function(x) x ^ 2)
{% endhighlight %}



{% highlight text %}
## [1] -5  5
{% endhighlight %}

Indeed, `arg_max()` gives us the correct results. We can also implement `arg_min()` in the same fashion.

{% highlight r %}
arg_min = arg_func(min)
arg_min(-10:5, function(x) x ^ 2)
{% endhighlight %}



{% highlight text %}
## [1] 0
{% endhighlight %}



{% highlight r %}
arg_min(-5:5, function(x) x ^ 2)
{% endhighlight %}



{% highlight text %}
## [1] 0
{% endhighlight %}

Similarly, we can implement `arg_mean()` and `arg_median()`.

{% highlight r %}
# arg_mean()
arg_mean = arg_func(mean)
arg_mean(-10:5, function(x) x ^ 2)
{% endhighlight %}



{% highlight text %}
## integer(0)
{% endhighlight %}



{% highlight r %}
arg_mean(-5:5, function(x) x ^ 2)
{% endhighlight %}



{% highlight text %}
## integer(0)
{% endhighlight %}



{% highlight r %}
# arg_median()
arg_median = arg_func(median)
arg_median(-10:5, function(x) x ^ 2)
{% endhighlight %}



{% highlight text %}
## [1] -4  4
{% endhighlight %}



{% highlight r %}
arg_median(-5:5, function(x) x ^ 2)
{% endhighlight %}



{% highlight text %}
## [1] -3  3
{% endhighlight %}
