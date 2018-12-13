---
layout: post
title: "How to read in date variables as Date"
date: 2016-02-23
comments: true
categories: r
keywords: "R, convert strings to Dates, date types in R, read in dates in R"
published: true
share: true
ads: true
---

If you work with stocks or eCommerce data, you know you have to deal with dates, and often, the data exist in a text file. I once wrote an [article](https://masterr.org/r/how-to-convert-strings-to-dates-in-r/) suggesting to read in date variables as strings first and then convert them to Date type. Today, I'm going to show you another way, which does the conversion while reading in the file. We're going to use a magic function called `setClass()`.

{% highlight r %}
# define a new class 
methods::setClass('myDate')
methods::setAs("character", "myDate", function(from) as.Date(from, format="%m/%d/%Y"))

# apply it to the following sample data
df = read.table(header=TRUE, text="date close
01/01/2016 24
01/02/2016 23.5
01/03/2016 23.32
01/04/2016 23", colClasses = c("myDate", NA)) # use NA when you want R to guess the var type

# check variable types
str(df)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	4 obs. of  2 variables:
##  $ date : Date, format: "2016-01-01" "2016-01-02" ...
##  $ close: num  24 23.5 23.3 23
{% endhighlight %}

In practice, this method requires us to know the formats of the date values, for example, whether they are like "01/23/2016", "01-23-2016", or "1-23-16", and etc. And it also requires all the values to have the same format. It's easy to check this when the file size is not too big. When the file size is large, I often open up a terminal and look at the first 5 lines using `head -5 filename` and last 5 lines using `tail -5 filename`. I'll also count the length of the characters of each value to see if they are all the same, or run a regular expression logical check over all the values to see if the same regex pattern applies to them all, and etc. Basically, I just poke around using the command line until I have a pretty good idea of how the date values look like. Maybe I'll give some examples in the future. Until then, may the force be with you in your R learning journey!
