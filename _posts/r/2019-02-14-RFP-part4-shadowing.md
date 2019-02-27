---
layout: post
title: "RFP - Part4: R Variable Shadowing"
date: 2019-02-14
comments: true
categories: r
keywords: "R, RFP series, functional programming in R, variable shadowing in R, shadow a binding in SML, the difference between variable assignment in R and name binding in SML"
published: true
share: true
ads: true
---

Now we know that variables in R are objects, and that they can be manipulated, assigned any R objects and reassigned. (You can read the detailed discussion [here](https://masterr.org/r/RFP-part3-variables/).) We'll discuss variable shadowing.


## Variable reassignment in R

After we assign a R object to a variable, the variable will refer to that object. Let's use a gray rectangular shape to represent the variable, and draw an arrow from the variable pointing to the object. For example, here is what's going on behind the one-liner `x = 3` pictorially:
<img src="/../figs/2019-02-14-RFP-part4-shadowing/unnamed-chunk-1-1.png" title="center" alt="center" style="display: block; margin: auto;" />

When a variable is reassigned another object, it won't refer to the original object anymore. We represent this by changing the original solid arrow to a dashed one. A new solid arrow is drawn from the variable pointing to the new object. For example, the following diagram shows what happens if we reassign x to 32 (`x = 32`):
<img src="/../figs/2019-02-14-RFP-part4-shadowing/unnamed-chunk-2-1.png" title="center" alt="center" style="display: block; margin: auto;" />

The above diagrams depict how variable assignment and reassignment work in both R and Python. Before we talk about how variable shadowing works in R, let's take a look at how it works in an old programing language called Standard ML (SML). 


## Variable shadowing in SML

"Variable assignment" works differently in SML. I'm putting "variable assignment" in quotes because SML programmers don't call it that, instead, they call it "name binding."[^1] For example, consider the same operation of first setting x to 3 and then to 32. Its SML code is

```
val x = 3;  (* bind x to 3 *)
val x = 32; (* bind x to 32 *)
```

The following diagram captures what happens when we run the SML code:
<img src="/../figs/2019-02-14-RFP-part4-shadowing/unnamed-chunk-3-1.png" title="center" alt="center" style="display: block; margin: auto;" />

The second x is a new variable that's different from the first x! It shadows the first x. As a result, if we print x we'd get 32. So the mathematical reassignment operation is carried out by variable shadowing in SML.


## Variable shadowing in R

R also has variable shadowing, which happens if the same variable is assigned in different scopes. Reassignment happens if the same variable is assigned twice or more times in the same scope. Consider the following R code, where each function definition creates a new scope:

{% highlight r %}
x = 0 # global x
outer = function() {
        x = "The Great Gatsby" # outer x
        
        inner = function() {
                x = TRUE # inner x
                print(paste("inner:", x))
        }
        
        inner() # call function inner()
        print(paste("outer:", x)) 
}

{
        outer() # call function outer()
        print(paste("global:", x))
}
{% endhighlight %}



{% highlight text %}
## [1] "inner: TRUE"
## [1] "outer: The Great Gatsby"
## [1] "global: 0"
{% endhighlight %}

From the above printed output, we see the x inside `inner()` shadows the x between `inner()` and `outer()`, which further shadows the x outside of `outer()`. This can be seen more clearly from the following diagram:
<img src="/../figs/2019-02-14-RFP-part4-shadowing/unnamed-chunk-5-1.png" title="center" alt="center" style="display: block; margin: auto;" />


[^1]: They make the distinction between "name binding" and "variable assignment." To learn more, read https://masterr.org/r/RFP-part3-variables/.
