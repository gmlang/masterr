---
layout: post
title: "How to View Source Code in R"
date: 2014-10-09 12:29:49 -0400
comments: true
categories: R
keywords: "R, source code of a function"
published: true
share: true
ads: true

---

The best way to learn how to use a function written by other people is to read its source code. If you use Rstudio, you just need to type the function name at the command line. However, a lot of times, you will get something like this. 


{% highlight r %}
mean
{% endhighlight %}



{% highlight text %}
## function (x, ...) 
## UseMethod("mean")
## <bytecode: 0x7fcbc4651ee8>
## <environment: namespace:base>
{% endhighlight %}

You may wonder, "where is the function body?" You don't see the function body because `mean()` is a **generic function**. Generic functions are used to implement the S3 object oriented system in R. Each generic function has one or many methods. For example, `mean()` has the following methods:


{% highlight r %}
methods(mean)
{% endhighlight %}



{% highlight text %}
## [1] mean.Date     mean.default  mean.difftime mean.POSIXct  mean.POSIXlt
{% endhighlight %}

We cannot view the source code of a generic function, instead, we can view the source code of each generic.method function. For example, run the following commands to view the source of `mean.default()` and `mean.Date()` respectively.


{% highlight r %}
getAnywhere(mean.default)
{% endhighlight %}



{% highlight text %}
## A single object matching 'mean.default' was found
## It was found in the following places
##   package:base
##   registered S3 method for mean from namespace base
##   namespace:base
## with value
## 
## function (x, trim = 0, na.rm = FALSE, ...) 
## {
##     if (!is.numeric(x) && !is.complex(x) && !is.logical(x)) {
##         warning("argument is not numeric or logical: returning NA")
##         return(NA_real_)
##     }
##     if (na.rm) 
##         x <- x[!is.na(x)]
##     if (!is.numeric(trim) || length(trim) != 1L) 
##         stop("'trim' must be numeric of length one")
##     n <- length(x)
##     if (trim > 0 && n) {
##         if (is.complex(x)) 
##             stop("trimmed means are not defined for complex data")
##         if (anyNA(x)) 
##             return(NA_real_)
##         if (trim >= 0.5) 
##             return(stats::median(x, na.rm = FALSE))
##         lo <- floor(n * trim) + 1
##         hi <- n + 1 - lo
##         x <- sort.int(x, partial = unique(c(lo, hi)))[lo:hi]
##     }
##     .Internal(mean(x))
## }
## <bytecode: 0x7fcbc42f6078>
## <environment: namespace:base>
{% endhighlight %}



{% highlight r %}
getAnywhere(mean.Date)
{% endhighlight %}



{% highlight text %}
## A single object matching 'mean.Date' was found
## It was found in the following places
##   package:base
##   registered S3 method for mean from namespace base
##   namespace:base
## with value
## 
## function (x, ...) 
## structure(mean(unclass(x), ...), class = "Date")
## <bytecode: 0x7fcbc42f8b88>
## <environment: namespace:base>
{% endhighlight %}

