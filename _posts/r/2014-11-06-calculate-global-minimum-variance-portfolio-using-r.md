---
layout: post
title: "Calculate Global Minimum Variance Portfolio Using R"
date: 2014-11-06 14:48:49 -0400
comments: true
categories: R
keywords: "R, PerformanceAnalytics, zoo, tseries, download stock price data using R, analyze stock price data using R, global min,
global minimum variance portfolio, portfolio optimization using R"
published: true
share: true
ads: true

---

In this and the next couple of posts, I'll give examples of how to calculate optimized portfolios using R and the vanguard funds in my retirement account. Today, I'll show you how to calculate the global minimum variance portfolio, which was the first major result in Markowitz's portfolio theory. Given a collection of assets, their global minimum variance portfolio is the portfolio with the smallest portfolio volitility. 

Step 0. Load libraries and define helper functions

{% highlight r %}
library(zoo)
library(tseries)

download_data = function(symb, begin, end) {
        get.hist.quote(instrument=symb, start=begin, end=end, 
                       origin="1970-01-01", quote="AdjClose", 
                       provider="yahoo", compression="m", 
                       retclass="zoo")
}

to_yearmon = function(data) {
        index(data) = as.yearmon(index(data))
}
{% endhighlight %}

Step 1. I choose assets from three broad classes: stocks, bonds, and commodities. For stocks, I choose funds that cover total US market, total international markets, and real estate. For bonds, I choose funds that invest in the total US bond market and inflation protected securities. For commodities, I choose funds that invest in gold and other precious metals and their mining companies and oil & gas and energy companies. First, I download the monthly adjusted closing price data of these funds between June 2000 and Oct 2014 from Yahoo.

{% highlight r %}
# initialize the fund symbols 
stocks = c("VTSMX", "VGTSX", "VGSIX")
bonds = c("VIPSX", "VBMFX")
commodities = c("VGPMX", "VGENX")
symbols = c(stocks, bonds, commodities)

# download adj. price data
port = list()
for (symbol in symbols)
        port[[symbol]] = download_data(symbol, "2000-06-29", "2014-10-31")

# change the class of the time index to yearmon
lapply(port, to_yearmon)

# put both all price data in one data frame
prices = do.call("cbind", port)
colnames(prices) = symbols
{% endhighlight %}

Step 2. Calculate monthly continuously compounded returns as difference in log prices.

{% highlight r %}
ret.cc = diff(log(prices))

# inspect the return data
cat("Start: ", as.character(start(ret.cc)), "  End: ", as.character(end(ret.cc)))
{% endhighlight %}



{% highlight text %}
## Start:  2000-07-03   End:  2014-10-01
{% endhighlight %}



{% highlight r %}
head(ret.cc, 3)
{% endhighlight %}



{% highlight text %}
##                  VTSMX        VGTSX       VGSIX        VIPSX       VBMFX
## 2000-07-03 -0.01966245 -0.045168968  0.08338161  0.007905180 0.007797310
## 2000-08-01  0.07015714  0.009852296 -0.03901204  0.007843177 0.015414563
## 2000-09-01 -0.04777254 -0.051407967  0.02852243 -0.004698521 0.007619084
##                  VGPMX       VGENX
## 2000-07-03 -0.01520942 -0.04692026
## 2000-08-01  0.11565220  0.11484304
## 2000-09-01 -0.07437054  0.01347060
{% endhighlight %}

Step 3. Calculate the sample average returns of the underlying assets and the sample covariance matrix of the returns.

{% highlight r %}
mu.hat.annual = apply(ret.cc, 2, mean) * 12   
cov.mat.annual = cov(ret.cc) * 12 
{% endhighlight %}

Step 4. Finally, we can calculate the global minimum variance portfolio using a helper function written by Eric Zivot and Hezky Varon from U of Washington.

{% highlight r %}
helper = file.path(Sys.getenv("HOME"), "R/portfolio-optim/portfolio_noshorts.r")
source(helper)
global.minvar.port = globalMin.portfolio(mu.hat.annual, cov.mat.annual, short=F)

global.minvar.port
{% endhighlight %}



{% highlight text %}
## Call:
## globalMin.portfolio(er = mu.hat.annual, cov.mat = cov.mat.annual, 
##     shorts = F)
## 
## Portfolio expected return:     0.05214207 
## Portfolio standard deviation:  0.03358856 
## Portfolio weights:
##  VTSMX  VGTSX  VGSIX  VIPSX  VBMFX  VGPMX  VGENX 
## 0.0637 0.0000 0.0000 0.0000 0.9363 0.0000 0.0000
{% endhighlight %}



{% highlight r %}
# port weights
plot(global.minvar.port)
{% endhighlight %}

![center](/../figs/2014-11-06-calculate-global-minimum-variance-portfolio-using-r/unnamed-chunk-5-1.png) 
