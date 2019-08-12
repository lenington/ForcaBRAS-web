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
var pontuacao = 0, pontuacao_adversario = 0; //pontuação do jogador (10 palavra completa)
var blocos = []; //blocos da dica
var sprite_personagem_adversario = [];
var sala, nome, nome_adversario, personagem_adversario;
var player_principal = false;
var player_label, player_label_adversario, ponto_label, ponto_label_adversario;
var label_aviso; //pode ser usuario desconectado etc...
var bloquear;
var minha_vez;
var letras_clicadas = []; //listra de letras que ja foram clicadas

var Client = {};
Client.socket = io.connect(); //conexão do cliente e servidor da aplicação

Client.socket.on('connect_error', function(err) {
	if(multiplayer){
		try{
		label_aviso.text = "ERRO DE CONEXÃO!";
		label_aviso.visible = true;
		on_off_botoes(false);
		mostrarPalavraCompleta();
		liberarSala();
		} catch (e){
			console.log('Error connecting to server');
		} finally{
			liberarSala(); 
			setTimeout(atualizaPagina, 5000); //atualiza a pagina em 5 segundos
		}
	}
});

function atualizaPagina(){
	alert("Erro de Conexão!");
	location.reload();
};

Client.mensagemSala = function(sala, nome, personagem_adv){
	Client.socket.emit(sala, nome);
	if(!player_principal){
		Client.socket.emit('atualizar_sala', personagem_adv);
	}
};

//Quando um player da sala desconectar
Client.socket.on('disconnect_player', function(usuario){
	if(usuario.sala == sala){
		console.log("Jogador desconectou: ",usuario);
		usuarioDesconectado();
	}
});

function usuarioDesconectado(){
	label_aviso.text = "ADVERSÁRIO DESCONECTADO!";
	label_aviso.visible = true;
	player_label_adversario.fill = '#FF0000';
	ponto_label_adversario.fill = '#FF0000';
	
	player_label.fill = '#000';
	ponto_label.fill = '#000';

	on_off_botoes(false);
	mostrarPalavraCompleta();
	liberarSala();
};

function liberarSala(){
	firebaseRef = firebase.database(); 
	//pesquisa no banco de dados firebase... e atualiza
	for(i = 0; i < salas.length; i++){ 
		if(salas[i].sala == sala){
			console.log("Liberando a "+sala);
			firebaseRef.ref("Salas/" + i).set({
				sala: sala,
				player1: "",
				nivel: "",
				personagem1: "",
				personagem2: "",
				player2: "",
				pontos1: "",
				pontos2: ""
			});
		}
	}
}

Client.socket.on('sala_atualizada', async function(personagem_adv){
	if(player_principal){ //somente se for o player principal/inicial
		for(i = 0; i<10; i++){
			var sala_bd = await getSalaAtualizada(i);
			
			if(sala_bd.sala == sala){ 
				personagem_adversario = await personagem_adv;
				nome_adversario = await sala_bd.player2;

				ForcaBRAS.PVP.prototype.iniciaPersonagemAdversario();
			}
		}
	}
		
});

async function getSalaAtualizada(id){
    return new Promise((resolve, reject) => {
        firebaseRef = firebase.database();
        var sala; //aray para armazenar a palavra e a dica da mesma

        firebaseRef.ref("Salas/"+id).on('value', function(snap){
            sala = snap.val();

            resolve(sala); 

            return sala;
        }, err => {
            console.log(err);
            reject();
          }
        );
    
    });
};

