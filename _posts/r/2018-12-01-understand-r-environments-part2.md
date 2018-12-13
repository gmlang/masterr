---
layout: post
title: "Understand R Environments - Part2"
date: 2018-12-01
comments: true
categories: r
keywords: "R, environments, lexical scoping, lexing, evaluate an expression in an environment, frame, environment frame, parent environment, parent.env(), enclosing environment, enclosure, <<-, assignment operator in R"
published: true
share: true
ads: true
---

This is the second article of the series on how environments work in R. Recall that in the [first article](https://masterr.org/r/understand-r-environments-part1/), we demonstrated how environment and evaluation work in R and we learned the following:

* the default current environment (or workspace) is called the global env.
* when you define a function in the current environment (i.e., this is another way of saying opening Rstudio, making a funtion and sending it to Console), you effectively put that function inside the global env. 
* when you call that function in the global env, a new environment is created, binding the function arguments to the values supplied. This new environment is called the environment associated with the function, and is inserted before the global env on the search path. In other words, its parent (environment) is the global env.
* when the body of that function is evaluated, a search is made, first in that newly created environment associated with the function, and next in the global env. 
* in general, when you define a function `f` inside another function `h`, you effectively put `f` inside the environment associated with `h`, which is NOT the calling environment of `h`, but the newly created environment that binds the arguments of `h` to values supplied. When the body of `f` is evaluated, R searches
for values first in the environment associated with `f`, and then in the environment associated with `h`, and then in the global env (assuming `h` is defined in the global env).

## The assignment operators in R

There're two assignment operators in R: `<-` and `<<-`. While `<-` changes the values of objects in the immediate environment searched, `<<-` changes the values of objects first encountered, starting with the parent environment of the immediate environment and traversing upwards through the parent environments until the global environment is reached. Consider the following example. The function `h` uses `<-` to only set its local y to 0. The function `to_zero` uses `<<-` to
set the `y` declared in the global env to 0. If no `y` found in the global env, it will create it in the global env and bind its value to 0.


{% highlight r %}
# define functions
h = function(y) y <- 0
to_zero = function(y) y <<- 0

# initialize y in global env
y = 10

# h doesn't change the global y 
h(y)
print(y)
{% endhighlight %}



{% highlight text %}
## [1] 10
{% endhighlight %}



{% highlight r %}
# to_zero sets the global y to 0
to_zero(y)
print(y)
{% endhighlight %}



{% highlight text %}
## [1] 0
{% endhighlight %}

## State maintanence

The combination of `<<-` and R evaluation model allows functions to remember variable values between funtion calls. For example, consider the following function `student`, which appends a 3-digit number to a given student name. It takes a string `name` and returns a list of two functions. Because both functions are defined inside the `student` function, more precisely, they are defined inside the environment associated with `student`, and because `name` will also be created in the same environment when `student` is called, both functions of the returned list will have access to the value of `name`. Notice how I use `<<-` to update
`name`. 


{% highlight r %}
student = function(name) {
        list(print_name = function() print(name),
             add_num = function() {
                     num = ceiling(runif(1, min = 100, max = 999))
                     name <<- paste0(name, num)
                     }
             )
}
{% endhighlight %}

We can now create name cards for different students by calling `student`. Notice Joe's name card is maintained separately from Jean's. This is what we wanted. 

{% highlight r %}
set.seed(2)

# create badge for joe
joe = student("Joe")
joe$add_num()
joe$print_name()
{% endhighlight %}



{% highlight text %}
## [1] "Joe267"
{% endhighlight %}



{% highlight r %}
# create badge for jean
jean = student("Jean")
jean$add_num()
jean$print_name()
{% endhighlight %}



{% highlight text %}
## [1] "Jean732"
{% endhighlight %}

If you want to see a bigger example of `<<-`, click [here](https://masterr.org/r/understand-r-environments-part3/) for the final article, where I used `<<-` to code up the [mortgage payment calculator](https://masterr.org/r/calculate-mortgage-payment-schedule/) in a different fashion. 
