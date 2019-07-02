var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//var Salas = [{sala:'Sala 1', size: 1},{sala:'Sala 2', size: 1},{sala:'Sala 3', size: 1},
//{sala:'Sala 4', size: 1},{sala:'Sala 5', size: 1},
//{sala:'Sala 6', size: 1},{sala:'Sala 7', size: 1},{sala:'Sala 8', size: 1},
//{sala:'Sala 9', size: 1},{sala:'Sala 10', size: 1}]; //array de salas
var clientes = {};
var Salas = [];

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components/firebase', express.static(__dirname + '/bower_components/firebase'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('sala', function(salas){
        Salas = [];
        Salas = salas;
        console.log(Salas);
    });

    socket.on('Sala 1', function(){
        console.log("Entrou na Sala 1");
    });
    socket.on('Sala 2', function(){
        console.log("Entrou na Sala 2");
    });
    socket.on('Sala 3', function(){
        console.log("Entrou na Sala 3");
    });
    socket.on('Sala 4', function(){
        console.log("Entrou na Sala 4");
    });
    socket.on('Sala 5', function(){
        console.log("Entrou na Sala 5");
    });
    socket.on('Sala 6', function(){
        console.log("Entrou na Sala 6");
    });
    socket.on('Sala 7', function(){
        console.log("Entrou na Sala 7");
    });
    socket.on('Sala 8', function(){
        console.log("Entrou na Sala 8");
    });
    socket.on('Sala 9', function(){
        console.log("Entrou na Sala 9");
    });
    socket.on('Sala 10', function(){
        console.log("Entrou na Sala 10");
    });

    socket.on('click',function(letra){
        console.log('Letra Recebida '+letra);
    });

    socket.on('pesquisarSala', function(sala){

    });

});


server.listen(process.env.PORT || 3000,function(){
    console.log('Listening on '+server.address().port);
});