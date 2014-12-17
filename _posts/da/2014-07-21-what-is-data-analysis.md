---
layout: post
title: "What is Data Analysis?"
date: 2014-07-21 15:25:52 -0400
comments: true
categories: da
keywords: "data analysis, da mondays, data cleaning, descriptive, exploratory, inference, prediction, models, visualization"
published: true
share: true
ads: true

---
When I tell people I do data analysis for a living, I usually get one of these responses:

* What is data analysis?
* What kind of analysis? Is it health care, financial, web metrics, bio metrics or ...? 
* What data?
* So do you work with excel a lot?

Now I think of it, data analysis is indeed quite abstract. It's not like the iPhone, which you can touch and hold in your hand. Yet it is as powerful as the iPhone in the sense that it allows you to accomplish many things easily.

Data analysis is a process that extracts information from raw data. It composes of data cleaning,  descriptive analysis, exploratory analysis, inferential analysis, predictive analysis, and causal analysis. The first three components are usually done in order. Then depending on the objective, one can stop there or carry out one of the latter four analyses. 

Raw data are messy. Data cleaning takes in raw data, cleans them and outputs processed data. Processed data are tidy and they are the inputs to the ensuing analyses. Data cleaning consists of a broad range of activities, from merging and reshaping data to text parsing to outlier checking to missing data imputation and etc. It often takes more, sometimes, significantly more time than the ensuing analyses.
 
Descriptive and exploratory analyses take the processed data, describe the distribution of each variable, and look for obvious and hidden relationships among the variables. The activities involved are calculating summary statistics, frequency tables, contingency tables and correlations, and making histograms, density plots, bar charts, scatter plots, boxplots and other visualizations. Some times, K-means clustering is used for pattern detection and PCA is used for dimension reduction. Descriptive and exploratory analyses allow you to understand the data and make smart modeling choices for the ensuing inferential or predictive analyses. 

Inferential analysis uses the processed data to say something about a bigger population. It involves calculating the estimate of the population parameter of interest and its margin of error. How good the estimate is depends on both the sample size and how the sample was taken. If the method of sampling has serious biases, taking a big sample will just give you a big bad sample. A common type of bias is selection bias, which refers to systematically leaving out parts of the population. For example, after watching the online course Justice with Michael Sandel, I was very impressed by how sharp those Harvard undergrads constructed their arguments. But if I were to make the generalization that all Harvard undergrads were articulate on philosophical issues, I'd most likely to be wrong because it’s quite possible that the students who weren't interested in political philosophy or who weren't well-read or articulate about the subject, didn't sign up for the course, while those ones who were signed up. Common inferential analysis techniques are hypothesis testing and regressions.

Predictive analysis uses the processed data to build and validate prediction models. The standard approach is to split the processed data into training and testing sets, build prediction models using the training set and backtest these models using the testing set.  The accuracy of a prediction model depends heavily on measuring the right variables. Often a simple model + more data work really well. Correlation does not imply causation, and similarly, prediction does not necessarily imply causation either. Just because X predicts Y, it doesn't mean if X is changed, Y will consequently change in a specific way.

Causal analysis is to discover what happens to one variable when you change another variable. It involves randomized studies with control and treatment groups. The resulting causal relationships are usually identified as average effects. If a treatment is found effective for a population, and if you give that treatment to an individual, it won't necessarily improve this person's case. In general, it's hard to pinpoint causality because of the unmeasured extraneous factors that's not included in the dataset. 

I hope you now have a better understanding of what data analysis entails. To recap, data analysis is a process that involves data cleaning, descriptive analysis, exploratory analysis, data visualization, inferential analysis, predictive analysis and causal analysis. 
