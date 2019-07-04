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

server.listen(process.env.PORT || 3000,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection', function(socket){
    //console.log('a user connected ');
    
    socket.on('disconnect', function(){
        //console.log('user disconnected ');
    });

    socket.on('sala', function(salas){
        Salas = [];
        Salas = salas;
        console.log(Salas);
    });

    socket.on('Sala 1', function(nome){
        console.log("Entrou na Sala 1: "+nome + " - ID: "+ socket.id);

        //-->ATUALIZA SALA PARA O PLAYER 1:
        socket.on('atualizar_sala', function(user){
            io.emit('sala_atualizada', user);
        });
        //SALA PARA PLAYER 1<--

        //-->TRABALHANDO COM BOTÕES/LETRAS:
        socket.on('click',function(user){
            console.log('Letra sendo enviada por '+user);

            io.emit('get_letra', user);
        });

        socket.on('send_letra',function(letra){
            console.log("Letra recebida: "+letra);
            io.emit('receive_letra', letra);
        });
        //BOTÕES/LETRAS<--

        //-->TRABALHANDO COM PALAVRAS:
        socket.on('palavras',function(user){
            console.log(user+" solicitando palavras");
            io.emit('get_palavras', user); 
        });

        socket.on('send_palavras',function(palavras){
            console.log("Enviando palavras...");
            io.emit('receive_palavras', palavras); //enviando palavras para o player 2
        });
        //PALAVRAS<--
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


    socket.on('pesquisarSala', function(sala){

    });

});

