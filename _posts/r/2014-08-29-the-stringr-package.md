---
layout: post
title: "The stringr Package"
date: 2014-08-29
comments: true
categories: r
keywords: "R, stringr, text parsing in R"
published: true
share: true
ads: true
---

When doing data cleaning, we often have to clean up strings of text. Doing this in R used to be a pain until the birth of the [stringr](http://cran.r-project.org/web/packages/stringr/index.html) package. For example, it contains a function called `str_trim()` that allows you to easily remove any leading and trailing whitespace of a string. It also contains a function called `str_sub()` that allows you to easily extract substrings from any string. Run the following code to see these two functions work.

{% highlight r %}
library(stringr)
gmlang = "\t Guangming Lang \n"

# trim whitespace on both sides
str_trim(gmlang)
{% endhighlight %}



{% highlight text %}
## [1] "Guangming Lang"
{% endhighlight %}



{% highlight r %}
# trim whitespace on the left side
str_trim(gmlang, side="left")
{% endhighlight %}



{% highlight text %}
## [1] "Guangming Lang \n"
{% endhighlight %}



{% highlight r %}
# trim whitespace on the right side
str_trim(gmlang, side="right")
{% endhighlight %}



{% highlight text %}
## [1] "\t Guangming Lang"
{% endhighlight %}



{% highlight r %}
# re-assign trimmed value to gmlang
gmlang = str_trim(gmlang)

# extract first name
str_sub(gmlang, start=1, end=9)
{% endhighlight %}



{% highlight text %}
## [1] "Guangming"
{% endhighlight %}



{% highlight r %}
str_sub(gmlang, end=9)
{% endhighlight %}



{% highlight text %}
## [1] "Guangming"
{% endhighlight %}



{% highlight r %}
# extract last name
str_sub(gmlang, start=11, end=14)
{% endhighlight %}



{% highlight text %}
## [1] "Lang"
{% endhighlight %}



{% highlight r %}
str_sub(gmlang, start=11)
{% endhighlight %}



{% highlight text %}
## [1] "Lang"
{% endhighlight %}



{% highlight r %}
# extact first and last name at the same time
str_sub(gmlang, start=c(1, 11), end=c(9, 14))
{% endhighlight %}



{% highlight text %}
## [1] "Guangming" "Lang"
{% endhighlight %}



{% highlight r %}
# something fun :)
str_sub(gmlang, start = seq_len(str_length(gmlang)))
{% endhighlight %}



{% highlight text %}
##  [1] "Guangming Lang" "uangming Lang"  "angming Lang"   "ngming Lang"   
##  [5] "gming Lang"     "ming Lang"      "ing Lang"       "ng Lang"       
##  [9] "g Lang"         " Lang"          "Lang"           "ang"           
## [13] "ng"             "g"
{% endhighlight %}



{% highlight r %}
str_sub(gmlang, end = seq_len(str_length(gmlang)))
{% endhighlight %}



{% highlight text %}
##  [1] "G"              "Gu"             "Gua"            "Guan"          
##  [5] "Guang"          "Guangm"         "Guangmi"        "Guangmin"      
##  [9] "Guangming"      "Guangming "     "Guangming L"    "Guangming La"  
## [13] "Guangming Lan"  "Guangming Lang"
{% endhighlight %}

You can learn other handy functions in the stringr package [here](http://cran.r-project.org/web/packages/stringr/stringr.pdf)
