---
layout: post
title: "Analyze Stock Price Data Using R, Part1"
date: 2014-10-17 13:48:49 -0400
comments: true
categories: R
keywords: "R, PerformanceAnalytics, zoo, tseries, download stock price data using R, analyze stock price data using R"
published: true
share: true

---

Crude oil has been hammered. Yesterday, it hit the lowest price in 2 years. Being a contrarian, I smell the opportunity to buy. My interest is a vanguard energy fund ([VGENX](https://personal.vanguard.com/us/funds/snapshot?FundId=0051&FundIntExt=INT)), which has 95% of its assets invested in oil or oil related sectors. Let's first take a look at its prices and returns histories since Sept 2005.

Step 1. Load libraries and helper functions

{% highlight r %}
library(PerformanceAnalytics)
library(zoo)
library(tseries)

plt_dist = function(dat, varname) {
        # Creates a figure of 4 plots: histogram, boxplot, 
        #                              density curve, qqplot
        #
        # Args:
        #       dat     : a data frame or matrix with colnames
        #       varname : a string specifying the numerical variable 
        #                 in dat to be drawn
        #
        # Returns:
        #       draws 4 plots (histogram, boxplot, density curve, 
        #       qqplot) on one canvas
        par(mfrow = c(2,2))
        hist(dat[, varname], main="histogram", xlab=varname, 
             probability=TRUE, col=hcl(h=195,l=65,c=100))
        boxplot(dat[,varname], outchar=TRUE, main="boxplot", cex=0.7, 
                xlab=varname, col=hcl(h=195,l=65,c=100))
        plot(density(dat[,varname]), type="l", 
             main="Smoothed density", lwd=2,
             xlab=varname, ylab="density estimate", 
             col=hcl(h=195,l=65,c=100))
        qqnorm(dat[,varname], col=hcl(h=195,l=65,c=100), cex=0.7)
        qqline(dat[,varname])
        par(mfrow=c(1,1))
}
{% endhighlight %}

Step 2. Download the monthly adjusted closing price data on VGENX since Sept 2005 from Yahoo!.

{% highlight r %}
VGENX = get.hist.quote(instrument="VGENX", start="2005-09-30", 
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
colnames(VGENX) = c("VGENX")
{% endhighlight %}

Step 4. Calculate continuously compounded returns.

{% highlight r %}
ret.cc = diff(log(VGENX))
head(ret.cc, 3)
{% endhighlight %}



{% highlight text %}
##                VGENX
## Oct 2005 -0.08831978
## Nov 2005  0.02154139
## Dec 2005  0.03159695
{% endhighlight %}

Step 5. Plot prices.

{% highlight r %}
chart.TimeSeries(VGENX, legend.loc="bottomright", main="", 
                 ylab="monthly adj. closing prices") 
{% endhighlight %}

![center](/../figs/2014-10-17-analyze-stock-price-data-using-r-part1/unnamed-chunk-5-1.png) 

Step 6. Plot cumulative returns.

{% highlight r %}
ret.simple = diff(VGENX) / lag(VGENX, k=-1)
chart.CumReturns(ret.simple, legend.loc="topleft", wealth.index=TRUE, 
                 ylab="$", main="Future Value of $1 invested")
{% endhighlight %}

![center](/../figs/2014-10-17-analyze-stock-price-data-using-r-part1/unnamed-chunk-6-1.png) 

Step 7. Plot the distribution of cc returns.

{% highlight r %}
# Create matrix with returns
return_matrix = coredata(ret.cc)

# Plot the distribution of cc returns
plt_dist(return_matrix, "VGENX")
{% endhighlight %}

![center](/../figs/2014-10-17-analyze-stock-price-data-using-r-part1/unnamed-chunk-7-1.png) 

The histogram, boxplot and the smoothed density curve show the cc returns are slightly left skewed. The qqplot shows their distribution has fatter tails.

Step 8. Compute all of the relevant descriptive statistics

{% highlight r %}
table.Stats(ret.cc)
{% endhighlight %}



{% highlight text %}
##                    VGENX
## Observations    108.0000
## NAs               0.0000
## Minimum          -0.2471
## Quartile 1       -0.0333
## Median            0.0155
## Arithmetic Mean   0.0051
## Geometric Mean    0.0027
## Quartile 3        0.0513
## Maximum           0.1710
## SE Mean           0.0066
## LCL Mean (0.95)  -0.0080
## UCL Mean (0.95)   0.0182
## Variance          0.0047
## Stdev             0.0685
## Skewness         -0.7319
## Kurtosis          1.5455
{% endhighlight %}

Indeed, we see the cc returns have a negative skewness and an excess kurtosis of 1.55 compared to the normal distribution.

Step 9. Run the Jarque Bera test to see if the cc returns are normal

{% highlight r %}
jarque.bera.test(ret.cc)
{% endhighlight %}



{% highlight text %}
## 
## 	Jarque Bera Test
## 
## data:  ret.cc
## X-squared = 20.39, df = 2, p-value = 3.736e-05
{% endhighlight %}

Because the p-value is extremely small, we have strong evidence to reject the null hypothesis that the continously compounded monthly returns for VGENX are normally distributed.

Step 10. Plot autocorrelations over time lags 

{% highlight r %}
acf(ret.cc$VGENX)
{% endhighlight %}

![center](/../figs/2014-10-17-analyze-stock-price-data-using-r-part1/unnamed-chunk-10-1.png) 

The monthly cc returns doesn't appear to be correlated over time.

Step 11. Compute the annualized continuously compounded mean return and volatility

{% highlight r %}
ret.cc.annual = apply(return_matrix, 2, mean) * 12 
print(ret.cc.annual)
{% endhighlight %}



{% highlight text %}
##      VGENX 
## 0.06133925
{% endhighlight %}



{% highlight r %}
vol.cc.annual = apply(return_matrix, 2, sd) * sqrt(12)
print(vol.cc.annual)
{% endhighlight %}



{% highlight text %}
##     VGENX 
## 0.2372476
{% endhighlight %}

Step 12. Compute the annualized simple mean return

{% highlight r %}
exp(ret.cc.annual) - 1
{% endhighlight %}



{% highlight text %}
##      VGENX 
## 0.06325957
{% endhighlight %}

