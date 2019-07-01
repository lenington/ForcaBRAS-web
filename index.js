var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var Salas = {};
var clientes = {};

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components/firebase', express.static(__dirname + '/bower_components/firebase'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('sala', function(nome){
        console.log("Sala criada: " + nome[0] + ", Jogador: " + nome[1]);
        clientes[socket.id] = nome[1];
        salvar_salas(nome[0], socket.id);
        
    });
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('click',function(letra){
        console.log('Letra Recebida '+letra);
    });

    

});

function salvar_salas(sala, id){
    Salas[id] = sala;
    console.log("Sala criada: " + sala + ", Jogador: " + id);
};

http.listen(3000, function(){
    console.log('listening on *:3000');
});