ForcaBRAS.Modalidade = function (game) {
	
};

ForcaBRAS.Modalidade.prototype = {

	create: function () {
        this.add.image(0, 0, 'escolha_2');

		this.createButton('1_player', 260, 380, 
        function(){
            multiplayer = false;
            this.state.start('TelaNivel'); //passa para a escolha de nível
        });
        this.createButton('2_players', 760, 380, 
        function(){
            multiplayer = true;
            this.state.start('Multiplayer'); //passa para a escolha de personagens
        });
        this.createButton('voltar', 500, 500, 
        function(){
            this.state.start('MainMenu');
        });
	},

	createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
        button.scale.setTo(0.75,0.75);
        button.anchor.setTo(0.5);
    },

};