#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app.js";
import debug from "debug";
import http from "http";
import keys from "../config/keys.js";


const { port } = keys.host;

/**
 * Get port from environment and store in Express.
 */

const normalizedPort = normalizePort(port || "5001");
app.set("port", normalizedPort);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(normalizedPort);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const normalizedPort = parseInt(val, 10);

  if (isNaN(normalizedPort)) {
    // named pipe
    return val;
  }

  if (normalizedPort >= 0) {
    // port number
    return normalizedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof normalizedPort === "string" ? "Pipe " + normalizedPort : "Port " + normalizedPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
