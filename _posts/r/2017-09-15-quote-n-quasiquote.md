---
layout: post
title: "Quote, Unquote and Quasiquote"
date: 2017-09-15
comments: true
categories: r
keywords: "R, quote, unquote, quasiquote, quasiquotation, metaprogram, metaprogramming, programs that generate programs, expressions, capture R expressions, NSE, non-standard evaluation in R"
published: true
share: true
ads: true
---

Suppose we are asked to write a test bank of 10,000 simple addition questions for first graders. What shall we do? 

Base R has a function `quote()` that allows us to capture the R code we type instead of evaluating them. For example, 


{% highlight r %}
quote(1 + 3)
{% endhighlight %}



{% highlight text %}
## 1 + 3
{% endhighlight %}

See? We've just written one test question, and there're 9,999 more to go. We certainly don't want to type `quote` 9,999 times. How shall we generalize it? Instead of using particular numbers like 1 and 3, we can use variables x and y. 


{% highlight r %}
quote(x + y)
{% endhighlight %}



{% highlight text %}
## x + y
{% endhighlight %}

This way, each time we plug in a number for x and y, we'd have a new question. 


{% highlight r %}
x = 2
y = 4
quote(x + y)
{% endhighlight %}



{% highlight text %}
## x + y
{% endhighlight %}

Wait, `quote()` still returns `x + y`! It doesn't give what we expected. We want `2 + 4`. This is because `quote()` only echos. We need another function to turn off
the quotation that `quote()` turns on, i.e., to "unquote." The `bquote()` function in base R can do this. For example,


{% highlight r %}
x = 2
y = 4
bquote(.(x) + .(y))
{% endhighlight %}



{% highlight text %}
## 2 + 4
{% endhighlight %}



{% highlight r %}
# can both quote and unquote at the same time, or quasiquote
bquote(x + y == .(x) + .(y))
{% endhighlight %}



{% highlight text %}
## x + y == 2 + 4
{% endhighlight %}



{% highlight r %}
bquote(q1 <- .(x) + .(y))
{% endhighlight %}



{% highlight text %}
## q1 <- 2 + 4
{% endhighlight %}



{% highlight r %}
# we also want to produce answers for the test questions
bquote(a1 <- .(x + y))
{% endhighlight %}



{% highlight text %}
## a1 <- 6
{% endhighlight %}

Alternatively, the funtion `rlang::expr()` in the `rlang` package can also achieve this.


{% highlight r %}
x = 2
y = 4

# demo of quasiquotation, which allows to plug values inside of parameters 
#       of a quotation.
rlang::expr(q1 <- UQ(x) + UQ(y)) # make a test question
{% endhighlight %}



{% highlight text %}
## q1 <- 2 + 4
{% endhighlight %}



{% highlight r %}
rlang::expr(a1 <- UQ(x+y)) # answer the test question
{% endhighlight %}



{% highlight text %}
## a1 <- 6
{% endhighlight %}



{% highlight r %}
rlang::expr(a1 <- !!x+y)   # answer the test question
{% endhighlight %}



{% highlight text %}
## a1 <- 6
{% endhighlight %}



{% highlight r %}
rlang::expr(a1 <- !!(x+y)) # answer the test question
{% endhighlight %}



{% highlight text %}
## a1 <- 6
{% endhighlight %}

Remark: `rlang::expr()` and `base::bquote()` are almost equivalent except the latter has a second argument that allows you to pass in an environment where to look up the values of the symbols used in the expression (1st argument). I think this is a general design pattern of rlang and tidyeval, that it separates environments from what a function does as much as possible to make it more consistent and neater.

Finally, we can use a loop to generate 10,000 questions and answers, while randomly choosing x and y values.


{% highlight r %}
set.seed(102023)
n = 10000
questions = vector("list", length = n)
answers = vector("numeric", length = n) 
for (i in seq_len(n)) {
        x = round(runif(1, min = -999, max = 999), 1)
        y = round(runif(1, min = -99, max = 1999), 1)
        
        # make a test question and answer it
        questions[[i]] = rlang::expr(UQ(x) + UQ(y)) 
        answers[[i]] = rlang::expr(!!x+y) 
}
head(questions, 3)        
{% endhighlight %}



{% highlight text %}
## [[1]]
## -716.7 + 750.4
## 
## [[2]]
## -292.9 + 1232.7
## 
## [[3]]
## -951.2 + 936.1
{% endhighlight %}



{% highlight r %}
head(answers, 3)
{% endhighlight %}



{% highlight text %}
## [1]  33.7 939.8 -15.1
{% endhighlight %}
