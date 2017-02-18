---
layout: post
title: "R and MySQL"
date: 2017-02-18
comments: true
categories: r
keywords: "R, MySQL, RMySQL, access MySQL database using R"
published: true
share: true
ads: true
---

Sometimes you need to talk to a database using R. I've put together a R script
that shows you how to query data from a MySQL database and insert data back.


{% highlight r %}
library(RMySQL)

# loads the MySQL driver
drv = dbDriver("MySQL") 

# create a connection to the database
con = dbConnect(drv, dbname = "your database name", 
                host = "where your DB is hosted", 
                port = 5432, # number, change to your port
                user="your username", password="your password")

# list all tables in the database
dbListTables(con)

# list all fileds in a particular table
dbListFields(con, "table")

# remove a table
dbRemoveTable(con, "table")

# delete all rows from a table
dbGetQuery(con, "DELETE FROM table")

# fetch all records and fields from a table
res = dbSendQuery(con, "SELECT * FROM table")
df = dbFetch(res) # returns a data frame
dbClearResult(res) # frees all resources associated with a result set

# create a table 'mydata' of 2 fields: name and number of type text and double respectively
dbGetQuery(con, "CREATE TABLE mydata (name text, number double)")  

# insert a row of data into the table mydata
dbGetQuery(con, "INSERT INTO mydata VALUES('fred',7)") 

# you can also change the order of the fields when inserting 
dbGetQuery(con, "INSERT INTO mydata (number, name) VALUES(7,'fred')")

# you can also add multiple records at one time
dbGetQuery(con, "INSERT INTO mydata VALUES('tim',12),('sue',9)")

# close the connection and unload the driver
dbDisconnect(con)
dbUnloadDriver(drv)
{% endhighlight %}

