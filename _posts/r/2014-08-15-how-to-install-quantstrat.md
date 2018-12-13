---
layout: post
title: "How to Install Quantstrat"
date: 2014-08-15
comments: true
categories: r
keywords: "financial markets, algorithmic trading, quantstrat, R, shiny app, quantitative trading"
published: true
share: true 
ads: true
---

The R package `quantstrat` makes backtesting trading strategies easy. It is still under heavy development and can't be installed from CRAN yet. You can install it from source and the process is straightforward.

Step1. Install these dependencies in R:


{% highlight r %}
install.packages("FinancialInstrument")
install.packages("PerformanceAnalytics")
install.packages("foreach")
{% endhighlight %}

Step2. Go to [R-forge](https://r-forge.r-project.org/R/?group_id=316) and download the .tar.gz files for blotter and quantstrat, and run the following commands in R (change version numbers to reflect the version you downloaded):


{% highlight r %}
install.packages("~/Downloads/blotter_0.8.17.tar", repos = NULL, type="source")
install.packages("~/Downloads/quantstrat_0.8.0.tar", repos = NULL, type="source")
{% endhighlight %}

[Shiny](https://shiny.rstudio.com) is a tool that allows you to easily make and publish web apps using R. Using Shiny and Quantstrat, I made an [app](https://cabaceo.shinyapps.io/quantdp/) to backtest a couple of trading strategies on a group of vanguard funds. 


