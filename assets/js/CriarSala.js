ForcaBRAS.CriarSala = function (game) {
	
};

ForcaBRAS.CriarSala.prototype = {

	create: function () {
        this.add.image(0, 0, 'criar_sala');

		this.createButton('facil', 500, 250, 
        function(){
            escolha_nivel = "f"; //fácil
            this.state.start('Personagens'); //passa para a escolha de personagens
        });
        this.createButton('dificil', 500, 370, 
        function(){
            escolha_nivel = "d"; //difícil
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

};