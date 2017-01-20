---
layout: post
title: "Handy R Functions for Summary Statistics"
date: 2014-10-22
comments: true
categories: r
keywords: "R, non-NA length, non-NA summary, summary statistics, five number summary"
published: true
share: true
ads: true
---

When analyzing a variable, one of the first things you want to do is to count how many non-missing (or non-NA) values the variable has. Unfortunately, there's no default functions in R that perform this simply task. The `length()` function counts every element including the NAs. But it's not hard to use it together with a `if` clause to handle NAs. 

{% highlight r %}
length2 <- function (x, na.rm=TRUE) {
        # A version of length that can handle NA: if na.rm==T, don't count them
        # 
        # Args:
        #       x    : a vector
        #       na.rm: TRUE or FALSE
        # Returns:
        #       the length of x
        if (na.rm) sum(!is.na(x))
        else       length(x)
}
{% endhighlight %}

The default `summary()` function only returns the min, 1st quantile, median, mean, 3rd quantile and max of the input vector. However, you often also want to know its non-NA value counts, standard deviation, skewness and excess kurtosis. It'd be nice if there's one function that returns all these summary statistics. So I wrote `summary2()`, which does exactly that. It leverages `length2()`, `no_na_summary()`, and the `skewness()` and `kurtosis()` functions in the `e1071` package. 

{% highlight r %}
no_na_summary = function(x, na.rm=TRUE) {
        # Removes NA in a vector and apply summary to it
        # 
        # Args:
        #       x    : a numeric vector
        #       na.rm: TRUE or FALSE
        # Returns:
        #       the summary statistics of x
        summary(x[!is.na(x)])
}

summary2 = function(x) {
        # Removes NA in a numeric vecotr and Computes some summary statistics 
        #
        # Args:
        #       x: a numeric vector
        # Returns:
        #       min, 1st quantile, median, mean, 3rd quantile, max, sd,
        #       non-NA count of x, skewness, and excess kurtosis
        funs = c(no_na_summary, sd, length2, e1071::skewness, e1071::kurtosis)
        summ.stats = unlist(lapply(funs, function(f) f(x, na.rm=TRUE)))
        names(summ.stats) = c("min", "q1", "median", "mean", "q3", "max", 
                              "sd", "n", "skewness", "excess.kurtosis")
        summ.stats
}
{% endhighlight %}

Use these functions and tell others how they've made your daily data analysis job easier.
