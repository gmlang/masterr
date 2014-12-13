---
layout: post
title: "Reservoir Sampling and Algorithm R"
date: 2014-08-04 06:24:33 -0400
comments: true
categories: da
keywords: "reservoir sampling, algorithm R"
published: true
share: true
 
---
When doing data analysis, it's important to work with a [random sample](http://gmlang.com/da/sampling/). We can get a random sample by drawing members from the population according to fixed probabilities known to us prior to our draw. Furthermore, If each member is drawn with an equal probability, the resulting sample is called a simple random sample. The concept is clear, but how do we actually do it? In other words, given a population of size $$N$$, how can we generate a simple random sample of size $$n$$ ($$n < N$$) without replacement (meaning the same member cannot appear more than once in the sample)?
 
There are two cases:

1. $$N$$ is known and not large 
2. $$N$$ is very large or unknown.

When $$N$$ is known and not large, the algorithms for generating simple random samples are implemented in most statistical softwares. So analysts can take things for granted and run a one line command, for example, in R, you can run ```sample(1:N, n)``` to get a simple random sample of size $$n$$ without replacement.

When $$N$$ is very large or unknown, things become more interesting. This happens quite often in today's big data era. For example, when streaming live data, often the size of the streamed data (population) grows over time. Or when the population data file is extremely large, it becomes inefficient to count $$N$$ first and then apply the algorithms in case 1 because doing so will require sequentially passing through the file twice. Reservoir sampling is a set of algorithms that can generate a simple random sample efficiently (one pass and linear time) when $$N$$ is very large or unknown. The simplest reservoir sampling algorithm is Algorithm R invented by Alan Waterman, and it works as follows:

1. Store the first $$n$$ elements of the data stream into an array A (assuming A is $$0$$-indexed). They serve as candidates for the sample.
2. For each subsequent element $$d$$(with index $$i, i = n, ..., N$$) from the data stream, generate a random integer $$j$$ between $$0$$ and $$i$$, endpoints included. If $$j < n$$, set $$A[j] = d$$. Otherwise, skip $$d$$.

Here's a python implementation:

{% highlight python %}
    import random
    sample = list()
    i = 0

    f = open(filename, 'rU')
    for line in f:
        if i < n:
            sample.append(line)
        else:
            j = random.randint(0, i)
            if j < n:
                sample[j] = line
            else:
                pass
        i += 1
        
    f.close() 
{% endhighlight %}

Why does Algorithm R work? You can think about it and/or read [Sahil's explanation](http://blogs.msdn.com/b/spt/archive/2008/02/05/reservoir-sampling.aspx), where he also talked about how to distribute reservoir sampling algorithms to multiple nodes.

There're more efficient algorithms than Algorithm R, in particular, Algorithm Z designed by Jeffrey Vitter. You can read the paper [here](http://www.cs.umd.edu/~samir/498/vitter.pdf).
