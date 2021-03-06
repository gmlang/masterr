---
layout: post
title: "How to Convert Strings to Dates in R"
date: 2014-08-21 
comments: true
categories: r
keywords: "R, string to date conversion, character vector in R, numeric vector in R, date in R"
published: true
share: true
ads: true
---

Dealing with date variables is usually tedious. When reading in a text data file into R, R will not automatically convert the date values into dates, rather, it will treat them as strings (make sure you specify `stringsAsFactors = FALSE` in your `read.table()` or `read.csv()` function. Otherwise, R will read in them as factors, which you don't want). Sometimes, the date values are of the format “yyyymmdd”, like “20051023”, and R will treat them as numbers. It's your job to convert these strings or numbers to dates. I've written a function that allows you to do that easily. 

{% highlight r %}
as_date = function(x, ...) {
        # @x: a character or numeric vector
        # returns: converts x to dates and returns it

        dts.char = unique(x)
        if ( is.numeric(dts.char) ) dts = as.Date(as.character(dts.char), ...)
        else dts = as.Date(dts.char, ...)

        # match returns a vector of positions of first matches of elts of x in
        # dts.char, and because dts.char is unique, match here really finds,
        # for any element in x, the index of the element in dts.char that
        # matches it.
        dts[match(x, dts.char)]
}
{% endhighlight %}

Here're some examples of how to use it:

{% highlight r %}
a = c(20051201, 20051202)
b = rep(c("2013-10-21","2013-07-30"), 2)
c = c("12/31/1983", "1/1/1984")

a.as.date = as_date(a, format="%Y%m%d")
str(a.as.date)
{% endhighlight %}



{% highlight text %}
##  Date[1:2], format: "2005-12-01" "2005-12-02"
{% endhighlight %}



{% highlight r %}
b.as.date = as_date(b)
str(b.as.date)
{% endhighlight %}



{% highlight text %}
##  Date[1:4], format: "2013-10-21" "2013-07-30" "2013-10-21" "2013-07-30"
{% endhighlight %}



{% highlight r %}
c.as.date = as_date(c, format="%m/%d/%Y")
str(c.as.date)
{% endhighlight %}



{% highlight text %}
##  Date[1:2], format: "1983-12-31" "1984-01-01"
{% endhighlight %}

After you have converted the date variables from strings or numbers to date types, you often will want to extract from them the day, month, and year. Here's how:

{% highlight r %}
( day = as.integer(format(a.as.date, "%d")) )
{% endhighlight %}



{% highlight text %}
## [1] 1 2
{% endhighlight %}



{% highlight r %}
( month = as.integer(format(b.as.date, "%m")) )
{% endhighlight %}



{% highlight text %}
## [1] 10  7 10  7
{% endhighlight %}



{% highlight r %}
( year = as.integer(format(c.as.date, "%Y")) )
{% endhighlight %}



{% highlight text %}
## [1] 1983 1984
{% endhighlight %}
