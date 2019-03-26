ForcaBRAS.TelaEscolha = function (game) {
	
};

function getDataByID(id){
    return new Promise((resolve, reject) => {
        firebaseRef = firebase.database();
        var array = []; //aray para armazenar a palavra e a dica da mesma

        firebaseRef.ref("Palavras/"+id).on('value', function(snap){
            array = snap.val();

            resolve(array);
            return array;
        }, err => {
            console.log(err);
            reject();
          }
        );
    
    });
};

ForcaBRAS.TelaEscolha.prototype = {

	create: function () {
        this.add.image(0, 0, 'Backgroud_Escolha');

		this.createButton('alfabeto', 350, 150, 
        function(){
            escolha_fase = "alfabeto";
            this.readBD();
        });
        this.createButton('numerais', 350, 300, 
        function(){
            escolha_fase = "numerais";
        });
        this.createButton('voltar', 380, 450, 
        function(){
            this.state.start('MainMenu');
        });
	},

    readBD: function(){
        var id = 0; 
        var condition = true; 

        while(condition){
            getDataByID(id).then((array) => {
                this.getData(array);

            }).catch(() => {
          
            });
            
            id++; 

            if(id==146) condition = false;
        }
        
    },

    getData: function(array){
        
        if(!(array===null)){
            palavras.push(array); //adiciona na lista de palavras
        } else {
            this.state.start('Personagens'); //passa para a escolha de personagens
        }
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