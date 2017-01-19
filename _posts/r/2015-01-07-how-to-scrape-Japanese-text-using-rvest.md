---
layout: post
title: "How to Scrape Japanese Text Using the rvest Package"
date: 2015-01-07 10:04:49 -0400
comments: true
categories: r
keywords: "R, web scraping, Japanese characters, rvest, html"
published: true
share: true
ads: true

---

The [rvest](https://github.com/hadley/rvest) package is yet another 
powerful tool developed by Hadley. It makes web scraping using R easy, however, sometimes, it fails on non-English languages. For example, say I want to scrape [this page](http://www3.boj.or.jp/market/jp/stat/of141205.htm) from the Bank of Japan. I can try to use the `html` function directly while specifying `encoding="UTF-8"`, but this will not display the Japanese character correctly.


{% highlight r %}
library(methods)
library(rvest)
url = "http://www3.boj.or.jp/market/jp/stat/of141205.htm"
page = html(url, encoding="UTF-8")

# extract title
page %>% html_nodes("title") %>% html_text()
{% endhighlight %}



{% highlight text %}
## [1] "\u0083I\u0083t\u0083@\u0081[ (12\u008c\u008e5\u0093ú\u0081\u0083\u008bà\u0081\u0084)"
{% endhighlight %}



{% highlight r %}
# extract 2nd table
page %>% html_nodes('table') %>% .[[2]] %>% html_table()
{% endhighlight %}



{% highlight text %}
##                                                                                                                                               X 1
## 1                                                                         \u008d\u0091\u008cÉ\u0092Z\u008aú\u008fØ\u008c\u0094\u0094\u0083\u0093ü
## 2        \u008d\u0091\u008dÂ\u0094\u0083\u0093ü\u0081i\u008ec\u0091¶\u008aú\u008aÔ\u0082T\u0094N\u0092´\u0082P\u0082O\u0094N\u0088È\u0089º\u0081j
## 3 \u008d\u0091\u008dÂ\u0094\u0083\u0093ü\u0081i\u008ec\u0091¶\u008aú\u008aÔ\u0082P\u0082O\u0094N\u0092´\u0082Q\u0082T\u0094N\u0088È\u0089º\u0081j
## 4                                    \u008d\u0091\u008dÂ\u0094\u0083\u0093ü\u0081i\u008ec\u0091¶\u008aú\u008aÔ\u0082Q\u0082T\u0094N\u0092´\u0081j
##      NA                                NA NA NA
## 1 7,500 2014\u0094N12\u008c\u008e9\u0093ú NA NA
## 2 4,000 2014\u0094N12\u008c\u008e9\u0093ú NA NA
## 3 2,400 2014\u0094N12\u008c\u008e9\u0093ú NA NA
## 4 1,600 2014\u0094N12\u008c\u008e9\u0093ú NA NA
{% endhighlight %}

To solve this issue, we can use `readLines()` and then `html()`.

{% highlight r %}
page = html(readLines(url, encoding = "UTF-8"))

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
##                                      X 1    NA            NA NA NA
## 1                       国庫短期証券買入 7,500 2014年12月9日 NA NA
## 2   国債買入（残存期間５年超１０年以下） 4,000 2014年12月9日 NA NA
## 3 国債買入（残存期間１０年超２５年以下） 2,400 2014年12月9日 NA NA
## 4           国債買入（残存期間２５年超） 1,600 2014年12月9日 NA NA
{% endhighlight %}
