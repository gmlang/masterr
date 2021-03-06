---
layout: post
title: "Download Stock Price Data Using R"
date: 2014-10-16
comments: true
categories: r
keywords: "R, PerformanceAnalytics, zoo, tseries, download stock price data using R, analyze stock price data using R"
published: true
share: true
ads: true
---

Downloading and charting stock prices data become easy when using the `tseries` and `PerformanceAnalytics` R packages. 

Step 1. Load these libraries.

{% highlight r %}
library(PerformanceAnalytics)
library(zoo)
library(tseries)
{% endhighlight %}

Step 2. Download the monthly adjusted closing price data on S&P500 (^GSPC) and NovaGold (NG) between Jan 2004 and Sept 2014 from Yahoo using the function `get.hist.quote()` from the `tseries` package.

{% highlight r %}
sp500 = get.hist.quote(instrument="^GSPC", start="2004-01-01", 
                       end="2014-09-30", origin="1970-01-01",
                       quote="AdjClose", provider="yahoo", 
                       compression="m", retclass="zoo")
{% endhighlight %}



{% highlight text %}
## time series starts 2004-01-02
## time series ends   2014-09-02
{% endhighlight %}



{% highlight r %}
ng = get.hist.quote(instrument="NG", start="2004-01-01", 
                    end="2014-09-30", origin="1970-01-01",
                    quote="AdjClose", provider="yahoo", 
                    compression="m", retclass="zoo")
{% endhighlight %}



{% highlight text %}
## time series starts 2004-01-02
## time series ends   2014-09-02
{% endhighlight %}

Step 3. Change the class of the time index to yearmon which is appropriate for monthly data using `as.yearmon()` in the `zoo` package.  

{% highlight r %}
index(sp500) = as.yearmon(index(sp500))
index(ng) = as.yearmon(index(ng))

# inspect the price data
cat("Start: ", as.character(start(sp500)), "  End: ", as.character(end(sp500)))
{% endhighlight %}



{% highlight text %}
## Start:  Jan 2004   End:  Sep 2014
{% endhighlight %}



{% highlight r %}
cat("Start: ", as.character(start(ng)), "  End: ", as.character(end(ng)))
{% endhighlight %}



{% highlight text %}
## Start:  Jan 2004   End:  Sep 2014
{% endhighlight %}

Step 4. Put both SP500 and NG price data in one data frame to make it easier for analysis.

{% highlight r %}
prices = merge(sp500, ng)
colnames(prices) = c("SP500", "NG")
{% endhighlight %}

Step 5. Calculate continuously compounded returns as difference in log prices.

{% highlight r %}
ret.cc = diff(log(prices))

# inspect the return data
cat("Start: ", as.character(start(ret.cc)), "  End: ", as.character(end(ret.cc)))
{% endhighlight %}



{% highlight text %}
## Start:  Feb 2004   End:  Sep 2014
{% endhighlight %}



{% highlight r %}
head(ret.cc, 3)
{% endhighlight %}



{% highlight text %}
##                SP500          NG
## Feb 2004  0.01213504 -0.03889948
## Mar 2004 -0.01649420  0.04689952
## Apr 2004 -0.01693331 -0.27842887
{% endhighlight %}

Step 6. Plot returns using `chart.TimeSeries()` and `chart.Bar()` in the `PerformanceAnalytics` package. 

{% highlight r %}
chart.TimeSeries(ret.cc, legend.loc="bottomright", main="", 
                 ylab="monthly cc return") 
{% endhighlight %}

![center](/../figs/2014-10-16-download-stock-price-data-using-r/unnamed-chunk-6-1.png)

{% highlight r %}
chart.Bar(ret.cc, legend.loc="bottomright", main="", 
          ylab="monthly cc return")
{% endhighlight %}

![center](/../figs/2014-10-16-download-stock-price-data-using-r/unnamed-chunk-6-2.png)

Step 7. Plot cumulative returns using `chart.CumReturns()` in the `PerformanceAnalytics` package. 
Note we need to use simple returns instead of continuously compounded returns for this, so we first calcualte the simple returns using `diff()` and `lag()` on the price data.

{% highlight r %}
ret.simple = diff(prices) / lag(prices, k=-1)
chart.CumReturns(ret.simple, legend.loc="topleft", wealth.index=TRUE, 
                 ylab="$", main="Future Value of $1 invested")
{% endhighlight %}

![center](/../figs/2014-10-16-download-stock-price-data-using-r/unnamed-chunk-7-1.png)

