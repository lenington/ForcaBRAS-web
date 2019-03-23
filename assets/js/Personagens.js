ForcaBRAS.Personagens = function (game) {
	
};

ForcaBRAS.Personagens.prototype = {

	create: function () {
		this.add.image(0, 0, 'Backgroud_Personagens');

		this.createButton('personagem_1', 60, 200, 
        function(){
            personagem = 'menino_1'; this.state.start('TesteSprite');
        });
        this.createButton('personagem_2', 290, 200, 
        function(){
            personagem = 'menino_2'; this.state.start('TesteSprite');
        });
        this.createButton('personagem_3', 520, 200, 
        function(){
            personagem = 'menina_1'; this.state.start('TesteSprite');
        });
        this.createButton('personagem_4', 750, 200, 
        function(){
            personagem = 'menina_2'; this.state.start('TesteSprite');
        });

	},

	createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
        //personagem = sprite;

        
    },

};