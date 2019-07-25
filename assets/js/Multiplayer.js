ForcaBRAS.Multiplayer = function (game) {
	
};

var Client = {};
Client.socket = io.connect(); //conexão do cliente e servidor da aplicação

ForcaBRAS.Multiplayer.prototype = {

	create: function () {
        this.add.image(0, 0, 'multiplayer');

        //entrar em uma sala ja existente
		this.createButton('entrar', 500, 250, 
        function(){
            var nome = prompt("Insira seu nome", "");
            localStorage.setItem("jogador_nome", nome);
            if(nome == null || nome == ""){
                this.state.start('Multiplayer'); //retorna para a scene
            } else {
                //var tela = this.pegarSala(nome);
                this.readBD();
                this.state.start("TelaNivel"); //passa para a escolha de nível ou personagem
            }
        });

        this.createButton('voltar', 500, 500, 
        function(){
            this.state.start('MainMenu');
        });
    },

    readBD: function(){ 
        var id = 0; 
        var condition = true; 
        salas = []; //reinicia para n pegar repetidos
        
        while(condition){
            getDataByIDSalas(id).then((array_salas) => {
                this.getData(array_salas); //console.log(array);
            }).catch(() => {});
            
            id++; 
            
            if(id==100) condition = false; //melhorar isso
            
        }
    },

    getData: function(array_salas){
        if(!(array_salas===null)){
            salas.push(array_salas); //adiciona na lista de salas
        } 
    },

    pegarSala: function(nome){
        //pesquisa no banco de dados firebase...
        firebaseRef = firebase.database(); console.log(salas);

        for(i = 0; i < salas.length; i++){
            if(salas[i].player1 == ""){
                salas[i].player1 = nome; //guarda no array

                firebaseRef.ref("Salas/" + i).set({
					nivel: "",
					personagem1: "",
					personagem2: "",
                    player1: salas[i].player1,
					player2: "",
                    sala: salas[i].sala
                });
                return "TelaNivel";
            } else if(salas[i].player2 == ""){
                salas[i].player2 = nome; //guarda no array
                escolha_nivel = salas[i].nivel; 

                firebaseRef.ref("Salas/" + i).set({
					nivel: salas[i].nivel,
					personagem1: salas[i].personagem1,
					personagem2: "",
					player1: salas[i].player1,
                    player2: salas[i].player2,
                    sala: salas[i].sala
                });
                return "Personagens";
            }
        }
    },

    createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
        button.scale.setTo(0.75,0.75);
        button.anchor.setTo(0.5);
    },

};