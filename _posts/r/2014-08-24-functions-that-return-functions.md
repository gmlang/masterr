---
layout: post
title: "Functions that Return Functions"
date: 2014-08-24 10:58:50 -0400
comments: true
categories: R
keywords: "R, constructor functions, functions that return functions"
published: true
share: true

---
I love the idea of writing a function that returns another function. For example, say we want to compute $$x^n$$ for any given $$x$$ and $$n$$. We can write a function that takes $$n$$ as input and returns a function, which can further take $$x$$ as input and returns the result. Here's the R code:

{% highlight r %}
make.power = function(n) {
    function(x) x^n
}
{% endhighlight %}

Say we want to find $$x^2$$, we can first run make.power(2) to construct a function that will square any $$x$$ passed to it. Let's call it power2. We can then use power2(x) to calculate $$x^2$$ for any $$x$$ value. For example, power2(3) gives the value of $$3^2$$, and power2(5) gives the value of $$5^2$$, and etc.

{% highlight r %}
power2 = make.power(2)
power2(3)
{% endhighlight %}



{% highlight text %}
## [1] 9
{% endhighlight %}



{% highlight r %}
power2(5)
{% endhighlight %}



{% highlight text %}
## [1] 25
{% endhighlight %}

You can read [Steve Losh's post](http://stevelosh.com/blog/2013/03/list-out-of-lambda/) for a thorough treatment, where he showed numbers are really made of lists, and lists are really just functions that returns other functions.
