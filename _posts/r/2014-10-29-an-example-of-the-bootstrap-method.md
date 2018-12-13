---
layout: post
title: "An Example of the Bootstrap Method"
date: 2014-10-29
comments: true
categories: r
keywords: "R, zoo, tseries, download stock price data using R, analyze stock price data using R, bootstrap examples"
published: true
share: true
ads: true
---

When calculating the [bias and precision](https://masterr.org/da/bias-and-precision/) of a sample estimate to the popluation parameter, because we often don't know the true value of the population parameter and we often only have one sample, we use a procedure called *bootstrap*. The idea is simple:

1. treat the sample as the population
2. understand the sampling scheme, i.e., how the sample was taken from the population
3. sample the same number of observations with replacement from the sample according to the same sampling scheme
4. for each of the new samples, calculate its sample statistic. For example, if you're interested in the mean of the population, you just calculate the sample average. If you're interested in the sd of the population, you just calculate the sample sd. 
5. these sample statistics form a distribution. Take its average and use it as a proxy to the true value of the population parameter. Plug it and the sample statistic of your original sample into [the formulas of bias and precision](https://masterr.org/da/bias-and-precision/).

The following is a concrete example implementing the above bootstrap procedure using R and some stock price data.

Step 1. Download the monthly adjusted closing price data of [VTSMX](https://www.google.com/search?client=safari&rls=en&q=VTSMX&ie=UTF-8&oe=UTF-8) since Sept 2005 from Yahoo!. Change the class of the time index to yearmon. And calculate continuously compounded returns.

{% highlight r %}
library(zoo)
library(tseries)
{% endhighlight %}



{% highlight text %}
## Error in library(tseries): there is no package called 'tseries'
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



{% highlight r %}
index(VTSMX) = as.yearmon(index(VTSMX))
{% endhighlight %}



{% highlight text %}
## Error in index(VTSMX): object 'VTSMX' not found
{% endhighlight %}



{% highlight r %}
colnames(VTSMX) = "VTSMX"
{% endhighlight %}



{% highlight text %}
## Error in colnames(VTSMX) = "VTSMX": object 'VTSMX' not found
{% endhighlight %}



{% highlight r %}
ret.cc = diff(log(VTSMX))
{% endhighlight %}



{% highlight text %}
## Error in diff(log(VTSMX)): object 'VTSMX' not found
{% endhighlight %}



{% highlight r %}
head(ret.cc, 4)
{% endhighlight %}



{% highlight text %}
## Error in head(ret.cc, 4): object 'ret.cc' not found
{% endhighlight %}

Step 2. Calculate the sample average c.c. returns

{% highlight r %}
muhat.VTSMX = mean(ret.cc)
{% endhighlight %}



{% highlight text %}
## Error in mean(ret.cc): object 'ret.cc' not found
{% endhighlight %}



{% highlight r %}
cat(paste0(round(muhat.VTSMX*100, 2), "%"))
{% endhighlight %}



{% highlight text %}
## Error in paste0(round(muhat.VTSMX * 100, 2), "%"): object 'muhat.VTSMX' not found
{% endhighlight %}

Step 3. Calculate bias and precision of the mean using bootstrap.

{% highlight r %}
VTSMX = coredata(ret.cc)
{% endhighlight %}



{% highlight text %}
## Error in coredata(ret.cc): object 'ret.cc' not found
{% endhighlight %}



{% highlight r %}
n.samples = 999
muhat.boot = rep(0, n.samples)
nobs = length(ret.cc)
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): object 'ret.cc' not found
{% endhighlight %}



{% highlight r %}
for (i in 1:n.samples) {
        boot.data = sample(VTSMX, nobs, replace=TRUE)
        muhat.boot[i] = mean(boot.data)
}
{% endhighlight %}



{% highlight text %}
## Error in sample(VTSMX, nobs, replace = TRUE): object 'VTSMX' not found
{% endhighlight %}



{% highlight r %}
# bootstrap bias
bias = mean(muhat.boot) - muhat.VTSMX
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): object 'muhat.VTSMX' not found
{% endhighlight %}



{% highlight r %}
cat(paste0(round(bias*100, 2), "%"))
{% endhighlight %}



{% highlight text %}
## Error in paste0(round(bias * 100, 2), "%"): object 'bias' not found
{% endhighlight %}



{% highlight r %}
# bootstrap SE
precision = sd(muhat.boot)
cat(paste0(round(precision*100, 2), "%"))
{% endhighlight %}



{% highlight text %}
## 0%
{% endhighlight %}

Step 4. Instead of doing the bootstrap procedure ourselves, we can use the `boot()` function in the `boot` library. For example, we can use the following code to calculate the bootstrap bias and precision for the volatility (standard deviation).

{% highlight r %}
library(boot)

# define a function to be passed in the boot() function
sd.boot = function(x, idx) {
        # x: data to be resampled
        # idx: vector of scrambled indices created by boot() function
        #
        # returns: sd value computed using resampled data
        sd(x[idx])
}

# pass sd.boot to the boot() function to calculate the bootstrap sd's
VTSMX.sd.boot = boot(VTSMX, statistic=sd.boot, R=999)
{% endhighlight %}



{% highlight text %}
## Error in NROW(data): object 'VTSMX' not found
{% endhighlight %}



{% highlight r %}
class(VTSMX.sd.boot)
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): object 'VTSMX.sd.boot' not found
{% endhighlight %}



{% highlight r %}
VTSMX.sd.boot
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): object 'VTSMX.sd.boot' not found
{% endhighlight %}



{% highlight r %}
plot(VTSMX.sd.boot)
{% endhighlight %}



{% highlight text %}
## Error in plot(VTSMX.sd.boot): object 'VTSMX.sd.boot' not found
{% endhighlight %}

Step 5. We can also calculate the bootstrap 95% confidence intervals of the volatility.

{% highlight r %}
# bootstrap confidence interval
boot.ci(VTSMX.sd.boot, conf=0.95, type=c("norm", "perc"))
{% endhighlight %}



{% highlight text %}
## Error in boot.ci(VTSMX.sd.boot, conf = 0.95, type = c("norm", "perc")): object 'VTSMX.sd.boot' not found
{% endhighlight %}

Step 6. A common measure in risk management is Value at Risk (VaR). We can find the bootstrap 95% confidence intervals of the VaR assuming the initial investment is $100,000.

{% highlight r %}
# define a function to calculate VaR
VaR.boot = function(x, idx, p=0.05, w=100000) {
        # w: initial investment
        q = mean(x[idx]) + sd(x[idx]) * qnorm(p)
        w * (exp(q) - 1)
}

# pass VaR.boot to the boot() function to calculate the bootstrap VaRs
VTSMX.VaR.boot = boot(VTSMX, statistic=VaR.boot, R=999)
{% endhighlight %}



{% highlight text %}
## Error in NROW(data): object 'VTSMX' not found
{% endhighlight %}



{% highlight r %}
boot.ci(VTSMX.VaR.boot, conf=0.95, type=c("norm", "perc"))
{% endhighlight %}



{% highlight text %}
## Error in boot.ci(VTSMX.VaR.boot, conf = 0.95, type = c("norm", "perc")): object 'VTSMX.VaR.boot' not found
{% endhighlight %}

