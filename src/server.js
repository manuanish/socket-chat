// server.js


// imports
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const nodeCleanup = require('node-cleanup');


// set static files
app.use(express.static('src/public'));

fs.writeFileSync(path.join(__dirname, './server.bon5r'), "\{ \"online\" : \"true\" \}");


// room variables
var clientCount = 0;
var roomPassword = JSON.parse(fs.readFileSync(path.join(__dirname, './server-data.json')))['room-password'];
var roomName = JSON.parse(fs.readFileSync(path.join(__dirname, './server-data.json')))['room-name'];
var isOnline = JSON.parse(fs.readFileSync(path.join(__dirname, './server.bon5r')))['online'];
// console.log(roomPassword);
// console.log(roomName);
// console.log(isOnline);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

http.listen(port, () => {
  console.log(`Bon5R server running at http://localhost:${port}/`);
});

io.on("connection", (socket) => {
  socket.on("request_password", (socketID) => {
    io.to(socket.id).emit("return_password", roomPassword);
  });

  socket.on("request_room_name", (socketID) => {
    io.to(socket.id).emit("return_room_name", roomName);
  });

  socket.on('chat_message', (usr_name, msg, msg_time) => {
    socket.broadcast.emit('chat_message', usr_name, msg, msg_time);
  });

  socket.on("client_count_update", (client_count) => {
    document.getElementById('client_count').textContent = client_count;
  });
});

io.on("connection", (socket) => {
  socket.on('user_joined_room', (usr_name) => {
    socket.broadcast.emit('add_user_to_list', usr_name, socket.id);
    console.log("ok");
  });
});

nodeCleanup((exitCode, signal) => {
  fs.writeFileSync(path.join(__dirname, './server.bon5r'), "\{ \"online\" : \"false\" \}");
});
