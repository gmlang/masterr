---
layout: post
title: "RFP - Part3: R Variables"
date: 2019-02-13
comments: true
categories: r
keywords: "R, RFP series, functional programming in R, names, values, objects, assignment, binding, name binding, variable assignment, rebind, reassignment, bind a name to an object, bind a name to a value, assign a value to a variable, assign a variable a value, give a value to a variable, give a variable a value, R symbols, R assignment operators, names and values in R, name binding in R, variable assignment in R, reassign a variable in R, garbage collection in R"
published: true
share: true
ads: true
---

Previously, we discussed two data structures in R: [vectors](https://masterr.org/r/RFP-part1-vectors/) and [lists](https://masterr.org/r/RFP-part2-lists/). If you programmed in another language before, you probably already got a sense that R vectors and lists are a tiny bit different than what you're used to. This is to be expected. In general, there is a nuanced difference between R data structures and that of many other languages. 

The phrase "data structure" is often used to mean value containers (e.g., tupple, list, array, vector, matrix etc.). But it can also be used in a broad sense to refer to any data-like objects that can be manipulated. In many other programming languages or informal English, data structures contain values, and values have types (e.g. int or float), but data structures don't have types. In R, we take the broader meaning, and for this reason, R data structures are called objects[^1]. R objects have types, but their types are different from data types (e.g. int or float) of most other languages. This can be best seen by example. 

In most other languages        |In R    
:------------------------------|:-------------------------------------
89 is an integer.    | 89 is an object of type integer vector with length 1.
"hello" is a string. | "hello" is an object of type character vector with length 1.
1:10 is a container of integer values. | 1:10 is an object of type integer vector. 
list(TRUE, 2.2) is a container of a logical and a float. | list(TRUE, 2.2) is an object of type list. Its first element is an object of type logical vector with length 1. Its second element is an object of type numeric vector with length 1.

So vectors and lists are objects in R. In fact, not only vectors or lists, to quote John Chambers, "everything that exists (in R) is an object." 

## Variables or (variable) names are objects. 

Variables in R are objects and have the type "symbol." For example, we can `quote` a variable `x` or wrap `as.name` around a string `"my_var"` and then call `typeof` on them. In both cases, we'd get "symbol."

{% highlight r %}
typeof(quote(x)) # use the function quote() to create a symbol
{% endhighlight %}



{% highlight text %}
## [1] "symbol"
{% endhighlight %}



{% highlight r %}
typeof(as.name("my_var")) # as.name() also creates a symbol. Note it takes in a string.
{% endhighlight %}



{% highlight text %}
## [1] "symbol"
{% endhighlight %}

Compare this with variables in other languages. In a statically typed language like SML or Rust, variables have data types like `int`, `string`, `u32`, `f64` and etc. In a dynamically typed language like Python, variables have no types. R is also dynamically typed, even though its variables have a type[^2].

Because R variables are objects, they can be manipulated in the same way as vectors or lists. For example, we can capture the operation of adding two variables and evaluate it later.

{% highlight r %}
expr = quote(x + y) # capture (x + y) without evaluation.
typeof(expr) # the captured expression is itself an object, and has type "language".
{% endhighlight %}



{% highlight text %}
## [1] "language"
{% endhighlight %}



{% highlight r %}
x = 10 # give a value to x.
y = -1 # give a value to y.
eval(expr) # now x and y take on particular values, we can evaluate the captured expression (x + y) and get a result.
{% endhighlight %}



{% highlight text %}
## [1] 9
{% endhighlight %}

"Computing on the language" is a very powerful feature that many other languages don't offer. Without it, the almighty [tidyverse](https://www.tidyverse.org) would crumble. We'll spend a lot more time talking about it in later parts of this series. For now, let's focus on the common role of variables. 

## Variables refer to objects.

Variables in R play the role of symbolic names[^3], and can be bound to any objects. Once a variable is bound to an object, it refers to that object.

For example, if we simply type 6 in the console, we'll lose it the moment the cursor returns. This is annoying because we may want to do more things to it. The solution is to give it a name by putting a symbol on the left of the assignment operator `<-` or `=`[^4] and the value 6 on the right.

{% highlight r %}
x = 6
{% endhighlight %}

Now the symbol "x" refers to the value 6. Whenever we want to do more things to that 6, we can just use x.

{% highlight r %}
print(x + 2) # prints 8
{% endhighlight %}



{% highlight text %}
## [1] 8
{% endhighlight %}

In other words, R variables are like math variables. If you're coming from a math or science background, you may take this for granted and think this is how variables are in all programming languages. But that's not the case. Many major programming languages make a distinction between "name" and "variable," and between "name binding" and "variable assignment". In those languages (for example, C, Java or Rust), a variable is more than a name, and consists of three parts: name, content box and memory location (of the content box). We can think of a variable in those languages as a carefully-stored bottle of wine, with the bottle (content box), the label (name), and the wine opener (memory address) all being part of the game. Using the wine opener, we can uncork the bottle, pour the wine out (if there're any), and put in different wine. In contrast, a R variable is like a bottle label, while the refered object is like a bottle of wine. Given a bottle of wine, we can place one or more labels on the bottle. If it's already labeled, we can replace the label with a different one, or we can take off the label and put it on another bottle. But we cannot open a bottle and change the wine because its wine opener isn't provided[^5]. 

To summarize, SML, C or Java programmers call the "bottle labeling" operation "name binding" and the "changing the wine" operation "variable assignment." But math people make no such distinction because there's no "changing the wine" operation in math. In math, "variable assignment" is "name binding" and vice versa, with "variable assignment" being the prefered term. Because R was originally designed for Statisticians and mathematicians, the phrase "variable assignment" is more frequently used in the R world. 

The following table shows the different meaning of the same phrase "Variable Assignment" in R vs. many other major languages.

Operation |In many major languages        |In R    
:--------|:------------------------------|:-------------------------------------
bottle labeling| Name Binding    | Variable Assignment |
opening the bottle and changing the wine|  Variable Assignment | Doesn't support this in base R|


## Many-to-one: Many variables can refer to the same object.

An object can be assigned to one or many variables. (In other words, one or many names can be bound to the same object, or simply, an object can have many names, or more than one variables can refer to the same object.)

Given a variable `x`, we can use `pryr::address(x)` to find the memory location of the object that `x` points to. (If we're lazy, we can simply say "the memory location of `x`.") If two variables have the same memory addresses, we say they refer to the same object.

{% highlight r %}
x = 1 # bind the symbol x to a value 1
y = x # bind the symbol y to the same value 1
x == y # x and y are equal
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
identical(pryr::address(x), pryr::address(y)) # the memory location of the value that x points to is the same as the one that y points to, indicating both x and y point to the same value.
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}

On the other hand, different variables can refer to different objects, but have the same value. For example in the code below, `x` and `y` point to two different 1's.

{% highlight r %}
x = 1 # bind x to 1
y = 1 # bind y to another 1
x == y # x and y are equal in value
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
identical(pryr::address(x), pryr::address(y)) # the memory location of x is different from that of y, indicating x and y point to different objects.
{% endhighlight %}



{% highlight text %}
## [1] FALSE
{% endhighlight %}


## Variables can be reassigned.

Variables can be reassigned an unlimited number of times. This allows us to use variables just like how we use them in math:

{% highlight r %}
x = 6
print(paste("x points to", x, "located at:", pryr::address(x)))
{% endhighlight %}



{% highlight text %}
## [1] "x points to 6 located at: 0x7fc5d7e07a38"
{% endhighlight %}



{% highlight r %}
x = x + 1 # use x to compute a new value and reassign it to x
print(paste("x stops pointing to the old value. It now points to", x, "at:", pryr::address(x)))
{% endhighlight %}



{% highlight text %}
## [1] "x stops pointing to the old value. It now points to 7 at: 0x7fc5d8823070"
{% endhighlight %}

R is dynamically typed, so any variable can refer to any object at any time. For example, a variable can be assigned an integer, and then a string, and then a list, and then a function.

{% highlight r %}
x = 0
x = "Norwegian Wood"
x = list(TRUE, list(1:10, function() print("well...")))
x = function(n) n^2
{% endhighlight %}


## Variables are reassigned independently of other variables.

Variables are not magically linked when they refer to the same object. They are still separate and independent variables. As a result, reassigning one of them won't reassign the other:

{% highlight r %}
x = 6
y = x # both y and x refer to the same 6
if (identical(pryr::address(x), pryr::address(y)))
        print(paste("both x and y point to", x, "located at:", pryr::address(x)))
{% endhighlight %}



{% highlight text %}
## [1] "both x and y point to 6 located at: 0x7fc5da625e80"
{% endhighlight %}



{% highlight r %}
x = 9 # reassign x a value 9
print(paste("reassigned x, and x now points to", x, "at:", pryr::address(x)))
{% endhighlight %}



{% highlight text %}
## [1] "reassigned x, and x now points to 9 at: 0x7fc5da625cf8"
{% endhighlight %}



{% highlight r %}
print(paste("y still points to the old", y, "at:", pryr::address(y)))
{% endhighlight %}



{% highlight text %}
## [1] "y still points to the old 6 at: 0x7fc5da625e80"
{% endhighlight %}


## Objects can't live long without variables.

An object has a fleeting life unless it's assigned to at least one variable. This is because R implements "garbage collection"[^6]. Internally, R keeps track of the number of variables each object is bound to[^7], and automatically cleans up objects that are not referenced at all. For example, when we reassign a variable, the old object it refered to will be garbage collected if it has no other references.

{% highlight r %}
rm(list = ls()) # remove all objects in the global environment
x = "hello" # look at the Environment panel inside Rstudio: x is bound to "hello".
x = "world" # look at the Environment panel, notice x is bound to "world" now. The value "hello" is gone.
{% endhighlight %}


[^1]: To avoid confusion, we'll stop using the phrase "R data structures" and use "objects" or "R objects" instead. We'll keep using the phrase "data structures" as how it's commonly understood.
[^2]: For this reason, R is sometimes called weakly typed. But this detail is not important. 
[^3]: It's not a coincidence that R variables are designed to have type "symbol."
[^4]: `=` and `<-` are the same for all practical purpose: https://developer.r-project.org/equalAssign.html
[^5]: Base R doesn't provide ways for programmers to directly access the computer's memory.
[^6]: Not all programming languages implement garbage collection. The Rust programming language is an example. It doesn't have garbage collection. Instead, it uses ownership to ensure memory safety. 
[^7]: The function `pryr::refs()` can be used for finding the number of references an object has, but I find its result don't make much sense. 
