---
layout: post
title: "Analyze Stock Price Data Using R, Part2"
date: 2014-10-19 12:48:49 -0400
comments: true
categories: R
keywords: "R, PerformanceAnalytics, zoo, tseries, download stock price data using R, analyze stock price data using R"
published: true
share: true

---

When constructing a portfolio, it's important to pick un-correlated assets. This is just a corollary of the "don't put all your eggs in one basket" principle. If asset B goes up (or down) when asset A goes up (or down) and vice versa, there's really no reason to own both assets. By and large, assets of different classes are weakly correlated, for example, stocks and bonds, stocks and gold, and etc. In [part1](http://gmlang.com/r/analyze-stock-price-data-using-r-part1/), I said I'm interested in a vanguard energy fund (VGENX) because oil price has been hammered. However, because I already own the Total Stock Market Index Fund (VTSMX), I want to find out how correlated VGENX is with VTSMX.

Step 1. Load libraries and helper functions

{% highlight r %}
library(PerformanceAnalytics)
library(zoo)
library(tseries)
{% endhighlight %}

Step 2. Download the monthly adjusted closing price data on VGENX and VTSMX since Sept 2005 from Yahoo.

{% highlight r %}
VGENX = get.hist.quote(instrument="VGENX", start="2005-09-30", 
                       end="2014-09-30", origin="1970-01-01",
                       quote="AdjClose", provider="yahoo", 
                       compression="m", retclass="zoo")
{% endhighlight %}



{% highlight text %}
## time series ends   2014-09-02
{% endhighlight %}



{% highlight r %}
VTSMX = get.hist.quote(instrument="VTSMX", start="2005-09-30", 
                       end="2014-09-30", origin="1970-01-01",
                       quote="AdjClose", provider="yahoo",
                       compression="m", retclass="zoo")
{% endhighlight %}



{% highlight text %}
## time series ends   2014-09-02
{% endhighlight %}

Step 3. Change the class of the time index to yearmon.

{% highlight r %}
index(VGENX) = as.yearmon(index(VGENX))
index(VTSMX) = as.yearmon(index(VTSMX))
{% endhighlight %}

Step 4. Merge both price series into one data frame and Calculate continuously compounded returns.

{% highlight r %}
prices = merge(VGENX, VTSMX)
colnames(prices) = c("VGENX", "VTSMX")
ret.cc = diff(log(prices))
head(ret.cc, 3)
{% endhighlight %}



{% highlight text %}
##                VGENX        VTSMX
## Oct 2005 -0.08831978 -0.018616483
## Nov 2005  0.02154139  0.038859285
## Dec 2005  0.03159695  0.001570475
{% endhighlight %}

Step 5. Plot cumulative returns.

{% highlight r %}
ret.simple = diff(prices) / lag(prices, k=-1)
chart.CumReturns(ret.simple, legend.loc="topleft", wealth.index=TRUE, 
                 ylab="$", main="Future Value of $1 invested")
{% endhighlight %}

![center](/../figs/2014-10-19-analyze-stock-price-data-using-r-part2/unnamed-chunk-5-1.png) 

Step 6. Display pair-wise scatter plots.

{% highlight r %}
return_matrix = coredata(ret.cc)
pairs(return_matrix, pch=16, col="dodgerblue2")
{% endhighlight %}

![center](/../figs/2014-10-19-analyze-stock-price-data-using-r-part2/unnamed-chunk-6-1.png) 

Both plots show the returns of VGENX and VTSMX are pretty correlated.

Step 7. Compute correlation matrices.

{% highlight r %}
cor(return_matrix)
{% endhighlight %}



{% highlight text %}
##           VGENX     VTSMX
## VGENX 1.0000000 0.7835808
## VTSMX 0.7835808 1.0000000
{% endhighlight %}

We see their correlation is 0.78, which is pretty high.
