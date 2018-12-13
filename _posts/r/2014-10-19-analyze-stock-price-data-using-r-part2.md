---
layout: post
title: "Analyze Stock Price Data Using R, Part2"
date: 2014-10-19 
comments: true
categories: r
keywords: "R, PerformanceAnalytics, zoo, tseries, download stock price data using R, analyze stock price data using R"
published: true
share: true
ads: true
---

When constructing a portfolio, it's important to pick un-correlated assets. This is just a corollary of the "don't put all your eggs in one basket" principle. If asset B goes up (or down) when asset A goes up (or down) and vice versa, there's really no reason to own both assets. By and large, assets of different classes are weakly correlated, for example, stocks and bonds, stocks and gold, and etc. In [part1](https://masterr.org/r/analyze-stock-price-data-using-r-part1/), I said I'm interested in a vanguard energy fund (VGENX) because oil price has been hammered. However, because I already own the Total Stock Market Index Fund (VTSMX), I want to find out how correlated VGENX is with VTSMX.

Step 1. Load libraries and helper functions

{% highlight r %}
library(PerformanceAnalytics)
{% endhighlight %}



{% highlight text %}
## Error in library(PerformanceAnalytics): there is no package called 'PerformanceAnalytics'
{% endhighlight %}



{% highlight r %}
library(zoo)
library(tseries)
{% endhighlight %}



{% highlight text %}
## Error in library(tseries): there is no package called 'tseries'
{% endhighlight %}

Step 2. Download the monthly adjusted closing price data on VGENX and VTSMX since Sept 2005 from Yahoo.

{% highlight r %}
VGENX = get.hist.quote(instrument="VGENX", start="2005-09-30", 
                       end="2014-09-30", origin="1970-01-01",
                       quote="AdjClose", provider="yahoo", 
                       compression="m", retclass="zoo")
{% endhighlight %}



{% highlight text %}
## Error in get.hist.quote(instrument = "VGENX", start = "2005-09-30", end = "2014-09-30", : could not find function "get.hist.quote"
{% endhighlight %}



{% highlight r %}
VTSMX = get.hist.quote(instrument="VTSMX", start="2005-09-30", 
                       end="2014-09-30", origin="1970-01-01",
                       quote="AdjClose", provider="yahoo",
                       compression="m", retclass="zoo")
{% endhighlight %}



{% highlight text %}
## Error in get.hist.quote(instrument = "VTSMX", start = "2005-09-30", end = "2014-09-30", : could not find function "get.hist.quote"
{% endhighlight %}

Step 3. Change the class of the time index to yearmon.

{% highlight r %}
index(VGENX) = as.yearmon(index(VGENX))
{% endhighlight %}



{% highlight text %}
## Error in index(VGENX): object 'VGENX' not found
{% endhighlight %}



{% highlight r %}
index(VTSMX) = as.yearmon(index(VTSMX))
{% endhighlight %}



{% highlight text %}
## Error in index(VTSMX): object 'VTSMX' not found
{% endhighlight %}

Step 4. Merge both price series into one data frame and Calculate continuously compounded returns.

{% highlight r %}
prices = merge(VGENX, VTSMX)
{% endhighlight %}



{% highlight text %}
## Error in merge(VGENX, VTSMX): object 'VGENX' not found
{% endhighlight %}



{% highlight r %}
colnames(prices) = c("VGENX", "VTSMX")
{% endhighlight %}



{% highlight text %}
## Error in colnames(prices) = c("VGENX", "VTSMX"): object 'prices' not found
{% endhighlight %}



{% highlight r %}
ret.cc = diff(log(prices))
{% endhighlight %}



{% highlight text %}
## Error in diff(log(prices)): object 'prices' not found
{% endhighlight %}



{% highlight r %}
head(ret.cc, 3)
{% endhighlight %}



{% highlight text %}
## Error in head(ret.cc, 3): object 'ret.cc' not found
{% endhighlight %}

Step 5. Plot cumulative returns.

{% highlight r %}
ret.simple = diff(prices) / lag(prices, k=-1)
{% endhighlight %}



{% highlight text %}
## Error in diff(prices): object 'prices' not found
{% endhighlight %}



{% highlight r %}
chart.CumReturns(ret.simple, legend.loc="topleft", wealth.index=TRUE, 
                 ylab="$", main="Future Value of $1 invested")
{% endhighlight %}



{% highlight text %}
## Error in chart.CumReturns(ret.simple, legend.loc = "topleft", wealth.index = TRUE, : could not find function "chart.CumReturns"
{% endhighlight %}

Step 6. Display pair-wise scatter plots.

{% highlight r %}
return_matrix = coredata(ret.cc)
{% endhighlight %}



{% highlight text %}
## Error in coredata(ret.cc): object 'ret.cc' not found
{% endhighlight %}



{% highlight r %}
pairs(return_matrix, pch=16, col="dodgerblue2")
{% endhighlight %}



{% highlight text %}
## Error in pairs(return_matrix, pch = 16, col = "dodgerblue2"): object 'return_matrix' not found
{% endhighlight %}

Both plots show the returns of VGENX and VTSMX are pretty correlated.

Step 7. Compute correlation matrices.

{% highlight r %}
cor(return_matrix)
{% endhighlight %}



{% highlight text %}
## Error in is.data.frame(x): object 'return_matrix' not found
{% endhighlight %}

We see their correlation is 0.78, which is pretty high.
