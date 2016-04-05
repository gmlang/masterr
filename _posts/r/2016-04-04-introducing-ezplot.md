---
layout: post
title: "Introducing ezplot: An Easy Way to Make Beautiful Charts for Real World Clients"
date: 2016-04-04 20:40:00 -0400
comments: true
categories: r
keywords: "R, ezplot, ggplot2, bar chart, tufte bar chart, scatter plot, heatmaps, interval plot, histogram, density plot, labeled bar chart, line plot, tufte slopegraph"
published: true
share: true

---

Three years ago, I started a data science consulting [company](http://www.cabaceo.com/). Many of our projects involved making some kind of data visualization. Because I used R to do the analysis, I chose ggplot2 as my primary charting tool. The thing about ggplot2 is that making a generic plot is easy, but customizing and annotating it is hard. There're just two many details to remember. So at first, I did a lot of code recycling, but that was still very inefficient as I had to understand and manually change things to make old code work with new data. And as the repertoire of reusable code grew, it became a pain in the ass to find the right code for the things I wanted to do. Moreover, code recycling lead to code repetition, which caused my R script to grow long quickly, making it difficult to read.

One day, the frustration became unbearable, and I decided to make a R package to change it all. The result is ezplot, which is freely available on github. From my consulting experiences, I discovered there're only 10 types of charts that are frequently used in the real world. As a result, ezplot is designed to make these 10 types of charts really well without you having to think. If it takes you more than 1 hour to make a plot, after learning ezplot, you'll be able to create the same chart for 5 minutes or less. Yes, it can save you that much time!

Because ezplot is open and free, you can learn how to use it by reading the documentation and source code. If you want a short-cut, I alsot wrote a book, teaching you how to use ezplot by example, and along the way, it'll also show you how to wrangle and tidy data. The book is called ezplot: How to Easily Make ggplot2 Graphics, and you can read sample chapters for free or buy it [here](https://leanpub.com/ezplot). 
