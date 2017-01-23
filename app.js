var debug = require('debug')('www:app')
var path = require('path')
var express = require('express')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var routes = require('./routes/index')
var users = require('./routes/users')

var app = express()
app.set('port', process.env.PORT)
var server = require('http').Server(app)
var io = require('socket.io')(server)

// io.use((socket, next) => {
//   // if (socket.request.headers.cookie) return next()
//   // next(new Error('Authentication error'))
//   debug('Incomming message')
//   next()
// })

// soket.io is ready
io.on('connection', (socket) => {
  socket.emit('ready', { msg: 'Server is listening' })

  // when client is ready
  socket.on('ready', (data) => {
    debug(data.msg)
  })

  socket.on('status', (data) => {
    debug(data)

    // Send the received data to every connected client in a message called "chat"
    // io.sockets.emit('status', { status: 'Server: ' + new Date() })

    // Send only to the client who oppened the connection
    socket.emit('status', { status: 'Server: ' + new Date() })
  })

  setInterval(updates, 3000)

  function updates () {
    var rand = Math.floor((Math.random() * 1000) + 1)
    return socket.emit('changes', {
      msg: `Record user:${rand} has updated`,
      time: new Date(),
      entity: {
        id: 1234
      },
      type: 'user'
    })
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// used to send real time responses via socket.io
app.use((req, res, next) => {
  res.io = io
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', routes)
app.use('/users', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' && err || {}
  })
})

module.exports = {app: app, server: server}
