const io =require("socket.io-client");


let socket=io.connect("http://localhost:3000")



socket.on('connect', function(){
  console.log('Connection for Socket.id:',socket.id)
  socket.emit('authenticate', {token: 'Bearer '});//Pass Token Here
});

socket.on('authenticated', function(data){
  console.log(data);
  //console.log(typeof(data));
});

 //let socket=io.connect("http://localhost:3000")
 socket.on("welcome",(msg)=>{
 console.log("socket id:"+socket.id)
 console.log("Received in Client1:"+msg.msg);
 //socket.emit('join', {"email": "user@example.com"});
 });

 socket.on("validateid", function(data) {
    //console.log("client1:"+socket.id)
    console.log(data);
    console.log(typeof(data));
  });

  
  socket.on('disconnect',(data)=>{
    console.log(data)
  });


