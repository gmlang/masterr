---
layout: post
title: "How to use functions that return functions to clean data"
date: 2015-09-05 
comments: true
categories: r
keywords: "R, functions, how to write R functions, functionals, function that return functions, data cleaning, remove spaces from a string, split a string, split a column into two"
published: true
share: true
ads: true

---

We talked about functions that return functions and functions that eat functions. If you are new and curious, you can search my old blog posts. Today, I'm going to show you a real world example of how to use functions that return functions to clean data. By the end of the post, I'm sure you'll be amazed by their beauty and power. Let's get started. First, we define 3 functions that return functions. 


{% highlight r %}
split_by = function(char) {
        # Returns a function that can be used to split a character vector by char
        #
        # char: a string indicating where to split, for example, "," or ", "
        function(x) {
                # x: a character vector
                out = lapply(x, function(elt) strsplit(elt, char)[[1]])
                data.frame(do.call("rbind", out), stringsAsFactors = F)
        }
}

rm_char = function(char) {
        # Returns a function that can be used to remove the character(s) 
        # represented by char from all the elements of a character vector
        #
        # char: a string or regular expression
        function(x) {
                # x: a character vector
                gsub(char, "", x)
        }
}

fix_missing = function(na_val) {
        # Returns a function that can be used to replace the values represented
        # by na_val with NA in a vector.
        function(x) {
                # x: a numeric or character vector
                x[x == na_val] = NA
                x
        }
}
{% endhighlight %}

Make sure you read these function definitions line by line three times before you move forward.

Next, we make some messy data. 

{% highlight r %}
dat = read.table(header=TRUE, text='
                city_state zipcode
                "BEDMINISTER, NJ" "07921 -7028"
                "ALTURAS, CA" "96101-3113"
                "ALTURAS, CA" "96101- 3113"
                "STOCKTON, CA" "95207 - "
                "MADRAS, OR" "97741 - "', stringsAsFactors=F)
dat
{% endhighlight %}



{% highlight text %}
##        city_state     zipcode
## 1 BEDMINISTER, NJ 07921 -7028
## 2     ALTURAS, CA  96101-3113
## 3     ALTURAS, CA 96101- 3113
## 4    STOCKTON, CA    95207 - 
## 5      MADRAS, OR    97741 -
{% endhighlight %}

I've cleaned much worse data, but this is good and representative enough for our purpose. Here're the places we need to clean up:
1. the city and state are in one column, and we need to separate it into two columns.
2. the first 5 and last 4 digits of the zip code are in one column, and we also want to separate them into two columns.
3. we need to make sure the separated columns do not contain spaces.
4. if a value is missing in the newly created columns, we need to make sure it's NA instead of "".

First, let's separate city and state.

{% highlight r %}
# make a function to split by comma
split_by_comma = split_by(",")
# split city_state by comma using the function just made
dat_part1 = split_by_comma(dat$city_state)
# update the column names
names(dat_part1) = c("city", "state")
# print the result
dat_part1
{% endhighlight %}



{% highlight text %}
##          city state
## 1 BEDMINISTER    NJ
## 2     ALTURAS    CA
## 3     ALTURAS    CA
## 4    STOCKTON    CA
## 5      MADRAS    OR
{% endhighlight %}

Next, let's divide zipcode into first 5 and last 4 digits.

{% highlight r %}
# make a function to split by dash
split_by_dash = split_by("-")
# split zipcode by dash using the function just made
dat_part2 = split_by_dash(dat$zipcode)
# update the column names
names(dat_part2) = c("zip_first5", "zip_last4")
# print result
dat_part2
{% endhighlight %}



{% highlight text %}
##   zip_first5 zip_last4
## 1     07921       7028
## 2      96101      3113
## 3      96101      3113
## 4     95207           
## 5     97741
{% endhighlight %}

Notice how similar these two chunks of code! If you cannot appreciate their neatness, go back and read the definition of `split_by()` again. Understand what it does.

Next, we combine `dat_part1` and `dat_part2` into one data frame, and check the variables.

{% highlight r %}
dat = cbind(dat_part1, dat_part2)
str(dat)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	5 obs. of  4 variables:
##  $ city      : chr  "BEDMINISTER" "ALTURAS" "ALTURAS" "STOCKTON" ...
##  $ state     : chr  " NJ" " CA" " CA" " CA" ...
##  $ zip_first5: chr  "07921 " "96101" "96101" "95207 " ...
##  $ zip_last4 : chr  "7028" "3113" " 3113" " " ...
{% endhighlight %}

We observe that `state` has a space in front of all its elements, `zip_first5` has spaces trailing some of its elements, and `zip_last4` also has spaces in some of its elements. We need to remove the spaces, and that's what we're doing next. 

{% highlight r %}
# make a function to remove a single space
rm_space = rm_char(" ")
# lapply the function just made to every column of dat
# pay attention to the left side of the equal sign
dat[] = lapply(dat, rm_space)
str(dat)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	5 obs. of  4 variables:
##  $ city      : chr  "BEDMINISTER" "ALTURAS" "ALTURAS" "STOCKTON" ...
##  $ state     : chr  "NJ" "CA" "CA" "CA" ...
##  $ zip_first5: chr  "07921" "96101" "96101" "95207" ...
##  $ zip_last4 : chr  "7028" "3113" "3113" "" ...
{% endhighlight %}

Pause for a moment, and go back to read the definition of `rm_char()` again. Make sure you understand what it does.

Finally, the action of removing spaces caused empty strings for some values, and we need to replace them with NA's.

{% highlight r %}
# make a function to replace "" with NA
fix_missing_empty = fix_missing("")
# lapply the function just made to every column of dat
# pay attention again to the left side of the equal sign
dat[] = lapply(dat, fix_missing_empty)
str(dat)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	5 obs. of  4 variables:
##  $ city      : chr  "BEDMINISTER" "ALTURAS" "ALTURAS" "STOCKTON" ...
##  $ state     : chr  "NJ" "CA" "CA" "CA" ...
##  $ zip_first5: chr  "07921" "96101" "96101" "95207" ...
##  $ zip_last4 : chr  "7028" "3113" "3113" NA ...
{% endhighlight %}



{% highlight r %}
dat
{% endhighlight %}



{% highlight text %}
##          city state zip_first5 zip_last4
## 1 BEDMINISTER    NJ      07921      7028
## 2     ALTURAS    CA      96101      3113
## 3     ALTURAS    CA      96101      3113
## 4    STOCKTON    CA      95207      <NA>
## 5      MADRAS    OR      97741      <NA>
{% endhighlight %}

Do you understand what `fix_missing()` does? If not, go back and read its definition again... 

This article is inspired by Hadley's book "Advanced R", you can <a rel="nofollow" href="http://www.amazon.com/gp/product/1466586966/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1466586966&linkCode=as2&tag=cabaceo-20&linkId=2GDWMZSF4NX32QIO">buy it from Amazon</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=cabaceo-20&l=as2&o=1&a=1466586966" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
or read it [online](http://adv-r.had.co.nz/Functions.html) for FREE.
