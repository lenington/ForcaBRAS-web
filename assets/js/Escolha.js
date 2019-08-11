ForcaBRAS.TelaEscolha = function (game) {
	
};

function getDataByIDPalavras(id){
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

function getDataByIDSalas(id){
    return new Promise((resolve, reject) => {
        firebaseRef = firebase.database();
        var array_salas = []; //aray para armazenar a palavra e a dica da mesma

        firebaseRef.ref("Salas/"+id).on('value', function(snap){
            array_salas = snap.val();

            resolve(array_salas); //console.log(array_salas);

            return array_salas;
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

		this.createButton('alfabeto', this.world.centerX, 250, 
        function(){
            escolha_fase = "alfabeto";
            this.readBDSalas();
            this.readBDPalavras();
        });
        //this.createButton('numerais', 350, 300, 
        //function(){
        //    escolha_fase = "numerais";
        //});
        this.createButton('voltar', this.world.centerX, 500, 
        function(){
            this.state.start('MainMenu');
        });
	},

    readBDPalavras: function(){
        var id = 0; 
        var condition = true; 

        while(condition){
            getDataByIDPalavras(id).then((array) => {
                this.getDataPalavra(array);
            }).catch(() => {
                
            });
            
            id++; 

            if(id==500) condition = false; //melhorar isso
        }
    },

    readBDSalas: function(){
        var id = 0; 
        var condition = true; 

        while(condition){
            getDataByIDSalas(id).then((array) => {
                this.getDataSalas(array);
            }).catch(() => {
                
            });
            
            id++; 

            if(id==10) condition = false; //melhorar isso
        }
    },

    getDataPalavra: function(array){
        if(!(array===null)){
            palavras.push(array); //adiciona na lista de palavras
        } else {
            this.state.start('Modalidade'); //passa para a escolha de personagens
        }
    },

    getDataSalas: function(array_salas){
        if(!(array_salas===null)){
            salas.push(array_salas); //adiciona na lista de palavras
        } 
    },

	createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
        if(string == 'voltar'){
            button.scale.setTo(0.65,0.65);
        }
        button.anchor.set(0.5);
    },

};