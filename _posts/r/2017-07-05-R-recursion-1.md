---
layout: post
title: "R Recursion - Part 1"
date: 2017-07-05
comments: true
categories: r
keywords: "R, recursion, recusive functions in R, recursion in R"
published: true
share: true
ads: true
---

## Intro
I've been thinking about recursion lately. It's very powerful but it can be hard to reason about sometimes. Through this article and the following ones, hopefully I can make it easier for you to understand it and to write more recursive functions. 

## Find the first 3 prime numbers
Let's start with a very simple task: find the first 3 prime numbers. How'd you do it? The intuitive way is to start with 1, and ask if 1 is a prime. The answer is no. So we move to 2 and ask if 2 is a prime, and the answer is yes. We now have our first prime number. We then move onto 3 and ask if 3 is a prime and we repeat the procedure until we find the 3rd prime number. The answer, of course, is the sequence `(2, 3, 5)`. This way of thinking is recursion. Keep reading to find out why. 

## Find the first N primes that are greater than M
The task is to find the first 3 prime numbers. What's unsaid but self-evident is that the numbers must be greater than 0 because all prime numbers are greater than 0. So we can rewrite the task: find the first 3 primes that are greater than 0. Further more, let's be ambitious and consider its general version: find the first N primes that are greater than M. 

The basic structure of any recursion involves the base case and the non-base case. In the general task, the base case is when N = 0 and the result will be the empty sequence `()`. The non-base case is When N > 0, and when N > 0, if M+1 is a prime, the result will be `(M+1, the first N-1 primes that are greater than M+1)`, otherwise, `(the first N primes that are greater than M+1)`

You probably realized it by now we can view the task as a math function
`f(N, M) = (the first N primes > M)` with input parameters N and M and outputs a sequence of first N primes > M. We can then translate the above recursive description into R code.


{% highlight r %}
f = function(N, M) {
        if (N == 0) { # base case
                return(c())
        } else { # non-base case
                if (is_prime(M+1)) c(M+1, f(N-1, M+1)) 
                else f(N, M+1)
        }
}

is_prime = function(n) {
        if (n == 1L) FALSE
        else n == 2L || all(n %% 2L:max(2, floor(sqrt(n))) != 0)
}
{% endhighlight %}

The function `is_prime()` is taken from [this stackoverflow answer](https://stackoverflow.com/questions/19767408/prime-number-function-in-r), you can read the logics behind there. Alternatively, you can implement it using recursion. Consider it as today's homework. :) 

Let's use `f` to find the first 3 prime numbers and first 5 primes greater than 100.

{% highlight r %}
f(3, 0)
{% endhighlight %}



{% highlight text %}
## [1] 2 3 5
{% endhighlight %}



{% highlight r %}
f(5, 100)
{% endhighlight %}



{% highlight text %}
## [1] 101 103 107 109 113
{% endhighlight %}

This article is inspired by an example described in this little [pamphlet](https://panicz.github.io/pamphlet/) by Panicz.
