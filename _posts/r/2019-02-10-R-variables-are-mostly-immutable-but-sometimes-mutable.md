---
layout: post
title: "R Variables Are Mostly Immutable but Sometimes Mutable"
date: 2019-02-10
comments: true
categories: r
keywords: "R, variable binding, bind a name to a value, assign to a variable, immutable, mutable, memory address, immutable variable, mutable variable"
published: true
share: true
ads: true
---

A variable (binding) is immutable if its value cannot be changed, and mutable otherwise. In R, variables are mostly immutable but sometimes mutable. This can be seen by running the following code. When running the code, whenever it appears we've changed the value of an immutable variable, we've achieved it not by "changing its value" but by "shadowing," meaning that we've made a copy of the value first, changed the copy and pointed the variable to the modified copy. The code print out the memory address the variable points to after each operation. A change of address implies the variable is immutable. Identical addresses imply the variable is mutable. 

**NOTE:**

* if using Rstudio, run each code block in entirety, and don't run each line interactively,
* if running inside R directly without using Rstudio, you can run each line interactively.


## A variable is immutable if it binds to an atomic value (for example, a number or string).

{% highlight r %}
{
        x = 7
        print(paste(x, "at addr", pryr::address(x))) # initial addr x points to
        x = x + 1 # copy-n-modify
        print(paste(x, "at addr", pryr::address(x))) # x points to a different addr
        x = x / 2 # copy-n-modify
        print(paste(x, "at addr", pryr::address(x))) # x points to yet another different addr
}
{% endhighlight %}



{% highlight text %}
## [1] "7 at addr 0x7fb9e6974c48"
## [1] "8 at addr 0x7fb9e7c491e0"
## [1] "4 at addr 0x7fb9e7c48db8"
{% endhighlight %}

## A variable starts off as immutable and becomes mutatble if it binds to a vector.

{% highlight r %}
{
        w <- 1:10
        print(paste("w points to addr", pryr::address(w))) # initial addr w points to
        w[5] <- 10 # copy-n-modify
        print(paste("w points to addr", pryr::address(w))) # w points to a different addr
        w[1] <- 110 # modify in place
        print(paste("w points to addr", pryr::address(w))) # w points to the same different addr
}
{% endhighlight %}



{% highlight text %}
## [1] "w points to addr 0x7fb9e649a990"
## [1] "w points to addr 0x7fb9e575c818"
## [1] "w points to addr 0x7fb9e575c818"
{% endhighlight %}

## A variable is mutable if you assign a list to it and only to it (and not to other variables). 

{% highlight r %}
{
        y = as.list(1:10)
        print(paste("y points to addr", pryr::address(y))) # initial addr y points to
        y[[1]] <- 10 # modify in place
        print(paste("y points to addr", pryr::address(y))) # y points to the same addr
        y[[2]] = 9 # modify in place
        print(paste("y points to addr", pryr::address(y))) # y points to the same addr
}
{% endhighlight %}



{% highlight text %}
## [1] "y points to addr 0x7fb9e6e07218"
## [1] "y points to addr 0x7fb9e6e07218"
## [1] "y points to addr 0x7fb9e6e07218"
{% endhighlight %}

## A variable starts off as immutable and becomes mutatble if it binds to a list and there's at least one other variable that binds to the same list. 

{% highlight r %}
{
        y = as.list(1:10)
        x = y # both x and y bind to the same list
        print(paste("x points to addr", pryr::address(x))) # initial addr x points to
        print(paste("y points to addr", pryr::address(y))) # initial addr y points to
        y[[1]] <- 10 # copy-n-modify 
        print(paste("y points to addr", pryr::address(y))) # y points to a different addr
        y[[2]] = 9 # modify in place
        print(paste("y points to addr", pryr::address(y))) # y points to the same different addr
        y[[5]] <- -5 # modify in place
        print(paste("y points to addr", pryr::address(y))) # y points to the same different addr
}
{% endhighlight %}



{% highlight text %}
## [1] "x points to addr 0x7fb9e6433bf8"
## [1] "y points to addr 0x7fb9e6433bf8"
## [1] "y points to addr 0x7fb9e6354798"
## [1] "y points to addr 0x7fb9e6354798"
## [1] "y points to addr 0x7fb9e6354798"
{% endhighlight %}




