---
layout: post
title: "How to Read Excel Files into R"
date: 2014-09-25
comments: true
categories: r
keywords: "read excel file into R"
published: true
share: true
ads: true
---

You can use the `XLConnect` package to read .xls or .xlsx files into R. Suppose you have a file named example.xls in your working directory. You can read the data on sheet1 into R using the following commands.


{% highlight r %}
library(XLConnect)
data = readWorksheetFromFile("example.xls", sheet=1)
{% endhighlight %}

Alternatively, you can read in the data by sheet name. For example, the following code will read the data on the sheet named "raw_data" into R.


{% highlight r %}
library(XLConnect)
data = readWorksheetFromFile("example.xls", sheet="raw_data")
{% endhighlight %}

After reading an excel file into R, you often want to tidy up the data. Here're some functions I use frequently for that purpose: 

* lapply
* vapply
* strsplit
* paste
* tolower
* gsub
