const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const net = require('net')
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

const users = {}

io.on('connection', (socket) => {
  socket.on('new-user', (name) => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', message)
  })
})

const client = new net.Socket()

client.connect(9999, 'localhost', () => {
  console.log('Connected to server')

  // Send data to the server
  let cirrus = {
    type: 'connect',
    address: 'localhost:8080',
    port: 8080,
    // ip: 'some-user-ip-address',
    playerConnected: false,
    numConnectedClients: 0,
    connected: true,
    ready: false,
    dedicatedServer: 'id-aws-bbb',
  }
  const jsonString = JSON.stringify(cirrus)
  client.write(jsonString)
})

client.on('data', (data) => {
  console.log(`Received data from server: ${data}`)
})

client.on('close', () => {
  console.log('Disconnected from server')
})

client.on('error', () => {
  console.log('Disconnected from server')
})

server.listen(3000)
