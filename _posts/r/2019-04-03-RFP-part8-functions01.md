---
layout: post
title: "RFP - Part 8: R Functions"
date: 2019-04-03
comments: true
categories: r
keywords: "R, RFP series, functional programming in R, R evaluation rules, R function calls, R functions, R function evaluation, R function closures, R function enclosures, calling environment, evaluation environment"
published: true
share: true
ads: true
---

Functions play a quintessential role in R. 
John Chambers said that "in R: everything that happens is a function call."
Before diving into R functions, I want to explain the mathematical concept of 
"function" because it will help us understand R functions. 

A mathematical function is made of input variables and a body of mathematical
statements operating on the input variables. Once defined, it can be used again
and again, taking on different input values and returning some values as output.  
But for the same inputs, a math function always outputs the same answer. 
For example, consider the identity function `f(x) = x` defined over the real 
numbers. We have

- the value of `f(1)` is always 1, 
- the value of `f(-100.1)` is always -100.1, and 
- in general, the value of `f(x)` is always `x` for any real number `x`.

A pure function in programming is analogous to a math function. A pure function 
never changes the input data, and always makes a new copy and modifies the copy. 
Functional programming (FP) encourages the usage of pure functions because they 
make it easier to reason about what's going on. In R, if you want to write pure
functions (and most of the time you want to do that), avoid the `<<-` assignment
operator[^1]. 

Similar to a math function, a R function also has a list of input arguments and 
a body. The following code chunck presents a example template for defining a 
function in R. The keyword `function` tells R that we're defining a function. 
Its input arguments are `x1`, `x2 = 5` and `...`, with 5 being the default value 
of `x2`. The `...` argument is special and can contain any number of arguments. 
It is used when the number of arguments are unknown or when the unknown 
arguments will be passed on to another function inside the function. The braces 
`{}` sourounds the function body, which is just a bunch of R statements and 
expressions involving the input variables (`x1`, `x2`, `...`). The function body
can be long or short.

{% highlight r %}
foo = function(x1, x2 = 5, ...) {
        # body content
}
{% endhighlight %}

However, R functions have something that math functions don't have: an 
environment that was active when the function was created. Anything bound in
this environment are available to the function. So everytime we create a R 
function, what we see are the code we write down. When we send the code of 
the function to R for evaluation, R attaches an environment to the function.
This is something we don't see but happens under the hood nonetheless. The 
combination of the code of the function and the bindings in its environment is 
called a "function closure." The word "closure" emphasizes the attached 
environment. 

After a R function is created, we want to use it by calling it over some input 
values. When a R function is called, a new environment (named the *calling* or 
*evaluation environment*) is created, whose parent environment (also called 
*enclosure*) is the environment from the function closure. The calling 
environment is initially populated with the unevaluated arguments of the 
function. As evaluation proceeds, symbols are searched from the calling 
environment first and then from its parent, and local variables are created 
inside the calling environment. 

The above explanation is a little abstract. Read the following post for a 
example that will help contextualizing things:

[Understand R Environments](https://masterr.org/r/understand-r-environments-part1/)


[^1]: This [article](https://masterr.org/r/RFP-part6/) explains how `<<-` works.
