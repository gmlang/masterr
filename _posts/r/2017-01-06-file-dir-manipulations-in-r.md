---
layout: post
title: "File and Dir Manipulations in R"
date: 2017-01-06
comments: true
categories: r
keywords: "R, cmd, file manipulation, dir manipulation, use R to do low level file and folder manipulations"
published: true
share: true
ads: true
---

If you've created a file or copied a folder of files using the command line, do you know that you can do the same thing within R? If you never touched the terminal in your life, well, R allows you to move around folders and create files without using your mouse to click. This becomes very important when you write pipelines chained by R scripts as you probably want to automatically save and read files. Below is a collection of such R commands.

{% highlight r %}
# home directory and working directory
(home_path = Sys.getenv("HOME"))
getwd()
setwd(file.path(home_path, "Projects"))
getwd()
setwd(home_path)
getwd()

# list all files and sub-folders in the working directory
list.files()

# list all files and sub-folders in another directory
dir = file.path(Sys.getenv("HOME"), "Projects")
list.files(dir)

# create a new dir
newdir = file.path(Sys.getenv("HOME"), "demo-folder")
dir.create(newdir, showWarnings = FALSE)

# create a new file
file1 = file.path(newdir, "code.R")
file.create(file1)

# creat a new file and fill it with some text
file2 = file.path(newdir, "cat-demo.md")
cat("This shows how the cat function works.", file = file2)

# use append = T to add text to exsiting file
cat("\nEverybody is crazy about deep learning these days!!!", file = file2, 
    append = T)

# copy a file
file.copy(from = file2, to = file.path(newdir, "cat-demo-copy.md"))
list.files(newdir)

# rename a file
(copied_file = file.path(newdir, "cat-demo-copy.md"))
file.rename(from = copied_file, to = file.path(newdir, "cat-demo-cp.md"))
list.files(newdir)

# move a file from one directory to another
file1
file.rename(from = file1, to = file.path(home_path, "code.R"))
list.files(newdir)
list.files(home_path)
"code.R" %in% list.files(home_path)

# delete files 
unlink(file.path(home_path, "code.R"))
list.files(home_path)
"code.R" %in% list.files(home_path)

# delete directories
list.files(newdir)
unlink(newdir, recursive=T)
list.files(newdir)
{% endhighlight %}

