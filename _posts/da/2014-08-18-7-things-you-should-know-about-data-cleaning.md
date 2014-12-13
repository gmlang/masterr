---
layout: post
title: "7 Things You Should Know About Data Cleaning"
date: 2014-08-18 15:04:03 -0400
comments: true
categories: da
keywords: "data cleaning, data processing, tidy data"
published: true
share: true

---
When doing a data analysis project, it's often said that 80% of the effort is spent on data cleaning. I've cleaned lots of datasets and have become quite good at it. These experiences have taught me 

1. data cleaning is time consuming. Even if you do a bad job at it, it will still take a lot of time. However, it only takes a little longer to do a good job. So it's wise to aim at doing a good job.
2. A well cleaned data set is of vital importance for the success of the actual analyses. It cuts down the time and improves the accuracy of these analyses.

Because of this, when I give estimates, I usually allocate 1/3 to 1/2 of the total time to data cleaning. Although this is already a lot less than 80%, many clients still consider it too much. As one client said, “I'm mostly interested in the analysis, the predictions, and some nice visualizations. It's hard for me to see why I want to spend half of my budget on data cleaning.”

## Why is it so crucial to clean data well?

There are at least 3 reasons:

1. Without a well cleaned data, you either cannot do the analysis you want or it takes way longer time because you'll continuously run into data problems. For example, can you imagine running a linear regression where the response is mostly numeric but mixed with characters here and there? What if when you perform clustering analysis, you discover one of the categorical variables has levels spelled differently but mean the same thing, like "acc" and "ACC" or "life insurance" and "life-insurance."
2. Without a well cleaned data, it's very likely to get wrong analysis results. For example, say you want to run a linear regression and your response variable is numeric with special values like “999” to indicate missings, but you didn't check and deal with them in your data cleaning process. When you run the model you'll end up with wrong results.
3. A good data cleaning process can suggest improvements in data collection, which will make data collection and data analysis more integrated.

## Why does it take time to clean data well?

There're at least 4 reasons:

1. Data cleaning consists a broad range of activities, for example,
	* text parsing 
	* [date conversion](http://gmlang.com/r/how-to-convert-strings-to-dates-in-r/) 
	* outlier checking 
	* missing data imputation
	* variable transformation 
	* reshaping
	* subsetting
	* merging
2. Data cleaning is not a do-it-once step, instead, it is recurrent throughout the entire analysis because we need to clean the data as new problems arise during the analysis, and they almost always do. Here's a typical data analysis process: data cleaning → descriptive and exploratory analysis → more data cleaning → descriptive and exploratory analysis → inferential or predictive analysis → more data cleaning → inferential or predictive analysis.
3. Everything we do in data cleaning needs to be reproducible. This means you should try to avoid doing it by hand, instead, you should write code to do it and you should document your code. This allows others or you in a later time to understand what you did. For the things you cannot do by code, you should document your manual cleaning actions.
4. When the dataset is large, even reading them into the software becomes challenging. Although there're some [workarounds](http://gmlang.com/r/how-to-handle-large-datasets-in-r-part-2/), you'll often need to write sql/nosql scripts to query and drop some variables to make the data smaller, or write scripts to [take a random sample](http://gmlang.com/da/reservoir-sampling-and-algorithm-r/) from the data and work with the sample instead.
