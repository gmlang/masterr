---
layout: post
title: "Calculate Tangency Portfolios Using R"
date: 2014-11-20
comments: true
categories: r
keywords: "R, PerformanceAnalytics, zoo, tseries, download stock price data using R, analyze stock price data using R, tangency portfolios, portfolio optimization using R"
published: true
share: true
ads: true
---

In a [previous post](http://masterr.org/r/calculate-efficient-portfolios-using-r/), I showed how to calculate the efficient portfolio given a target return using R and vanguard funds in my retirement account. All assets I used previously are risky assets. However, we can also hold risk free assets in our portfolio, for example, 1 year [t-bills](http://www.treasury.gov/resource-center/data-chart-center/interest-rates/Pages/TextView.aspx?data=yield). After having included risk free assets, we can define something called the Sharpe Slope as the difference between our portfolio return and the risk free rate divided by the volatility of our portfolio. The bigger the Sharpe Slope the better. So our objective is to find the portfolio with the biggest Sharpe Slope, and this is called tangency portfolio. 

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
## 2000-07-03 -0.01971716 -0.045649607  0.08408300  0.007936630 0.008832746
## 2000-08-01  0.07027806  0.009904851 -0.04071584  0.006893088 0.013956404
## 2000-09-01 -0.04782406 -0.051333260  0.02899155 -0.004918734 0.007621014
##                  VGPMX       VGENX
## 2000-07-03 -0.01628457 -0.04730217
## 2000-08-01  0.11545891  0.11519991
## 2000-09-01 -0.07451730  0.01346586
{% endhighlight %}

Step 3. Calculate annualized sample average returns of the underlying assets and the sample covariance matrix of the returns.

{% highlight r %}
mu.hat.annual = apply(ret.cc, 2, mean) * 12   
cov.mat.annual = cov(ret.cc) * 12 
{% endhighlight %}

Step 4. Set the [risk free rate](http://www.treasury.gov/resource-center/data-chart-center/interest-rates/Pages/TextView.aspx?data=yield) as 0.12% and calculate the tangency portfolio using a helper function written by Eric Zivot and Hezky Varon from U of Washington.

{% highlight r %}
t.bill.rate.1yr = 0.12/100
helper = "~/Coding/R-related/R/portfolio-optim/portfolio_noshorts.r"
source(helper)
tan.port = tangency.portfolio(mu.hat.annual, cov.mat.annual, 
                              risk.free=t.bill.rate.1yr, shorts=T)

summary(tan.port)
{% endhighlight %}



{% highlight text %}
## Call:
## tangency.portfolio(er = mu.hat.annual, cov.mat = cov.mat.annual, 
##     risk.free = t.bill.rate.1yr, shorts = T)
## 
## Portfolio expected return:     0.06143802 
## Portfolio standard deviation:  0.03207451 
## Portfolio weights:
##   VTSMX   VGTSX   VGSIX   VIPSX   VBMFX   VGPMX   VGENX 
##  0.1380 -0.1699  0.0206 -0.2739  1.1936 -0.0184  0.1101
{% endhighlight %}



{% highlight r %}
# port weights
plot(tan.port, col="blue", lwd=2)
{% endhighlight %}

![center](/../figs/2014-11-20-calculate-tangency-portfolios-using-r/unnamed-chunk-5-1.png)
