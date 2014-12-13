---
layout: post
title: "How to Write Infix Functions in R"
date: 2014-09-05 15:18:35 -0400
comments: true
categories: R
keywords: "R, infix functions"
published: true
share: true

---
Infix functions are functions where the function name comes in between its arguments when used. For example, operators like + and - are actually infix functions. Conversely, you can think of infix functions as operators. Here's an example of an infix function that concatenate two vectors.

{% highlight r %}
`%&%` <- function(x, y) { 
        # @x, @y: vectors or sigle values
        # returns: this function concatenates @x and @y without space in between
        paste(x, y, collape="", sep="")
}
{% endhighlight %}

To use it, we simply treat it as any other operators.

{% highlight r %}
"data" %&% "analysis"
{% endhighlight %}



{% highlight text %}
## [1] "dataanalysis"
{% endhighlight %}



{% highlight r %}
"cabaceo" %&% 1:5
{% endhighlight %}



{% highlight text %}
## [1] "cabaceo1" "cabaceo2" "cabaceo3" "cabaceo4" "cabaceo5"
{% endhighlight %}

Here's another example of an infix function that allows you to return a default value when encountering NULL. This is very helpful when used inside of another function to avoid returning a NULL value.

{% highlight r %}
`%||%` = function(a, b) if (!is.null(a)) a else b

100 %||% NA
{% endhighlight %}



{% highlight text %}
## [1] 100
{% endhighlight %}



{% highlight r %}
NULL %||% NA
{% endhighlight %}



{% highlight text %}
## [1] NA
{% endhighlight %}
