---
layout: post
title: "How to Scrape Japanese Text Using the rvest Package"
date: 2015-01-07 
comments: true
categories: r
keywords: "R, web scraping, Japanese characters, rvest, html"
published: true
share: true
ads: true
---

The [rvest](https://github.com/hadley/rvest) package is yet another 
powerful tool developed by Hadley. It makes web scraping super easy. For example, say I want to scrape [this page](https://www3.boj.or.jp/market/jp/stat/of141205.htm) from the Bank of Japan. I can just use the `read_html()` function without specifying
the encoding. I think under the hood, it guesses the encoding. 

{% highlight r %}
library(methods)
library(rvest)
url = "https://www3.boj.or.jp/market/jp/stat/of141205.htm"
page = read_html(url)

# extract title
page %>% html_nodes('title') %>% html_text()
{% endhighlight %}



{% highlight text %}
## [1] "オファー (12月5日＜金＞)"
{% endhighlight %}



{% highlight r %}
# extract 2nd table
page %>% html_nodes('table') %>% .[[2]] %>% html_table()
{% endhighlight %}



{% highlight text %}
##                                       X1    X2            X3 X4 X5
## 1                       国庫短期証券買入 7,500 2014年12月9日 NA NA
## 2   国債買入（残存期間５年超１０年以下） 4,000 2014年12月9日 NA NA
## 3 国債買入（残存期間１０年超２５年以下） 2,400 2014年12月9日 NA NA
## 4           国債買入（残存期間２５年超） 1,600 2014年12月9日 NA NA
{% endhighlight %}

