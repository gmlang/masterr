---
layout: post
title: "Make Flowchart in R"
date: 2017-01-13 
comments: true
categories: r
keywords: "R, flowchart, diagrams, diagrammeR, Graphviz"
published: true
share: true
ads: true
---

I had to draw some flowcharts to demo the pipeline I built for a client. I was very pleased to discover [DiagrammeR](https://rich-iannone.github.io/DiagrammeR/). It allows you to make flowcharts and many other diagrams using R. Below is a simple example.

{% highlight r %}
library(DiagrammeR)
{% endhighlight %}



{% highlight text %}
## Error in library(DiagrammeR): there is no package called 'DiagrammeR'
{% endhighlight %}



{% highlight r %}
grViz("digraph a_nice_graph {
        
        # node definitions with substituted label text
        node [fontname = Helvetica, shape = rectangle]        
        rec1 [label = '@@1']
        rec2 [label = '@@2']
        rec3 [label = '@@5']

        node [fontname = Helvetica, shape = oval]
        ova1 [label = '@@3']
        ova2 [label = '@@4']

        # edge definitions with the node IDs
        rec1 -> ova1 -> rec2 -> ova2 -> rec3
        }
      
        [1]: 'raw data'
        [2]: 'cleaned data'
        [3]: 'clean and tidy'
        [4]: 'describe'
        [5]: 'report'
      ")
{% endhighlight %}



{% highlight text %}
## Error in grViz("digraph a_nice_graph {\n        \n        # node definitions with substituted label text\n        node [fontname = Helvetica, shape = rectangle]        \n        rec1 [label = '@@1']\n        rec2 [label = '@@2']\n        rec3 [label = '@@5']\n\n        node [fontname = Helvetica, shape = oval]\n        ova1 [label = '@@3']\n        ova2 [label = '@@4']\n\n        # edge definitions with the node IDs\n        rec1 -> ova1 -> rec2 -> ova2 -> rec3\n        }\n      \n        [1]: 'raw data'\n        [2]: 'cleaned data'\n        [3]: 'clean and tidy'\n        [4]: 'describe'\n        [5]: 'report'\n      "): could not find function "grViz"
{% endhighlight %}

