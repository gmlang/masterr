---
layout: post
title: "Replacement Functions in R"
date: 2014-10-15
comments: true
categories: r
keywords: "R, replacement functions"
published: true
share: true
ads: true
---

Replacement functions have names in the form of `xxx<-` and they modify their arguments in place. Here's an example.

{% highlight r %}
`replace_1st<-` = function(x, value) {
  x[1] = value
  x
}

x = rep(2, 5)
replace_1st(x) = 0L
print(x)
{% endhighlight %}



{% highlight text %}
## [1] 0 2 2 2 2
{% endhighlight %}

The following code finds all replacement functions that are also primitive functions in the R base package.

{% highlight r %}
# get a list of functions in the base package
objs = mget(ls("package:base"), inherits = TRUE)
funs = Filter(is.function, objs)

# get a list of replacement functions in the base package
replacement.funs = funs[grep("[a-zA-Z]+<-$", names(funs))]
str(replacement.funs)     
{% endhighlight %}



{% highlight text %}
## List of 28
##  $ attr<-          :function (x, which, value)  
##  $ attributes<-    :function (obj, value)  
##  $ body<-          :function (fun, envir = environment(fun), value)  
##  $ class<-         :function (x, value)  
##  $ colnames<-      :function (x, value)  
##  $ comment<-       :function (x, value)  
##  $ diag<-          :function (x, value)  
##  $ dim<-           :function (x, value)  
##  $ dimnames<-      :function (x, value)  
##  $ Encoding<-      :function (x, value)  
##  $ environment<-   :function (fun, value)  
##  $ formals<-       :function (fun, envir = environment(fun), value)  
##  $ is.na<-         :function (x, value)  
##  $ length<-        :function (x, value)  
##  $ levels<-        :function (x, value)  
##  $ mode<-          :function (x, value)  
##  $ mostattributes<-:function (obj, value)  
##  $ names<-         :function (x, value)  
##  $ oldClass<-      :function (x, value)  
##  $ parent.env<-    :function (env, value)  
##  $ regmatches<-    :function (x, m, invert = FALSE, value)  
##  $ row.names<-     :function (x, value)  
##  $ rownames<-      :function (x, value)  
##  $ split<-         :function (x, f, drop = FALSE, ..., value)  
##  $ storage.mode<-  :function (x, value)  
##  $ substr<-        :function (x, start, stop, value)  
##  $ substring<-     :function (text, first, last = 1000000L, value)  
##  $ units<-         :function (x, value)
{% endhighlight %}



{% highlight r %}
# which ones are primitive functions
names(replacement.funs)[sapply(replacement.funs, is.primitive)]
{% endhighlight %}



{% highlight text %}
##  [1] "attr<-"         "attributes<-"   "class<-"        "dim<-"         
##  [5] "dimnames<-"     "environment<-"  "length<-"       "levels<-"      
##  [9] "names<-"        "oldClass<-"     "storage.mode<-"
{% endhighlight %}

To learn more, read [the chapter on functions](http://adv-r.had.co.nz/Functions.html) from Hadley's book, Advanced R.
