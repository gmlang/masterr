---
layout: post
title: "How to Correctly Load a R Package"
date: 2014-09-10 10:37:44 -0400
comments: true
categories: r
keywords: "R, library(), require(), how to load a R package"
published: true
share: true
ads: true

---
Use `library()` instead of `require()` because the former loads the package whereas the latter tries to load the package. You can read [Yihui Xie's post](http://yihui.name/en/2014/07/library-vs-require/) to understand their differences in detail and when to use `require()`. 
