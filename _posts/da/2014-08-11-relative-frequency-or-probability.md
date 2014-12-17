---
layout: post
title: "Relative Frequency or Probability"
date: 2014-08-11 08:38:32 -0400
comments: true
categories: da
keywords: "relative frequency, probability"
published: true
share: true
ads: true

---
Consider these two numbers: 5 out of 100 and 5%. They are the same, just expressed differently. The first number is expressed as a relative frequency and the second number is expressed as a probability in percentage format. It turns out people perceive them differently when putting them into a context. Consider the following two statements about the chance that a mental patient commits an act of violence within 6 months after discharge[^1]:

1. 20 criminals out of 100 similar to the patient are estimated to be violent to others.
2. it is estimated that similar patients has a 20% chance of being violent to others.

Studies show experienced psychiatrists judge the patient as more dangerous when presented with statement 1 than when presented with statement 2.

Consider another set of statements about the riskiness of a disease[^2]:

1. a disease that kills 1,286 of 10,000 people
2. a disease that kills 24.14 of 100 people

One study showed that disease 1 was rated as riskier than disease 2, but if we convert the relative frequencies to probabilities, we can clearly see disease 2 is riskier since it kills 24.14% while disease 1 only kills 12.86%. 

In fact, not only we are more perceptive to relative frequencies, we also react differently to the same probability when presented differently. For example, do you prefer a yogurt that's “95% fat free” or “5% fat”? Suppose you're about to undergo a surgery and the doctor asks you to choose between two procedures: procedure A has a 40% chance of success and procedure B has a 60% chance of failure. Which procedure will you choose?

As a data scientist, I pay a lot of attention at creating non-misleading report and visualizations. A good rule of thumb is to avoid using both frequencies and probabilities. I prefer to use probabilities because our brains are not good at handling them and hence will have to really think about them instead of making snap judgements, and this, by and large, leads to less errors.

[^1]: this example is taken from the book <a href="http://www.amazon.com/gp/product/1578644283/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1578644283&linkCode=as2&tag=cabaceo-20&linkId=ULXBDUV6HFDELDOZ">Seeking Wisdom: From Darwin to Munger</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=cabaceo-20&l=as2&o=1&a=1578644283" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[^2]: this example is taken from the book <a href="http://www.amazon.com/gp/product/1578644283/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1578644283&linkCode=as2&tag=cabaceo-20&linkId=ULXBDUV6HFDELDOZ">Seeking Wisdom: From Darwin to Munger</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=cabaceo-20&l=as2&o=1&a=1578644283" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
