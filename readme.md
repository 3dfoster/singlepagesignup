Singlepage Signup
=================

Singlepage Signup is a simple nodejs app that provides users with a clean, lightweight HTML5 interface intended to provide information on an upcoming project and how they can get in contact with the developers. A live version of the site can be found 	[here](http://trimworks.io)

Installation
------------

1. Clone into repository
2. `npm install`
3. In app folder `touch response_log`
4. Success

Technology
----------

The app uses the Express framework in nodejs on the server side and an HTML5 page with AJAX on the client side.

Features
--------

- Ultralightweight: the minimal amount of CSS and JS used on the site are included in the HTML file with a low low file size of 7.80 kb
- Responsive Design: the HTML5 page looks just as good on an iPhone 5 as it does on a 1080p screen
- Spam resistant: When a visitor submits their email the server first checks for matches in the database, and returns a personalized response if there's already an entry
- Easy to copy emails: the emails are stored in a text file separated by newlines, so they're easy to copy and paste into your favorite email client

To-do
-----

- Remove REMOVEJSONQUOTATIONS function
- modify function to create response_log file if none already exists
- Re-design site so it's not talking about trimworks but instead talking about the app itself