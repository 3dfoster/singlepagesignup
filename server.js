let mongoose = require('mongoose')
var http = require('http')
var fs = require('fs')

var server = http.createServer()
var page = fs.readFileSync('index.html')

// Define the document schema for Mongoose
var Schema = mongoose.Schema
var emailSchema = new Schema({
  email: String
})
var Email = mongoose.model('Email', emailSchema)

/*
Our server object is an EventEmitter
When it receives an HTTP request it emits a 'request' event
When this event occurs we perform the following code
*/
server.on('request', (req, res) => {
  var userAgent = req.headers['user-agent']
  var body = []

  // Logging errors to console allows our server to continue running if an error is received
  req.on('error', () => {
    console.error(err)
    // Parse chunks of data in a POST request
  }).on('data', chunk => {
    body.push(chunk)
  }).on('end', () => {
    // The body of a POST request
    body = Buffer.concat(body).toString()

    // GET Router
    if (req.method == 'GET') {
      switch (req.url) {
        case '/':
          // Set HTTP header information
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(page)
          break

        case '/emails':
          res.end("<h1>This page is coming soon...</h1>")
          break

        default:
          res.writeHead(404, { 'Content-Type': 'text/html' })
          res.end("<h1>404'd!</h1><p>The page you're requesting doesn't exist!</p>")
          break
      }
    }

    // POST Router
    if (req.method == 'POST') {
      switch (req.url) {
        case '/':
          // Create a new mongoose model with the email our user submitted 
          var email = new Email({ email: body })

          // Connect to MongoDB
          mongoose.connect('mongodb://localhost/test')
          var db = mongoose.connection
          db.on('error', console.error.bind(console, 'connection error:'))
          db.once('open', function () {
            // We've successfully established a conection to the database
            console.log("Connection to Mongo database established")

            // Store our user's email in the database
            email.save( (err, email) => {
              if (err) {
                return console.error(err)
                res.end("There was an error connecting to our database :(")
              }
              res.writeHead(200, { 'Content-Type': 'text/plain' })
              res.end("Thanks for your interest in our product! You will receive an email once it is finished")
            })
          })
          break
      }
    }

              // Connect to MongoDB
          // mongoose.connect('mongodb://localhost/test')
          // var db = mongoose.connection
          // db.on('error', console.error.bind(console, 'connection error:'))
          // db.once('open', function () {
          //   Email.find((err, emails) => {
          //     if (err) return console.error(err)

          //     res.end(emails)
          //   })
          // })

    // if (req.method == 'POST' && req.url == '/') {
    //   // Create a new mongoose model with the email our user submitted 
    //   var email = new Email({ email: body })

    //   // Connect to MongoDB
    //   mongoose.connect('mongodb://localhost/test')
    //   var db = mongoose.connection
    //   db.on('error', console.error.bind(console, 'connection error:'))
    //   db.once('open', function() {
    //     // We've successfully established a conection to the database
    //     console.log("Connection to Mongo database established")

    //     // Store our user's email in the database
    //     email.save()
    //     res.writeHead(200, { 'Content-Type': 'text/plain' })
    //     res.end("Thanks for your interest in our product! You will receive an email once it is finished")
    //   })
    // }
    
    // Error handling
    res.on('error', err => {
      console.error(err)
    })

    // Diagnostics. Later I should send this information to a log file
    console.log('===================================')
    console.log('Path: \t\t' + req.url)
    console.log('HTTP method: \t' + req.method)
    console.log('User Agent: \t' + userAgent)
    console.log('Request Body: \t' + body)
    console.log('===================================')

  })
}).listen(8080)

console.log(`Server started at http://localhost:${server.address().port}`)