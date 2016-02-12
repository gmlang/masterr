---
layout: post
title: "How to Convert Millisecond to Date in R"
date: 2014-09-02 11:03:39 -0400
comments: true
categories: r
keywords: "R, convert milliseconds to date in R, POSIXct"
published: true
share: true
ads: true

---
Sometimes, we receive data where the timestamps are milliseconds and we want to convert them to dates. This is quite easy in R. We just need to use the `as.POSIXct()` function. Here's a function wrapper I wrote to make it even easier.

{% highlight r %}
ms.to.date = function(x, t0="1970-01-01", timezone) {
        ## @x: a numeric vector
        ## @t0: a string of the format "yyyy-mm-dd", specifying the date that
        ##      corresponds to 0 millisecond
        ## @timezone: a string specifying a timezone that can be recognized by R
        ## return: a POSIXct vector representing calendar dates and times        
        as.POSIXct(x, origin=t0, tz=timezone)
}
{% endhighlight %}

Here's an example of how to use it:

{% highlight r %}
date.in.ms = c(1348034028, 1348034031)
ms.to.date(date.in.ms, timezone="America/Los_Angeles")
{% endhighlight %}



{% highlight text %}
## [1] "2012-09-18 22:53:48 PDT" "2012-09-18 22:53:51 PDT"
{% endhighlight %}
