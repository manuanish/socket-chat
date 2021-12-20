// server.js


// imports
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');


// set static files
app.use(express.static('src/public'));


// room variables
var clientCount = 0;
var roomPassword = "room1234";
var roomName = "Manu's Room";
var userList = {

}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

http.listen(port, () => {
  console.log(`Bon5R server running at http://localhost:${port}/`);
});

io.on("connection", (socket) => {
  clientCount++;
  socket.emit('client_count_update', clientCount);

  socket.on('disconnect', () => {
    clientCount--;
    socket.emit('client_count_update', clientCount);
  });

  socket.on("decrease_client_count", () => {
    clientCount--;
    socket.emit('client_count_update', clientCount);
  });
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
});

io.on("connection", (socket) => {
  socket.on('user_joined_room', (usr_name) => {
    socket.broadcast.emit('add_user_to_list', usr_name, socket.id);
    console.log("ok");
  });
});
