ForcaBRAS.Multiplayer = function (game) {
	
};

ForcaBRAS.Multiplayer.prototype = {

	create: function () {
        this.add.image(0, 0, 'multiplayer');

		this.createButton('entrar', 500, 250, 
        function(){
            var sala = prompt("Insira o nome da sala", "");
            localStorage.setItem("sala_nome", sala);
            if(sala == null || sala == ""){
                this.state.start('Multiplayer'); //retorna para a scene
            } else this.state.start('TelaNivel'); //passa para a escolha de personagens
        });
        this.createButton('criar', 500, 370, 
        function(){
            var sala = prompt("Insira o nome da sala", "");
            if(sala == null || sala == ""){
                this.state.start('Multiplayer'); //retorna para a scene
            } else this.criarSala(sala); //this.state.start('CriarSala'); //passa para a escolha de personagens
        });
        this.createButton('voltar', 500, 500, 
        function(){
            this.state.start('MainMenu');
        });
    },
    
    criarSala: function(sala){
        localStorage.setItem("sala_nome", sala);
        var nome = prompt("Insira seu nome", "");
        localStorage.setItem("jogador_nome", nome);
        this.state.start('TelaNivel'); //passa para a escolha de personagens
    },

	createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
        button.scale.setTo(0.75,0.75);
        button.anchor.setTo(0.5);
    },

};