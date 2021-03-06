---
layout: post
title: "The setwd Function in R"
date: 2014-10-03
comments: true
categories: r
keywords: "R, functions in R, setwd"
published: true
share: true
ads: true
---

Previously, I wrote an [article](https://masterr.org/r/how-to-work-with-files-in-r-and-improve-reproducibility/) on how not to use `setwd()`. Today I discovered a side effect of `setwd()` that is really cool and useful. It turns out that when you run `setwd(path)`, not only will it reset the working directory to path, it will also return the working directory before the reset.

{% highlight r %}
# get the default (current) working directory
getwd()
{% endhighlight %}



{% highlight text %}
## [1] "/Users/gmlang/Communities/masterr/_knitr"
{% endhighlight %}



{% highlight r %}
# store it
home.path = getwd()

# create a subfolder called Projects
dir.create(file.path(home.path, "Projects"), showWarnings = FALSE)

# reset the Projects folder as the working directory and store the previous working directory in a variable called old  
old = setwd(file.path(home.path, "Projects"))
print(old)
{% endhighlight %}



{% highlight text %}
## [1] "/Users/gmlang/Communities/masterr/_knitr"
{% endhighlight %}



{% highlight r %}
# check old and home.path are the same
old == home.path
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
# get the current working directory (this is after the reset)
getwd()
{% endhighlight %}



{% highlight text %}
## [1] "/Users/gmlang/Communities/masterr/_knitr/Projects"
{% endhighlight %}

We can use this side effect and `on.exit()`[^1] to write functions that guaranttees to restore the working directory when the function exists. For example, the following function is taken from Hadley's book
<a href="https://www.amazon.com/gp/product/B00NFODLIQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00NFODLIQ&linkCode=as2&tag=cabaceo-20&linkId=ADGTP76QZMPYXEVL">Advanced R</a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=cabaceo-20&l=as2&o=1&a=B00NFODLIQ" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />.

{% highlight r %}
in_dir = function(dir, code) {
  old = setwd(dir)
  on.exit(setwd(old))

  force(code)
}
{% endhighlight %}

Pass the variable `old` and the function `getwd()` to it, and you get

{% highlight r %}
in_dir(old, getwd())
{% endhighlight %}



{% highlight text %}
## [1] "/Users/gmlang/Communities/masterr/_knitr"
{% endhighlight %}



{% highlight r %}
getwd()
{% endhighlight %}



{% highlight text %}
## [1] "/Users/gmlang/Communities/masterr/_knitr"
{% endhighlight %}

[^1]: The code in `on.exit()` is run regardless of whether the function does an early return, throws an error, or simply reaches the end of the function body.
