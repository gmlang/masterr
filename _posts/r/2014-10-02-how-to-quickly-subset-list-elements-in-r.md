---
layout: post
title: "How to Quickly Subset List Elements in R"
date: 2014-10-02 11:56:00 -0400
comments: true
categories: R
keywords: "R, functions in R, quickly subset list elements in R"
published: true
share: true

---

Every operation in R is a function call. For example, when you subset a vector using `[]`, you're really calling the function `[`. 


{% highlight r %}
y = 1:6
y[2]
{% endhighlight %}



{% highlight text %}
## [1] 2
{% endhighlight %}



{% highlight r %}
`[`(y, 2)
{% endhighlight %}



{% highlight text %}
## [1] 2
{% endhighlight %}

This allows us to easily subset the elements of a list when the elements are vectors. For example, given a list of 3 elements: a character vector, an integer vector, and a logical vector, we can use `lapply` and `[` to easily extract the 2nd value from each vector. 


{% highlight r %}
x = list(letters[1:4], 1:5, c(T, F, T, F, F, T))
lapply(x, `[`, 2)
{% endhighlight %}



{% highlight text %}
## [[1]]
## [1] "b"
## 
## [[2]]
## [1] 2
## 
## [[3]]
## [1] FALSE
{% endhighlight %}
