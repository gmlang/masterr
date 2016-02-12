---
layout: post
title: "On R Code Style"
date: 2014-09-24 11:17:36 -0400
comments: true
categories: r
keywords: "R code style guide"
published: true
share: true
ads: true

---
I didn't pay much attention to code style until recently when I had to collaborate with a couple of guys on a project. That experience taught me having a consistent style across all team members can greatly reduce communication time and help people understand each other's code. If you're not already using a style, you should decide on a style today. Even if you program solo, you will also benefit from sticking to a style. It will allow you to write code faster, for example, once you choose a style, you don't have to spend time deciding whether you should use all lowercase letters chained by dots or undersores or use camelCase everytime you write a variable name. It will also make your code easier to read. 

The best way of choosing a style is to adopt from the existing ones. Here's an excellent style guide by [Hadley](http://r-pkgs.had.co.nz/style.html). We decided our style based on it with a few modifications. For example, we use `=` instead of `<-` since we don't see any practical harm of using `=` over `<-`[^1] and it's a bit harder to type `<-` than `=`[^2]. At the moment, I'm only aware of one occasion where `<-` and `=` are not interchangeable, and it's when used in the `substitute()` function. 

{% highlight r %}
# <- works
substitute(x <- x + 1, list(x = 1))
{% endhighlight %}



{% highlight text %}
## 1 <- 1 + 1
{% endhighlight %}



{% highlight r %}
# but = runs into error
substitute(x = x + 1, list(x = 1))
{% endhighlight %}



{% highlight text %}
## Error in substitute(x = x + 1, list(x = 1)): unused argument (x = x + 1)
{% endhighlight %}

[^1]: [see this stackoverflow thread](http://stackoverflow.com/questions/1741820/assignment-operators-in-r-and)

[^2]: [Yihui Xie](http://yihui.name/en/2014/07/a-few-notes-on-user2014/) (the author of the famous package [knitr](http://yihui.name/knitr/)) and [Alyssa Frazee](http://alyssafrazee.com/introducing-R.html) also prefer `=` over `<-`.
