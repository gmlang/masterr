---
layout: post
title: "Introducing ezplot: An Easy Way to Make Beautiful Charts for Real World Clients"
date: 2016-04-04 
comments: true
categories: r
keywords: "R, ezplot, ggplot2, bar chart, tufte bar chart, scatter plot, heatmaps, interval plot, histogram, density plot, labeled bar chart, line plot, tufte slopegraph"
published: true
share: true
ads: true
---

### Updated October 4, 2018

Six years ago, I started a [data science consulting company](https://www.cabaceo.com/). Almost all my projects require some kind of data visualization. Because I'm a R programmer, ggplot2 became my primary charting tool. The thing about ggplot2 is that making a generic plot is easy, but customizing is hard. There're just too much details to remember. At first, I did a lot of code recycling, but that was still very inefficient as I had to manually change things to make old code work with new data. As the repertoire of reusable codebase grew, it became painful to find the right piece of code for the things I wanted to do. Moreover, code recycling lead to code repetition, which made my R script lengthy and difficult to read. One day, the frustration became unbearable, and I decided to change it all. The result is ezplot, a R package based off ggplot2. It's [available on github](https://github.com/gmlang/ezplot). Ezplot has saved me tons of hours. A plot that used to takes me 30+ minutes now takes me less than 1 minute. I now use ezplot for all my projects. I truly love it, and I think you’ll love it too.

Because ezplot is open and free, you can learn it by reading the documentation and source code. If you want a shortcut, I also wrote a book, teaching you how to use it step by step with many examples. The book is called **ezplot: How to Easily Make ggplot2 Graphics**. You can get it [here](https://leanpub.com/ezplot). 
