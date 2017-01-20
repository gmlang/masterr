---
layout: post
title: "Functions that return a list of functions and lapply"
date: 2015-08-24 
comments: true
categories: r
keywords: "R, lapply, list, sapply, functions, store functions in a list"
published: true
share: true
ads: true

---

Have you written functions in R before? If you have, I want you to go back to one of the functions you wrote and take a look at its input and output. Does it take in a piece of data and return another piece of data, be it a number, string, vector, data frame, matrix, or list? Now, if all or most of your functions are like that, you're missing out on the true power of functions. Do you know that you can write functions to return a function instead of a data structure? ([part1](http://masterr.org/r/functions-that-return-functions/), [part2](http://masterr.org/r/functions-that-return-functions-part-2/)) Do you also know that you can write functions to return a list of functions instead of one function?

To demonstrate, let's first generate some data. 

{% highlight r %}
set.seed(10147238)
df = data.frame(replicate(3, sample(1:50, 6)))
df
{% endhighlight %}



{% highlight text %}
##   X1 X2 X3
## 1 24 35 43
## 2 29 27  2
## 3 39 38  4
## 4 17 17  1
## 5  1 49 13
## 6 25 26 21
{% endhighlight %}

Suppose we want to calculate the min, max, mean, median, standard deviation, median absolute deviation, and interquartile range for each column, how can we do it? By the way, the base R has functions that allow us to calculate each of these summary statistics. For example, to compute the median absolute deviation, we can use `mad()`; to compute the interquartile range, we can use `IQR()`. So we can apply each of these summary statistics functions to each of the columns. This is a solution, however, it's not elegant. What if the data has 100 or 1000 columns, and what if we have to calculate 70 summary statistics instead of 7 of them? I certainly don't want to do that much typing, especially when most of the typing would be repetitive. We need a better solution, a more elegant solution that can scale. Here enters the idea of functions that return a list of functions. What do I mean? Take a look at the following function, `summ_stats()`. Notice how I used `lapply()` to loop through each summary statistics function and apply it to the data `x`.


{% highlight r %}
summ_stats = function(x) {
        # Calculate summary statistics of a numeric vector.
        #
        # Args:
        #       x: a numeric vector
        # Returns:
        #       a list of summary statistics functions with x as input
        
        # collect a bunch of functions for calculating summary stats into a vector
        funs = c(min, max, mean, median, sd, mad, IQR)
        
        # feed x to each function and collect the resulting functions into a list
        lapply(funs, function(f) f(x, na.rm = TRUE))
}
{% endhighlight %}

Now, we just need to sapply `summ_stats()` to each column of the data frame. I'd like to point out a couple of things. First, `sapply()` is simplified `lapply()`, and it's just `lapply()` with output beautified. In our case, because our input is a data frame, it automatically beautifies the output in a matrix format. Second, a data frame is really just a list with its columns as the list elements, therefore, we can `sapply()` the data frame `df`, and when we do this, the function `summ_stats()` is applied to each of the columns of `df`. 


{% highlight r %}
out_lst = sapply(df, summ_stats)
out = data.frame(out_lst)
row.names(out) = c("min", "max", "mean", "median", "sd", "mad", "IQR")
out
{% endhighlight %}



{% highlight text %}
##              X1       X2      X3
## min           1       17       1
## max          39       49      43
## mean       22.5       32      14
## median     24.5       31     8.5
## sd     12.77106 11.13553 16.1493
## mad      8.8956   8.8956 10.3782
## IQR        9.25       11    16.5
{% endhighlight %}

This article is inspired by Hadley's book "Advanced R", you can <a rel="nofollow" href="http://www.amazon.com/gp/product/1466586966/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1466586966&linkCode=as2&tag=cabaceo-20&linkId=2GDWMZSF4NX32QIO">buy it from Amazon</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=cabaceo-20&l=as2&o=1&a=1466586966" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
or read it [online](http://adv-r.had.co.nz/Functions.html) for FREE.
