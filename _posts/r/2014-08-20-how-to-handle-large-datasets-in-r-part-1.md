---
layout: post
title: "How to Handle Large Datasets in R - Part 1"
date: 2014-08-20 
comments: true
categories: r
keywords: "R, read large dataset in R, big data and R, classes, size"
published: true
share: true
ads: true
---

Before you can do any analysis, you need to first read in the data. One thing that's not so nice about R is that it loads the entire dataset into RAM. As a result, if the dataset is bigger than your RAM, R will run out of memory before it can read in the data. So it's a good habit to check the size of the data first. Sometimes this is simply a matter of looking it up. Other times, you'll know the number of rows and columns in the dataset, and you can calculate a lower bound for its size by assuming the data are all numeric. Here's how.

Suppose the dataset has 1,500,000 rows and 120 columns, calculate
>
1,500,000 x 120 x 8 bytes/numeric
= 1440000000 bytes = 1440000000 / $$2^{20}$$ bytes/MB
= 1,373.29 MB = 1.38 GB


Because you also need some extra memory for R to run computations smoothly, you want to multiply this lower bound by 2 or 3 to get the RAM needed. In the above example, it requires at least 2 * 1.38 GB = 2.76 GB RAM. If your computer doesn't have this much memory, you can forget about using the default way to read in the data. Instead, try to break the dataset into smaller chunks and load each chunk into R one at a time. This is the topic of [part 2](https://masterr.org/r/how-to-handle-large-datasets-in-r-part-2/). For now, let's address an easier question. Say your computer has enough memory, how can you reduce the time it takes for R to load in the data? The answer is to first find out the variable types (called classes in R) by loading in only a few hundred or thousand rows, and then pass the variable types to R when loading in the entire data. This way, R doesn't have to go through the entire dataset to detect the variable types, so it will reduce the read-in time. Here's the code. Replace “datatable.txt” with the name of your data file.


{% highlight r %}
initial = read.table("datatable.txt", nrows=1000)
classes = sapply(initial, class)
tabAll = read.table("datatable.txt", colClasses = classes)
{% endhighlight %}

If your data file doesn't contain commented lines, setting 
`comment.char = ""` will also reduce the read-in time. 

This article is inspired by Roger Peng's [R Programming course](https://www.coursera.org/learn/r-programming) at coursera. 
