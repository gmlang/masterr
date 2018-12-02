---
layout: post
title: "Understand R Environments - Part3"
date: 2018-12-01
comments: true
categories: r
keywords: "R, environments, lexical scoping, lexing, evaluate an expression in an environment, frame, environment frame, parent environment, parent.env(), enclosing environment, enclosure, <<-, assignment operator in R, mortgage calculator, amortization schedule, amortization schedule calculator, mortgage payment schedule, repayment, principal, interest, outstanding principal, balance, mortgage loan amount, APR, interest rate, housing price, down payment"
published: true
share: true
ads: true
---

This is the final article of the series on how environments work in R. If you haven't read the previous articles, I recommend you to do that first. Follow these links:

1. [Understand R Environments - Part1](http://masterr.org/r/understand-r-environments-part1/)

2. [Understand R Environments - Part2](http://masterr.org/r/understand-r-environments-part2/)

3. [How to Calculate Mortgage Payment Schedule in R](http://masterr.org/r/calculate-mortgage-payment-schedule/)

Now that we understand the R evaluation model and the `<<-` operator, we can code up the Mortgage Payment Calculator in a different fashion. 


{% highlight r %}
amortize = function(loan_amt = 200000, term = 360, APR = 4.87/100) {
        # calculate simple monthly rate 
        monthly_rate = APR / 12
        
        # calculate (constant) contractual monthly payment amount
        #       derived from the present value formula for annuities
        #       https://en.wikipedia.org/wiki/Annuity
        r = (1 + monthly_rate) ^ term - 1
        payment = loan_amt * monthly_rate * (r + 1) / r
        
        # initialize outstanding principal 
        balance = loan_amt
        
        # main
        list(make_payment = function() {
                     interest = balance * monthly_rate
                     principal = payment - interest
                     balance <<- balance - principal # update balance
                     setNames(data.frame(interest, principal, balance), 
                              c("interest", "principal", "balance"))
                     }
             )
}
{% endhighlight %}


Say you want to buy a $350,000 house, and you plan to get a 30-year fixed mortage (interest rate 4.87%) with a 20% down payment. We can use function `amortize` to 
calculate the monthly mortgage payment, broken down by the interest portion and the principal portion. For example, let's calculate the payment schedule for the first 12 months.


{% highlight r %}
library(dplyr)
options(scipen=999) # turn off scientific notation

# make an amortizer for amortizing your mortgage
house_price = 350000
downpmt_pct = 0.2
term = 360
amortizer = amortize(loan_amt = house_price * (1 - downpmt_pct),
                     term = term, APR = 4.87/100)

# amortize first 12 months
pmt_schedule = lapply(1:12, function(month) 
        cbind(month, amortizer$make_payment())) %>%
        bind_rows()

# print
knitr::kable(pmt_schedule, digits = 2,
             caption = "Payment schedule for first 12 months")
{% endhighlight %}



| month| interest| principal|  balance|
|-----:|--------:|---------:|--------:|
|     1|  1136.33|    344.60| 279655.4|
|     2|  1134.93|    346.00| 279309.4|
|     3|  1133.53|    347.40| 278962.0|
|     4|  1132.12|    348.81| 278613.2|
|     5|  1130.71|    350.23| 278263.0|
|     6|  1129.28|    351.65| 277911.3|
|     7|  1127.86|    353.08| 277558.2|
|     8|  1126.42|    354.51| 277203.7|
|     9|  1124.99|    355.95| 276847.8|
|    10|  1123.54|    357.39| 276490.4|
|    11|  1122.09|    358.84| 276131.5|
|    12|  1120.63|    360.30| 275771.2|

This concludes the series on how environment works in R. Drop your questions and comments below.
