---
layout: post
title: "Calculate Efficient Portfolios Using R"
date: 2014-11-19 
comments: true
categories: r
keywords: "R, PerformanceAnalytics, zoo, tseries, download stock price data using R, analyze stock price data using R, efficient portfolios, portfolio optimization using R"
published: true
share: true
ads: true
---

In a [previous post](https://masterr.org/r/calculate-global-minimum-variance-portfolio-using-r/), I showed how to calculate the global minimum variance portfolio using R and vanguard funds in my retirement account. It had an average  annual return of 5.2% and volatility of 3.3% in the past 10 years. Because I'm holding those funds for a long term, at least 30 years. I don't really mind a bigger volatility now. Instead, I really want a bigger return, say 10%. So I'll set my target return as 10%, and find a portfolio that can achieve it. The resulting portfolio is called mean-variance efficient because it has the smallest volatility for the 10% target return. 

Step 0. Load libraries and define helper functions.

{% highlight r %}
library(zoo)
library(tseries)
{% endhighlight %}



{% highlight text %}
## Error in library(tseries): there is no package called 'tseries'
{% endhighlight %}



{% highlight r %}
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
{% endhighlight %}



{% highlight text %}
## Error in get.hist.quote(instrument = symb, start = begin, end = end, origin = "1970-01-01", : could not find function "get.hist.quote"
{% endhighlight %}



{% highlight r %}
# change the class of the time index to yearmon
lapply(port, to_yearmon)

# put both all price data in one data frame
prices = do.call("cbind", port)
colnames(prices) = symbols
{% endhighlight %}



{% highlight text %}
## Error in `colnames<-`(`*tmp*`, value = c("VTSMX", "VGTSX", "VGSIX", "VIPSX", : attempt to set 'colnames' on an object with less than two dimensions
{% endhighlight %}

Step 2. Calculate monthly continuously compounded returns as difference in log prices.

{% highlight r %}
ret.cc = diff(log(prices))
{% endhighlight %}



{% highlight text %}
## Error in log(prices): non-numeric argument to mathematical function
{% endhighlight %}



{% highlight r %}
# inspect the return data
cat("Start: ", as.character(start(ret.cc)), "  End: ", as.character(end(ret.cc)))
{% endhighlight %}



{% highlight text %}
## Error in start(ret.cc): object 'ret.cc' not found
{% endhighlight %}



{% highlight r %}
head(ret.cc, 3)
{% endhighlight %}



{% highlight text %}
## Error in head(ret.cc, 3): object 'ret.cc' not found
{% endhighlight %}

Step 3. Calculate annualized sample average returns of the underlying assets and the sample covariance matrix of the returns.

{% highlight r %}
mu.hat.annual = apply(ret.cc, 2, mean) * 12   
{% endhighlight %}



{% highlight text %}
## Error in apply(ret.cc, 2, mean): object 'ret.cc' not found
{% endhighlight %}



{% highlight r %}
cov.mat.annual = cov(ret.cc) * 12 
{% endhighlight %}



{% highlight text %}
## Error in is.data.frame(x): object 'ret.cc' not found
{% endhighlight %}

Step 4. Calculate the efficient portfolio with 10% as target return using a helper function written by Eric Zivot and Hezky Varon from U of Washington.

{% highlight r %}
helper = "~/Coding/R-related/R/portfolio-optim/portfolio_noshorts.r"
source(helper)
{% endhighlight %}



{% highlight text %}
## Warning in file(filename, "r", encoding = encoding): cannot open file '/
## Users/gmlang/Coding/R-related/R/portfolio-optim/portfolio_noshorts.r': No
## such file or directory
{% endhighlight %}



{% highlight text %}
## Error in file(filename, "r", encoding = encoding): cannot open the connection
{% endhighlight %}



{% highlight r %}
effi.port = efficient.portfolio(mu.hat.annual, cov.mat.annual, 0.1, F)
{% endhighlight %}



{% highlight text %}
## Error in efficient.portfolio(mu.hat.annual, cov.mat.annual, 0.1, F): could not find function "efficient.portfolio"
{% endhighlight %}



{% highlight r %}
effi.port
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): object 'effi.port' not found
{% endhighlight %}



{% highlight r %}
# port weights
plot(effi.port)
{% endhighlight %}



{% highlight text %}
## Error in plot(effi.port): object 'effi.port' not found
{% endhighlight %}
