---
layout: post
title: "How to easily make beautiful heatmaps with ezplot - Part 8"
date: 2015-07-30 14:50:49 -0400
comments: true
categories: r
keywords: "R, ezplot, ggplot, ggplot2, heatmap, heat map, NBA data analysis, NBA statistics, Dwyane Wade, LeBron James, Dirk Nowitzki, Kevin Durant, Koby"
published: true
share: true

---

Q: How would you display information in three variables (2 categorical vars and 1 numerical var) in one chart?
A: Heat map.

In this post, we'll look at how to easily make effective heatmaps using ezplot. We'll use a dataset of NBA basketball statistics hosted at flowingdata.com. Let's get started. 

#### Prerequisites
1. Install a set of development tools
* On Windows, download and install [Rtools](http://cran.r-project.org/bin/windows/Rtools/). 
* On Mac, install the [Xcode command line tools](https://developer.apple.com/downloads). 
* On Linux, install the R development package, usually called **r-devel** or **r-base-dev**.
2. Install devtools by running `install.packages("devtools")` in R.

#### Install and Load ezplot

{% highlight r %}
devtools::install_github("gmlang/ezplot")
library(ezplot)

# we also need to load the following libraries for some data wrangling
library(dplyr)
library(tidyr)
{% endhighlight %}

#### Get data. Notice we pass the url of the data directly to `read.csv()`.

{% highlight r %}
nba = read.csv("http://datasets.flowingdata.com/ppg2008.csv")
# examine the variables
str(nba)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	50 obs. of  21 variables:
##  $ Name: Factor w/ 50 levels "Al Harrington ",..: 21 31 29 19 15 27 28 2 13 9 ...
##  $ G   : int  79 81 82 81 67 74 51 50 78 66 ...
##  $ MIN : num  38.6 37.7 36.2 37.7 36.2 39 38.2 36.6 38.5 34.5 ...
##  $ PTS : num  30.2 28.4 26.8 25.9 25.8 25.3 24.6 23.1 22.8 22.8 ...
##  $ FGM : num  10.8 9.7 9.8 9.6 8.5 8.9 6.7 9.7 8.1 8.1 ...
##  $ FGA : num  22 19.9 20.9 20 19.1 18.8 15.9 19.5 16.1 18.3 ...
##  $ FGP : num  0.491 0.489 0.467 0.479 0.447 0.476 0.42 0.497 0.503 0.443 ...
##  $ FTM : num  7.5 7.3 5.9 6 6 6.1 9 3.7 5.8 5.6 ...
##  $ FTA : num  9.8 9.4 6.9 6.7 6.9 7.1 10.3 5 6.7 7.1 ...
##  $ FTP : num  0.765 0.78 0.856 0.89 0.878 0.863 0.867 0.738 0.868 0.793 ...
##  $ X3PM: num  1.1 1.6 1.4 0.8 2.7 1.3 2.3 0 0.8 1 ...
##  $ X3PA: num  3.5 4.7 4.1 2.1 6.7 3.1 5.4 0.1 2.3 2.6 ...
##  $ X3PP: num  0.317 0.344 0.351 0.359 0.404 0.422 0.415 0 0.364 0.371 ...
##  $ ORB : num  1.1 1.3 1.1 1.1 0.7 1 0.6 3.4 0.9 1.6 ...
##  $ DRB : num  3.9 6.3 4.1 7.3 4.4 5.5 3 7.5 4.7 5.2 ...
##  $ TRB : num  5 7.6 5.2 8.4 5.1 6.5 3.6 11 5.5 6.8 ...
##  $ AST : num  7.5 7.2 4.9 2.4 2.7 2.8 2.7 1.6 11 3.4 ...
##  $ STL : num  2.2 1.7 1.5 0.8 1 1.3 1.2 0.8 2.8 1.1 ...
##  $ BLK : num  1.3 1.1 0.5 0.8 1.4 0.7 0.2 1.7 0.1 0.4 ...
##  $ TO  : num  3.4 3 2.6 1.9 2.5 3 2.9 1.8 3 3 ...
##  $ PF  : num  2.3 1.7 2.3 2.2 3.1 1.8 2.3 2.8 2.7 3 ...
{% endhighlight %}



{% highlight r %}
# look at the first 5 rows and 8 columns
nba[1:5, 1:8]
{% endhighlight %}



{% highlight text %}
##             Name  G  MIN  PTS  FGM  FGA   FGP FTM
## 1   Dwyane Wade  79 38.6 30.2 10.8 22.0 0.491 7.5
## 2  LeBron James  81 37.7 28.4  9.7 19.9 0.489 7.3
## 3   Kobe Bryant  82 36.2 26.8  9.8 20.9 0.467 5.9
## 4 Dirk Nowitzki  81 37.7 25.9  9.6 20.0 0.479 6.0
## 5 Danny Granger  67 36.2 25.8  8.5 19.1 0.447 6.0
{% endhighlight %}

The dataset has a variable called Name that contains the names of the NBA players. By default, it's read into R as a Factor with levels ordered alphabetically. 

#### Reorder the levels of Name by the points each player scored.

{% highlight r %}
nba$Name = with(nba, reorder(Name, PTS))
{% endhighlight %}

The other variables are various performance statistics. To visualize the data in a heat map, we first need to put the data in the long format. In other words, we need to gather the names of the statistics in one column, and their actual values in another column.

#### Change dataset to long format.

{% highlight r %}
nba_m = nba %>% gather(stats, val, -Name)
head(nba_m)
{% endhighlight %}



{% highlight text %}
##             Name stats val
## 1   Dwyane Wade      G  79
## 2  LeBron James      G  81
## 3   Kobe Bryant      G  82
## 4 Dirk Nowitzki      G  81
## 5 Danny Granger      G  67
## 6  Kevin Durant      G  74
{% endhighlight %}

In order to correctly display the information, we need to scale the values so that they are between 0 and 1. And we do that for each performance statistics. (After you finish reading, I encourage you to make a heat map using the unscaled values, and compare it with the scaled version. You will see the two heatmaps you get look very different. The scaled version is the correct one. To find out why, you can look up how heatmap is made in ggplot2 by looking up its source.)

#### Scale the values of each performance statistics.

{% highlight r %}
dat = nba_m %>% group_by(stats) %>% mutate(val_scaled = scales::rescale(val))
head(dat)
{% endhighlight %}



{% highlight text %}
## Source: local data frame [6 x 4]
## Groups: stats
## 
##             Name stats val val_scaled
## 1   Dwyane Wade      G  79  0.9473684
## 2  LeBron James      G  81  0.9824561
## 3   Kobe Bryant      G  82  1.0000000
## 4 Dirk Nowitzki      G  81  0.9824561
## 5 Danny Granger      G  67  0.7368421
## 6  Kevin Durant      G  74  0.8596491
{% endhighlight %}

With all the data prep work done, we're ready to make a heatmap. This is super easy with the aid of ezplot.

#### Make a heat map.

{% highlight r %}
f = mk_heatmap(dat)
f("stats", "Name", "val_scaled", legend=F)
{% endhighlight %}

![center](/../figs/2015-07-30-how-to-easily-make-beautiful-heatmaps-with-ezplot-part8/unnamed-chunk-6-1.png) 

By default, the heatmap we get uses the gray theme (Type ?theme_gray() to learn more). We can also make a heatmap using minimal theme by setting     
`use_theme_gray=F`.

#### Make a heat map using the minimal theme.

{% highlight r %}
f("stats", "Name", "val_scaled", use_theme_gray=F, legend=F)
{% endhighlight %}

![center](/../figs/2015-07-30-how-to-easily-make-beautiful-heatmaps-with-ezplot-part8/unnamed-chunk-7-1.png) 

We can also change the size of the tick text on both axes. 

#### Change tick text to 10 (default is 12).

{% highlight r %}
f("stats", "Name", "val_scaled", base_size=10, legend=F)
{% endhighlight %}

![center](/../figs/2015-07-30-how-to-easily-make-beautiful-heatmaps-with-ezplot-part8/unnamed-chunk-8-1.png) 

I created ezplot because there are too many detailed commands to remember when customizing a ggplot. I hope ezplot can improve your productivity and make your data analysis work easier. If you've enjoyed using it, please spread the word. I'm writing a book called ezplot: How to Easily Make ggplot2 Graphics for Data Analysis, and it is 20% complete. [Read the sample chapters for FREE](https://leanpub.com/ezplot) and get notified when the book is published.
