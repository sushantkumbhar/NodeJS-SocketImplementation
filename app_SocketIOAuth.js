
const io =require("socket.io-client");
var socket = io.connect('http://localhost:3000');
socket.on('connect', function(){
  console.log('Socket_id:'+socket.id)
  socket.emit('authentication', {token: ""});
  socket.on('authenticated', function() {
    console.log('User is Authenticated')
  });
});

socket.on('unauthorized', function(err){
  console.log("There was an error with the authentication:", err.message);
});