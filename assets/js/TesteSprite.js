ForcaBRAS.TesteSprite = function (game) {
	
};

var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
var alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
'U','V','W','X','Y','Z'];
var botoes = []; //array de objetos de botões (Phaser.Button)
var teste = 0;
var label_dica, label_palavra;
var objeto_atual; //Objeto atual de palavra e dica (Object.palavra, Object.dica)
var array_palavra = []; //array atual da palavra
var palavra_atual = ""; 
var palavra = ""; //palavra completa
var dica = ""; //dica da palavra
var array_sprites_palavra = []; //array para os labels da palavra

ForcaBRAS.TesteSprite.prototype = {

	create: function () {
		this.add.image(0, 0, 'Backgroud_Game');
		this.add.image(100, 385, 'Teclado');

        sprite_personagem = this.add.sprite(100, 100, personagem);
		sprite_personagem.frame = 0;
		
		this.add.button(525, 195, 'play', this.changeSprite, this, 1,0,2);

		palavras = this.sortArray(palavras); //embaralha a lista de palavras

		//texto:
		var style = { font: "bold 20px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"};
		label_dica = this.add.text(this.world.centerX, this.world.centerY-50, "Dica da Palavra", style);
		//label_palavra = this.add.text(this.world.centerX, this.world.centerY, "Palavra", style);

		//label_palavra.anchor.setTo(0.5); 
		label_dica.anchor.setTo(0.5);

		
		this.get_palavra_nova();
		this.inicializa_palavra();
		this.sprite_letras();

		this.addBotoesTeclado();
	},

	get_palavra_nova: function() {
		objeto_atual = palavras.shift(); //remove e retorna o primeiro object (contendo palavra e dica)
		if(objeto_atual !== null){
			palavra = objeto_atual.palavra.toUpperCase(); //primeira palavra 
			dica = objeto_atual.dica.toUpperCase(); //dica da primeira palavra
		} else{
			//FIM DE JOGO!
		}
		
	},

	inicializa_palavra: function() {
		for(var i = 0; i < palavra.length; i++){
			palavra_atual += "_";
		}; 
		//label_palavra.setText(palavra_atual);
		label_dica.setText(dica);
	},

	changeSprite: function() {
		teste = teste + 1;
		sprite_personagem.frame = teste;

		palavra = palavras.shift(); //remove e retorna a primeira palavera e dica 
		//console.log(palavra);

		if(teste == 6) teste = 0;
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
	},
	
	verificaLetra: function(botao, letra) {
		var frame; //frame para certo (4) ou errado (5)
		var condicao;
		var palavra_aux = palavra.split(""); //transforma a palavra em array
		console.log(palavra_aux);

		for(var i = 0; i<palavra.length; i++){
			if(letra == this.ignora_acentuacao(palavra_aux[i])){
				this.revela_letras(palavra_aux[i], i);

				condicao = true; //basta entrar uma vez para a condição ser verdadeira
			} 
		}

		botao.inputEnabled = false; //desabilita o botão
		if(condicao){
			frame = 4; //certo 
		} else frame = 5; //errado 

		return frame;
	},

	revela_letras: function(letra, position) {
		var palavra_aux = palavra_atual.split("");
		var palavra_prev = ""; //palavra anterior

		//atualiza a palavra na posição passada por parametro
		palavra_aux[position] = letra;
		array_sprites_palavra[position].frame = 2; 

		for(var i = 0; i<palavra_atual.length; i++){
			palavra_prev += palavra_aux[i]+"";
		} 
		palavra_atual = palavra_prev;
		//label_palavra.setText(palavra_atual); //atualiza o label da palavra
	},

	//função para ignorar a acentuação para comparação
	ignora_acentuacao: function(letra) {
		if(letra == "Ã" || letra == "Â" || letra == "Á" || letra == "À"){
			return "A";
		} else if(letra == "Õ" || letra == "Ô" || letra == "Ó" || letra == "Ò"){
			return "O";
		} else if(letra == "Î" || letra == "Í" || letra == "Ì"){
			return "I";
		} else if(letra == "Ê" || letra == "É" || letra == "È"){
			return "E";
		} else if(letra == "Ú" || letra == "Û" || letra == "Ù"){
			return "U";
		} else if(letra == "Ç"){
			return "C";
		} else return letra;
	},

	sprite_letras: function() {
		var n = palavra.length; //tamanho da palavra
		var deslocamento = (64)/2; 
		var x = 512 - (n)*deslocamento;
		var palavra_aux = palavra.split(""); //transforma a palavra em array

		for(var i=0; i<n; i++){
			var letra = palavra_aux[i].toUpperCase();
			var sprite = this.add.sprite(x, this.world.centerY, letra);
			array_sprites_palavra[i] = sprite;
			sprite.frame = 0;
			x += 64;
		}
		//array_sprites_palavra[1].frame=3; //mudar o sprite da letra
	},

	addBotoesTeclado: function() {
		var x = 125; var y = 395; var espacamento = 64;

		A = this.add.button(x, y, 'A', function(){
			var frame = this.verificaLetra(A, 'A');
			A.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		B = this.add.button(x, y, 'B', function(){
			var frame = this.verificaLetra(B, 'B');
			B.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		C = this.add.button(x, y, 'C', function(){
			var frame = this.verificaLetra(C, 'C');
			C.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		D = this.add.button(x, y, 'D', function(){
			var frame = this.verificaLetra(D, 'D');
			D.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		E = this.add.button(x, y, 'E', function(){
			var frame = this.verificaLetra(E, 'E');
			E.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		F = this.add.button(x, y, 'F', function(){
			var frame = this.verificaLetra(F, 'F');
			F.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		G = this.add.button(x, y, 'G', function(){
			var frame = this.verificaLetra(G, 'G');
			G.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		H = this.add.button(x, y, 'H', function(){
			var frame = this.verificaLetra(H, 'H');
			H.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		I = this.add.button(x, y, 'I', function(){
			var frame = this.verificaLetra(I, 'I');
			I.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		J = this.add.button(x, y, 'J', function(){
			var frame = this.verificaLetra(J, 'J');
			J.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		K = this.add.button(x, y, 'K', function(){
			var frame = this.verificaLetra(K, 'K');
			K.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		L = this.add.button(x, y, 'L', function(){
			var frame = this.verificaLetra(L, 'L');
			L.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		M = this.add.button(x, y, 'M', function(){
			var frame = this.verificaLetra(M, 'M');
			M.setFrames(frame);

		}, this, 2,1,3);

		
		y = y + espacamento; x = 125;

		N = this.add.button(x, y, 'N', function(){
			var frame = this.verificaLetra(N, 'N');
			N.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		O = this.add.button(x, y, 'O', function(){
			var frame = this.verificaLetra(O, 'O');
			O.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		P = this.add.button(x, y, 'P', function(){
			var frame = this.verificaLetra(P, 'P');
			P.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Q = this.add.button(x, y, 'Q', function(){
			var frame = this.verificaLetra(Q, 'Q');
			Q.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		R = this.add.button(x, y, 'R', function(){
			var frame = this.verificaLetra(R, 'R');
			R.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		S = this.add.button(x, y, 'S', function(){
			var frame = this.verificaLetra(S, 'S');
			S.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		T = this.add.button(x, y, 'T', function(){
			var frame = this.verificaLetra(T, 'T');
			T.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		U = this.add.button(x, y, 'U', function(){
			var frame = this.verificaLetra(U, 'U');
			U.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		V = this.add.button(x, y, 'V', function(){
			var frame = this.verificaLetra(V, 'V');
			V.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		W = this.add.button(x, y, 'W', function(){
			var frame = this.verificaLetra(W, 'W');
			W.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		X = this.add.button(x, y, 'X', function(){
			var frame = this.verificaLetra(X, 'X');
			X.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Y = this.add.button(x, y, 'Y', function(){
			var frame = this.verificaLetra(Y, 'Y');
			Y.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Z = this.add.button(x, y, 'Z', function(){
			var frame = this.verificaLetra(Z, 'Z');
			Z.setFrames(frame);

		}, this, 2,1,3);

	},

};