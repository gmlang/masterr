---
layout: post
title: "R Parallel and Zombie Processes"
date: 2017-02-03 
comments: true
categories: r
keywords: "R, doMC, parallel, kill zombie processes, doParallel vs. doMC"
published: true
share: true
ads: true
---

I recently encountered zombie processes when running some R code in parallel. 
I was running the code in linux and was using doMC to register the parallel backend.
If you're not familiar with doMC, read this stack overflow answer on the [difference between doMC and doParallel](http://stackoverflow.com/questions/28989855/the-difference-between-domc-and-doparallel-in-r). In a nutshell, doMC sometimers is more 
efficient than doParallel, and it only works with linux or Mac, not with windows, while doParallel works with all platforms.

It turns out [the zombie processes weren't caused by doMC](http://stackoverflow.com/questions/25348607/how-to-stop-r-from-leaving-zombie-processes-behind). 

Finally, use [the inline package and the wait function](http://stackoverflow.com/questions/25388139/r-parallel-computing-and-zombie-processes) by Steve Weston (scroll down) to kill zombie processes. I used them in my application and they work like a charm.
