---
layout: post
title: "RFP - Part1: R Vectors"
date: 2019-02-11
comments: true
categories: r
keywords: "R, vectors, R data types, R vectors, recursion in R, data types in R, RFP series, R functional programming, R is a functional programming language, FP, functional programming in R, head, tail, is empty in R, check a R vector is empty"
published: true
share: true
ads: true
---

The simplest data structure in R is the vector. A R vector can have any length, but all its elements must have the same type. There are four common data types: logical, integer, double (often called numeric), and character. A vector is numeric if and only if its elements are doubles. Similarly, a logical vector has TRUE or FALSE as its elements. An integer vector contains only integers, and a character vector has only strings. Given a vector `x`, we can call `typeof(x)` to check its type.

## Empty vectors 

There's an empty vector for each type, with the following syntax:

* `logical()`
* `integer()`
* `numeric()`
* `character()`

An empty vector has 0 elements and hence length 0.

## Length-1 vectors

Unlike most other programming languages, R doesn't have singleton data structures. So what appear as singleton items are really just vectors of length one. For example, we get 1 when calling `length()` on a number, string or NA.

{% highlight r %}
length(100)
{% endhighlight %}



{% highlight text %}
## [1] 1
{% endhighlight %}



{% highlight r %}
length("gm")
{% endhighlight %}



{% highlight text %}
## [1] 1
{% endhighlight %}



{% highlight r %}
length(NA)
{% endhighlight %}



{% highlight text %}
## [1] 1
{% endhighlight %}

## Length-n vectors, n > 1

A vector with at least 2 values is written `c(v1, v2, ..., vn)` where the `v`'s are values. You can make a vector with `c(e1, ..., en)` where each expression is evaluated to a value. It's more common to make a vector with `c(e1, e2)`, called "`e1` consed onto `e2`," where `e1` evaluates to a "value of type t" and `e2` evaluates to a "vector of t values." The result is a new vector that starts with the value of `e1` followed by the elements in `e2`.

## How to use vectors

One goal of this RFP (R Functional Programming) series is to learn the fundamental ideas of functional programming using R. Viewed from the FP lens, when working with vectors, we only need three basic operations:

1. Check if a vector is empty. 
2. Get the first element of a vector, raising an exception if the vector is empty.
3. Get the tail of a vector without its first element, raising an exception if the vector is empty.

Armed with these three operations and recursion, we can solve almost all vector related problems. Unfortunately, R doesn't provide these operations perfectly out of the box. But we can write our own functions for them. Let's do that now.


{% highlight r %}
# Check if a vector is empty. Returns TRUE if it is, FALSE otherwise.
is_empty = function(xs) { # xs: a vector of any type
        is.null(xs) | identical(xs, logical()) | identical(xs, integer()) |
                identical(xs, numeric()) | identical(xs, character())
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

Having defined `is_empty()`, `hd()` and `tl()`, we can use them to do complicated things to vectors. For example, we can now sum up all values in an integer or numeric vector. 

{% highlight r %}
sum_vec = function(xs) {
        # xs: an interger or numeric vector
        if (is_empty(xs)) 0
        else hd(xs) + sum_vec(tl(xs))
}
sum_vec(integer())
{% endhighlight %}



{% highlight text %}
## [1] 0
{% endhighlight %}



{% highlight r %}
sum_vec(1)
{% endhighlight %}



{% highlight text %}
## [1] 1
{% endhighlight %}



{% highlight r %}
sum_vec(1:10)
{% endhighlight %}



{% highlight text %}
## [1] 55
{% endhighlight %}

We can also count from n down to 0 and return a vector with integer elements of n, n-1, ..., 0.

{% highlight r %}
countdown = function(n) {
        # n: a positive integer
        if (n == 0) integer()
        else c(n, countdown(n-1))
}
countdown(10)
{% endhighlight %}



{% highlight text %}
##  [1] 10  9  8  7  6  5  4  3  2  1
{% endhighlight %}

Both `sum_vec()` and `countdown()` are recursive functions. A recursive function (or recursion) has a base case and a recursive case. For example, in `sum_vec()`, the base case is when the input vector is empty, and the result is just 0. When the vector is not empty, we enter the recursive case and get the result by adding its first element and the result of calling `sum_vec()` on its tail, which is also a vector. In `countdown()`, the base case is when n is 0, and the result is an empty integer vector. We enter the recursive case as long as n > 0, and get the result by consing n onto the result of calling `countdown()` on n-1. In general, when thinking about recursion, we want to reason as follows:

1. What's the base case? What should the result be under the base case?
2. What's the recursive case? How can the result be expressed in terms of the result for the sub-problem (for example, the rest of the vector or n-1). 

It is not a coincidence that we've written both `sum_vec()` and `countdown()` recursively. From the FP perspective, recursion is almost always THE approach when processing or building vectors. The alternative approach of using loops and assignment statements is inferior and discouraged. There're many good discussions on the internet as to why this is the case. You can google "loops discouraged in functional programming" to learn more. Here I'll just show that it takes more lines to write the same `sum_vec()` using a while-loop. Notice we'll also need extra things that recursion doesn't, namely, local variable creation and assignment statements.

{% highlight r %}
sum_vec_while_loop = function(xs) {
        tot = 0 # need a local variable to hold the result
        while (!is_empty(xs)) {    # as long as the loop doesn't end,
                tot = tot + hd(xs) #   need to keep copy-n-modify tot, and 
                xs = tl(xs)        #   need to keep copy-n-modify xs.
        }
        tot
}
{% endhighlight %}

