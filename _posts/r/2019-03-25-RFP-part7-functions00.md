---
layout: post
title: "RFP - Part 7: Well-behaved R Functions"
date: 2019-03-25
comments: true
categories: r
keywords: "R, RFP series, functional programming in R, R evaluation rules, variable rebinding in R, reassignment in R, evaluation rules in SML, variable shadowing in SML, R function calls, R functions, R function evaluation, Well-behaved R Functions"
published: true
share: true
ads: true
---

Function is a big topic in R programming. I'll spend several blog posts talking 
about it. But before I dive into R functions with full force, I want to show you 
how nice it is to work with them. Consider the following code:

{% highlight r %}
x = 1 # Bind x to 1 in the global environment.
f = function() x # Define a function to tell what value x maps to when we call it later.
x = 2 # Rebind x to 2 in the global environment.
# ls(envir = globalenv()) # Check that x and f are indeed in the global environment.
{% endhighlight %}

When we call `f`, what will it return? Mathematically and intuitively, we'd expect 
`f` to return `2` because x has a value of 2 now (although it had a value of 1 before). 
If x takes a different value later, we'd expect `f` to return the new value when 
called later. In other words, we expect `f`, when called, to return the current 
x value. This is exactly what `f` does in R:

{% highlight r %}
f()   # Calling f returns 2 because x is 2
{% endhighlight %}



{% highlight text %}
## [1] 2
{% endhighlight %}



{% highlight r %}
x = 3 # Rebind x to 3
f()   # Calling f returns 3 because x is 3 now
{% endhighlight %}



{% highlight text %}
## [1] 3
{% endhighlight %}

So R evaluation rules[^1], by and large, mimic mathematical or intuitive reasonings 
pretty well. As a result, we often don't come across surprises when coding in R. 
Don't take this for granted. Not every programming language behave this way. For 
example, if you try to do the same thing in SML, you'll be surprised by 
what you get. See the following SML code with detailed comments:

```
val x = 1; (* Create an environment, and inside this environment, x is bound to 1.*)
fun f () = x; (* Define a function that when we call it later, it tells us what value x is bound to. *)
val x = 2; (* Create a different environment, and inside this new environment, x is bound to 2. *)
x; (* The later binding for x shadows the earlier one, so calling x returns 2. *)
f(); (* Calling f returns 1, NOT 2! This has to do with SML's evaluation rule. *)
```

In SML, how a binding is evaluated depends on (roughly) the values of the 
**preceding** bindings. Prior to the function binding (i.e., when `f` is defined), 
`x` was bound to 1, so evaluating the function binding (i.e., calling `f`) 
returns 1 not 2. In other words, in SML, `f` always returns the last value x was
bound to before `f` was defined. 

Let's all take a moment to appreciate the nice behavior of R functions.

[^1]: Read this [article](https://masterr.org/r/understand-r-environments-part1/) to understand exactly how code are evaluted in R. 
