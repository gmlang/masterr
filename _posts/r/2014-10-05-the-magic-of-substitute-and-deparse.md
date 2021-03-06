---
layout: post
title: "The Magic of Substitute and Deparse"
date: 2014-10-05 
comments: true
categories: r
keywords: "R, functions in R, deparse(), substitute()"
published: true
share: true
ads: true
---

The R functions `substitute()` and `deparse()` are very interesting and here's why.

{% highlight r %}
foo1 = function(a, ...) {
        arg = deparse(substitute(a))
        dots = substitute(list(...))[-1]
        c(arg, sapply(dots, deparse))
}

foo2 = function(a, ...) {
        arg = deparse(substitute(a))
        dots = list(...)
        c(arg, sapply(dots, deparse))
}

x = 1; y = 2; z = 3

foo1(x, y, z)
{% endhighlight %}



{% highlight text %}
## [1] "x" "y" "z"
{% endhighlight %}



{% highlight r %}
foo2(x, y, z)
{% endhighlight %}



{% highlight text %}
## [1] "x" "2" "3"
{% endhighlight %}

You can learn more about them [here](https://stackoverflow.com/questions/5754367/using-substitute-to-get-argument-name-with) and [here](https://stackoverflow.com/questions/3057341/how-to-use-rs-ellipsis-feature-when-writing-your-own-function).
