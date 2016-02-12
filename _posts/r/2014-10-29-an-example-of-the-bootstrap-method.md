---
layout: post
title: "An Example of the Bootstrap Method"
date: 2014-10-29 19:28:49 -0400
comments: true
categories: r
keywords: "R, zoo, tseries, download stock price data using R, analyze stock price data using R, bootstrap examples"
published: true
share: true
ads: true

---

When calculating the [bias and precision](http://gmlang.com/da/bias-and-precision/) of a sample estimate to the popluation parameter, because we often don't know the true value of the population parameter and we often only have one sample, we use a procedure called *bootstrap*. The idea is simple:

1. treat the sample as the population
2. understand the sampling scheme, i.e., how the sample was taken from the population
3. sample the same number of observations with replacement from the sample according to the same sampling scheme
4. for each of the new samples, calculate its sample statistic. For example, if you're interested in the mean of the population, you just calculate the sample average. If you're interested in the sd of the population, you just calculate the sample sd. 
5. these sample statistics form a distribution. Take its average and use it as a proxy to the true value of the population parameter. Plug it and the sample statistic of your original sample into [the formulas of bias and precision](http://gmlang.com/da/bias-and-precision/).

The following is a concrete example implementing the above bootstrap procedure using R and some stock price data.

Step 1. Download the monthly adjusted closing price data of [VTSMX](https://www.google.com/search?client=safari&rls=en&q=VTSMX&ie=UTF-8&oe=UTF-8) since Sept 2005 from Yahoo!. Change the class of the time index to yearmon. And calculate continuously compounded returns.

{% highlight r %}
library(zoo)
library(tseries)

VTSMX = get.hist.quote(instrument="VTSMX", start="2005-09-30", 
                       end="2014-09-30", origin="1970-01-01",
                       quote="AdjClose", provider="yahoo",
                       compression="m", retclass="zoo")
{% endhighlight %}



{% highlight text %}
## time series ends   2014-09-02
{% endhighlight %}



{% highlight r %}
index(VTSMX) = as.yearmon(index(VTSMX))
colnames(VTSMX) = "VTSMX"
ret.cc = diff(log(VTSMX))
head(ret.cc, 4)
{% endhighlight %}



{% highlight text %}
##                 VTSMX
## Oct 2005 -0.018616483
## Nov 2005  0.038859285
## Dec 2005  0.001570475
## Jan 2006  0.034319929
{% endhighlight %}

Step 2. Calculate the sample average c.c. returns

{% highlight r %}
muhat.VTSMX = mean(ret.cc)
cat(paste0(round(muhat.VTSMX*100, 2), "%"))
{% endhighlight %}



{% highlight text %}
## 0.63%
{% endhighlight %}

Step 3. Calculate bias and precision of the mean using bootstrap.

{% highlight r %}
VTSMX = coredata(ret.cc)
n.samples = 999
muhat.boot = rep(0, n.samples)
nobs = length(ret.cc)
for (i in 1:n.samples) {
        boot.data = sample(VTSMX, nobs, replace=TRUE)
        muhat.boot[i] = mean(boot.data)
}

# bootstrap bias
bias = mean(muhat.boot) - muhat.VTSMX
cat(paste0(round(bias*100, 2), "%"))
{% endhighlight %}



{% highlight text %}
## 0%
{% endhighlight %}



{% highlight r %}
# bootstrap SE
precision = sd(muhat.boot)
cat(paste0(round(precision*100, 2), "%"))
{% endhighlight %}



{% highlight text %}
## 0.46%
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
class(VTSMX.sd.boot)
{% endhighlight %}



{% highlight text %}
## [1] "boot"
{% endhighlight %}



{% highlight r %}
VTSMX.sd.boot
{% endhighlight %}



{% highlight text %}
## 
## ORDINARY NONPARAMETRIC BOOTSTRAP
## 
## 
## Call:
## boot(data = VTSMX, statistic = sd.boot, R = 999)
## 
## 
## Bootstrap Statistics :
##       original        bias    std. error
## t1* 0.04646405 -0.0007377369 0.004656785
{% endhighlight %}



{% highlight r %}
plot(VTSMX.sd.boot)
{% endhighlight %}

![center](/../figs/2014-10-29-an-example-of-the-bootstrap-method/unnamed-chunk-4-1.png) 

Step 5. We can also calculate the bootstrap 95% confidence intervals of the volatility.

{% highlight r %}
# bootstrap confidence interval
boot.ci(VTSMX.sd.boot, conf=0.95, type=c("norm", "perc"))
{% endhighlight %}



{% highlight text %}
## BOOTSTRAP CONFIDENCE INTERVAL CALCULATIONS
## Based on 999 bootstrap replicates
## 
## CALL : 
## boot.ci(boot.out = VTSMX.sd.boot, conf = 0.95, type = c("norm", 
##     "perc"))
## 
## Intervals : 
## Level      Normal             Percentile     
## 95%   ( 0.0381,  0.0563 )   ( 0.0370,  0.0548 )  
## Calculations and Intervals on Original Scale
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
boot.ci(VTSMX.VaR.boot, conf=0.95, type=c("norm", "perc"))
{% endhighlight %}



{% highlight text %}
## BOOTSTRAP CONFIDENCE INTERVAL CALCULATIONS
## Based on 999 bootstrap replicates
## 
## CALL : 
## boot.ci(boot.out = VTSMX.VaR.boot, conf = 0.95, type = c("norm", 
##     "perc"))
## 
## Intervals : 
## Level      Normal             Percentile     
## 95%   (-8920, -4810 )   (-8781, -4766 )  
## Calculations and Intervals on Original Scale
{% endhighlight %}

