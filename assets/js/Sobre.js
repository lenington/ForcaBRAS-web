ForcaBRAS.Sobre = function (game) {
	
};

ForcaBRAS.Sobre.prototype = {

	create: function () {
		this.add.image(0, 0, 'Backgroud_Sobre');

		this.createButton('voltar', 350, 450, 
        function(){
            this.state.start('MainMenu');
        });
	},

	createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
        button.scale.setTo(0.65,0.65);
    },
};