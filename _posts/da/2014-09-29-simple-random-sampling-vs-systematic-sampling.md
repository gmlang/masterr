---
layout: post
title: "Simple Random Sampling vs. Systematic Sampling"
date: 2014-09-29 13:17:33 -0400
comments: true
categories: da
keywords: "simple random sampling, systematic sampling"
published: true
share: true
ads: true

---
Suppose you're selling electronics and you wish to analyze the transaction data. Because there are too much data, you need to take a sample. Which sampling technique would you use? 

You can use simple random sampling (SRS). Suppose you have a total number of $$N$$ transactions, you can give each transaction record the same chance of being selected of $$1/N$$, and choose a sample by randomly selecting $$n$$ of them, where $$n$$ is the sample size. This further ensures any pair of elements has the same chance of selection as any other such pair (and similarly for triples, and so on). As a result, it minimizes biases and simplifies analysis of results. In particular, the variance between elements in the sample is a good indicator of variance in the overall population, which makes it relatively easy to make inference. 

However, SRS may be inefficient when sampling from an unusually large target population. You can use [reservoir sampling algorithm](http://gmlang.com/da/reservoir-sampling-and-algorithm-r/) to overcome this. In addition, SRS can be vulnerable to sampling error because the randomness of the selection may result in a sample that doesn't reflect the makeup of the population. For instance, a simple random sample of transactions could easily end up with too many small ticket orders and too few big ticket orders (or vice versa).

You can also use systematic sampling, which overcomes this weakness of SRS. It works like this. First, order the transactions based on transaction values (say, from the smallest to the largest). Second, select (e.g.) every 50th transaction. Note that if you always start at transaction #1 and end at $$N-50$$, the sample is slightly biased towards the low end. So you need to  randomly select the start between #1 and #50. This ensures that the sample is spread evenly along the range of the transaction values, representing all of the transactions. As long as the starting point is randomized, systematic sampling is a type of random sampling. It is easy to implement and the stratification induced can make it efficient, if the variable by which the list is ordered is correlated with the variable of interest. 'Every 50th' sampling is especially useful for efficient sampling from databases.

However, systematic sampling is especially vulnerable to periodicities. If periodicity is present and the period is a multiple or factor of the interval used, the sample is especially likely to be unrepresentative of the overall population, making the scheme less accurate than simple random sampling. Another drawback of systematic sampling is that its theoretical properties make it difficult to quantify that accuracy. 
