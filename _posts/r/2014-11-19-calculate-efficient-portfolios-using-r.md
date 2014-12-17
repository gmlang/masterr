---
layout: post
title: "Calculate Efficient Portfolios Using R"
date: 2014-11-19 14:48:49 -0400
comments: true
categories: R
keywords: "R, PerformanceAnalytics, zoo, tseries, download stock price data using R, analyze stock price data using R, efficient portfolios, portfolio optimization using R"
published: true
share: true
ads: true

---

In a [previous post](http://gmlang.com/r/calculate-global-minimum-variance-portfolio-using-r/), I showed how to calculate the global minimum variance portfolio using R and vanguard funds in my retirement account. It had an average  annual return of 5.2% and volatility of 3.3% in the past 10 years. Because I'm holding those funds for a long term, at least 30 years. I don't really mind a bigger volatility now. Instead, I really want a bigger return, say 10%. So I'll set my target return as 10%, and find a portfolio that can achieve it. The resulting portfolio is called mean-variance efficient because it has the smallest volatility for the 10% target return. 

Step 0. Load libraries and define helper functions.

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

Step 3. Calculate annualized sample average returns of the underlying assets and the sample covariance matrix of the returns.

{% highlight r %}
mu.hat.annual = apply(ret.cc, 2, mean) * 12   
cov.mat.annual = cov(ret.cc) * 12 
{% endhighlight %}

Step 4. Calculate the efficient portfolio with 10% as target return using a helper function written by Eric Zivot and Hezky Varon from U of Washington.

{% highlight r %}
helper = file.path(Sys.getenv("HOME"), "R/portfolio-optim/portfolio_noshorts.r")
source(helper)
effi.port = efficient.portfolio(mu.hat.annual, cov.mat.annual, 0.1, F)

effi.port
{% endhighlight %}



{% highlight text %}
## Call:
## efficient.portfolio(er = mu.hat.annual, cov.mat = cov.mat.annual, 
##     target.return = 0.1, shorts = F)
## 
## Portfolio expected return:     0.1 
## Portfolio standard deviation:  0.1542331 
## Portfolio weights:
##  VTSMX  VGTSX  VGSIX  VIPSX  VBMFX  VGPMX  VGENX 
## 0.0000 0.0000 0.3464 0.0000 0.2013 0.0000 0.4523
{% endhighlight %}



{% highlight r %}
# port weights
plot(effi.port)
{% endhighlight %}

![center](/../figs/2014-11-19-calculate-efficient-portfolios-using-r/unnamed-chunk-5-1.png) 
