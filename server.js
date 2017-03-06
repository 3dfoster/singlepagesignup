let http = require('http')
let fs = require('fs')

let server = http.createServer()
let page = fs.readFileSync('index.html')

server.on('request', (req, res) => {
  let userAgent = req.headers['user-agent']
  let body = []

  // Log error in console thereby allowing server to continue running if error is received
  req.on('error', () => {
    console.error(err)
    // Parse chunks of data in POST request
  }).on('data', chunk => {
    body.push(chunk)
  }).on('end', () => {
    // The body of a POST request
    body = Buffer.concat(body).toString()

    // Router
    if (req.method == 'GET' && req.url == '/') {
      // Set HTTP header information
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(page)
    }
    if (req.method == 'POST' && req.url == '/') {
      console.log('######## ISBN: ' + body + ' #########')
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.write("Thanks for your interest in our product! You will receive an email once it is finished")
    }
    
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

    res.end()
  })
}).listen(8080)

console.log(`Server started at http://localhost:${server.address().port}`)