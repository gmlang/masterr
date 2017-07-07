---
layout: post
title: "On Recursion - Part 3"
date: 2017-07-07
comments: true
categories: r
keywords: "R, recursion, recusive functions in R, environment, recursing over environments in R, get(), fget(), tail recursion"
published: true
share: true
ads: true
---

Base R has a function `get()` that searches for a given name over the environment stack and returns its value after finding it. For example, we can use it like this.


{% highlight r %}
x = 9
get("x")
{% endhighlight %}



{% highlight text %}
## [1] 9
{% endhighlight %}



{% highlight r %}
get("mean") # inherits is set to TRUE by default
{% endhighlight %}



{% highlight text %}
## function (x, ...) 
## UseMethod("mean")
## <bytecode: 0x7fd1f4a34228>
## <environment: namespace:base>
{% endhighlight %}



{% highlight r %}
get("mean", inherits = FALSE)
{% endhighlight %}



{% highlight text %}
## Error in get("mean", inherits = FALSE): object 'mean' not found
{% endhighlight %}



{% highlight r %}
mean = function() "fake mean"
get("mean")
{% endhighlight %}



{% highlight text %}
## function() "fake mean"
{% endhighlight %}

If you don't understand why they returned the values they did, you can learn how 
environment works by reading Hadley's [book](http://adv-r.had.co.nz/Environments.html).

We can write our own version of get() using recursion. First we write a helper function that works the same as `get(name, inherits = T)`.


{% highlight r %}
get_helper = function(name, env = parent.frame()) {
        # Returns the value that name binds to. Looks for name in the given 
        #       environment and all its parents.
        # name: string, name of an object
        # env : environment object, default is the global environment
        
        if (identical(env, emptyenv())) { # base case
                stop("object '", name, "'", " not found", call. = F)
        } else if (exists(name, envir = env, inherits = F)) { # success case
                env[[name]]
        } else { # recursive case
                get_helper(name, parent.env(env))
        }
}

get_helper("x")
{% endhighlight %}



{% highlight text %}
## [1] 9
{% endhighlight %}



{% highlight r %}
get("mean")
{% endhighlight %}



{% highlight text %}
## function() "fake mean"
{% endhighlight %}

Next we can easily extend it to a more general version that takes an additional parameter `inherits`.


{% highlight r %}
get_gmlang = function(name, env=parent.frame(), inherits = T) {
        # Returns the value that name binds to. If inherits = T, looks for name
        #       in the given environment and all its parents. Otherwise, looks
        #       for name only in the given environment.
        #
        # name: string, name of an object
        # env : environment object, default is the global environment
        # inherits: logical
        
        if (inherits) { 
                get_helper(name, env)
        } else if (exists(name, envir = env, inherits = F)) {
                env[[name]]
        } else {
                stop("object '", name, "'", " not found", call. = F)
        }
}

e = new.env()
e$z = 100
get_gmlang("x", env=e, inherits = T)
{% endhighlight %}



{% highlight text %}
## [1] 9
{% endhighlight %}



{% highlight r %}
get_gmlang("x", env=e, inherits = F)
{% endhighlight %}



{% highlight text %}
## Error: object 'x' not found
{% endhighlight %}



{% highlight r %}
get_gmlang("z", env=e)
{% endhighlight %}



{% highlight text %}
## [1] 100
{% endhighlight %}



{% highlight r %}
get_gmlang("z") # note: global environment is the parent of e
{% endhighlight %}



{% highlight text %}
## Error: object 'z' not found
{% endhighlight %}

Moreover, we can easily extend `get_helper()` to a function `fget_helper()` that finds only function objects.


{% highlight r %}
fget_helper = function(name, env = parent.frame()) {
        # Returns the value that name binds to when name binds to a function. 
        #       Looks for name in the given environment and all its parents.
        #
        # name: string, name of an object
        # env : environment object, default is the global environment

        if (identical(env, emptyenv())) { # base case
                stop("Can't find ", name, " as a function object", call. = F)
        } else if (class(env[[name]]) == "function") { # success case
                # if name not in env, env[[name]] returns NULL with class "NULL"
                env[[name]]
        } else { # fail case
                fget_helper(name, parent.env(env))
        }
}

fget_helper("x")
{% endhighlight %}



{% highlight text %}
## Error: Can't find x as a function object
{% endhighlight %}



{% highlight r %}
fget_helper("mean")
{% endhighlight %}



{% highlight text %}
## function() "fake mean"
{% endhighlight %}



{% highlight r %}
rm("mean")
fget_helper("mean")
{% endhighlight %}



{% highlight text %}
## function (x, ...) 
## UseMethod("mean")
## <bytecode: 0x7fd1f4a34228>
## <environment: namespace:base>
{% endhighlight %}

