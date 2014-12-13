---
layout: post
title: "How to Find Consecutive Repeats in R"
date: 2014-08-31 12:49:59 -0400
comments: true
categories: R
keywords: "R, consecutive repeats in R"
published: true
share: true

---

**Q**: Given a sequence of random numbers, find the start and end positions of runs of five or more consecutive numbers that are greater than zero.

**A**: Use the `rle()` function.

For example, let's apply `rle()` to the following sequence of numbers. 

{% highlight r %}
seq3 = c(2,2,2,2,2,5,3,7,7,7,2,2,5,5,5,3,3,3)
( rle.seq3 = rle(seq3) )
{% endhighlight %}



{% highlight text %}
## Run Length Encoding
##   lengths: int [1:7] 5 1 1 3 2 3 3
##   values : num [1:7] 2 5 3 7 2 5 3
{% endhighlight %}

We see that `rle()` returns a list of two elements: lengths and values, where the latter gives the unique number of each run, and the former gives the run length, i.e. the number of consecutive repeats within each run. For example, the first run is the number 2 repeated 5 times, and the second run is the number 5 repeated once. 

Let's solve the original question. First, we set the seed, generate a sequence of normal random numbers greater than zero and apply `rle()` to it. 

{% highlight r %}
set.seed(201)
rnums = rnorm(100)
runs = rle(rnums > 0)
{% endhighlight %}

Next, we find indices of the runs with length of at least 5.

{% highlight r %}
myruns = which(runs$values == TRUE & runs$lengths >= 5)
# check if myruns has any value in it 
any(myruns) 
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}

Next, we can do a cumulative sum of the run lengths and extract the end positions of the runs with length of at least 5 using the above found indices. 

{% highlight r %}
runs.lengths.cumsum = cumsum(runs$lengths)
ends = runs.lengths.cumsum[myruns]
{% endhighlight %}

Next, we find the start positions of these runs.

{% highlight r %}
newindex = ifelse(myruns>1, myruns-1, 0)
starts = runs.lengths.cumsum[newindex] + 1
if (0 %in% newindex) starts = c(1,starts)
{% endhighlight %}

Lastly, we print out the start and end positions of these runs and use them to extract the runs themselves.

{% highlight r %}
print(starts)
{% endhighlight %}



{% highlight text %}
## [1] 10 68 75
{% endhighlight %}



{% highlight r %}
print(ends)
{% endhighlight %}



{% highlight text %}
## [1] 14 73 79
{% endhighlight %}



{% highlight r %}
print(rnums[starts[1]:ends[1]])
{% endhighlight %}



{% highlight text %}
## [1] 0.1890041 0.6932962 0.2238094 0.3984569 1.0134744
{% endhighlight %}



{% highlight r %}
print(rnums[starts[2]:ends[2]])
{% endhighlight %}



{% highlight text %}
## [1] 0.5311486 0.1588756 1.1229208 0.7904306 2.0994378 0.8786987
{% endhighlight %}



{% highlight r %}
print(rnums[starts[3]:ends[3]])
{% endhighlight %}



{% highlight text %}
## [1] 0.5789541 0.6795760 1.1309282 1.0107847 1.9778476
{% endhighlight %}

To see more examples of how to use `rle()`, read Winston Chang's [post](http://www.cookbook-r.com/Manipulating_data/Finding_sequences_of_identical_values/).
