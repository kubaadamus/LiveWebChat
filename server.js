var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 80});
var powitanie = "Siemano";
console.log("Serwer Stoi!");
var Servo;
var CLIENTS=[];
var mesydz;


wss.on('connection', function(ws) 
{
 console.log('client connected, wysylam powitanie');
 ws.send(powitanie);
 CLIENTS.push(ws);
 console.log("wyslalem" + powitanie);
 console.log("Clients:" + CLIENTS)
 WypiszClientow();

    ws.on('message', function(message) 
    {
      console.log(message);
      mesydz = message;
      if(message == "test")
      {
        ws.send("Test ogarnia :D");
      }
      ws.send(mesydz);
      Servo = message;
      console.log("Serwo:" + Servo);
      console.log("broadcastuję" + Servo);
      BroadCast();
    });
});

function WypiszClientow(){
  CLIENTS.forEach(function(e){
    console.log(e);
  });
}

function BroadCast(){
  CLIENTS.forEach(function(e){
    if(e.readyState === e.OPEN)
    {
      e.send(Servo);


    }

  });
}