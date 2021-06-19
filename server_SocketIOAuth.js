const app = require('express')();
const http = require('http').createServer(app);
var io = require('socket.io').listen(http);

const checkAuthToken=require('./jwksVerify');

//https://github.com/facundoolano/socketio-auth
//The client should send an authentication event right after connecting, including whatever credentials 
//are needed by the server to identify the user (i.e. user/password, auth token, etc.). The authenticate 
//function receives those same credentials in 'data', and the actual 'socket' in case header information 
//like the origin domain is important, and uses them to authenticate.

require('socketio-auth')(io, {
  authenticate: authenticate,
  postAuthenticate: postAuthenticate,
  disconnect: disconnect,
  timeout: 1000
});

//authenticate:  It's a function that takes the data sent by the client and calls 
//a callback indicating if authentication was successfull:

function authenticate(socket, data, callback) {
    console.log(data)
    checkAuthToken.verifyAuth0Token(data.token).then(authres => {
       // console.log('authres'+authres)
        if (authres == 'SUCCESS') {
            return callback(null, data.token);
        }
        else
        {
            return callback(new Error("User not authorized"));
        }
    });
     // return callback(null, '');
    
  }

  //postAuthenticate: a function to be called after the client is authenticated. It's useful to keep track of the 
  //user associated with a client socket:
  function postAuthenticate(socket, data) {
    console.log("PostAuthenticate is Executed");
  
  }

  function disconnect(socket) {
    console.log("Disconnect:"+socket.id + ' disconnected');
  }

http.listen(process.env.PORT||3000, () =>
 {
    console.log('listening on *:3000');
});