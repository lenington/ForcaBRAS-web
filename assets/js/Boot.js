//VARIAVEIS GLOBAIS
var personagem; //personagem selecionado para durante o jogo
var sprite_personagem; //sprite do personagem
var palavras = []; //(ArrayList) banco de dados para todas as palavras
var salas = [];
var firebaseRef; //variável para o Firebase (Google)
var escolha_fase; //tipos de fases: Numerais, Alfabeto
var escolha_nivel; //tipos de níveis: Fácil, Difícil
var multiplayer;
var escolha_multiplayer;

ForcaBRAS = {
	
};

ForcaBRAS.Boot = function (game) {
};

ForcaBRAS.Boot.prototype = {
	preload: function () {
		
	},
	
	create: function () {
		this.state.start('Preloader');
	}

}