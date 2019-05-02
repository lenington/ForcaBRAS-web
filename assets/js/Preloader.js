ForcaBRAS.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

ForcaBRAS.Preloader.prototype = {

	preload: function () {
		//BACKGROUNDS:
		this.load.image('background', 'assets/img/menu_itens/TelaMenu.png');
		this.load.image('Backgroud_Game', 'assets/img/menu_itens/TelaJogo.png');
		this.load.image('Backgroud_Sobre', 'assets/img/menu_itens/TelaSobre.png');
		this.load.image('Backgroud_Escolha', 'assets/img/menu_itens/Escolha.png');
		this.load.image('Backgroud_Personagens', 'assets/img/menu_itens/TelaPersonagens.png');
		this.load.image('Teclado', 'assets/img/menu_itens/FundoTeclado.png');
		this.load.image('Perdeu', 'assets/img/menu_itens/perdeu.png');
		this.load.image('Parabens', 'assets/img/menu_itens/parabens.png');

		//BLOCO DICA
		this.load.spritesheet('bloco_1', 'assets/img/menu_itens/bloco_1.PNG', 22,22); //bloco inicial
		this.load.spritesheet('bloco_2', 'assets/img/menu_itens/bloco_2.PNG', 22,22); //blocos centrais
		this.load.spritesheet('bloco_3', 'assets/img/menu_itens/bloco_3.PNG', 22,22); //bloco fechado
		this.load.spritesheet('bloco_4', 'assets/img/menu_itens/bloco_4.PNG', 13,22); //para os Is

		//BOTÕES MENU:
		this.load.spritesheet('play', 'assets/img/menu_itens/play.png', 319,149);
		this.load.spritesheet('play_medio', 'assets/img/menu_itens/play_medio.png', 208,99);
		this.load.spritesheet('sobre', 'assets/img/menu_itens/sobre.png', 319,149);
		this.load.spritesheet('voltar', 'assets/img/menu_itens/voltar.png', 228,106);
		this.load.spritesheet('voltar_menor', 'assets/img/menu_itens/voltar154-71px.png', 175,81);
		this.load.spritesheet('alfabeto', 'assets/img/menu_itens/alfabeto.png', 319,149);
		this.load.spritesheet('numerais', 'assets/img/menu_itens/numerais.png', 319,149);

		//ESCOLHA DE PERSONAGENS:
		this.load.spritesheet('personagem_1', 'assets/img/menu_itens/personagem_1.PNG', 205,281);
		this.load.spritesheet('personagem_2', 'assets/img/menu_itens/personagem_2.PNG', 205,281);
		this.load.spritesheet('personagem_3', 'assets/img/menu_itens/personagem_3.png', 205,281);
		this.load.spritesheet('personagem_4', 'assets/img/menu_itens/personagem_4.png', 205,281);

		//PERSONAGENS
		this.load.spritesheet('menino_1', 'assets/img/personagens/menino_1.png', 128, 211, 7);
		this.load.spritesheet('menino_2', 'assets/img/personagens/menino_2.png', 134, 214, 7);
		this.load.spritesheet('menina_1', 'assets/img/personagens/menina_1.png', 139, 229, 7);
		this.load.spritesheet('menina_2', 'assets/img/personagens/menina_2.png', 162, 219, 7);

		//BOTÕES ALFABETO
		this.load.spritesheet('A', 'assets/img/letras/letra-A.png', 60, 60, 6);
		this.load.spritesheet('Ã', 'assets/img/letras/letra-A1.png', 60, 60, 6); //Ã
		this.load.spritesheet('Â', 'assets/img/letras/letra-A2.png', 60, 60, 6); //Â
		this.load.spritesheet('Á', 'assets/img/letras/letra-A3.png', 60, 60, 6); //Á
		this.load.spritesheet('À', 'assets/img/letras/letra-A4.png', 60, 60, 6); //À
		this.load.spritesheet('B', 'assets/img/letras/letra-B.png', 60, 60, 6);
		this.load.spritesheet('C', 'assets/img/letras/letra-C.png', 60, 60, 6);
		this.load.spritesheet('Ç', 'assets/img/letras/letra-C1.png', 60, 60, 6); //Ç
		this.load.spritesheet('D', 'assets/img/letras/letra-D.png', 60, 60, 6);
		this.load.spritesheet('E', 'assets/img/letras/letra-E.png', 60, 60, 6);
		this.load.spritesheet('Ê', 'assets/img/letras/letra-E1.png', 60, 60, 6); //Ê
		this.load.spritesheet('É', 'assets/img/letras/letra-E2.png', 60, 60, 6); //É
		this.load.spritesheet('È', 'assets/img/letras/letra-E3.png', 60, 60, 6); //È
		this.load.spritesheet('F', 'assets/img/letras/letra-F.png', 60, 60, 6);
		this.load.spritesheet('G', 'assets/img/letras/letra-G.png', 60, 60, 6);
		this.load.spritesheet('H', 'assets/img/letras/letra-H.png', 60, 60, 6);
		this.load.spritesheet('I', 'assets/img/letras/letra-I.png', 60, 60, 6);
		this.load.spritesheet('Î', 'assets/img/letras/letra-I1.png', 60, 60, 6); //Î
		this.load.spritesheet('Í', 'assets/img/letras/letra-I2.png', 60, 60, 6); //Í
		this.load.spritesheet('Ì', 'assets/img/letras/letra-I3.png', 60, 60, 6); //Ì
		this.load.spritesheet('J', 'assets/img/letras/letra-J.png', 60, 60, 6);
		this.load.spritesheet('L', 'assets/img/letras/letra-L.png', 60, 60, 6);
		this.load.spritesheet('M', 'assets/img/letras/letra-M.png', 60, 60, 6);
		this.load.spritesheet('N', 'assets/img/letras/letra-N.png', 60, 60, 6);
		this.load.spritesheet('O', 'assets/img/letras/letra-O.png', 60, 60, 6);
		this.load.spritesheet('Õ', 'assets/img/letras/letra-O1.png', 60, 60, 6); //Õ
		this.load.spritesheet('Ô', 'assets/img/letras/letra-O2.png', 60, 60, 6); //Ô
		this.load.spritesheet('Ó', 'assets/img/letras/letra-O3.png', 60, 60, 6); //Ó
		this.load.spritesheet('Ò', 'assets/img/letras/letra-O4.png', 60, 60, 6); //Ò
		this.load.spritesheet('P', 'assets/img/letras/letra-P.png', 60, 60, 6);
		this.load.spritesheet('Q', 'assets/img/letras/letra-Q.png', 60, 60, 6);
		this.load.spritesheet('R', 'assets/img/letras/letra-R.png', 60, 60, 6);
		this.load.spritesheet('S', 'assets/img/letras/letra-S.png', 60, 60, 6);
		this.load.spritesheet('T', 'assets/img/letras/letra-T.png', 60, 60, 6);
		this.load.spritesheet('U', 'assets/img/letras/letra-U.png', 60, 60, 6);
		this.load.spritesheet('Û', 'assets/img/letras/letra-U1.png', 60, 60, 6); //Û
		this.load.spritesheet('Ú', 'assets/img/letras/letra-U2.png', 60, 60, 6); //Ú
		this.load.spritesheet('Ù', 'assets/img/letras/letra-U3.png', 60, 60, 6); //Ù
		this.load.spritesheet('V', 'assets/img/letras/letra-V.png', 60, 60, 6);
		this.load.spritesheet('X', 'assets/img/letras/letra-X.png', 60, 60, 6);
		this.load.spritesheet('Z', 'assets/img/letras/letra-Z.png', 60, 60, 6);
		this.load.spritesheet('Y', 'assets/img/letras/letra-Y.png', 60, 60, 6);
		this.load.spritesheet('W', 'assets/img/letras/letra-W.png', 60, 60, 6);
		this.load.spritesheet('K', 'assets/img/letras/letra-K.png', 60, 60, 6);

	},



	create: function () {
		
		this.state.start('MainMenu');
	},

};
