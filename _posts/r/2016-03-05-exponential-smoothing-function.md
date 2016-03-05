---
layout: post
title: "A Simple R Function for Exponential Smoothing"
date: 2016-03-05 11:47:00 -0400
comments: true
categories: r
keywords: "R, exponential smoothing, alpha, weighted average"
published: true
share: true

---

Exponential smoothing is a simple method to forecast the future given the present and the past. You can use it to forecast sales, revenues, production levels, marketing expenses, the weather, stock prices, and many other things that happend over time. It's crude so sometimes it doesn't work well. But sometimes it does work fine, and you can often use it as a data processing tool to smooth out timeseries data before using them to build more complicated models. 

Exponential smoothing is essentially a method of weighted averages. Here's how it works: 
1. take the current value and weight it by a number (call it alpha) bewtween 0 and 1 (for example, 0.8), 
2. take the previous value and weight it by 1-alpha (for example, 0.2),
3. sum results from step 1 and 2 and use it as an estimate for the next value.

Here's a function that implements it in R.

{% highlight r %}
exp_smooth = function(x, alpha) {
        # Performs exponential smoothing by taking a weighted average of the
        # current and previous data points
        #
        # x     : numeric vector
        # alpha : number between 0 and 1, weight assigned to current data value
        #
        # Returns a numeric vector of the same length as x and values as the 
        #       weighted averages of the (current, previous) consecutive pairs
        s = numeric(length(x) + 1) # make s 1 cell longer than x
        for (i in seq_along(s)) {
                if (i == 1) { # set the initial value of s the same as that of x
                        s[i] = x[i]
                } else {
                        # weight current value with alpha and previous value 
                        # with 1-alpha, and sum
                        s[i] = alpha * x[i - 1] + (1 - alpha) * s[i - 1]
                }
        }
        s[-1] # drop the 1st element in s because it's extra
}
{% endhighlight %}

In practice, people often weight the current value more heavily than the previous value, and this is based on a common sensical hypothesis that when making predictions about the future, the present matters more than the past. The following example uses `alpha=0.8` to exponentially smooth a vector of randomly generated numbers from a uniform distribution.

{% highlight r %}
set.seed(10393)
x = round(runif(5), 3)
round(exp_smooth(x, 0.5), 3)
{% endhighlight %}



{% highlight text %}
## [1] 0.253 0.306 0.374 0.187 0.528
{% endhighlight %}



{% highlight r %}
x
{% endhighlight %}



{% highlight text %}
## [1] 0.253 0.359 0.443 0.000 0.869
{% endhighlight %}