Client.socket.on('get_letra', async function(user){
	if(user != nome){ //só executar se for para o adversário
		console.log("Recebendo letra de "+user);
		var letra = await Client.getLetra();

		await letras_clicadas.push(letra); console.log(letras_clicadas); 

		verificaLetraRecebida(letra);
		
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


/**
 * Verifica se a letra informada pelo teclado está contida na palavra
 * e exibe a quantidade
 */
async function verificaLetra(botao, letra, controle) {
	return new Promise((resolve, reject) => {
		var frame; //frame para certo (4) ou errado (5)
		var condicao; 
		var palavra_aux = palavra.split(""); //transforma a palavra em array
		
		if(controle){ //se controle for verdadeiro, significa que veio de quem clicou no botão
			Client.socket.emit('click', nome); //envia a letra pro servidor
			Client.socket.emit('send_letra', letra); //envia a letra pro servidor
			letras_clicadas.push(letra); //console.log(letras_clicadas); 
		} //serve para não entrar em um loop infinito entre servidor-cliente

		for(var i = 0; i<palavra.length; i++){ 
			if(letra == ignora_acentuacao(palavra_aux[i])){ 
				revela_letras(palavra_aux[i].toLowerCase(), i);

				condicao = true; //basta entrar uma vez para a condição ser verdadeira
				
				tamanho_palavra_aux--; //decrementa 

				if(tamanho_palavra_aux == 0){ //concluiu a palavra
					label_parabens.visible = true; 
					restarta_Botoes(false); //desabilita os botões
					if(minha_vez) {
						pontuacao = pontuacao + 10; //atualiza pontuação se for sua vez
						ponto_label.setText('Pontos: '+pontuacao);
						minha_vez = false; 

						player_label.fill = '#000';
						ponto_label.fill = '#000';

						player_label_adversario.fill = '#088A08';
						ponto_label_adversario.fill = '#088A08';

						on_off_botoes(false);
					} else{
						pontuacao_adversario = pontuacao_adversario + 10;
						ponto_label_adversario.setText('Pontos: '+pontuacao_adversario);
						minha_vez = true; //console.log("ganhou a vez");

						player_label.fill = '#088A08';
						ponto_label.fill = '#088A08';

						player_label_adversario.fill = '#000';
						ponto_label_adversario.fill = '#000';
					}

					letras_clicadas = []; //restarta lista de letras clicadas
					
					deleteDicaLabel(); //deleta o label da dica iniciar um novo

					sprite_personagem.frame = 0; //frame do personagem inicial
					sprite_personagem.visible = true;
					sprite_personagem.alpha = 1;

					sprite_personagem_adversario.frame = 0; //frame do personagem inicial
					sprite_personagem_adversario.visible = true;
					sprite_personagem_adversario.alpha = 1;

					objeto_atual = null; //reinicia a palavra

					play_btn.visible = true; //aparece apenas para o player principal da fase
					
				}
			} 
		}

		botao.inputEnabled = false; //desabilita o botão
		if(condicao){ 
			frame = 4; //certo 
		} else { 
			frame = 5; //errado 
			transparecePersonagem();
			if(minha_vez){ //se for a vez do player, desabilita botões e passa para o outro
				on_off_botoes(false);
				minha_vez = false; //perdeu a vez
				
				player_label.fill = '#000';
				ponto_label.fill = '#000';

				player_label_adversario.fill = '#088A08';
				ponto_label_adversario.fill = '#088A08';
			} else{
				liberar_botoes(); 
				minha_vez = true; //ganhou a vez

				player_label.fill = '#088A08';
				ponto_label.fill = '#088A08';

				player_label_adversario.fill = '#000';
				ponto_label_adversario.fill = '#000';
			}
		}

		resolve(frame);

		return frame;
	});
};

/**
 * 
 * 
 */
function buscarBotoesPressionados(letra){ 
	for(i = 0; i < letras_clicadas.length; i++){ 
		if(letra == letras_clicadas[i]){ 
			return false; 
		} 
	} return true; 
};

/**
 * 
 * 
 */
function liberar_botoes(){
	A.inputEnabled = buscarBotoesPressionados('A'); 
	B.inputEnabled = buscarBotoesPressionados('B'); 
	C.inputEnabled = buscarBotoesPressionados('C'); 
	D.inputEnabled = buscarBotoesPressionados('D'); 
	E.inputEnabled = buscarBotoesPressionados('E'); 
	F.inputEnabled = buscarBotoesPressionados('F'); 
	G.inputEnabled = buscarBotoesPressionados('G'); 
	H.inputEnabled = buscarBotoesPressionados('H'); 
	I.inputEnabled = buscarBotoesPressionados('I'); 
	J.inputEnabled = buscarBotoesPressionados('J'); 
	K.inputEnabled = buscarBotoesPressionados('K'); 
	L.inputEnabled = buscarBotoesPressionados('L'); 
	M.inputEnabled = buscarBotoesPressionados('M'); 
	N.inputEnabled = buscarBotoesPressionados('N'); 
	O.inputEnabled = buscarBotoesPressionados('O'); 
	P.inputEnabled = buscarBotoesPressionados('P'); 
	Q.inputEnabled = buscarBotoesPressionados('Q'); 
	R.inputEnabled = buscarBotoesPressionados('R'); 
	S.inputEnabled = buscarBotoesPressionados('S'); 
	T.inputEnabled = buscarBotoesPressionados('T'); 
	U.inputEnabled = buscarBotoesPressionados('U'); 
	V.inputEnabled = buscarBotoesPressionados('V'); 
	W.inputEnabled = buscarBotoesPressionados('W'); 
	X.inputEnabled = buscarBotoesPressionados('X'); 
	Y.inputEnabled = buscarBotoesPressionados('Y'); 
	Z.inputEnabled = buscarBotoesPressionados('Z'); 
};

/**
 * 
 * 
 */
function on_off_botoes(condicao){
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
};

/**
 * 
 * 
 */
function transparecePersonagem(){
	if(minha_vez){ //se for a vez do personagem
		if(sprite_personagem.frame != 6){
			sprite_personagem.frame++; //remove uma parte do corpo (muda de sprite) do personagem)
			sprite_personagem.alpha = sprite_personagem.alpha - 0.142; //diminui a opacidade do personagem
		} else { //CONDIÇÃO DE PERDER!
			sprite_personagem.visible = false;
			label_perdeu.visible = true;
			restarta_Botoes(false); //desabilita os botões
			mostrarPalavraCompleta(); //mostra a palavra completa
			deleteDicaLabel(); //deleta o label da dica iniciar um novo
			minha_vez = false; //passa a vez

			player_label.fill = '#000';
			ponto_label.fill = '#000';

			player_label_adversario.fill = '#088A08';
			ponto_label_adversario.fill = '#088A08';
			play_btn.visible = true;
		}
	} else{
		if(sprite_personagem_adversario.frame != 6){
			sprite_personagem_adversario.frame++; //remove uma parte do corpo (muda de sprite) do personagem)
			sprite_personagem_adversario.alpha = sprite_personagem.alpha - 0.142; //diminui a opacidade do personagem
		} else { //CONDIÇÃO DE PERDER!
			sprite_personagem_adversario.visible = false;
			label_perdeu.visible = true;
			restarta_Botoes(false); //desabilita os botões
			mostrarPalavraCompleta(); //mostra a palavra completa
			deleteDicaLabel(); //deleta o label da dica iniciar um novo
			minha_vez = true;

			player_label.fill = '#088A08';
			ponto_label.fill = '#088A08';

			player_label_adversario.fill = '#000';
			ponto_label_adversario.fill = '#000';

			play_btn.visible = true;
		}
	}
	
};

/**
 * 
 * 
 */
function mostrarPalavraCompleta(){
	for(var i=0; i<array_sprites_palavra.length; i++){
		if(array_sprites_palavra[i].frame != 1){
			array_sprites_palavra[i].frame = 1; //revela as ocultas
		}
	}
};

/**
 * 
 * 
 */
function deleteDicaLabel(){
	//remore a dica atual para iniciar uma nova
	//this.world.remove(label_dica);
	label_dica.setText('');
	removeBlocosDica();
};

/**
 * 
 * 
 */
function removeBlocosDica(){
	for(var i=0; i<blocos.length; i++){
		var sprite = blocos[i];
		sprite.destroy(); //remove o sprite do jogo
	} blocos = []; //reinicia o aray
};

/**
 * Restarta botões na scene
 * 
 */
function restarta_Botoes(condicao){
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
};

/**
 * Revela letras no painel de palavras ocultas
 * 
 */
function revela_letras(letra, position) {
	var palavra_aux = palavra.split("");
	//atualiza a palavra na posição passada por parametro
	palavra_aux[position] = letra;
	array_sprites_palavra[position].frame = 1; 
};

/**
 * função para ignorar a acentuação para comparação
 * 
 */
function ignora_acentuacao(letra) {
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
};

/**
 * função para ignorar a acentuação para comparação
 * 
 */
function desabilita_botoes_lista(){
	A.inputEnabled = verifica_letra_lista('A'); 
	B.inputEnabled = verifica_letra_lista('B'); 
	C.inputEnabled = verifica_letra_lista('C'); 
	D.inputEnabled = verifica_letra_lista('D'); 
	E.inputEnabled = verifica_letra_lista('E'); 
	F.inputEnabled = verifica_letra_lista('F'); 
	G.inputEnabled = verifica_letra_lista('G'); 
	H.inputEnabled = verifica_letra_lista('H'); 
	I.inputEnabled = verifica_letra_lista('I'); 
	J.inputEnabled = verifica_letra_lista('J'); 
	K.inputEnabled = verifica_letra_lista('K'); 
	L.inputEnabled = verifica_letra_lista('L'); 
	M.inputEnabled = verifica_letra_lista('M'); 
	N.inputEnabled = verifica_letra_lista('N'); 
	O.inputEnabled = verifica_letra_lista('O'); 
	P.inputEnabled = verifica_letra_lista('P'); 
	Q.inputEnabled = verifica_letra_lista('Q'); 
	R.inputEnabled = verifica_letra_lista('R'); 
	S.inputEnabled = verifica_letra_lista('S'); 
	T.inputEnabled = verifica_letra_lista('T'); 
	U.inputEnabled = verifica_letra_lista('U'); 
	V.inputEnabled = verifica_letra_lista('V'); 
	W.inputEnabled = verifica_letra_lista('W'); 
	X.inputEnabled = verifica_letra_lista('X'); 
	Y.inputEnabled = verifica_letra_lista('Y'); 
	Z.inputEnabled = verifica_letra_lista('Z'); 
};

/**
 * função para ignorar a acentuação para comparação
 * 
 */
function verifica_letra_lista(letra){
	if(letras_clicadas.indexOf(letra) != -1){ 
		return false; //retorna false para desabilitar o botão
	} else return true;
};

/**
 * função para ignorar a acentuação para comparação
 * 
 */
async function verificaLetraRecebida(letra){		
	if(letra == 'A'){
		var frame = await verificaLetra(A, letra, false);
		A.frame = frame;
	}
	if(letra == 'B'){
		var frame = await verificaLetra(B, letra, false);
		B.frame = frame;
	}
	if(letra == 'C'){
		var frame = await verificaLetra(C, letra, false);
		C.frame = frame;
	}
	if(letra == 'D'){
		var frame = await verificaLetra(D, letra, false);
		D.frame = frame;
	}
	if(letra == 'E'){
		var frame = await verificaLetra(E, letra, false);
		E.frame = frame;
	}
	if(letra == 'F'){
		var frame = await verificaLetra(F, letra, false);
		F.frame = frame;
	}
	if(letra == 'G'){
		var frame = await verificaLetra(G, letra, false);
		G.frame = frame;
	}
	if(letra == 'H'){
		var frame = await verificaLetra(H, letra, false);
		H.frame = frame;
	}
	if(letra == 'I'){
		var frame = await verificaLetra(I, letra, false);
		I.frame = frame;
	}
	if(letra == 'J'){
		var frame = await verificaLetra(J, letra, false);
		J.frame = frame;
	}
	if(letra == 'K'){
		var frame = await verificaLetra(K, letra, false);
		K.frame = frame;
	}
	if(letra == 'L'){
		var frame = await verificaLetra(L, letra, false);
		L.frame = frame;
	}
	if(letra == 'M'){
		var frame = await verificaLetra(M, letra, false);
		M.frame = frame;
	}
	if(letra == 'N'){
		var frame = await verificaLetra(N, letra, false);
		N.frame = frame;
	}
	if(letra == 'O'){
		var frame = await verificaLetra(O, letra, false);
		O.frame = frame;
	}
	if(letra == 'P'){
		var frame = await verificaLetra(P, letra, false);
		P.frame = frame;
	}
	if(letra == 'Q'){
		var frame = await verificaLetra(Q, letra, false);
		Q.frame = frame;
	}
	if(letra == 'R'){
		var frame = await verificaLetra(R, letra, false);
		R.frame = frame;
	}
	if(letra == 'S'){
		var frame = await verificaLetra(S, letra, false);
		S.frame = frame;
	}
	if(letra == 'T'){
		var frame = await verificaLetra(T, letra, false);
		T.frame = frame;
	}
	if(letra == 'U'){
		var frame = await verificaLetra(U, letra, false);
		U.frame = frame;
	}
	if(letra == 'V'){
		var frame = await verificaLetra(V, letra, false);
		V.frame = frame;
	}
	if(letra == 'W'){
		var frame = await verificaLetra(W, letra, false);
		W.frame = frame;
	}
	if(letra == 'X'){
		var frame = await verificaLetra(X, letra, false);
		X.frame = frame;
	}
	if(letra == 'Y'){
		var frame = await verificaLetra(Y, letra, false);
		Y.frame = frame;
	}
	if(letra == 'Z'){
		var frame = await verificaLetra(Z, letra, false);
		Z.frame = frame;
	}
};

ForcaBRAS.PVP.prototype = {
	create: async function () {
		nome = localStorage.getItem("jogador_nome");
		localStorage.removeItem("jogador_nome");

		this.pegarSala();
		this.atualizarSalaPlayer();
		
		this.add.image(0, 0, 'Backgroud_Game');
		
		label_perdeu = this.add.image(320, 150, 'Perdeu'); 
		label_perdeu.visible = false;
		label_parabens = this.add.image(233, 105, 'Parabens'); 
		label_parabens.visible = false;
		
		sprite_personagem = this.add.sprite(100, 135, personagem);
		sprite_personagem.frame = 0;
		sprite_personagem.scale.setTo(0.90,0.90);
		
		sprite_personagem_adversario = this.add.sprite(724, 135, personagem_adversario);
		sprite_personagem_adversario.frame = 0;
		sprite_personagem_adversario.scale.setTo(0.90,0.90);

		//, backgroundColor: "white"
		var style = { font: "bold 16px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle", 
					backgroundColor: ""};
					
		//aqui vai o nome do personagem e abaixo a pontuação
		player_label = this.add.text(100, 87, nome, style);
		player_label_adversario = this.add.text(724, 87, nome_adversario, style); 

		var style_2 = { font: "bold 18px Arial", fill: "#FF0000", boundsAlignH: "center", boundsAlignV: "middle", 
					backgroundColor: "white"};
		label_aviso = this.add.text(this.world.centerX, this.world.centerY-100, "", style_2);
		label_aviso.anchor.set(0.5);
		label_aviso.visible = false;

		if(player_principal){//ações somente para o player principal
			palavras = this.sortArray(palavras); //embaralha a lista de palavras

			this.get_palavra_nova();
			this.sprite_letras();

			ponto_label = this.add.text(100, 110, 'Pontos: 0', style);
			ponto_label_adversario = this.add.text(724, 110, '', style); 

			minha_vez = true; //vez de jogar
		} else{ 
			await this.get_palavra_nova(); 
			this.sprite_letras();

			ponto_label = this.add.text(100, 110, 'Pontos: 0', style);
			ponto_label_adversario = this.add.text(724, 110, 'Pontos: 0', style); 
			
			player_label_adversario.fill = '#088A08';
			ponto_label_adversario.fill = '#088A08';
		}
		 
		var voltar = this.add.button(850, 10, 'voltar_menor', function(){
            this.state.start('MainMenu');
		}, this, 1,0,2);
		voltar.scale.setTo(0.75,0.75);

		play_btn = this.add.button(770, 150, 'play_medio', this.jogarNovamente, this, 1,0,2);
		play_btn.visible = false;

		this.addBotoesTeclado();
		on_off_botoes(false); //desabilita botões no inicio da partida
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
        firebaseRef = firebase.database(); console.log(salas);
		//pesquisa no banco de dados firebase...
        for(i = 0; i < salas.length; i++){ 
            if(salas[i].sala == sala){
				if(nome != salas[i].player1){
					salas[i].personagem2 = personagem;
					personagem_adversario = salas[i].personagem1;
					nome_adversario = salas[i].player1;
	
					firebaseRef.ref("Salas/" + i).set({
						sala: sala,
						player1: salas[i].player1,
						nivel: escolha_nivel,
						personagem1: salas[i].personagem1,
						personagem2: personagem,
						player2: salas[i].player2,
						pontos1: "",
						pontos2: ""
					});

					Client.mensagemSala(sala, salas[i].player2, personagem);
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
						player2: "",
						pontos1: "",
						pontos2: ""
					});
					
					Client.mensagemSala(sala, salas[i].player1, '');
				}

            }
        }
	},
	
	iniciaPersonagemAdversario: function(){
		player_label_adversario.setText(nome_adversario);
		ponto_label_adversario.setText('Pontos: 0');

		sprite_personagem_adversario.loadTexture(personagem_adversario);
		on_off_botoes(true); //habilita botões para o player principal
		player_label.fill = '#088A08';
		ponto_label.fill = '#088A08';

	},

	jogarNovamente: async function(){ 
		removeBlocosDica();
		if(await this.get_palavra_nova() == 1){
			
			for(var i=0; i<array_sprites_palavra.length; i++){
				var sprite = array_sprites_palavra[i];
				sprite.destroy(); //remove o sprite do jogo
			} array_sprites_palavra = []; //reinicia o aray

			this.sprite_letras();
			restarta_Botoes(true);

			if(!minha_vez){ //se não for a vez do jogador, desabilita os botões
				on_off_botoes(false);
			}

			label_parabens.visible = false;
			label_perdeu.visible = false;
			play_btn.visible = false;

			sprite_personagem.frame = 0; //frame do personagem inicial
			sprite_personagem.alpha = 1; //mostra o personagem na tela
			sprite_personagem.visible = true;

			sprite_personagem_adversario.frame = 0; //frame do personagem adversario
			sprite_personagem_adversario.alpha = 1; //mostra o personagem adversario na tela
			sprite_personagem_adversario.visible = true;
		}
	},

	/**
	 * 
	 * 
	 */
	get_palavra_nova: async function() {
		if(player_principal){
			objeto_atual = palavras.shift(); //remove e retorna o primeiro object (contendo palavra e dica)
			console.log(objeto_atual);
		} else {
			Client.socket.emit('palavras', nome);
			objeto_atual = await Client.getPalavra();
			if(objeto_atual == null){
				return -1;
			} 
		}

		if(objeto_atual !== null){
			palavra = objeto_atual.palavra.toUpperCase(); //primeira palavra 
			tamanho_palavra = palavra.length; //tamanho da palavra
			tamanho_palavra_aux = tamanho_palavra; //atribui à variável auxiliadora
			dica = objeto_atual.dica.toUpperCase(); //dica da primeira palavra

			this.blocosDica();
		} else{
			//FIM DE JOGO! FIM DE JOGO!  DE JOGO! FIM DE JOGO! FIM DE JOGO!
		}
		return 1;
	},

	blocosDica: function(){
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
			var letra = palavra_aux[i].toLowerCase(); 
			var sprite = this.add.sprite(x, 340, letra);
			array_sprites_palavra[i] = sprite;
			sprite.frame = 0;
			x += 64;
		}
	},

	/**
	 * Insere os botões do teclado na tela do jogo
	 * 
	 */
	addBotoesTeclado: function() {
		var x = 96; var y = 435; var espacamento = 64;

		A = this.add.button(x, y, 'A'+escolha_nivel, async function(){
			var frame = await verificaLetra(A, 'A', true); console.log(frame);
			//A.setFrames(frame);
			A.frame = frame;
		}, this, 2,1,3);

		x = x + espacamento;

		B = this.add.button(x, y, 'B'+escolha_nivel, async function(){
			var frame = await verificaLetra(B, 'B', true);
			B.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		C = this.add.button(x, y, 'C'+escolha_nivel, async function(){
			var frame = await verificaLetra(C, 'C', true);
			C.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		D = this.add.button(x, y, 'D'+escolha_nivel, async function(){
			var frame = await verificaLetra(D, 'D', true);
			D.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		E = this.add.button(x, y, 'E'+escolha_nivel, async function(){
			var frame = await verificaLetra(E, 'E', true);
			E.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		F = this.add.button(x, y, 'F'+escolha_nivel, async function(){
			var frame = await verificaLetra(F, 'F', true);
			F.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		G = this.add.button(x, y, 'G'+escolha_nivel, async function(){
			var frame = await verificaLetra(G, 'G', true);
			G.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		H = this.add.button(x, y, 'H'+escolha_nivel, async function(){
			var frame = await verificaLetra(H, 'H', true);
			H.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		I = this.add.button(x, y, 'I'+escolha_nivel, async function(){
			var frame = await verificaLetra(I, 'I', true);
			I.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		J = this.add.button(x, y, 'J'+escolha_nivel, async function(){
			var frame = await verificaLetra(J, 'J', true);
			J.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		K = this.add.button(x, y, 'K'+escolha_nivel, async function(){
			var frame = await verificaLetra(K, 'K', true);
			K.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		L = this.add.button(x, y, 'L'+escolha_nivel, async function(){
			var frame = await verificaLetra(L, 'L', true);
			L.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		M = this.add.button(x, y, 'M'+escolha_nivel, async function(){
			var frame = await verificaLetra(M, 'M', true);
			M.frame = frame;

		}, this, 2,1,3);

		
		y = y + espacamento; x = 96;

		N = this.add.button(x, y, 'N'+escolha_nivel, async function(){
			var frame = await verificaLetra(N, 'N', true);
			N.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		O = this.add.button(x, y, 'O'+escolha_nivel, async function(){
			var frame = await verificaLetra(O, 'O', true);
			O.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		P = this.add.button(x, y, 'P'+escolha_nivel, async function(){
			var frame = await verificaLetra(P, 'P', true);
			P.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		Q = this.add.button(x, y, 'Q'+escolha_nivel, async function(){
			var frame = await verificaLetra(Q, 'Q', true);
			Q.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		R = this.add.button(x, y, 'R'+escolha_nivel, async function(){
			var frame = await verificaLetra(R, 'R', true);
			R.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		S = this.add.button(x, y, 'S'+escolha_nivel, async function(){
			var frame = await verificaLetra(S, 'S', true);
			S.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		T = this.add.button(x, y, 'T'+escolha_nivel, async function(){
			var frame = await verificaLetra(T, 'T', true);
			T.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		U = this.add.button(x, y, 'U'+escolha_nivel, async function(){
			var frame = await verificaLetra(U, 'U', true);
			U.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		V = this.add.button(x, y, 'V'+escolha_nivel, async function(){
			var frame = await verificaLetra(V, 'V', true);
			V.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		W = this.add.button(x, y, 'W'+escolha_nivel, async function(){
			var frame = await verificaLetra(W, 'W', true);
			W.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		X = this.add.button(x, y, 'X'+escolha_nivel, async function(){
			var frame = await verificaLetra(X, 'X', true);
			X.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		Y = this.add.button(x, y, 'Y'+escolha_nivel, async function(){
			var frame = await verificaLetra(Y, 'Y', true);
			Y.frame = frame;

		}, this, 2,1,3);

		x = x + espacamento;

		Z = this.add.button(x, y, 'Z'+escolha_nivel, async function(){
			var frame = await verificaLetra(Z, 'Z', true);
			Z.frame = frame;

		}, this, 2,1,3);

	},


};