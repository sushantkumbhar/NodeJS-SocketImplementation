//import module
const app = require('express')();
const express = require('express');
const http = require('http').createServer(app);

//For Checking the Oauth Token
const checkAuthToken = require('./jwksVerify');
const helperfunc = require('./helperFunctions')
//const http1 = require('http').createServer(app);


var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//Adding Resource Base Path as /websocket
app.use('/websocket', router);

let io = require('socket.io')(http, {
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});
const socketioJwt = require('socketio-jwt');
const { resolve } = require('path');


router.use((request, response, next) => {
    console.log('Received Request');
    next();//passes on the request to the next middleware function in the stack by calling the next() function.
})


io.on('connection', (socket) => {
    //console.log("hi");
    socket.auth = false;
    //After socket connection, it will wait on 'authenticate', if client doesn't emit on 
    //'authenticate', then it will close the socket

    socket.on('authenticate', (data) => {
        token_str = String(data.token)
        //console.log("token_str");
        //console.log(token_str.indexOf("Bearer ") + 1);
        //console.log('Authenticating for '+token_str.slice(7));
        console.log('Calling Verify Auth Token...');
        checkAuthToken.verifyAuth0Token(token_str.slice(7)).then(authres => {
            //console.log('authres'+authres)
            if (authres == 'SUCCESS') {

                console.log("Authenticated socket:", socket.id);
                io.to(socket.id).emit('authenticated', helperfunc.getStandardResponse(helperfunc.getMeta('AUTH_SUCCESS', 'User is Authenticated')));
                socket.auth = true;
            }
            else {
                io.to(socket.id).emit('authenticated', helperfunc.getStandardResponse(helperfunc.getMeta('AUTH_FAILED', 'User is not Authenticated')));
                console.log('User is not authenticated');
                //socket.disconnect('unauthorized');
            }
        });
        //console.log("log")
    })

    //setTimeouts are in io.on scope, those will get executed once it goes beyond the time e.g. 2000ms 
    //irespective of any other function call

    //if socket make connection and didnt emit 'authenticate' disconnect after 2 sec thrn
    //disconnect
    setTimeout(() => {
        if (!socket.auth) {
            console.log("Disconnecting socket as no authentication is provided for socket:", socket.id);
            socket.disconnect('unauthorized');
        }
    }, 10000);

    //Below is to disconnect the socket after specific interval(1hr) so that many sockets will 
    //not be open for longest time
    setTimeout(() => {
        console.log("Disconnecting socket as maximum time limit has reached for socket:", socket.id);
        socket.disconnect('limit reached');
    }, 3600000);
})

//Receive Events for Validate ID
router.route('/validateid/:id/').post((req, res) => {
    try {
        console.log('Received validateShoppingSessionID request for Socket ID: ' + req.params.id + ' and Store:' + req.body.storeName);
        var statusCode = req.body.statusCode
        var message = req.body.message
        io.to(req.params.id).emit('validateShoppingSessionID', (helperfunc.getStandardResponse(helperfunc.getMeta(statusCode, message))));
        res.send('SUCCESS');
    }
    catch (err) {
        console.log(err);
        res.send('ERROR')
    }
});





router.route('/getSocketIDs').get((req, res) => {
    io.clients((err, clients) => {
        if (err) {
            res.status(500).send('ERROR');
        }
        else res.send(JSON.stringify({ socketIds: clients }))
    })

});



function validateSocketID(socket_ID) {

    console.log(io.sockets.connected[socket_ID]);
    if (io.sockets.connected[socket_ID] != undefined) {
        return 'PRESENT'
    }
    else {
        return 'ABSENT'
    }

}

//Below service waits till delayproc responds (2 Seconds) then only send response to client who is calling healthcheck sevice

router.route('/healthcheck').get(async (req, res) => {
    const respos = await delayproc();
    res.send(respos)

})

async function delayproc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('hello')
            resolve("Server is Live")
        }, 2000);
    })

}

http.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});