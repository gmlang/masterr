---
layout: post
title: "RFP - Part2: R Lists"
date: 2019-02-12
comments: true
categories: r
keywords: "R, lists, R data types, R data structures, recursion in R, RFP series, R functional programming, R is a functional programming language, FP, functional programming in R, head, tail, is empty in R, check a R list is empty, R tuples, R pairs, tuples in R, pairs in R, R lists are vectors"
published: true
share: true
ads: true
---

Previously, we discussed R vectors. We now turn to R lists. Like a R vector, a R list can also grow or shrink. But unlike a R vector, where each element is a length-1 vector and all elements must have the same type, a R list can contain almost anything. For example, vectors, lists, functions, or environments can all become the elements of a list, and it's perfectly okay to mix them in the same list. 

## The empty list

The empty list, with syntax `list()`, has 0 elements. Indeed, if we call `length(list())`, we get 0.

## Non-empty lists

A non-empty list with n values is written `list(v1, v2, ..., vn)`. You can make a list with `list(e1, ..., en)` where each expression is evaluated to a value. It's more common to make a list with `c(e1, e2)`, called "`e1` consed onto `e2`," where `e1` evaluates to "any value" and `e2` evaluates to a "list." The result is a new list that starts with the value of `e1` followed by the elements in `e2`. Here're some examples of lists:


{% highlight r %}
list(1, 2, 3) # each element is a length-1 integer vector
{% endhighlight %}



{% highlight text %}
## [[1]]
## [1] 1
## 
## [[2]]
## [1] 2
## 
## [[3]]
## [1] 3
{% endhighlight %}



{% highlight r %}
list(c(1, 2), c("gm", "lang")) # each element is a length-2 vector but of different type
{% endhighlight %}



{% highlight text %}
## [[1]]
## [1] 1 2
## 
## [[2]]
## [1] "gm"   "lang"
{% endhighlight %}



{% highlight r %}
list(list(1, 2), TRUE, function(x) x+1, environment()) # 1st element is a list, 2nd element is the logical TRUE, 3rd element is a function, 4th element is a env object
{% endhighlight %}



{% highlight text %}
## [[1]]
## [[1]][[1]]
## [1] 1
## 
## [[1]][[2]]
## [1] 2
## 
## 
## [[2]]
## [1] TRUE
## 
## [[3]]
## function (x) 
## x + 1
## 
## [[4]]
## <environment: R_GlobalEnv>
{% endhighlight %}



{% highlight r %}
c(9, list(3, 6)) # cons 9 onto the list(3, 6)
{% endhighlight %}



{% highlight text %}
## [[1]]
## [1] 9
## 
## [[2]]
## [1] 3
## 
## [[3]]
## [1] 6
{% endhighlight %}



{% highlight r %}
# list(1, list(2, 3)) is different from list(1, 2, 3)
!identical(list(1, list(2, 3)), list(1, 2, 3))
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
# list(1, list(2, 3)) is different from list(list(1, 2), 3))
!identical(list(1, list(2, 3)), list(list(1, 2), 3))
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}

## How to use lists

When working with lists, we also only need three basic operations:

1. Check if a list is empty. 
2. Get the first element of a list, raising an exception if the list is empty.
3. Get the tail of a list without its first element, raising an exception if the list is empty.

Armed with these three operations and recursion, we can solve almost all list related problems. Unfortunately, R doesn't provide these operations perfectly out of the box. But we can write our own functions for them. Let's do that now.


{% highlight r %}
# Returns TRUE if a list is empty, FALSE otherwise.
is_empty = function(xs) { # xs: a list of any type
        is.null(xs) | identical(xs, list())
}

# Get the first element of a list, raising an exception if the list is empty.
hd = function(xs) { # xs: a list of any type
        if (is_empty(xs)) stop("List is empty.")
        else xs[[1]] 
}

# Get the tail of a list without its first element, raising an exception if the list is empty.
tl = function(xs) { # xs: a list of any type
        if (is_empty(xs)) stop("List is empty.")
        else xs[-1] 
}
{% endhighlight %}

Having defined `is_empty()`, `hd()` and `tl()`, we can use them and recursion to do complicated things to lists. For example, given a list of integer pairs, we can write a function to sum up all the integers. 

{% highlight r %}
sum_pair_list = function(xs) {
        # xs: a list of interger pairs represented by length-2 vectors c(i1, i2)
        if (is_empty(xs)) 0
        else hd(xs)[1] + hd(xs)[2] + sum_pair_list(tl(xs))
}
sum_pair_list(list())
{% endhighlight %}



{% highlight text %}
## [1] 0
{% endhighlight %}



{% highlight r %}
sum_pair_list(list(c(1, 2), c(3, 4)))
{% endhighlight %}



{% highlight text %}
## [1] 10
{% endhighlight %}

Or we can write functions to put the first or second element of each pair into separate lists.

{% highlight r %}
firsts = function(xs) {
        # xs: a list of interger pairs represented by length-2 vectors c(i1, i2)
        if (is_empty(xs)) list()
        else c(hd(xs)[1], firsts(tl(xs)))
}

seconds = function(xs) {
        # xs: a list of interger pairs represented by length-2 vectors c(i1, i2)
        if (is_empty(xs)) list()
        else c(hd(xs)[2], seconds(tl(xs)))
}

xs = list(c(1, 2), c(3, 4))
firsts(xs)
{% endhighlight %}



{% highlight text %}
## [[1]]
## [1] 1
## 
## [[2]]
## [1] 3
{% endhighlight %}



{% highlight r %}
seconds(xs)
{% endhighlight %}



{% highlight text %}
## [[1]]
## [1] 2
## 
## [[2]]
## [1] 4
{% endhighlight %}

It should make us cringe that `firsts` and `seconds` look almost identical yet we wrote them as two different functions. "Repeating yourself" makes code maintenance difficult. We'll learn how to fix it later. Also notice that `is_empty`, `hd` and `tl` defined above are very similarly to the ones defined in part 1 when we discussed R vectors. This is because lists are just a special kind of vector in R. To see this, realize that another way of declaring an empty list is `vector("list")`.

{% highlight r %}
identical(vector("list"), list())
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}
