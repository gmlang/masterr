---
layout: post
title: "The Switch Operator in R"
date: 2014-11-21 
comments: true
categories: r
keywords: "R, switch, R tips"
published: true
share: true
ads: true
---

The `switch()` function in R is very powerful and here's an example.

{% highlight r %}
center = function(x, type) {
        # Finds the center of x
        #
        # Args:
        #       x:      numeric vector
        #       type:   string specifying center type
        # 
        # Returns:
        #       the specified center of x
        switch(type,
               mean = mean(x), median = median(x), trimmed = mean(x, trim=0.1))
}

# unit test
x = rcauchy(10)
center(x, "mean")
{% endhighlight %}



{% highlight text %}
## [1] -1.237765
{% endhighlight %}



{% highlight r %}
center(x, "median")
{% endhighlight %}



{% highlight text %}
## [1] -0.9514988
{% endhighlight %}



{% highlight r %}
center(x, "trimmed")
{% endhighlight %}



{% highlight text %}
## [1] -1.082965
{% endhighlight %}

