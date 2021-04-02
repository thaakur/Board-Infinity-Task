Live Project URL : https://todo-bi.herokuapp.com/

In the following repository I created a REST API in Nodejs with MongoDb as database for creating tasks with a duration (in minutes). The tricky part was, once a data is created with a duration, it should be automatically deleted after the assigned duration. That means if I create a task called "Interview Assignment" with duration set to 30 mins at 1:00pm on 1 January, the record in the database will be automatically removed at 1:30pm on 1st January.

Now to solve this tricky part I have used CRON, The actions of cron are driven by a crontab (cron table) file, a configuration file that contains instructions to the cron daemon. The node-cron module allows you to schedule tasks in Node using the full crontab syntax.

A crontab syntax looks like this:

 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
Allowed cron values include the following.

Field			Value
second			0–59
minute			0–59
hour			0–23
day of the month	1–31
month			1–12 (or names)
day of the week	0–7 	(or names, 0 or 7 are sunday)
npm install node-cron

Requirements (Libraries, Plugins and Applications)
1) "express" - Express is the most popular choice when it comes to building web applications with Nodejs. However, when saying web applications with Nodejs, it's often not for anything visible in the browser (excluding server-side rendering of a frontend application). Instead, Express, a web application framework for Nodejs, enables you to build server applications in Nodejs. As a backend application, it is the glue between your frontend application and a potential database or other data sources i.e. the REST API

2) "node-cron" - The node-cron module is tiny task scheduler in pure JavaScript for node.js

3) "mongoose" - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

4) "moment" - A JavaScript date library for parsing, validating, manipulating, and formatting dates.

5) "dotenv" - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code.

Then I connected to the database also what I did was using the dotenv I have hidden the admin name and password for the database to make it a little secure. Then there is a different file to create Schema that defines how the tasks would look like , like this one has a Task name, Task description, Creator, Duration, createdAt. Made a simple frontend and in that whenever you click 'Add Task' button, your data will get stored for the amount of duration set to and will appear in the below table then disappear after the given duration because of CRON scheduling.

There will be two endpoints:
- /add - takes data from front-end and created expireAt date UTC date by adding Duration to current dateTime and insert into Database.
- /list - returns all the task and we populate the data on frontend.

The desired outcome is there the assigned task get expired after a given amount of time but if time right now is 10:22:07 then it will be counted as ceil of seconds and will make the minutes as 10:23:00, also if you want that the task should be permanent that is on daily basis just hit 0 as the duration. 

To make it work on your local system
If you're not using the live project and downloading the repository and unziping it. 
open command prompt/terminal and write these commands for the project to work

npm init
npm install mongoose dotenv express moment node-cron
(you can download multiple at once just by giving a space)

npm start (run the server and now go to "localhost:3000" in your browser)

in case you want to manually verify the database to see if the data is available there or not you will have to install POSTMAN and MongoDBCompass(only if you wish to link and work on your own database)  
With the help of Postman we are making a post request to localhost:3000/ with JSON body containing taskname, taskdescription, creator and duration.
We can see the data being stored in the database which will be deleted soon as per given duration.

(in case this is your first time deploying rest api on Heroku make sure you make your database accessible from anywhere that is to say set it to 0.0.0.0/0 and also don’t simply write app.listen(3000) your app won’t work on Heroku if written like this, also package.json will have few changes in it, see my app.js and package.json files for the solution of such problems.) 
