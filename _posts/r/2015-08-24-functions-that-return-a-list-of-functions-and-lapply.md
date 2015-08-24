---
layout: post
title: "Functions that return a list of functions and lapply"
date: 2015-08-24 14:31:49 -0400
comments: true
categories: R
keywords: "R, lapply, list, sapply, functions, store functions in a list"
published: true
share: true

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
row.names(out) = c("mean", "median", "sd", "mad", "IQR")
{% endhighlight %}



{% highlight text %}
## Error in `row.names<-.data.frame`(`*tmp*`, value = c("mean", "median", : invalid 'row.names' length
{% endhighlight %}



{% highlight r %}
out
{% endhighlight %}



{% highlight text %}
##         X1       X2      X3
## 1        1       17       1
## 2       39       49      43
## 3     22.5       32      14
## 4     24.5       31     8.5
## 5 12.77106 11.13553 16.1493
## 6   8.8956   8.8956 10.3782
## 7     9.25       11    16.5
{% endhighlight %}
