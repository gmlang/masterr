---
layout: post
title: "On Recursion - Part 2"
date: 2017-07-06
comments: true
categories: r
keywords: "R, recursion, recusive functions in R, environment, recursing over environments in R"
published: true
share: true
ads: true
---

In the [*Environments*](http://adv-r.had.co.nz/Environments.html#env-recursion) chapter of the book *Advanced R*, Hadley presented a function 
`where(name, env = parent.frame())` that finds the first environment where a given name is defined. The parameter `env` is the environment where the search begins. Its default value is the global environment (the environment where we normally work). The function was written recursively. I encourage you to study it first before reading on because I'm giving a solution here to one of the exercises, which asks to write a recursive function to find all environments that contain a binding for `name`. 

Here's my solution. 


{% highlight r %}
where_all = function(name, env = parent.frame()) {
        # Finds all environments that contain a binding for name.
        # 
        # name: string, name of an object
        # env : environment object where the search begins
        
        if (identical(env, emptyenv())) { # base case
                res = NULL
        } else { # non-base case
                if (exists(name, envir = env, inherits = F)) { # success case
                        res = env
                } else { # fail case
                        res = NULL
                }
                        
                # recursive step
                c(res, where_all(name, parent.env(env)))
        }
}
{% endhighlight %}

Let's test it.


{% highlight r %}
# test
mean = function(x) "guck"
where_all("mean")
{% endhighlight %}



{% highlight text %}
## [[1]]
## <environment: R_GlobalEnv>
## 
## [[2]]
## <environment: base>
{% endhighlight %}

Now inside of `where_all()` I used a base R function `exists()` to check if `name` is in the current environment. But we don't have to use it, instead, we can implement our own version using recursion. Below is how to do it.


{% highlight r %}
exists2 = function(name, env=parent.frame(), inherits = T) {
        if (inherits) {
                if (identical(env, emptyenv())) { # base case
                        FALSE
                } else if (name %in% ls(env)) { # success case
                        TRUE
                } else { # fail case
                        exists2(name, parent.env(env)) # recursive step
                }
        } else {
                name %in% ls(env)
        }
}
{% endhighlight %}

We can test it.


{% highlight r %}
e = new.env()
e$x = 109
e$y = 83
rm("x", envir=e)
exists2("y", env=e)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
exists2("y")
{% endhighlight %}



{% highlight text %}
## [1] FALSE
{% endhighlight %}



{% highlight r %}
exists2("x", env=e)
{% endhighlight %}



{% highlight text %}
## [1] FALSE
{% endhighlight %}



{% highlight r %}
ls(e)
{% endhighlight %}



{% highlight text %}
## [1] "y"
{% endhighlight %}

Take a moment to compare `exists2()` and `where_all()`. Where does the recursive step happen? In `exists2()`, it happens when the fail case is triggered. But in `where_all()`, it happens after both the success and fail cases. So the take away is that although all recursions are the same in concept but they can differ in implementation. The key difference lies in where the recursive step happens.

