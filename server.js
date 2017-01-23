/**
 * Module dependencies.
 */
var debug = require('debug')('www:server')
var App = require('./app')
var app = App.app

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = App.server

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = 'Pipe ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      debug(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'http://localhost:' + addr.port
  debug('Listening on ' + bind)
}
