ForcaBRAS.Game = function (game) {
	
};

var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
var alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
'U','V','W','X','Y','Z'];
var sprite_atual_personagem = 0; //sprite atual do personagem
var label_dica;
var objeto_atual; //Objeto atual de palavra e dica (Object.palavra, Object.dica)
var array_palavra = []; //array atual da palavra
var palavra = ""; //palavra completa
var tamanho_palavra, tamanho_palavra_aux;
var dica = ""; //dica da palavra
var array_sprites_palavra = []; //array para os labels da palavra
var label_perdeu, label_parabens, ponto_label;
var play_btn;
var pontuacao = 0; //pontuação do jogador (10 palavra completa, -2 palavra errada)
var blocos = []; //blocos da dica


ForcaBRAS.Game.prototype = {
	
	create: function () { 
		
		this.add.image(0, 0, 'Backgroud_Game');
		
		label_perdeu = this.add.image(320, 150, 'Perdeu'); 
		label_perdeu.visible = false;
		label_parabens = this.add.image(283, 105, 'Parabens'); 
		label_parabens.visible = false;

		var style = { font: "bold 18px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"};
		ponto_label = this.add.text(100, 70, 'Pontos: 0', style);
		
        sprite_personagem = this.add.sprite(100, 100, personagem);
		sprite_personagem.frame = 0;
		
		//botões 
		var voltar = this.add.button(850, 10, 'voltar_menor', function(){
            this.state.start('MainMenu');
		}, this, 1,0,2);
		voltar.scale.setTo(0.75,0.75);
		
		play_btn = this.add.button(770, 150, 'play_medio', this.jogarNovamente, this, 1,0,2);
		play_btn.visible = false;

		palavras = this.sortArray(palavras); //embaralha a lista de palavras
		
		this.get_palavra_nova();
		this.sprite_letras();

		this.addBotoesTeclado();
	},

	jogarNovamente: function(){ //console.log(pontuacao);
		this.removeBlocosDica();
		this.get_palavra_nova();

		//console.log(array_sprites_palavra);
		for(var i=0; i<array_sprites_palavra.length; i++){
			var sprite = array_sprites_palavra[i];
			sprite.destroy(); //remove o sprite do jogo
		} array_sprites_palavra = []; //reinicia o aray

		this.sprite_letras();
		this.on_Off_Botoes(true);

		label_parabens.visible = false;
		label_perdeu.visible = false;
		play_btn.visible = false;

		sprite_personagem.frame = 0; //frame do personagem inicial
		sprite_personagem.visible = true;
		sprite_personagem.alpha = 1;
	},

	/**
	 * 
	 * 
	 */
	get_palavra_nova: function() {
		objeto_atual = palavras.shift(); //remove e retorna o primeiro object (contendo palavra e dica)
		if(objeto_atual !== null){
			palavra = objeto_atual.palavra.toUpperCase(); //primeira palavra 
			tamanho_palavra = palavra.length; //tamanho da palavra
			tamanho_palavra_aux = tamanho_palavra; //atribui à variável auxiliadora
			dica = objeto_atual.dica.toUpperCase(); //dica da primeira palavra

			this.blocosDica(dica.length);
		} else{
			//FIM DE JOGO!
		}
		
	},

	blocosDica: function(tamanho_dica){
		dica_aux = dica.split(""); //
		var x = 200, y = 210;

		var sprite = this.add.sprite(x, y, 'ballons');
		sprite.frame = 0;
		blocos[0] = sprite;
		x = x + 72;
		
		for(var i = 0; i<dica_aux.length; i++){
			sprite = this.add.sprite(x, y, 'ballon_1');
			blocos[i+1] = sprite;
			x = x + 11;
		} 
		//adiciona mais um para garantir espaço
		sprite = this.add.sprite(x, y, 'ballon_1');
		blocos[dica.length+1] = sprite;
		x = x + 11;

		sprite = this.add.sprite(x, y, "ballons");
		sprite.frame = 1;
		blocos[dica.length+2] = sprite; 

		this.createDicaLabel();
	},

	createDicaLabel: function(){
		//texto da dica da palavra atual:
		var style = { font: "bold 18px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"};
		label_dica = this.add.text(250, 233, "", style);
		
		label_dica.setText(dica);
	},

	deleteDicaLabel: function(){
		//remore a dica atual para iniciar uma nova
		this.world.remove(label_dica);
		this.removeBlocosDica();
	},

	removeBlocosDica: function(){
		for(var i=0; i<blocos.length; i++){
			var sprite = blocos[i];
			sprite.destroy(); //remove o sprite do jogo
		} blocos = []; //reinicia o aray
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
	
	/**
	 * Verifica se a letra informada pelo teclado está contida na palavra
	 * e exibe a quantidade
	 */
	verificaLetra: function(botao, letra) {
		var frame; //frame para certo (4) ou errado (5)
		var condicao; 
		var palavra_aux = palavra.split(""); //transforma a palavra em array
		console.log(palavra_aux);
		
		Client.socket.emit('click', letra); //envia a letra pro servidor

		for(var i = 0; i<palavra.length; i++){
			if(letra == this.ignora_acentuacao(palavra_aux[i])){
				this.revela_letras(palavra_aux[i].toLowerCase(), i);

				condicao = true; //basta entrar uma vez para a condição ser verdadeira
				
				tamanho_palavra_aux--; //decrementa 

				if(tamanho_palavra_aux == 0){ //concluiu a palavra
					label_parabens.visible = true; 
					this.on_Off_Botoes(false); //desabilita os botões

					pontuacao = pontuacao + 10; //ATUALIZA A PONTUAÇÃO
					ponto_label.setText('Pontos: '+pontuacao);

					play_btn.visible = true;
					this.deleteDicaLabel(); //deleta o label da dica iniciar um novo

					sprite_personagem.frame = 0; //frame do personagem inicial
					sprite_personagem.visible = true;
					
					sprite_personagem.alpha = 1;
				}
			} 
		}

		botao.inputEnabled = false; //desabilita o botão
		if(condicao){
			frame = 4; //certo 
		} else {
			frame = 5; //errado 
			this.removeParteDoCorpo();
		}

		return frame;
	},

	/**
	 * 
	 * 
	 */
	removeParteDoCorpo: function(){
		if(sprite_personagem.frame != 6){
			sprite_personagem.frame++; //remove uma parte do corpo (muda de sprite) do personagem)
			sprite_personagem.alpha = sprite_personagem.alpha - 0.142; //diminui a opacidade do personagem
		} else { //CONDIÇÃO DE PERDER!
			if(pontuacao >= 4){ //para nao ficar pontuacao negativa
				pontuacao = pontuacao -4;
			}
			
			ponto_label.setText('Pontos: '+pontuacao);
			sprite_personagem.visible = false;
			label_perdeu.visible = true;
			this.on_Off_Botoes(false); //desabilita os botões
			this.mostrarPalavraCompleta(); //mostra a palavra completa
			this.deleteDicaLabel(); //deleta o label da dica iniciar um novo
			play_btn.visible = true;
		}
	},

	mostrarPalavraCompleta: function(){
		for(var i=0; i<array_sprites_palavra.length; i++){
			if(array_sprites_palavra[i].frame != 1){
				array_sprites_palavra[i].frame = 1; //revela as ocultas
			}
		}
	},

	/**
	 * Revela letras no painel de palavras ocultas
	 * 
	 */
	revela_letras: function(letra, position) {
		var palavra_aux = palavra.split("");
		//atualiza a palavra na posição passada por parametro
		palavra_aux[position] = letra;
		array_sprites_palavra[position].frame = 1; 
	},

	/**
	 * função para ignorar a acentuação para comparação
	 * 
	 */
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

	/**
	 * Função para colocar os sprites das letras da palavra centralizadas
	 * 
	 */
	sprite_letras: function() {
		var n = palavra.length; //tamanho da palavra
		var deslocamento = (64)/2; 
		var x = 512 - (n)*deslocamento;
		var palavra_aux = palavra.split(""); //transforma a palavra em array

		//verifica cada letra e guarda no array 
		for(var i=0; i<n; i++){
			var letra = palavra_aux[i].toLowerCase(); console.log(letra);
			var sprite = this.add.sprite(x, 340, letra);
			array_sprites_palavra[i] = sprite;
			sprite.frame = 0;
			x += 64;
		}
	},

	on_Off_Botoes: function(condicao){
		A.inputEnabled = condicao; 
		B.inputEnabled = condicao; 
		C.inputEnabled = condicao; 
		D.inputEnabled = condicao; 
		E.inputEnabled = condicao; 
		F.inputEnabled = condicao; 
		G.inputEnabled = condicao; 
		H.inputEnabled = condicao; 
		I.inputEnabled = condicao; 
		J.inputEnabled = condicao; 
		K.inputEnabled = condicao; 
		L.inputEnabled = condicao; 
		M.inputEnabled = condicao; 
		N.inputEnabled = condicao; 
		O.inputEnabled = condicao; 
		P.inputEnabled = condicao; 
		Q.inputEnabled = condicao; 
		R.inputEnabled = condicao; 
		S.inputEnabled = condicao; 
		T.inputEnabled = condicao; 
		U.inputEnabled = condicao; 
		V.inputEnabled = condicao; 
		W.inputEnabled = condicao; 
		X.inputEnabled = condicao; 
		Y.inputEnabled = condicao; 
		Z.inputEnabled = condicao; 

		if(condicao == true){
			A.setFrames(2,1,3); 
			B.setFrames(2,1,3); 
			C.setFrames(2,1,3); 
			D.setFrames(2,1,3); 
			E.setFrames(2,1,3); 
			F.setFrames(2,1,3); 
			G.setFrames(2,1,3); 
			H.setFrames(2,1,3); 
			I.setFrames(2,1,3); 
			J.setFrames(2,1,3); 
			K.setFrames(2,1,3); 
			L.setFrames(2,1,3); 
			M.setFrames(2,1,3); 
			N.setFrames(2,1,3); 
			O.setFrames(2,1,3); 
			P.setFrames(2,1,3); 
			Q.setFrames(2,1,3); 
			R.setFrames(2,1,3); 
			S.setFrames(2,1,3); 
			T.setFrames(2,1,3); 
			U.setFrames(2,1,3); 
			V.setFrames(2,1,3); 
			W.setFrames(2,1,3); 
			X.setFrames(2,1,3); 
			Y.setFrames(2,1,3); 
			Z.setFrames(2,1,3);
		}
	},
	
	/**
	 * Insere os botões do teclado na tela do jogo
	 * 
	 */
	addBotoesTeclado: function() {
		var x = 96; var y = 435; var espacamento = 64;

		A = this.add.button(x, y, 'A'+escolha_nivel, function(){
			var frame = this.verificaLetra(A, 'A');
			A.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		B = this.add.button(x, y, 'B'+escolha_nivel, function(){
			var frame = this.verificaLetra(B, 'B');
			B.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		C = this.add.button(x, y, 'C'+escolha_nivel, function(){
			var frame = this.verificaLetra(C, 'C');
			C.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		D = this.add.button(x, y, 'D'+escolha_nivel, function(){
			var frame = this.verificaLetra(D, 'D');
			D.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		E = this.add.button(x, y, 'E'+escolha_nivel, function(){
			var frame = this.verificaLetra(E, 'E');
			E.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		F = this.add.button(x, y, 'F'+escolha_nivel, function(){
			var frame = this.verificaLetra(F, 'F');
			F.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		G = this.add.button(x, y, 'G'+escolha_nivel, function(){
			var frame = this.verificaLetra(G, 'G');
			G.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		H = this.add.button(x, y, 'H'+escolha_nivel, function(){
			var frame = this.verificaLetra(H, 'H');
			H.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		I = this.add.button(x, y, 'I'+escolha_nivel, function(){
			var frame = this.verificaLetra(I, 'I');
			I.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		J = this.add.button(x, y, 'J'+escolha_nivel, function(){
			var frame = this.verificaLetra(J, 'J');
			J.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		K = this.add.button(x, y, 'K'+escolha_nivel, function(){
			var frame = this.verificaLetra(K, 'K');
			K.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		L = this.add.button(x, y, 'L'+escolha_nivel, function(){
			var frame = this.verificaLetra(L, 'L');
			L.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		M = this.add.button(x, y, 'M'+escolha_nivel, function(){
			var frame = this.verificaLetra(M, 'M');
			M.setFrames(frame);

		}, this, 2,1,3);

		
		y = y + espacamento; x = 96;

		N = this.add.button(x, y, 'N'+escolha_nivel, function(){
			var frame = this.verificaLetra(N, 'N');
			N.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		O = this.add.button(x, y, 'O'+escolha_nivel, function(){
			var frame = this.verificaLetra(O, 'O');
			O.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		P = this.add.button(x, y, 'P'+escolha_nivel, function(){
			var frame = this.verificaLetra(P, 'P');
			P.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Q = this.add.button(x, y, 'Q'+escolha_nivel, function(){
			var frame = this.verificaLetra(Q, 'Q');
			Q.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		R = this.add.button(x, y, 'R'+escolha_nivel, function(){
			var frame = this.verificaLetra(R, 'R');
			R.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		S = this.add.button(x, y, 'S'+escolha_nivel, function(){
			var frame = this.verificaLetra(S, 'S');
			S.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		T = this.add.button(x, y, 'T'+escolha_nivel, function(){
			var frame = this.verificaLetra(T, 'T');
			T.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		U = this.add.button(x, y, 'U'+escolha_nivel, function(){
			var frame = this.verificaLetra(U, 'U');
			U.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		V = this.add.button(x, y, 'V'+escolha_nivel, function(){
			var frame = this.verificaLetra(V, 'V');
			V.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		W = this.add.button(x, y, 'W'+escolha_nivel, function(){
			var frame = this.verificaLetra(W, 'W');
			W.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		X = this.add.button(x, y, 'X'+escolha_nivel, function(){
			var frame = this.verificaLetra(X, 'X');
			X.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Y = this.add.button(x, y, 'Y'+escolha_nivel, function(){
			var frame = this.verificaLetra(Y, 'Y');
			Y.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Z = this.add.button(x, y, 'Z'+escolha_nivel, function(){
			var frame = this.verificaLetra(Z, 'Z');
			Z.setFrames(frame);

		}, this, 2,1,3);

	},


};