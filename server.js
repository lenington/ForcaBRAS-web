var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var Salas = [];

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components/firebase', express.static(__dirname + '/bower_components/firebase'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/ForcaBRAS-web.html');
});

server.listen(process.env.PORT || 3000,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection', function(socket){
    io.on('connect_error', function(err) {
        // handle server error here
        console.log('Error connecting to server');
    });

    //-->DISCONNECT
    socket.on('disconnect', function(){
        //procura na lista de salas para enviar para o adversario
        for(i = 0; i<Salas.length; i++){
            if(socket.id == Salas[i].id){
                console.log("Usuário desconectado: ",Salas[i]);
                io.emit('disconnect_player', Salas[i]);
                Salas.splice(i, 1); //remove o usuario
            }
        }
    });
    //DISCONNECT<--

    socket.on('Sala 1', function(nome){
        console.log("Entrou na Sala 1: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 1'});
        console.log(Salas);

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


    socket.on('Sala 2', function(nome){
        console.log("Entrou na Sala 2: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 2'});
        console.log(Salas);

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

    socket.on('Sala 3', function(nome){
        console.log("Entrou na Sala 3: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 3'});
        console.log(Salas);

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

    socket.on('Sala 4', function(nome){
        console.log("Entrou na Sala 4: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 4'});
        console.log(Salas);

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

    socket.on('Sala 5', function(nome){
        console.log("Entrou na Sala 5: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 5'});
        console.log(Salas);

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

    socket.on('Sala 6', function(nome){
        console.log("Entrou na Sala 6: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 6'});
        console.log(Salas);

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

    socket.on('Sala 7', function(nome){
        console.log("Entrou na Sala 7: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 7'});
        console.log(Salas);

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

    socket.on('Sala 8', function(nome){
        console.log("Entrou na Sala 8: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 8'});
        console.log(Salas);

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

    socket.on('Sala 9', function(nome){
        console.log("Entrou na Sala 9: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 9'});
        console.log(Salas);

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

    socket.on('Sala 10', function(nome){
        console.log("Entrou na Sala 10: "+nome + " - ID: "+ socket.id);
        Salas.push({id: socket.id, nome: nome, sala: 'Sala 10'});
        console.log(Salas);

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

});

