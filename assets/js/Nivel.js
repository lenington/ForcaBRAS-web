ForcaBRAS.TelaNivel = function (game) {
	
};

ForcaBRAS.TelaNivel.prototype = {

	create: function () {
        this.add.image(0, 0, 'Backgroud_Nivel');
        nome = localStorage.getItem("jogador_nome");

		this.createButton('facil', 500, 250, 
        function(){
            escolha_nivel = "f"; //fácil
            if(multiplayer) {
                this.pegarSala(nome, escolha_nivel);
            }

            this.state.start('Personagens'); //passa para a escolha de personagens
        });
        this.createButton('dificil', 500, 370, 
        function(){
            escolha_nivel = "d"; //difícil
            if(multiplayer) {
                this.pegarSala(nome, escolha_nivel);
            }

            this.state.start('Personagens'); //passa para a escolha de personagens
        });
        this.createButton('voltar', 500, 500, 
        function(){
            this.state.start('MainMenu');
        });
	},

	createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
        button.scale.setTo(0.65,0.65);
        button.anchor.setTo(0.5);
    },

    pegarSala: function(nome, nivel_player){
        //pesquisa no banco de dados firebase...
        firebaseRef = firebase.database(); //console.log(salas);

        for(i = 0; i < salas.length; i++){
            if(salas[i].player1 == ""){
                salas[i].player1 = nome; //guarda no array

                firebaseRef.ref("Salas/" + i).set({
					nivel: nivel_player,
					personagem1: "",
					personagem2: "",
                    player1: salas[i].player1,
					player2: "",
                    sala: salas[i].sala
                });
                return 'Personagens';
            } else if(salas[i].player2 == "" && salas[i].nivel == nivel_player){
                salas[i].player2 = nome; 
                escolha_nivel = salas[i].nivel; 

                firebaseRef.ref("Salas/" + i).set({
					nivel: salas[i].nivel,
					personagem1: salas[i].personagem1,
					personagem2: "",
					player1: salas[i].player1,
                    player2: salas[i].player2,
                    sala: salas[i].sala
                });
                return 'Personagens';
            }
        }
    },

};