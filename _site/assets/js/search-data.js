var store = [{
        "title": "What is Data Analysis?",
        "excerpt":"When I tell people I do data analysis for a living, I usually get one of these responses: What is data analysis? What kind of analysis? Is it health care, financial, web metrics, bio metrics or …? What data? So do you work with excel a lot?Now I think of...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/what-is-data-analysis/"
      },{
        "title": "Sampling",
        "excerpt":"Data are measurements on a set of items we’re interested in. The complete set is called the population because it includes all possible such items. For example, all males living in the US in 2014. A population can be small, large or infinitely large. Most of time, it is either...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/sampling/"
      },{
        "title": "Reservoir Sampling and Algorithm R",
        "excerpt":"When doing data analysis, it’s important to work with a random sample. We can get a random sample by drawing members from the population according to fixed probabilities known to us prior to our draw. Furthermore, If each member is drawn with an equal probability, the resulting sample is called...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/reservoir-sampling-and-algorithm-r/"
      },{
        "title": "Relative Frequency or Probability",
        "excerpt":"Consider these two numbers: 5 out of 100 and 5%. They are the same, just expressed differently. The first number is expressed as a relative frequency and the second number is expressed as a probability in percentage format. It turns out people perceive them differently when putting them into a...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/relative-frequency-or-probability/"
      },{
        "title": "Exponential Growth of the US Real GDP from 1790 to 2012",
        "excerpt":"Exponential model is one of the most powerful mathematical models because it allows us to understand some important worldly phenomenons. The word “exponential” means “amplified.” There’re two kinds of exponential models: exponential decay and exponential growth. In this article, I’m going to show you what exponential growth is and how...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/exponential-growth-of-the-us-real-gdp-from-1790-to-2012/"
      },{
        "title": "How to Install Quantstrat",
        "excerpt":"The R package quantstrat makes backtesting trading strategies easy. It is still under heavy development and can’t be installed from CRAN yet. You can install it from source and the process is straightforward. Step1. Install these dependencies in R: install.packages(\"FinancialInstrument\")install.packages(\"PerformanceAnalytics\")install.packages(\"foreach\")Step2. Go to R-forge and download the .tar.gz files for blotter...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-install-quantstrat/"
      },{
        "title": "How to Plot Pretty Histograms using R Base Graphing System",
        "excerpt":"When doing descriptive analysis, we often want to see how each variable is distributed. For a continuous variable, this means we want to plot its histogram and check its normality (checking normality of the response variable is necessary when you plan to use linear regression in your inference or predictive...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-plot-pretty-histograms-using-r-base-graphing-system/"
      },{
        "title": "7 Things You Should Know About Data Cleaning",
        "excerpt":"When doing a data analysis project, it’s often said that 80% of the effort is spent on data cleaning. I’ve cleaned lots of datasets and have become quite good at it. These experiences have taught me data cleaning is time consuming. Even if you do a bad job at it,...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/7-things-you-should-know-about-data-cleaning/"
      },{
        "title": "How to Use the Paste and Outer Functions in R",
        "excerpt":"Today I want to show you the power of two little R functions: paste() and outer(). Why should you care? Because you may encounter scenarios like the following. First, roll a dice 10 times. This can be simulated with one line of R code: sample(1:6, 10, replace=TRUE)## [1] 4 6...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-use-the-paste-and-outer-functions-in-r/"
      },{
        "title": "How to Handle Large Datasets in R - Part 1",
        "excerpt":"Before you can do any analysis, you need to first read in the data. One thing that’s not so nice about R is that it loads the entire dataset into RAM. As a result, if the dataset is bigger than your RAM, R will run out of memory before it...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-handle-large-datasets-in-r-part-1/"
      },{
        "title": "How to Convert Strings to Dates in R",
        "excerpt":"Dealing with date variables is usually tedious. When reading in a text data file into R, R will not automatically convert the date values into dates, rather, it will treat them as strings (make sure you specify stringsAsFactors = FALSE in your read.table() or read.csv() function. Otherwise, R will read...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-convert-strings-to-dates-in-r/"
      },{
        "title": "How to Easily Sort A Data Frame",
        "excerpt":"How do you sort a data frame by one or more of its variables? This is one of the activities I do a lot when analyzing a dataset, so I wrote a function to take care of the details. It uses two other functions, do.call() and order(). do.call() takes in...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-easily-sort-a-data-frame/"
      },{
        "title": "Functions that Return Functions",
        "excerpt":"I love the idea of writing a function that returns another function. For example, say we want to compute \\(x^n\\) for any given \\(x\\) and \\(n\\). We can write a function that takes \\(n\\) as input and returns a function, which can further take \\(x\\) as input and returns the...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/functions-that-return-functions/"
      },{
        "title": "How to Handle Large Datasets in R - Part 2",
        "excerpt":"R is my favorite tool for data analysis except when it comes to dealing with large datasets. If the data file is larger than the size of your RAM, R will fail at reading it in. So when you have a large dataset, you should first check if you have...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-handle-large-datasets-in-r-part-2/"
      },{
        "title": "How to Work with Files in R and Improve Reproducibility",
        "excerpt":"When I first started learning R, I was taught to manually set or change the working directory1. I don’t like pointing and clicking, so I quickly learned to use setwd() to do the same thing. My work flow was: create a project folder → get its full path manually →...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-work-with-files-in-r-and-improve-reproducibility/"
      },{
        "title": "How to Cache a Matrix Inversion in R",
        "excerpt":"This post contains my solution to one of the programming assignments from the R Programming course on coursera. If you want to solve it yourself, please don’t read any further. When running time consuming computations, it’s good to cache the results so that you can look them up later instead...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-cache-a-matrix-inversion-in-r/"
      },{
        "title": "The stringr Package",
        "excerpt":"When doing data cleaning, we often have to clean up strings of text. Doing this in R used to be a pain until the birth of the stringr package. For example, it contains a function called str_trim() that allows you to easily remove any leading and trailing whitespace of a...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/the-stringr-package/"
      },{
        "title": "How to Find Consecutive Repeats in R",
        "excerpt":"Q: Given a sequence of random numbers, find the start and end positions of runs of five or more consecutive numbers that are greater than zero. A: Use the rle() function. For example, let’s apply rle() to the following sequence of numbers. seq3 = c(2,2,2,2,2,5,3,7,7,7,2,2,5,5,5,3,3,3)( rle.seq3 = rle(seq3) )## Run...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-find-consecutive-repeats-in-r/"
      },{
        "title": "How to Convert Millisecond to Date in R",
        "excerpt":"This post is updated based on Luca’s comments. Sometimes, we receive data where the timestamps are milliseconds and we want to convert them to dates. This is quite easy in R. We just need to use the as.POSIXct() function. Here’s a function wrapper I wrote to make it even easier....","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-convert-millisecond-to-date-in-r/"
      },{
        "title": "How to Work with Factors in R",
        "excerpt":"If you want to deal with categorical variables in R, you need to use a data structure called factor. A factor is just a numeric vector with a special attribute called levels. You can think of the levels as labels for the values. Given a character vector, you can turn...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-work-with-factors-in-r/"
      },{
        "title": "How to Write Infix Functions in R",
        "excerpt":"Infix functions are functions where the function name comes in between its arguments when used. For example, operators like + and - are actually infix functions. Conversely, you can think of infix functions as operators. Here’s an example of an infix function that concatenate two vectors. `%&amp;%` &lt;- function(x, y)...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-write-infix-functions-in-r/"
      },{
        "title": "Correlation",
        "excerpt":"When we use the word correlation in conversations, we usually mean “relationship.” For example, when we say “sales of ice cream are correlated with the weather,” we mean “ice cream sales and the weather are related, and we tend to sell more ice creams in the summer than winter.” However,...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/correlation/"
      },{
        "title": "How to Make Faceted Ordered Bar Charts in R",
        "excerpt":"Previously, I showed how to make ordered bar charts using ggplot2. Sometimes, you want to create multiple facets and put on each facet an ordered bar chart. Here’s how you can do that using ggplot2. suppressMessages({library(ggplot2)})# make fake datadf = data.frame(val = rnorm(10, mean=5), cat = gl(5, 2, labels =...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-make-faceted-ordered-bar-charts-in-r/"
      },{
        "title": "How to Correctly Load a R Package",
        "excerpt":"Use library() instead of require() because the former loads the package whereas the latter tries to load the package. You can read Yihui Xie’s post to understand their differences in detail and when to use require(). ","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-correctly-load-a-r-package/"
      },{
        "title": "Honest Arrogance or Hypocritical Humility",
        "excerpt":" ","categories": ["cartoon"],
        "tags": [],
        "url": "http://localhost:4000/cartoon/honest-arrogance-or-hypocritical-humility/"
      },{
        "title": "How to Unsort in R",
        "excerpt":"When doing data analysis in R, we often want to sort a vector or data frame. Sometimes, we want to undo the sorting. This usually happens inside of a function where you want to first sort the input object, do some operations and undo the sorting before you return the...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-unsort-in-r/"
      },{
        "title": "When Does Data Analysis Become Worthless",
        "excerpt":"The short answer is that when it tells you what you already know or when it tells you something so out of line with what you already know. This becomes especially true when you are working for a client. Most clients who hire you to analyze their data have some...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/when-does-data-analysis-become-worthless/"
      },{
        "title": "On R Code Style",
        "excerpt":"I didn’t pay much attention to code style until recently when I had to collaborate with a couple of guys on a project. That experience taught me having a consistent style across all team members can greatly reduce communication time and help people understand each other’s code. If you’re not...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/on-r-code-style/"
      },{
        "title": "How to Read Excel Files into R",
        "excerpt":"You can use the XLConnect package to read .xls or .xlsx files into R. Suppose you have a file named example.xls in your working directory. You can read the data on sheet1 into R using the following commands. library(XLConnect)data = readWorksheetFromFile(\"example.xls\", sheet=1)Alternatively, you can read in the data by sheet...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-read-excel-files-into-r/"
      },{
        "title": "The Quest for Exponential Growth",
        "excerpt":" ","categories": ["cartoon"],
        "tags": [],
        "url": "http://localhost:4000/cartoon/the-quest-for-exponential-growth/"
      },{
        "title": "Simple Random Sampling vs. Systematic Sampling",
        "excerpt":"Suppose you’re selling electronics and you wish to analyze the transaction data. Because there are too much data, you need to take a sample. Which sampling technique would you use? You can use simple random sampling (SRS). Suppose you have a total number of \\(N\\) transactions, you can give each...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/simple-random-sampling-vs-systematic-sampling/"
      },{
        "title": "The Unknown Unknowns",
        "excerpt":" ","categories": ["cartoon"],
        "tags": [],
        "url": "http://localhost:4000/cartoon/the-unknown-unknowns/"
      },{
        "title": "Correlation Only Measures Linear Relationship",
        "excerpt":" ","categories": ["cartoon"],
        "tags": [],
        "url": "http://localhost:4000/cartoon/correlation-only-measures-linear-relationship/"
      },{
        "title": "How to Quickly Subset List Elements in R",
        "excerpt":"Every operation in R is a function call. For example, when you subset a vector using [], you’re really calling the function [. y = 1:6y[2]## [1] 2`[`(y, 2)## [1] 2This allows us to easily subset the elements of a list when the elements are vectors. For example, given a...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-quickly-subset-list-elements-in-r/"
      },{
        "title": "Interpretability vs. Flexibility of Different Models",
        "excerpt":" inspiration ","categories": ["cartoon"],
        "tags": [],
        "url": "http://localhost:4000/cartoon/interpretability-vs-flexibility-of-different-models/"
      },{
        "title": "The setwd Function in R",
        "excerpt":"Previously, I wrote an article on how not to use setwd(). Today I discovered a side effect of setwd() that is really cool and useful. It turns out that when you run setwd(path), not only will it reset the working directory to path, it will also return the working directory...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/the-setwd-function-in-r/"
      },{
        "title": "The Magic of Substitute and Deparse",
        "excerpt":"The R functions substitute() and deparse() are very interesting and here’s why. foo1 = function(a, ...) { arg = deparse(substitute(a)) dots = substitute(list(...))[-1] c(arg, sapply(dots, deparse))}foo2 = function(a, ...) { arg = deparse(substitute(a)) dots = list(...) c(arg, sapply(dots, deparse))}x = 1; y = 2; z = 3foo1(x, y, z)## [1]...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/the-magic-of-substitute-and-deparse/"
      },{
        "title": "When Does A Flexible Model Beat An Inflexible One and Vice Versa",
        "excerpt":"Machine Learning or Statistical Learning methods fall into a spectrum according to their flexibility. At the left end of the spectrum, for example, when dealing with a regression problem where the response variable is quantitative, you have lasso and linear regression, which are very restrictive and hence inflexible since they...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/when-does-a-flexible-model-beat-an-inflexible-one-and-vice-versa/"
      },{
        "title": "Functions That Return Functions Part 2",
        "excerpt":"Previously, I wrote about the idea of functions that return other functions, where I gave a trivial example that didn’t demonstrate the power of the idea. Today, I’m giving several more examples, which I use frequently in my work. They allow me to make the same kind of ggplot2 plots...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/functions-that-return-functions-part-2/"
      },{
        "title": "How to View Source Code in R",
        "excerpt":"The best way to learn how to use a function written by other people is to read its source code. If you use Rstudio, you just need to type the function name at the command line. However, a lot of times, you will get something like this. mean## function (x,...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-view-source-code-in-r/"
      },{
        "title": "Which R Base Generic Has the Most Number of Methods",
        "excerpt":"A generic (short for generic function) is a special type of function in R. R’s S3 system uses generics to decide which method to call. In other words, when it comes to the S3 system, “object oriented programming” specifically means “generic oriented programming” because S3 methods belong to generic functions...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/which-r-base-generic-has-the-most-number-of-methods/"
      },{
        "title": "Sknewness and Kurtosis",
        "excerpt":"When analyzing a continuous variable, you often want to look at its distribution using a histogram or density plot and compare it against a benchmark distribution (a common choice is the normal distribution). In addition, you also want to quantify its shape characteristics: where is the distribution centered at? what...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/skewness-and-kurtosis/"
      },{
        "title": "How to Calculate Sknewness and Kurtosis in R",
        "excerpt":"Previously, I wrote about the intuitions behind skewness and kurtosis. Today I’m going to do some calculations using the daily adjusted close prices of the S&amp;P500 and NovaGold between January 4, 2007 and October 10, 2014. You can download the data from yahoo and follow along. First of all, I...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/sknewness-and-kurtosis-examples/"
      },{
        "title": "Replacement Functions in R",
        "excerpt":"Replacement functions have names in the form of xxx&lt;- and they modify their arguments in place. Here’s an example. `replace_1st&lt;-` = function(x, value) { x[1] = value x}x = rep(2, 5)replace_1st(x) = 0Lprint(x)## [1] 0 2 2 2 2The following code finds all replacement functions that are also primitive functions...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/replacement-functions-in-r/"
      },{
        "title": "Download Stock Price Data Using R",
        "excerpt":"Downloading and charting stock prices data become easy when using the tseries and PerformanceAnalytics R packages. Step 1. Load these libraries. library(PerformanceAnalytics)library(zoo)library(tseries)Step 2. Download the monthly adjusted closing price data on S&amp;P500 (^GSPC) and NovaGold (NG) between Jan 2004 and Sept 2014 from Yahoo using the function get.hist.quote() from the...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/download-stock-price-data-using-r/"
      },{
        "title": "Analyze Stock Price Data Using R, Part1",
        "excerpt":"Crude oil has been hammered. Yesterday, it hit the lowest price in 2 years. Being a contrarian, I smell the opportunity to buy. My interest is a vanguard energy fund (VGENX), which has 95% of its assets invested in oil or oil related sectors. Let’s first take a look at...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/analyze-stock-price-data-using-r-part1/"
      },{
        "title": "Analyze Stock Price Data Using R, Part2",
        "excerpt":"When constructing a portfolio, it’s important to pick un-correlated assets. This is just a corollary of the “don’t put all your eggs in one basket” principle. If asset B goes up (or down) when asset A goes up (or down) and vice versa, there’s really no reason to own both...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/analyze-stock-price-data-using-r-part2/"
      },{
        "title": "Bias and Precision",
        "excerpt":"Statistics, by and large, deals with the “known unknowns.” The “unknowns” have to do with the population, while samples are “known.” Although it’s impossible or impractical to completely get to know the population, statistics allows us to learn about it using samples. Moreover, it provides tools to measure how well...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/bias-and-precision/"
      },{
        "title": "Handy R Functions for Summary Statistics",
        "excerpt":"When analyzing a variable, one of the first things you want to do is to count how many non-missing (or non-NA) values the variable has. Unfortunately, there’s no default functions in R that perform this simply task. The length() function counts every element including the NAs. But it’s not hard...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/handy-r-functions-for-summary-statistics/"
      },{
        "title": "An Example of the Bootstrap Method",
        "excerpt":"When calculating the bias and precision of a sample estimate to the popluation parameter, because we often don’t know the true value of the population parameter and we often only have one sample, we use a procedure called bootstrap. The idea is simple: treat the sample as the population understand...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/an-example-of-the-bootstrap-method/"
      },{
        "title": "Analyze Stock Price Data Using R, Part3",
        "excerpt":"When analyzing stock returns, we like to know if the average returns or volatilities are constant over time, or if the correlations between any two assets in our portfolio stay constant over time. Therefore, we need to pick a time windows and calculate the rolling means, volatilities or correlations. A...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/analyze-stock-price-data-using-r-part3/"
      },{
        "title": "Calculate Global Minimum Variance Portfolio Using R",
        "excerpt":"In this and the next couple of posts, I’ll give examples of how to calculate optimized portfolios using R and the vanguard funds in my retirement account. Today, I’ll show you how to calculate the global minimum variance portfolio, which was the first major result in Markowitz’s portfolio theory. Given...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/calculate-global-minimum-variance-portfolio-using-r/"
      },{
        "title": "Calculate Efficient Portfolios Using R",
        "excerpt":"In a previous post, I showed how to calculate the global minimum variance portfolio using R and vanguard funds in my retirement account. It had an average annual return of 5.2% and volatility of 3.3% in the past 10 years. Because I’m holding those funds for a long term, at...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/calculate-efficient-portfolios-using-r/"
      },{
        "title": "Calculate Tangency Portfolios Using R",
        "excerpt":"In a previous post, I showed how to calculate the efficient portfolio given a target return using R and vanguard funds in my retirement account. All assets I used previously are risky assets. However, we can also hold risk free assets in our portfolio, for example, 1 year t-bills. After...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/calculate-tangency-portfolios-using-r/"
      },{
        "title": "The Switch Operator in R",
        "excerpt":"The switch() function in R is very powerful and here’s an example. center = function(x, type) { # Finds the center of x # # Args: # x: numeric vector # type: string specifying center type # # Returns: # the specified center of x switch(type, mean = mean(x), median...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/the-switch-operator-in-r/"
      },{
        "title": "How to Scrape Japanese Text Using the rvest Package",
        "excerpt":"The rvest package is yet another powerful tool developed by Hadley. It makes web scraping super easy. For example, say I want to scrape this page from the Bank of Japan. I can just use the read_html() function without specifyingthe encoding. I think under the hood, it guesses the encoding....","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-scrape-Japanese-text-using-rvest/"
      },{
        "title": "An Easy Way to Make Ggplot2 Plots, ezplot - Part 1",
        "excerpt":"Updated October 4, 2018 Do you love ggplot2? If you’ve worked with ggplot2 before, you know it often takes many lines of code to get a satisfying plot. The ggplot2 language has too many “words” and “expressions”, which are difficult to remember and time consuming to look up. Wouldn’t it...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/an-easy-way-to-make-ggplot2-plots-ezplot-part1/"
      },{
        "title": "An Easy Way to Make Ggplot2 Boxplots, ezplot - Part 2",
        "excerpt":"Updated October 4, 2018 Previously, I introduced the ezplot package and showed how to use it to make high quality bar charts. Today, I’m going to show you how to make boxplots using ezplot. Once again, it’s super simple. Load ezplot Make sure you first install ezplot by running the...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/an-easy-way-to-make-ggplot2-boxplots-ezplot-part2/"
      },{
        "title": "An Easy Way to Make Ggplot2 Histograms and Density Plots, ezplot - Part 3",
        "excerpt":"Updated October 4, 2018 Previously, I gave examples of ezplot barcharts and boxplots. In today’s post, I’ll discuss two common charts for displaying distributions of numeric variables, namely, the histogram and the density plot. By the end of this article, you’ll know how to make sophisticated histograms and density plots...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/an-easy-way-to-make-ggplot2-histograms-ezplot-part3/"
      },{
        "title": "A Super Easy Way to Make Ggplot2 Bar Charts with Labels, ezplot - Part 4",
        "excerpt":"Updated October 4, 2018 Previously, I showed how to use the mk_barplot_resp() function to make bar charts. In this post, I’ll show you how to use the mk_barplot_freq() function. Make sure you first install ezplot by running the command devtools::install_github(\"gmlang/ezplot\"). library(ezplot)library(dplyr)We’ll use the diamonds data in the ggplot2 package. plt...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/a-super-easy-way-to-make-ggplot2-barcharts-with-labels-ezplot-part4/"
      },{
        "title": "How to check normality of a continuous variable, ezplot - Part 5",
        "excerpt":"Updated October 4, 2018 In an earlier post, I showed you how easy it is to make high quality histograms and boxplots using ezplot. When we’re analyzing a continuous variable, we often want to check if it’s normally distributed. Q-Q plot is a good tool to do that. Make sure...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-check-normality-of-a-continuous-variable-ezplot-part5/"
      },{
        "title": "How to easily make ggplot2 type of line plot, ezplot - Part 6",
        "excerpt":"Updated October 4, 2018 Today I’m going to show you how to make line plots using ezplot. We’ll usethe mk_lineplot() function. Make sure you first install ezplot by running the command devtools::install_github(\"gmlang/ezplot\"). library(ezplot)library(dplyr)The ezplot package comes with a films dataset containing annual boxoffice/budget ratios between 1913 and 2014. Let’s plot...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-easily-make-ggplot2-line-plot-ezplot-part6/"
      },{
        "title": "How to easily make beautiful heatmaps with ezplot - Part 8",
        "excerpt":"Updated October 4, 2018 In this post, we’ll look at how to make effective heatmaps using ezplot. We’ll use a dataset of NBA players’ statistics from flowingdata.com. Make sure you first install ezplot by running the command devtools::install_github(\"gmlang/ezplot\"). library(ezplot)library(dplyr)library(tidyr)Let’s get the data. Notice we pass the url directly to read.csv()....","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-easily-make-beautiful-heatmaps-with-ezplot-part8/"
      },{
        "title": "Functions that return a list of functions and lapply",
        "excerpt":"Have you written functions in R before? If you have, I want you to go back to one of the functions you wrote and take a look at its input and output. Does it take in a piece of data and return another piece of data, be it a number,...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/functions-that-return-a-list-of-functions-and-lapply/"
      },{
        "title": "Functions that eat functions",
        "excerpt":"We human eat different kind of foods. Similarly, functions can eat different kind of things. We’ve seen functions that eat a number, a data frame, and a vector of numbers. Today, I’m going to show you how to create functions that eat functions. By that, I mean functions that take...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/functions-that-eat-functions/"
      },{
        "title": "How to use functions that return functions to clean data",
        "excerpt":"We talked about functions that return functions and functions that eat functions. If you are new and curious, you can search my old blog posts. Today, I’m going to show you a real world example of how to use functions that return functions to clean data. By the end of...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-use-functions-that-return-functions-to-clean-data/"
      },{
        "title": "How to read in date variables as Date",
        "excerpt":"If you work with stocks or eCommerce data, you know you have to deal with dates, and often, the data exist in a text file. I once wrote an article suggesting to read in date variables as strings first and then convert them to Date type. Today, I’m going to...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/how-to-read-in-date-variables-as-Date/"
      },{
        "title": "A Simple R Function for Exponential Smoothing",
        "excerpt":"Exponential smoothing is a simple method to forecast the future given the present and the past. You can use it to forecast sales, revenues, production levels, marketing expenses, the weather, stock prices, and many other things that happend over time. It’s crude so sometimes it doesn’t work well. But sometimes...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/exponential-smoothing-function/"
      },{
        "title": "Examples of Predicate Functionals",
        "excerpt":"A predicate is a function that returns a single TRUE or FALSE, for example, is.factor(), all(), or is.NULL(). A predicate functional is a function that applies a predicate to each element of a list or data frame. For example, we can define a predicate functional where() that checks the type...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/examples-of-predicate-functionals/"
      },{
        "title": "Introducing ezplot: An Easy Way to Make Beautiful Charts for Real World Clients",
        "excerpt":"Updated October 4, 2018 Six years ago, I started a data science consulting company. Almost all my projects require some kind of data visualization. Because I’m a R programmer, ggplot2 became my primary charting tool. The thing about ggplot2 is that making a generic plot is easy, but customizing is...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/introducing-ezplot/"
      },{
        "title": "On Git, Github and Gitlab",
        "excerpt":"If you want to become a data scientist, you need to learn how to use git, github and gitlab. They are good for project storage, backup and collaboration. I’m going to give you a fairly detailed list of instructions on how to set them up in this post. Installation Sign...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/on-git-github-and-gitlab/"
      },{
        "title": "File and Dir Manipulations in R",
        "excerpt":"If you’ve created a file or copied a folder of files using the command line, do you know that you can do the same thing within R? If you never touched the terminal in your life, well, R allows you to move around folders and create files without using your...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/file-dir-manipulations-in-r/"
      },{
        "title": "The More The Better?",
        "excerpt":"A lot of my clients think more data lead to more accurate models, but this may not be true. Here’s why. Noise in the predictors or the response are also likely to increase as more data are collected, and hence reduce any positive impact of the large sample on model...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/the-more-the-better/"
      },{
        "title": "Make Flowchart in R",
        "excerpt":"I had to draw some flowcharts to demo the pipeline I built for a client. I was very pleased to discover DiagrammeR. It allows you to make flowcharts and many other diagrams using R. Below is a simple example. library(DiagrammeR)## Error in library(DiagrammeR): there is no package called 'DiagrammeR'grViz(\"digraph a_nice_graph...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/make-flowchart-in-r/"
      },{
        "title": "Sources of Noise That Cause Poor Model Performance",
        "excerpt":"There’s signal and there’s noise. When building a predictive model, we like signal and we hate noise. Here’re the common sources of noise in most data sets. Noise in the predictors or the response (e.g., labeling errors) that are caused by underlying measurement systems. Inclusion of non-informative predictors.It’s really hard...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/sources-of-noise/"
      },{
        "title": "Install XGBoost on Mac",
        "excerpt":"XGBoost is probably the most cutting-edge and optimized implementation of the gradient boosting algorithms. If you’re a R user, you probably used GBM in the past. XGBoost is generally over 10 times faster than GBM. Unfortunately, its official installation document for R users on a Mac OS isn’t clear. In...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/install-xgboost-on-mac/"
      },{
        "title": "Why Models Fail",
        "excerpt":"I tend to be cautious when building predictive models, and the more models I build, the more I think about possible reasons why they may fail. Here’s a list. Incomplete data. In practice, we often just work with whatever data we have. This is good as long as we keep...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/why-models-fail/"
      },{
        "title": "Use Grep to Drop Columns",
        "excerpt":"It’s very easy to drop columns from a data frame using the grep() function. The following example shows you how. # print the first 3 records of the iris dataset head(iris, 3)## Sepal.Length Sepal.Width Petal.Length Petal.Width Species## 1 5.1 3.5 1.4 0.2 setosa## 2 4.9 3.0 1.4 0.2 setosa## 3...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/use-grep-to-drop-columns/"
      },{
        "title": "Prediction vs. Interpretability",
        "excerpt":"When it comes to model interpretability and prediction performance, we often just can’t have the best of both worlds. But we almost always want a model that both makes sense and predicts well. This is especially true if we have expert domain (for example, medicine) knowlege. When presented with a...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/prediction-vs-interpretability/"
      },{
        "title": "R Parallel and Zombie Processes",
        "excerpt":"I recently encountered zombie processes when running some R code in parallel. I was running the code in linux and was using doMC to register the parallel backend.If you’re not familiar with doMC, read this stack overflow answer on the difference between doMC and doParallel. In a nutshell, doMC sometimes...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/R-parallel-and-zombie-processes/"
      },{
        "title": "The Response Variable",
        "excerpt":"When it comes to building models, it’s crucial to understand the characteristics of the variable you want to predict. This variable is often called the response or target variable. First, it may be continuous (for example, housing prices, stock prices, drug compound’s permeability, precipitation, and etc) or categorical (for example,...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/the-response-variable/"
      },{
        "title": "Tips for Caret",
        "excerpt":"We all love the caret package because it has made training predictive models so much easier. However, if you’re new to caret, there’re some things you probably don’t know but should know. Here’s a list. When using a resampling approach inside caret::train(), for example, 10 fold cross validation with 5...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/tips-for-caret/"
      },{
        "title": "Data Preprocessing and Xgboost",
        "excerpt":"We all know we need to pre-process data before we build models. However, if you’re building a XGboost model, you can avoid many of the pre-processing steps. I’ve done some google search and book reading, and the following list summarizes my findings. Remove zero or near-zero variance predictors. (Don’t do...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/data-preprocessing-and-xgboost/"
      },{
        "title": "R and MySQL",
        "excerpt":"Sometimes you need to talk to a database using R. I’ve put together a R scriptthat shows you how to query data from a MySQL database and insert data back. library(RMySQL)# loads the MySQL driverdrv = dbDriver(\"MySQL\") # create a connection to the databasecon = dbConnect(drv, dbname = \"your database...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/R-and-MySQL/"
      },{
        "title": "Data Characteristics",
        "excerpt":"The most basic setup of a dataset consists of one response variable (also called outcome, target, or dependent variable) and a bunch of predictors (also called attributes, features, or independent variables). When looking at the response, remember to ask yourself: Is it categorical or continuous? Is it balanced/symmetric or unbalanced/skewed?...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/data-characteristics/"
      },{
        "title": "Read Zipped Files into R",
        "excerpt":"In the age of big data, it’s not uncommon to encounter a large zipped file of multiple text files. Unzipping will take time. It turns out we can read them into R without unzipping first. # get the name of the zipped filefname_zipped = \"xxxxx.zip\"# list all files names inside...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/read-zipped-files-into-R/"
      },{
        "title": "Root Mean Squared Error (RMSE)",
        "excerpt":"When predicting numeric values, the root mean squared error (RMSE) is frequentlyused as a model evaluation measure. The smaller, the better. Its calculation is intuitive: take the difference between each actual/observed value and the prediction (its official name is “residual”, meaning leftover after subtracting the predicted values from the actual...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/rmse/"
      },{
        "title": "The on.exit() Function",
        "excerpt":"There’s an interesting little function in R called on.exit(). It can be used in your own function to perform some side effect. For example, in addition to returning a value, the following function uses on.exit() to also print two messages. myfun = function(x){ on.exit(print(\"first\")) on.exit(print(\"second\"), add = TRUE) return(x)}myfun(2)## [1]...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/on-exit/"
      },{
        "title": "Data Preprocessing and Linear Regression",
        "excerpt":"This article summarizes data preprocessing steps when using linear regression for prediction purpose. Separate y and X, where y is continuous and X has both continuous and categorical variables, and the categorical variables are NOT encoded as dummy binary variables. Preprocess y: check if it’s symmetric or normally distributed. If...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/data-preprocessing-and-linear-regression/"
      },{
        "title": "Moving Average Models Demo",
        "excerpt":"If you work with time series data, you need to know moving average models. I’m going to showyou some basic related R commands. set.seed(123)# Simulate 250 observations from the described MA(1) modelma1_sim = arima.sim(model = list(ma=0.5), n=250, mean=0, sd=0.1) + 0.05ma2_sim = arima.sim(model = list(ma=0.9), n=250, mean=0, sd=0.1) + 0.05#...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/ma-models-demo/"
      },{
        "title": "Resampling",
        "excerpt":"When training a model for prediction purpose, resampling is used to estimate model performance on unseen data, choose the optimal tuning parameters for a particular model, and choose the best model among different kinds of models.Here’re some common resampling techniques: K-Fold Cross-Validation. When the outcome is categorical and imbalanced, make...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/resampling/"
      },{
        "title": "Rebind",
        "excerpt":"The regular assignment arrow &lt;- always creates a variable in the current environment. The deep assignment arrow &lt;&lt;- never creates a variable in the current environment, but instead modifies an existing variable in the parent environments. You can also do deep binding with assign(): name &lt;&lt;- value is equivalent to...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/rebind/"
      },{
        "title": "When n < p",
        "excerpt":"The relationship between the number of rows (n) and the number of columns (p) is important for choosing which predictive modeling techniques to use when providing predictive analytics solutions. If n &lt; p, there’s always a risk that a relevant predictor found in the training data set will not be...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/when-n-less-than-p-copy/"
      },{
        "title": "Bulk Download Data from Quandl",
        "excerpt":"I’m going to show you how to bulk download data from Quandl.com via an example. Make sure you apply for an API Key first. library(Quandl)# set api keymy_api_key = \"your API key\"# set pathdata_path = \"data\"fname_rev = file.path(data_path, \"SF1.zip\") # saving data as a zip file# bulk download all dataQuandl.database.bulk_download_to_file(\"SF1\",...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/quandl-bulk-download/"
      },{
        "title": "How to Feature Engineer Dates",
        "excerpt":"Feature engineering is almost situational because generating useful features for prediction purpose often require deep domain knowledge and familiarity with the data at hand. But Having dates (of the format mm-dd-yyyy for example) occuring in a data set is typical, and there’re at least three ways of feature engineering a...","categories": ["da"],
        "tags": [],
        "url": "http://localhost:4000/da/feature-engineer-dates/"
      },{
        "title": "R Recursion - Part 1",
        "excerpt":"Intro I’ve been thinking about recursion lately. It’s very powerful but it can be hard to reason about sometimes. Through this article and the following ones, hopefully I can make it easier for you to understand it and to write more recursive functions. Find the first 3 prime numbers Let’s...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/R-recursion-1/"
      },{
        "title": "R Recursion - Part 2",
        "excerpt":"In the Environments chapter of the book Advanced R, Hadley gives a function where(name, env = parent.frame()) that finds the first environment where a given name is defined. The parameter env is the environment where the search begins. Its default value is the global environment (the environment where we normally...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/R-recursion-2/"
      },{
        "title": "R Recursion - Part 3",
        "excerpt":"Base R has a function get() that searches for a given name over the environment stack and returns its value after finding it. For example, we can use it like this. x = 9get(\"x\")## [1] 9get(\"mean\") # inherits is set to TRUE by default## function (x, ...) ## UseMethod(\"mean\")## &lt;bytecode:...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/R-recursion-3/"
      },{
        "title": "Quote, Unquote and Quasiquote",
        "excerpt":"Suppose we are asked to write a test bank of 10,000 simple addition questions for first graders. What shall we do? Base R has a function quote() that allows us to capture the R code we type instead of evaluating them. For example, quote(1 + 3)## 1 + 3See? We’ve...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/quote-n-quasiquote/"
      },{
        "title": "How to Calculate Mortgage Payment Schedule in R",
        "excerpt":"Suppose you want to buy a $350,000 house, and you plan to get a 30-year fixed mortage (interest rate 4.87%) with a 20% down payment. What’s your monthly repayment? How much of it will go towards interest and how much will go towards the principal? Notice the mortgage amount you...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/calculate-mortgage-payment-schedule/"
      },{
        "title": "Understand R Environments - Part1",
        "excerpt":"This is the first article of a series on how environments work in R. If thissounds foreign to you, you’re probably wondering, “what is a R environment?” Don’t. Instead, ask “what does a R environment do?” This is because 99% of the utility lies in understanding how it behaves. And...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/understand-r-environments-part1/"
      },{
        "title": "Understand R Environments - Part2",
        "excerpt":"This is the second article of the series on how environments work in R. Recall that in the first article, we demonstrated how environment and evaluation work in R and we learned the following: the default current environment (or workspace) is called the global env. when you define a function...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/understand-r-environments-part2/"
      },{
        "title": "Understand R Environments - Part3",
        "excerpt":"This is the final article of the series on how environments work in R. If you haven’t read the previous articles, I recommend you to do that first. Follow these links: Understand R Environments - Part1 Understand R Environments - Part2 How to Calculate Mortgage Payment Schedule in R Now...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/understand-r-environments-part3/"
      },{
        "title": "Accurate Calculation of Years between Dates in R",
        "excerpt":"When doing feature engineering, it’s common to turn dates into numbers by calculating the time differences. For example, given date of birth, you may want to calculate age. Given sign up date and churn date, you may want to calculate the days to churn. Depending on the situation, sometimes you...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/accurate-calculation-of-years-between-dates/"
      },{
        "title": "RFP - Part1: R Vectors",
        "excerpt":"The simplest data structure in R is the vector. A vector is one dimensional and can be imagined as a sequence of blocks containing values: | v1 | v2 | ... |A R vector can have any length. Its elements must have the same data type. (We’ll see later that...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part1-vectors/"
      },{
        "title": "RFP - Part2: R Lists",
        "excerpt":"Previously, we discussed R vectors. We now turn to R lists. Like a vector, a R list can also grow or shrink. But unlike a vector, a R list can contain any R objects. For example, vectors, lists, functions, or environments can all be the elements of a list, and...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part2-lists/"
      },{
        "title": "RFP - Part3: R Variables",
        "excerpt":"Previously, we discussed two data structures in R: vectors and lists. If you programmed in another language before, you probably already got a sense that R vectors and lists are a tiny bit different than what you’re used to. This is to be expected. In general, there is a nuanced...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part3-variables/"
      },{
        "title": "RFP - Part4: R Variable Shadowing",
        "excerpt":"Now we know that R variables are objects, and that they can be manipulated, assigned any R objects and reassigned.1 (detailed discussion here.) We’ll discuss variable shadowing and its difference from variable reassignment. Variable reassignment in R After we assign a R object to a variable, the variable will refer...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part4-shadowing/"
      },{
        "title": "RFP - Part5: Immutability in R",
        "excerpt":"Do not confuse variable reassignment (or rebinding) with mutation. Reassignment in R changes the binding. (See the second diagram for an example.) Mutation changes the referenced object itself. R supports limited mutation by default and base R objects are mostly immutable. As a result, R code often behaves like what...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part5-immutability/"
      },{
        "title": "RFP - Part 6: R <<- Assignment Operator",
        "excerpt":"If you have been following this R Functional Programming (RFP) series1, you know by now we have discussed: how regular assignment operators &lt;-/= work in R, and how “copy n modify” works in R.In summary, we have the following facts about the R language: Variable assignment binds symols to objects....","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part6/"
      },{
        "title": "RFP - Part 7: Well-behaved R Functions",
        "excerpt":"Function is a big topic in R programming. I’ll spend several blog posts talking about it. But before I dive into R functions with full force, I want to show you how nice it is to work with them. Consider the following code: x = 1 # Bind x to...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part7-functions00/"
      },{
        "title": "RFP - Part 8: R Functions",
        "excerpt":"Functions play a quintessential role in R. John Chambers said that “in R: everything that happens is a function call.”Before diving into R functions, I want to explain the mathematical concept of “function” because it will help us understand R functions. A mathematical function is made of input variables and...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part8-functions01/"
      },{
        "title": "RFP - Part 9: Local Functions and Local Variables",
        "excerpt":"A common thing to do in functional programming is to create, within a (outer) function, a local (inner) function that uses other variables in scope. Let me give you an example. The function countup_from1() uses a local helper function count() to accumulate results recursively. Its argument x is used directly...","categories": ["r"],
        "tags": [],
        "url": "http://localhost:4000/r/RFP-part9-functions02/"
      }]
