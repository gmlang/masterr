---
layout: post
title: "RFP - Part 9: Local Functions and Local Variables"
date: 2019-04-15
comments: true
categories: r
keywords: "R, RFP series, functional programming in R, R scoping rules, R function calls, R local functions, R function enclosures, scopes, local variables"
published: true
share: true
ads: true
---
 
A common thing to do in functional programming is to create, within a (outer) function, a local (inner) function that uses other variables in scope. Let me give you an example. The function `countup_from1()` uses a local helper function `count()` to accumulate results recursively. Its argument `x` is used directly inside `count()`.


{% highlight r %}
countup_from1 = function(x) { # x: integer
        count = function(from) { # from: integer
                if (from == x) x # can use x because count() is local
                else c(from, count(from+1))
        }
        count(1)
}
countup_from1(10)
{% endhighlight %}



{% highlight text %}
##  [1]  1  2  3  4  5  6  7  8  9 10
{% endhighlight %}

Another common thing to do is to make local variables to store the results of expensive computations. Before I give you an example, let's first define some helper functions. 


{% highlight r %}
# Check if a vector is empty. Returns TRUE if it is, FALSE otherwise.
is_empty = function(xs) { # xs: a vector of any type
        length(xs) == 0
}

# Get the first element of a vector, raising an exception if the vector is empty.
hd = function(xs) { # xs: a vector of any type
        if (is_empty(xs)) stop("Vector is empty.")
        else xs[1]
}

# Get the tail of a vector without its first element, raising an exception if the vector is empty.
tl = function(xs) { # xs: a vector of any type
        if (is_empty(xs)) stop("Vector is empty.")
        else xs[-1]
}
{% endhighlight %}

Using these helpers, we can write a function that returns the max value of an integer vector. Without using local variables to store intermediate results, `bad_max()` gets very expensive even for small-lengthed input vectors.

{% highlight r %}
bad_max = function(xs) { # xs: integer vector
        if (is_empty(xs)) 0
        else if (is_empty(tl(xs))) hd(xs)
        else if (hd(xs) > bad_max(tl(xs))) hd(xs) # recursive call to bad_max()
        else bad_max(tl(xs)) # recursive call to bad_max(), these two recursive
                             # calls hugely slow down the computation.
}
bad_max(1:10)
{% endhighlight %}



{% highlight text %}
## [1] 10
{% endhighlight %}



{% highlight r %}
bad_max(1:20)
{% endhighlight %}



{% highlight text %}
## [1] 20
{% endhighlight %}



{% highlight r %}
# bad_max(1:30) # this will take "forever"!
{% endhighlight %}

We can re-write the function by using a local variable to store the
intermediate result of the expensive recursive step.


{% highlight r %}
good_max = function(xs) {
        if (is_empty(xs)) 0
        else if (is_empty(tl(xs))) hd(xs)
        else {
                tl_ans = good_max(tl(xs)) # use local variable to store expensive computation
                hd_xs  = hd(xs) 
                if (hd_xs > tl_ans) hd_xs
                else tl_ans
        }
}
good_max(1:30)
{% endhighlight %}



{% highlight text %}
## [1] 30
{% endhighlight %}



{% highlight r %}
good_max(1:100)
{% endhighlight %}



{% highlight text %}
## [1] 100
{% endhighlight %}

