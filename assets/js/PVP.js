ForcaBRAS.PVP = function (game) {
	
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
var label_perdeu, label_parabens;
var play_btn;
var pontuacao = 0; //pontuação do jogador (10 palavra completa, -2 palavra errada)
var blocos = []; //blocos da dica
var sprite_personagem_adversario = [];
var sala, nome;
var player_principal = false;
var lista_palavras_original;

var Client = {};
Client.socket = io.connect(); //conexão do cliente e servidor da aplicação

Client.mensagemSala = function(sala, nome){
	Client.socket.emit(sala, nome);
};

Client.socket.on('get_letra', async function(user){
	if(user != nome){ //só executar se for para o adversário
		console.log("Recebendo letra de "+user);
		var letra = await Client.getLetra();
		ForcaBRAS.PVP.prototype.verificaLetraRecebida(letra);
	}
});

Client.getLetra = function(){
	return new Promise((resolve, reject) => {
		Client.socket.on('receive_letra', function(letra){

			console.log("Letra: "+letra);
			resolve(letra);

			return letra;
		}, err => {
			console.log(err);
            reject();
		});
    
    });
};

Client.socket.on('get_palavras',function(user){
	if(player_principal){
		console.log(user+" solicitando palavras: ");
		console.log(objeto_atual);
		Client.socket.emit('send_palavras', objeto_atual);
	}
});

Client.getPalavra = function(){
    return new Promise((resolve, reject) => {
		Client.socket.on('receive_palavras', function(palavra){
			//objeto_atual = palavra; //recebe do segundo jogador
			console.log(palavra);
			resolve(palavra);

			return palavra;
		}, err => {
			console.log(err);
            reject();
		});
    
    });
};

ForcaBRAS.PVP.prototype = {
	
	create: async function () {
		//TESTE LOGIN:
		nome = localStorage.getItem("jogador_nome");
		localStorage.removeItem("jogador_nome");

		this.pegarSala();
		this.atualizarSalaPlayer();
		
		this.add.image(0, 0, 'Backgroud_Game');
		
		label_perdeu = this.add.image(320, 150, 'Perdeu'); 
		label_perdeu.visible = false;
		label_parabens = this.add.image(283, 105, 'Parabens'); 
		label_parabens.visible = false;

		if(player_principal){//ações somente para o player principal
			palavras = this.sortArray(palavras); //embaralha a lista de palavras
			lista_palavras_original = palavras; 
			
			console.log(palavras);

			this.get_palavra_nova();
			this.sprite_letras();

		} else{ 
			//palavras = this.sortArray(palavras); //embaralha a lista de palavras
			await this.get_palavra_nova(); //console.log("saiu???");
			this.sprite_letras();
		}

		//aqui vai o nome do personagem e abaixo a pontuação
		var style = { font: "bold 14px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle"};
		var player_label = this.add.text(100, 100, nome, style);

        sprite_personagem = this.add.sprite(100, 135, personagem);
		sprite_personagem.frame = 0;
		sprite_personagem.scale.setTo(0.90,0.90);

		sprite_personagem_adversario = this.add.sprite(724, 135, personagem);
		sprite_personagem_adversario.frame = 0;
		sprite_personagem_adversario.scale.setTo(0.90,0.90);
		
		//botões 
		var voltar = this.add.button(850, 10, 'voltar_menor', function(){
            this.state.start('MainMenu');
		}, this, 1,0,2);
		voltar.scale.setTo(0.75,0.75);

		play_btn = this.add.button(770, 150, 'play_medio', this.jogarNovamente, this, 1,0,2);
		play_btn.visible = false;

		this.addBotoesTeclado();
	},

	pegarSala: function(){
		firebaseRef = firebase.database(); 
		//pesquisa no banco de dados firebase...
        for(i = 0; i < salas.length; i++){
			if(salas[i].player1 == nome || salas[i].player2 == nome){
				sala = salas[i].sala; //salva o nome da sala
			}
		}
	},

	atualizarSalaPlayer: function(){
        firebaseRef = firebase.database(); //console.log(salas);
		//pesquisa no banco de dados firebase...
        for(i = 0; i < salas.length; i++){ 
            if(salas[i].sala == sala){
				if(nome != salas[i].player1){
					salas[i].personagem2 = personagem;
	
					firebaseRef.ref("Salas/" + i).set({
						sala: sala,
						player1: salas[i].player1,
						nivel: escolha_nivel,
						personagem1: salas[i].personagem1,
						personagem2: personagem,
						player2: salas[i].player2
					});

					Client.mensagemSala(sala, salas[i].player2);
				} else {
					player_principal = true; //é o player principal
					salas[i].nivel = escolha_nivel;
					salas[i].personagem1 = personagem;
	
					firebaseRef.ref("Salas/" + i).set({
						sala: sala,
						player1: salas[i].player1,
						nivel: escolha_nivel,
						personagem1: personagem,
						personagem2: "",
						player2: ""
					});
					Client.mensagemSala(sala, salas[i].player1);
				}

				//atualiza no banco de dados e no array
				
            }
        }
    },

	jogarNovamente: async function(){ console.log(pontuacao);
		this.removeBlocosDica();
		await this.get_palavra_nova();

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
		
	},

	/**
	 * 
	 * 
	 */
	get_palavra_nova: async function() {
		if(player_principal){
			objeto_atual = palavras.shift(); //remove e retorna o primeiro object (contendo palavra e dica)
			//console.log(objeto_atual);
		} else {
			Client.socket.emit('palavras', nome);
			objeto_atual = await Client.getPalavra();
		}

		if(objeto_atual !== null){
			palavra = objeto_atual.palavra.toUpperCase(); //primeira palavra 
			tamanho_palavra = palavra.length; //tamanho da palavra
			tamanho_palavra_aux = tamanho_palavra; //atribui à variável auxiliadora
			dica = objeto_atual.dica.toUpperCase(); //dica da primeira palavra

			this.blocosDica(dica.length);
		} else{
			//FIM DE JOGO! FIM DE JOGO!  DE JOGO! FIM DE JOGO! FIM DE JOGO!
		}
		console.log(palavra);
		console.log(dica);
	},

	blocosDica: function(tamanho_dica){
		dica_aux = dica.split(""); //
		var x = 200, y = 230;

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
		label_dica = this.add.text(250, 253, "", style);
		
		label_dica.setText(dica);
	},

	deleteDicaLabel: function(){
		//remore a dica atual para iniciar uma nova
		//this.world.remove(label_dica);
		label_dica.setText('');
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
	
	verificaLetraRecebida: function(letra){		
		if(letra == 'A'){
			var frame = this.verificaLetra(A, letra, false);
			A.frame = frame;
		}
		if(letra == 'B'){
			var frame = this.verificaLetra(B, letra, false);
			B.frame = frame;
		}
		if(letra == 'C'){
			var frame = this.verificaLetra(C, letra, false);
			C.frame = frame;
		}
		if(letra == 'D'){
			var frame = this.verificaLetra(D, letra, false);
			D.frame = frame;
		}
		if(letra == 'E'){
			var frame = this.verificaLetra(E, letra, false);
			E.frame = frame;
		}
		if(letra == 'F'){
			var frame = this.verificaLetra(F, letra, false);
			F.frame = frame;
		}
		if(letra == 'G'){
			var frame = this.verificaLetra(G, letra, false);
			G.frame = frame;
		}
		if(letra == 'H'){
			var frame = this.verificaLetra(H, letra, false);
			H.frame = frame;
		}
		if(letra == 'I'){
			var frame = this.verificaLetra(I, letra, false);
			I.frame = frame;
		}
		if(letra == 'J'){
			var frame = this.verificaLetra(J, letra, false);
			J.frame = frame;
		}
		if(letra == 'K'){
			var frame = this.verificaLetra(K, letra, false);
			K.frame = frame;
		}
		if(letra == 'L'){
			var frame = this.verificaLetra(L, letra, false);
			L.frame = frame;
		}
		if(letra == 'M'){
			var frame = this.verificaLetra(M, letra, false);
			M.frame = frame;
		}
		if(letra == 'N'){
			var frame = this.verificaLetra(N, letra, false);
			N.frame = frame;
		}
		if(letra == 'O'){
			var frame = this.verificaLetra(O, letra, false);
			O.frame = frame;
		}
		if(letra == 'P'){
			var frame = this.verificaLetra(P, letra, false);
			P.frame = frame;
		}
		if(letra == 'Q'){
			var frame = this.verificaLetra(Q, letra, false);
			Q.frame = frame;
		}
		if(letra == 'R'){
			var frame = this.verificaLetra(R, letra, false);
			R.frame = frame;
		}
		if(letra == 'S'){
			var frame = this.verificaLetra(S, letra, false);
			S.frame = frame;
		}
		if(letra == 'T'){
			var frame = this.verificaLetra(T, letra, false);
			T.frame = frame;
		}
		if(letra == 'U'){
			var frame = this.verificaLetra(U, letra, false);
			U.frame = frame;
		}
		if(letra == 'V'){
			var frame = this.verificaLetra(V, letra, false);
			V.frame = frame;
		}
		if(letra == 'W'){
			var frame = this.verificaLetra(W, letra, false);
			W.frame = frame;
		}
		if(letra == 'X'){
			var frame = this.verificaLetra(X, letra, false);
			X.frame = frame;
		}
		if(letra == 'Y'){
			var frame = this.verificaLetra(Y, letra, false);
			Y.frame = frame;
		}
		if(letra == 'Z'){
			var frame = this.verificaLetra(Z, letra, false);
			Z.frame = frame;
		}
	},

	/**
	 * Verifica se a letra informada pelo teclado está contida na palavra
	 * e exibe a quantidade
	 */
	verificaLetra: function(botao, letra, controle) {
		var frame; //frame para certo (4) ou errado (5)
		var condicao; 
		var palavra_aux = palavra.split(""); //transforma a palavra em array
		console.log(palavra_aux);
		
		if(controle){ //se controle for verdadeiro, significa que veio de quem clicou no botão
			Client.socket.emit('click', nome); //envia a letra pro servidor
			Client.socket.emit('send_letra', letra); //envia a letra pro servidor
		} //serve para não entrar em um loop infinito entre servidor-cliente

		for(var i = 0; i<palavra.length; i++){ 
			if(letra == this.ignora_acentuacao(palavra_aux[i])){ 
				this.revela_letras(palavra_aux[i].toLowerCase(), i);

				condicao = true; //basta entrar uma vez para a condição ser verdadeira
				
				tamanho_palavra_aux--; //decrementa 

				if(tamanho_palavra_aux == 0){ //concluiu a palavra
					label_parabens.visible = true; 
					this.on_Off_Botoes(false); //desabilita os botões
					pontuacao = pontuacao + 10; //ATUALIZA A PONTUAÇÃO
					play_btn.visible = true;
					this.deleteDicaLabel(); //deleta o label da dica iniciar um novo

					sprite_personagem.frame = 0; //frame do personagem inicial
					sprite_personagem.visible = true;
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
		} else { //CONDIÇÃO DE PERDER!
			pontuacao = pontuacao -2;
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
	sprite_letras: function() { console.log("entrou???");
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

	receive_button: function(){

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
			var frame = this.verificaLetra(A, 'A', true);
			A.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		B = this.add.button(x, y, 'B'+escolha_nivel, function(){
			var frame = this.verificaLetra(B, 'B', true);
			B.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		C = this.add.button(x, y, 'C'+escolha_nivel, function(){
			var frame = this.verificaLetra(C, 'C', true);
			C.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		D = this.add.button(x, y, 'D'+escolha_nivel, function(){
			var frame = this.verificaLetra(D, 'D', true);
			D.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		E = this.add.button(x, y, 'E'+escolha_nivel, function(){
			var frame = this.verificaLetra(E, 'E', true);
			E.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		F = this.add.button(x, y, 'F'+escolha_nivel, function(){
			var frame = this.verificaLetra(F, 'F', true);
			F.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		G = this.add.button(x, y, 'G'+escolha_nivel, function(){
			var frame = this.verificaLetra(G, 'G', true);
			G.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		H = this.add.button(x, y, 'H'+escolha_nivel, function(){
			var frame = this.verificaLetra(H, 'H', true);
			H.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		I = this.add.button(x, y, 'I'+escolha_nivel, function(){
			var frame = this.verificaLetra(I, 'I', true);
			I.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		J = this.add.button(x, y, 'J'+escolha_nivel, function(){
			var frame = this.verificaLetra(J, 'J', true);
			J.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		K = this.add.button(x, y, 'K'+escolha_nivel, function(){
			var frame = this.verificaLetra(K, 'K', true);
			K.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		L = this.add.button(x, y, 'L'+escolha_nivel, function(){
			var frame = this.verificaLetra(L, 'L', true);
			L.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		M = this.add.button(x, y, 'M'+escolha_nivel, function(){
			var frame = this.verificaLetra(M, 'M', true);
			M.setFrames(frame);

		}, this, 2,1,3);

		
		y = y + espacamento; x = 96;

		N = this.add.button(x, y, 'N'+escolha_nivel, function(){
			var frame = this.verificaLetra(N, 'N', true);
			N.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		O = this.add.button(x, y, 'O'+escolha_nivel, function(){
			var frame = this.verificaLetra(O, 'O', true);
			O.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		P = this.add.button(x, y, 'P'+escolha_nivel, function(){
			var frame = this.verificaLetra(P, 'P', true);
			P.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Q = this.add.button(x, y, 'Q'+escolha_nivel, function(){
			var frame = this.verificaLetra(Q, 'Q', true);
			Q.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		R = this.add.button(x, y, 'R'+escolha_nivel, function(){
			var frame = this.verificaLetra(R, 'R', true);
			R.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		S = this.add.button(x, y, 'S'+escolha_nivel, function(){
			var frame = this.verificaLetra(S, 'S', true);
			S.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		T = this.add.button(x, y, 'T'+escolha_nivel, function(){
			var frame = this.verificaLetra(T, 'T', true);
			T.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		U = this.add.button(x, y, 'U'+escolha_nivel, function(){
			var frame = this.verificaLetra(U, 'U', true);
			U.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		V = this.add.button(x, y, 'V'+escolha_nivel, function(){
			var frame = this.verificaLetra(V, 'V', true);
			V.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		W = this.add.button(x, y, 'W'+escolha_nivel, function(){
			var frame = this.verificaLetra(W, 'W', true);
			W.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		X = this.add.button(x, y, 'X'+escolha_nivel, function(){
			var frame = this.verificaLetra(X, 'X', true);
			X.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Y = this.add.button(x, y, 'Y'+escolha_nivel, function(){
			var frame = this.verificaLetra(Y, 'Y', true);
			Y.setFrames(frame);

		}, this, 2,1,3);

		x = x + espacamento;

		Z = this.add.button(x, y, 'Z'+escolha_nivel, function(){
			var frame = this.verificaLetra(Z, 'Z', true);
			Z.setFrames(frame);

		}, this, 2,1,3);

	},


};