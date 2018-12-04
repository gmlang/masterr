---
layout: post
title: "Accurate Calculation of Years between Dates in R"
date: 2018-12-04
comments: true
categories: r
keywords: "R, how to deal with dates in R, r dates, calculate years between dates, calculate months between dates, calculate days between two dates, lubridate, time_length, difftime, as.Date, feature engineering"
published: true
share: true
ads: true
---

When doing feature engineering, it's common to turn dates into numbers by calculating the time differences. For example, given date of birth, you may want to calculate age. Given sign up date and churn date, you may want to calculate the days to churn. Depending on the situation, sometimes you want the time difference in years, and sometimes you want it in months, weeks or days; sometimes you want the years/months/weeks rounded to whole numbers, and other times you may want to keep the decimal points for more accuracy. For example, suppose we want to calculate the number of years (without rounding) between two dates, there're 3 ways we can go about it:

1. Calculate the number of days in between using `difftime(end_date, start_date)`, and divide it by 365. But this will be not accurate as some years have 366 days.
2. Calcualte the number of weeks in between using `difftime(end_date, start_date, unit = "weeks")` and divide it by 52.25. Some people believe by using 52.25 instead of 52, it will solve the 365 or 366 days issue. But this is not true and the results obtained are still not accurate as we'll show below.
3. Calculate the number of days in between using `difftime(end_date, start_date)`, and feed it into the `lubridate::time_length()` function while specifying the 2nd argument as "years". This turns out to give accurate results.

As an example, say we want to calculate the number of years between "2012-03-01" and "2017-03-01". Obviously, it has to be at least 5 years. But method 2 gives 4.992, while method 3 gives 5.002.

{% highlight r %}
start = as.Date("2012-03-01")
end = as.Date("2017-03-01")

# method 2
as.numeric(difftime(end, start, unit = "weeks")) / 52.25
{% endhighlight %}



{% highlight text %}
## [1] 4.992481
{% endhighlight %}



{% highlight r %}
# method 3
lubridate::time_length(difftime(end, start), "years")
{% endhighlight %}



{% highlight text %}
## [1] 5.00274
{% endhighlight %}


As another example, say we want to calculate the number of years between "1948-12-07" and "2018-12-07". Obviously, it has to be at least 70 years. But method 2 gives 69.902, while method 3 gives 70.047.


{% highlight r %}
start = as.Date("1948-12-07")
end = as.Date("2018-12-07")

as.numeric(difftime(end, start, unit="weeks")) / 52.25
{% endhighlight %}



{% highlight text %}
## [1] 69.90294
{% endhighlight %}



{% highlight r %}
lubridate::time_length(difftime(end, start), "years")
{% endhighlight %}



{% highlight text %}
## [1] 70.04658
{% endhighlight %}

For more detailed discussion, refer to [this discussion on stackoverflow](https://stackoverflow.com/questions/15569333/get-date-difference-in-years-floating-point).

