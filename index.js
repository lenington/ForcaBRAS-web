var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var clientes = {};

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/bower_components/firebase', express.static(__dirname + '/bower_components/firebase'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('join', function(nome){
        console.log("Joined: " + nome);
        clientes[socket.id] = nome;
    });
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('click',function(letra){
        console.log('Letra Recebida '+letra);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});