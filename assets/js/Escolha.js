ForcaBRAS.TelaEscolha = function (game) {
	
};

ForcaBRAS.TelaEscolha.prototype = {

	create: function () {
        this.add.image(0, 0, 'Backgroud_Escolha');

		this.createButton('alfabeto', 350, 150, 
        function(){
            this.state.start('Personagens');
        });
        this.createButton('numerais', 350, 300, 
        function(){
            palavras = this.sortArray(palavras);
            console.log(palavras);
            //this.state.start('Personagens');
        });
        this.createButton('voltar', 380, 450, 
        function(){
            //palavras = this.sortArray(palavras);
            console.log(palavras);
            var x = palavras.shift();
            console.log(x);
            //this.state.start('MainMenu');
        });
	},

	createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
    },

    //adapted from: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
    sortArray: function(palavras) {
        var ctr = palavras.length, temp, index;
        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = palavras[ctr];
            palavras[ctr] = palavras[index];
            palavras[index] = temp;
        }
        return palavras;
    }

};