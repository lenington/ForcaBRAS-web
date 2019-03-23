ForcaBRAS.TesteSprite = function (game) {
	
};

var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
var alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
'U','V','W','X','Y','Z'];
var botoes = []; //array de objetos de botões (Phaser.Button)
var teste = 0;

ForcaBRAS.TesteSprite.prototype = {

	create: function () {
		this.add.image(0, 0, 'Backgroud_Game');
		//this.add.image(100, 385, 'Teclado');
		this.add.image(0.5, 0.5, 'Teclado');

        sprite_personagem = this.add.sprite(100, 100, personagem);
		sprite_personagem.frame = 0;
		
		this.add.button(525, 195, 'play', this.changeSprite, this, 1,0,2);

		this.addBotoesTeclado();
	},

	changeSprite: function() {
		teste = teste + 1;
		sprite_personagem.frame = teste;

		if(teste == 6) teste = 0;
	},

	verificaLetra: function(botao, letra) {
		var frame = 3; //frame para certo (3) ou errado (4)
		//DO SOMETING...
		return frame;
	},

	addBotoesTeclado: function() {
		var x = 125; var y = 395; var espacamento = 64;

		A = this.add.button(x, y, 'A', function(){
			var frame = this.verificaLetra(A, 'A');
			A.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		B = this.add.button(x, y, 'B', function(){
			var frame = this.verificaLetra(B, 'B');
			B.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		C = this.add.button(x, y, 'C', function(){
			var frame = this.verificaLetra(C, 'C');
			C.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		D = this.add.button(x, y, 'D', function(){
			var frame = this.verificaLetra(D, 'D');
			D.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		E = this.add.button(x, y, 'E', function(){
			var frame = this.verificaLetra(E, 'E');
			E.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		F = this.add.button(x, y, 'F', function(){
			var frame = this.verificaLetra(F, 'F');
			F.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		G = this.add.button(x, y, 'G', function(){
			var frame = this.verificaLetra(G, 'G');
			G.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		H = this.add.button(x, y, 'H', function(){
			var frame = this.verificaLetra(H, 'H');
			H.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		I = this.add.button(x, y, 'I', function(){
			var frame = this.verificaLetra(I, 'I');
			I.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		J = this.add.button(x, y, 'J', function(){
			var frame = this.verificaLetra(J, 'J');
			J.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		K = this.add.button(x, y, 'K', function(){
			var frame = this.verificaLetra(K, 'K');
			K.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		L = this.add.button(x, y, 'L', function(){
			var frame = this.verificaLetra(L, 'L');
			L.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		M = this.add.button(x, y, 'M', function(){
			var frame = this.verificaLetra(M, 'M');
			M.setFrames(frame);

		}, this, 1,0,2);

		
		y = y + espacamento; x = 125;

		N = this.add.button(x, y, 'N', function(){
			var frame = this.verificaLetra(N, 'N');
			N.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		O = this.add.button(x, y, 'O', function(){
			var frame = this.verificaLetra(O, 'O');
			O.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		P = this.add.button(x, y, 'P', function(){
			var frame = this.verificaLetra(P, 'P');
			P.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		Q = this.add.button(x, y, 'Q', function(){
			var frame = this.verificaLetra(Q, 'Q');
			Q.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		R = this.add.button(x, y, 'R', function(){
			var frame = this.verificaLetra(R, 'R');
			R.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		S = this.add.button(x, y, 'S', function(){
			var frame = this.verificaLetra(S, 'S');
			S.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		T = this.add.button(x, y, 'T', function(){
			var frame = this.verificaLetra(T, 'T');
			T.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		U = this.add.button(x, y, 'U', function(){
			var frame = this.verificaLetra(U, 'U');
			U.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		V = this.add.button(x, y, 'V', function(){
			var frame = this.verificaLetra(V, 'V');
			V.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		W = this.add.button(x, y, 'W', function(){
			var frame = this.verificaLetra(W, 'W');
			W.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		X = this.add.button(x, y, 'X', function(){
			var frame = this.verificaLetra(X, 'X');
			X.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		Y = this.add.button(x, y, 'Y', function(){
			var frame = this.verificaLetra(Y, 'Y');
			Y.setFrames(frame);

		}, this, 1,0,2);

		x = x + espacamento;

		Z = this.add.button(x, y, 'Z', function(){
			var frame = this.verificaLetra(Z, 'Z');
			Z.setFrames(frame);

		}, this, 1,0,2);

	},

};