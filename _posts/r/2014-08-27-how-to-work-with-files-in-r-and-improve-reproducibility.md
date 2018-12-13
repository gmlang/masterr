---
layout: post
title: "How to Work with Files in R and Improve Reproducibility"
date: 2014-08-27
comments: true
categories: r
keywords: "R, get path in R, set path in R, list.files in R, dir.create, file.path, directory management"
published: true
share: true
ads: true
---

When I first started learning R, I was taught to manually set or change the working directory[^1]. I don't like pointing and clicking, so I quickly learned to use `setwd()` to do the same thing. My work flow was: create a project folder → get its full path manually → pass it to `setwd()`. This was better but still didn't completely eliminate clicking, copying and pasting. Later, someone showed me how to use `file.path()`, and I liked it immediately. It works like `paste()` but faster. Combined with `Sys.getenv()`, `list.files()` and `dir.create()`, it allows me to eliminate manual operations completely. Here's what I mean, assuming under the home directory, you have a folder called "Projects" where you store all your R projects, open R studio and follow these steps to create a new project folder called "test."

Step 1. Get the path to your home directory and print all its subfolders. Look for "Projects" to confirm it's there.

{% highlight r %}
home.path = Sys.getenv("HOME")
list.files(home.path)
{% endhighlight %}

Step 2. Get the path to the "Projects" directory and create a folder called "test" inside "Projects."

{% highlight r %}
proj_path = file.path(home.path, "Projects")
dir.create(file.path(proj_path, "test"), showWarnings = FALSE)
{% endhighlight %}

Step 3. Print all subfolders under "Project" and look for "test" to confirm it's there. Get the path to the "test" directory.

{% highlight r %}
list.files(proj_path)
test_path = file.path(proj_path, "test")
{% endhighlight %}

You now have a new project folder called "test." Download or place input data files into "test." Say one of the input files is called "input.csv," you can use the following code to read it into R.

{% highlight r %}
input_path = file.path(test_path, "input.csv")
input = read.csv(input_path)
{% endhighlight %}

Notice that we never changed the working directory during these steps. In fact, if you run `getwd()` now, you'll see it returns the default working directory. Indeed, we can always work in the default working directory and there's no need to change it. We just need to get the input data from where they are and save the output data to where we want them to be. Four functions allow us to do that, namely, `Sys.getenv()`, `file.path()`, `list.files()`, and `dir.create()`. Use them and they'll make your work flow neater. 

[^1]: A working directory is a folder where your current R session has access to. If you put a data file in your working directory, you only need to tell R its name to read it into R. You don't have to tell R its full path. Similarly, if you output a file with just a filename and without specifying a full path, R will save it in your working directory. To see your default working directory, open a new R session and run the command `getwd()`.
