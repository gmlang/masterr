---
layout: post
title: "How to Calculate Mortgage Payment Schedule in R"
date: 2018-11-20
comments: true
categories: r
keywords: "R, financial calculator, mortgage calculator, amortization schedule, amortization schedule calculator, mortgage payment schedule, repayment, principal, interest, outstanding principal, balance, mortgage loan amount, APR, interest rate, housing price, down payment"
published: true
share: true
ads: true
---

Suppose you want to buy a $350,000 house, and you plan to get a 30-year fixed mortage (interest rate 4.87%) with a 20% down payment. What's your monthly repayment? How much of it will go towards interest and how much will go towards the principal?

Notice the mortgage amount you are borrowing is $280,000 (80% of the house price), and there're 360 monthly payments you need to make.

The calculation of the monthly payment involves 2 steps conceptually:

1. Calculate the simple monthly rate by dividing the interest rate by 12. This is because the quoted interest rate is (almost always) an annual rate (APR). 
2. The mortgage amount, monthly payment amount and monthly rate are related by the [present value formula for annuities](https://en.wikipedia.org/wiki/Annuity). Knowing any two of them, we can easily solve for the 3rd one. 

These 2 steps are carried out in the following R code block. 

{% highlight r %}
# calculate simple monthly rate
monthly_rate = 4.87 / 100 / 12

# calculate (constant) contractual monthly payment amount
#       derived from the present value formula for annuities
r = (1 + monthly_rate) ^ 360 - 1
payment = 280000 * monthly_rate * (r + 1) / r
{% endhighlight %}

So every month, you're expected to make a payment of \$1480.93 back to your lender. The interest is calculated by multiplying the outstanding principal at the beginning of the month by the monthly rate, and the reducible amount of principal is obtained by subtracting interest from the monthly payment \$1480.93. The following code block calculates the payment schedule (also called amortization schedule) for the first 12 payment months. 


{% highlight r %}
payment_months = 12

# initialize output variables
interest = principal = balance = vector("numeric", payment_months)

# calc amortization schedule
outstanding_principal = 280000
for (i in 1:payment_months) {
        intr = outstanding_principal * monthly_rate # interest to be paid
        prnp = payment - intr  # principal to be paid
        outstanding_principal = outstanding_principal - prnp # principal left
        
        interest[i]  = intr
        principal[i] = prnp
        balance[i] = outstanding_principal
}
knitr::kable(data.frame(month = 1:payment_months, interest, principal, balance),
             caption = "Payment schedule for first 12 months")
{% endhighlight %}



| month| interest| principal|  balance|
|-----:|--------:|---------:|--------:|
|     1| 1136.333|  344.6000| 279655.4|
|     2| 1134.935|  345.9985| 279309.4|
|     3| 1133.531|  347.4027| 278962.0|
|     4| 1132.121|  348.8126| 278613.2|
|     5| 1130.705|  350.2282| 278263.0|
|     6| 1129.284|  351.6495| 277911.3|
|     7| 1127.857|  353.0766| 277558.2|
|     8| 1126.424|  354.5096| 277203.7|
|     9| 1124.985|  355.9483| 276847.8|
|    10| 1123.541|  357.3928| 276490.4|
|    11| 1122.090|  358.8432| 276131.5|
|    12| 1120.634|  360.2995| 275771.2|

The R code I give above should be very comfortable to you. If you ask 10 R users to program a mortgage payment schedule calculator, 8 of them probably will give you something similar. However, if you understand the behavior of R environments and `<<-`, you can code it up differently. In the next blog post, I'll explain how environments work and code up the same calculator in a different fashion using `<<-`.

PS: I've put the above code pieces in a function for ease of use.


{% highlight r %}
amortize = function(loan_amt = 200000, term = 360, APR = 4.87/100) {
        # calculate simple monthly rate 
        monthly_rate = APR / 12
        
        # calculate (constant) contractual monthly payment amount
        #       derived from the present value formula for annuities
        #       https://en.wikipedia.org/wiki/Annuity
        r = (1 + monthly_rate) ^ term - 1
        payment = loan_amt * monthly_rate * (r + 1) / r
        
        # initialize output variables
        interest = principal = balance = vector("numeric", term)
        
        # calc amortization schedule
        outstanding_principal = loan_amt
        for (i in 1:term) {
                intr = outstanding_principal * monthly_rate
                prnp = payment - intr
                outstanding_principal = outstanding_principal - prnp
                
                interest[i]  = intr
                principal[i] = prnp
                balance[i] = outstanding_principal
        }
        
        data.frame(month = 1:term, interest, principal, balance) 
}
{% endhighlight %}

