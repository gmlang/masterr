---
layout: post
title: "Functions That Return Functions Part 2"
date: 2014-10-07
comments: true
categories: r
keywords: "R, closures, functions that return other functions, function factory"
published: true
share: true
ads: true
---

Previously, I wrote about the idea of [functions that return other functions](http://masterr.org/r/functions-that-return-functions/), where I gave a trivial example that didn't demonstrate the power of the idea. Today, I'm giving several more examples, which I use frequently in my work. They allow me to make the same kind of ggplot2 plots without repeatedly typing the same commands, and hence make my code shorter and less error prone. 

{% highlight r %}
mk_density_plt = function(df) {
        # Creats a function that plots histogram and overlayed density 
        # 
        # Args:
        #       df: a data frame
        # Returns:
        #       a function that takes two arguments:
        #               xvar     : a string specifying the x variable
        #               bin.width: a numeric value specifying the bin width
        function(xvar, bin.width)
                ggplot(df, aes_string(x=xvar)) + 
                geom_histogram(aes(y=..density..), colour="black", 
                               fill="white", binwidth=bin.width) +
                geom_density(alpha=.2, fill="#FF6666", 
                             colour="darkgreen", size=2)
}

mk_cond_dist_plt = function(df, type="density") {
        # Creates a function that draws histograms or density plots with
        # multiple groups
        #
        # Args:
        #       df  : a data frame
        #       type: "density" (default) or "histogram"
        # Returns:
        #       a function that takes two arguments:
        #               xvar : a string specifying the x variable
        #               byvar: a string specifying the group variable
        if (type == "histogram") {
                function(xvar, byvar)
                        ggplot(df, aes_string(x=xvar, fill=byvar)) + 
                        geom_histogram(alpha=.5, position="identity")
        } else {       
                function(xvar, byvar)
                        ggplot(df, aes_string(x=xvar, fill=byvar)) + 
                        geom_density(alpha=.3)
        }
        
}

mk_box_plt = function(df) {
        # Creates a function that draws boxplots
        #
        # Args:
        #       df: a data frame
        # Returns:
        #       a function that takes three arguments:
        #               xvar      : a string specifying the x variable
        #               yvar      : a string specifying the y variable
        #               txt.angle : an int specifying the angle of tick labels
        function(xvar, yvar, txt.angle=0)
                ggplot(df, aes_string(x=xvar, y=yvar, fill=xvar)) + 
                geom_boxplot() + guides(fill=FALSE) + labs(x="") +
                stat_summary(fun.y=mean, geom="point", shape=5, size=2) +
                theme(axis.text.x = element_text(angle = txt.angle))
}
{% endhighlight %}

If you're having trouble understanding these functions, drop a comment. I'd be happy to answer your questions.
