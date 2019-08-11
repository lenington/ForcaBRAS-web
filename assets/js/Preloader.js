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
		this.load.image('Backgroud_Nivel', 'assets/img/menu_itens/TelaNivel.png');
		this.load.image('Backgroud_Escolha', 'assets/img/menu_itens/Escolha.png');
		this.load.image('Backgroud_Personagens', 'assets/img/menu_itens/TelaPersonagens.png');
		this.load.image('Perdeu', 'assets/img/menu_itens/perdeu.png');
		this.load.image('Parabens', 'assets/img/menu_itens/parabens.png');
		this.load.image('criar_sala', 'assets/img/menu_itens/criar_sala.png');
		this.load.image('entrar_sala', 'assets/img/menu_itens/entrar_sala.png');
		this.load.image('escolha_2', 'assets/img/menu_itens/escolha_2.png');
		this.load.image('multiplayer', 'assets/img/menu_itens/multiplayer.png');

		//BALÕES DICA
		this.load.spritesheet('ballon_1', 'assets/img/menu_itens/ballon_1.PNG', 11,50); //bloco grande
		this.load.spritesheet('ballons', 'assets/img/menu_itens/ballonsInOut.PNG', 72,50); //Entrada e saída do balão

		//BOTÕES MENU:
		this.load.spritesheet('play', 'assets/img/menu_itens/play.png', 364,156);
		this.load.spritesheet('play_medio', 'assets/img/menu_itens/play_medio.png', 208,99);
		this.load.spritesheet('sobre', 'assets/img/menu_itens/sobre.png', 364,156);
		this.load.spritesheet('voltar', 'assets/img/menu_itens/voltar.png', 364,156);
		this.load.spritesheet('voltar_menor', 'assets/img/menu_itens/voltar-menor.png', 213,91);
		this.load.spritesheet('alfabeto', 'assets/img/menu_itens/alfabeto.png', 364,156);
		this.load.spritesheet('numerais', 'assets/img/menu_itens/numerais.png', 364,156);
		this.load.spritesheet('facil', 'assets/img/menu_itens/normal.png', 364,156);
		this.load.spritesheet('dificil', 'assets/img/menu_itens/dificil.png', 364,156);
		this.load.spritesheet('1_player', 'assets/img/menu_itens/solo.png', 364,156);
		this.load.spritesheet('2_players', 'assets/img/menu_itens/1v1.png', 364,156);
		this.load.spritesheet('entrar', 'assets/img/menu_itens/entrar.png', 364,156);
		this.load.spritesheet('criar', 'assets/img/menu_itens/criar.png', 364,156);

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

		//BOTÕES ALFABETO: FÁCIL
		this.load.spritesheet('Af', 'assets/img/letras/letra-A.png', 60, 60, 6);
		this.load.spritesheet('Bf', 'assets/img/letras/letra-B.png', 60, 60, 6);
		this.load.spritesheet('Cf', 'assets/img/letras/letra-C.png', 60, 60, 6);
		this.load.spritesheet('Df', 'assets/img/letras/letra-D.png', 60, 60, 6);
		this.load.spritesheet('Ef', 'assets/img/letras/letra-E.png', 60, 60, 6);
		this.load.spritesheet('Ff', 'assets/img/letras/letra-F.png', 60, 60, 6);
		this.load.spritesheet('Gf', 'assets/img/letras/letra-G.png', 60, 60, 6);
		this.load.spritesheet('Hf', 'assets/img/letras/letra-H.png', 60, 60, 6);
		this.load.spritesheet('If', 'assets/img/letras/letra-I.png', 60, 60, 6);
		this.load.spritesheet('Jf', 'assets/img/letras/letra-J.png', 60, 60, 6);
		this.load.spritesheet('Lf', 'assets/img/letras/letra-L.png', 60, 60, 6);
		this.load.spritesheet('Mf', 'assets/img/letras/letra-M.png', 60, 60, 6);
		this.load.spritesheet('Nf', 'assets/img/letras/letra-N.png', 60, 60, 6);
		this.load.spritesheet('Of', 'assets/img/letras/letra-O.png', 60, 60, 6);
		this.load.spritesheet('Pf', 'assets/img/letras/letra-P.png', 60, 60, 6);
		this.load.spritesheet('Qf', 'assets/img/letras/letra-Q.png', 60, 60, 6);
		this.load.spritesheet('Rf', 'assets/img/letras/letra-R.png', 60, 60, 6);
		this.load.spritesheet('Sf', 'assets/img/letras/letra-S.png', 60, 60, 6);
		this.load.spritesheet('Tf', 'assets/img/letras/letra-T.png', 60, 60, 6);
		this.load.spritesheet('Uf', 'assets/img/letras/letra-U.png', 60, 60, 6);
		this.load.spritesheet('Vf', 'assets/img/letras/letra-V.png', 60, 60, 6);
		this.load.spritesheet('Xf', 'assets/img/letras/letra-X.png', 60, 60, 6);
		this.load.spritesheet('Zf', 'assets/img/letras/letra-Z.png', 60, 60, 6);
		this.load.spritesheet('Yf', 'assets/img/letras/letra-Y.png', 60, 60, 6);
		this.load.spritesheet('Wf', 'assets/img/letras/letra-W.png', 60, 60, 6);
		this.load.spritesheet('Kf', 'assets/img/letras/letra-K.png', 60, 60, 6);

		//BOTÕES ALFABETO: DIFÍCIL
		this.load.spritesheet('Ad', 'assets/img/letras/dificil/letra-A.png', 60, 60, 6);
		this.load.spritesheet('Bd', 'assets/img/letras/dificil/letra-B.png', 60, 60, 6);
		this.load.spritesheet('Cd', 'assets/img/letras/dificil/letra-C.png', 60, 60, 6);
		this.load.spritesheet('Dd', 'assets/img/letras/dificil/letra-D.png', 60, 60, 6);
		this.load.spritesheet('Ed', 'assets/img/letras/dificil/letra-E.png', 60, 60, 6);
		this.load.spritesheet('Fd', 'assets/img/letras/dificil/letra-F.png', 60, 60, 6);
		this.load.spritesheet('Gd', 'assets/img/letras/dificil/letra-G.png', 60, 60, 6);
		this.load.spritesheet('Hd', 'assets/img/letras/dificil/letra-H.png', 60, 60, 6);
		this.load.spritesheet('Id', 'assets/img/letras/dificil/letra-I.png', 60, 60, 6);
		this.load.spritesheet('Jd', 'assets/img/letras/dificil/letra-J.png', 60, 60, 6);
		this.load.spritesheet('Ld', 'assets/img/letras/dificil/letra-L.png', 60, 60, 6);
		this.load.spritesheet('Md', 'assets/img/letras/dificil/letra-M.png', 60, 60, 6);
		this.load.spritesheet('Nd', 'assets/img/letras/dificil/letra-N.png', 60, 60, 6);
		this.load.spritesheet('Od', 'assets/img/letras/dificil/letra-O.png', 60, 60, 6);
		this.load.spritesheet('Pd', 'assets/img/letras/dificil/letra-P.png', 60, 60, 6);
		this.load.spritesheet('Qd', 'assets/img/letras/dificil/letra-Q.png', 60, 60, 6);
		this.load.spritesheet('Rd', 'assets/img/letras/dificil/letra-R.png', 60, 60, 6);
		this.load.spritesheet('Sd', 'assets/img/letras/dificil/letra-S.png', 60, 60, 6);
		this.load.spritesheet('Td', 'assets/img/letras/dificil/letra-T.png', 60, 60, 6);
		this.load.spritesheet('Ud', 'assets/img/letras/dificil/letra-U.png', 60, 60, 6);
		this.load.spritesheet('Vd', 'assets/img/letras/dificil/letra-V.png', 60, 60, 6);
		this.load.spritesheet('Xd', 'assets/img/letras/dificil/letra-X.png', 60, 60, 6);
		this.load.spritesheet('Zd', 'assets/img/letras/dificil/letra-Z.png', 60, 60, 6);
		this.load.spritesheet('Yd', 'assets/img/letras/dificil/letra-Y.png', 60, 60, 6);
		this.load.spritesheet('Wd', 'assets/img/letras/dificil/letra-W.png', 60, 60, 6);
		this.load.spritesheet('Kd', 'assets/img/letras/dificil/letra-K.png', 60, 60, 6);
		
		//LETRAS COM ACENTO
		this.load.spritesheet('Ã', 'assets/img/letras/letra-A1.png', 60, 60, 6); //Ã
		this.load.spritesheet('Â', 'assets/img/letras/letra-A2.png', 60, 60, 6); //Â
		this.load.spritesheet('Á', 'assets/img/letras/letra-A3.png', 60, 60, 6); //Á
		this.load.spritesheet('À', 'assets/img/letras/letra-A4.png', 60, 60, 6); //À
		this.load.spritesheet('Ç', 'assets/img/letras/letra-C1.png', 60, 60, 6); //Ç
		this.load.spritesheet('Ê', 'assets/img/letras/letra-E1.png', 60, 60, 6); //Ê
		this.load.spritesheet('É', 'assets/img/letras/letra-E2.png', 60, 60, 6); //É
		this.load.spritesheet('È', 'assets/img/letras/letra-E3.png', 60, 60, 6); //È
		this.load.spritesheet('Î', 'assets/img/letras/letra-I1.png', 60, 60, 6); //Î
		this.load.spritesheet('Í', 'assets/img/letras/letra-I2.png', 60, 60, 6); //Í
		this.load.spritesheet('Ì', 'assets/img/letras/letra-I3.png', 60, 60, 6); //Ì
		this.load.spritesheet('Õ', 'assets/img/letras/letra-O1.png', 60, 60, 6); //Õ
		this.load.spritesheet('Ô', 'assets/img/letras/letra-O2.png', 60, 60, 6); //Ô
		this.load.spritesheet('Ó', 'assets/img/letras/letra-O3.png', 60, 60, 6); //Ó
		this.load.spritesheet('Ò', 'assets/img/letras/letra-O4.png', 60, 60, 6); //Ò
		this.load.spritesheet('Û', 'assets/img/letras/letra-U1.png', 60, 60, 6); //Û
		this.load.spritesheet('Ú', 'assets/img/letras/letra-U2.png', 60, 60, 6); //Ú
		this.load.spritesheet('Ù', 'assets/img/letras/letra-U3.png', 60, 60, 6); //Ù

		//LETRAS OCULTAS
		this.load.spritesheet('a', 'assets/img/letras/palavra/a.png', 60, 60, 2);
		this.load.spritesheet('b', 'assets/img/letras/palavra/b.png', 60, 60, 2);
		this.load.spritesheet('c', 'assets/img/letras/palavra/c.png', 60, 60, 2);
		this.load.spritesheet('d', 'assets/img/letras/palavra/d.png', 60, 60, 2);
		this.load.spritesheet('e', 'assets/img/letras/palavra/e.png', 60, 60, 2);
		this.load.spritesheet('f', 'assets/img/letras/palavra/f.png', 60, 60, 2);
		this.load.spritesheet('g', 'assets/img/letras/palavra/g.png', 60, 60, 2);
		this.load.spritesheet('h', 'assets/img/letras/palavra/h.png', 60, 60, 2);
		this.load.spritesheet('i', 'assets/img/letras/palavra/i.png', 60, 60, 2);
		this.load.spritesheet('j', 'assets/img/letras/palavra/j.png', 60, 60, 2);
		this.load.spritesheet('l', 'assets/img/letras/palavra/l.png', 60, 60, 2);
		this.load.spritesheet('m', 'assets/img/letras/palavra/m.png', 60, 60, 2);
		this.load.spritesheet('n', 'assets/img/letras/palavra/n.png', 60, 60, 2);
		this.load.spritesheet('o', 'assets/img/letras/palavra/o.png', 60, 60, 2);
		this.load.spritesheet('p', 'assets/img/letras/palavra/p.png', 60, 60, 2);
		this.load.spritesheet('q', 'assets/img/letras/palavra/q.png', 60, 60, 2);
		this.load.spritesheet('r', 'assets/img/letras/palavra/r.png', 60, 60, 2);
		this.load.spritesheet('s', 'assets/img/letras/palavra/s.png', 60, 60, 2);
		this.load.spritesheet('t', 'assets/img/letras/palavra/t.png', 60, 60, 2);
		this.load.spritesheet('u', 'assets/img/letras/palavra/u.png', 60, 60, 2);
		this.load.spritesheet('v', 'assets/img/letras/palavra/v.png', 60, 60, 2);
		this.load.spritesheet('x', 'assets/img/letras/palavra/x.png', 60, 60, 2);
		this.load.spritesheet('z', 'assets/img/letras/palavra/z.png', 60, 60, 2);
		this.load.spritesheet('y', 'assets/img/letras/palavra/w.png', 60, 60, 2);
		this.load.spritesheet('w', 'assets/img/letras/palavra/w.png', 60, 60, 2);
		this.load.spritesheet('k', 'assets/img/letras/palavra/k.png', 60, 60, 2);

		this.load.spritesheet('ã', 'assets/img/letras/palavra/a1.png', 60, 60, 2); //Ã
		this.load.spritesheet('â', 'assets/img/letras/palavra/a2.png', 60, 60, 2); //Â
		this.load.spritesheet('á', 'assets/img/letras/palavra/a3.png', 60, 60, 2); //Á
		this.load.spritesheet('à', 'assets/img/letras/palavra/a4.png', 60, 60, 2); //À
		this.load.spritesheet('ç', 'assets/img/letras/palavra/c1.png', 60, 60, 2); //Ç
		this.load.spritesheet('ê', 'assets/img/letras/palavra/e1.png', 60, 60, 2); //Ê
		this.load.spritesheet('é', 'assets/img/letras/palavra/e2.png', 60, 60, 2); //É
		this.load.spritesheet('è', 'assets/img/letras/palavra/e3.png', 60, 60, 2); //È
		this.load.spritesheet('î', 'assets/img/letras/palavra/i1.png', 60, 60, 2); //Î
		this.load.spritesheet('í', 'assets/img/letras/palavra/i2.png', 60, 60, 2); //Í
		this.load.spritesheet('ì', 'assets/img/letras/palavra/i3.png', 60, 60, 2); //Ì
		this.load.spritesheet('õ', 'assets/img/letras/palavra/o1.png', 60, 60, 2); //Õ
		this.load.spritesheet('ô', 'assets/img/letras/palavra/o2.png', 60, 60, 2); //Ô
		this.load.spritesheet('ó', 'assets/img/letras/palavra/o3.png', 60, 60, 2); //Ó
		this.load.spritesheet('ò', 'assets/img/letras/palavra/o4.png', 60, 60, 2); //Ò
		this.load.spritesheet('û', 'assets/img/letras/palavra/u1.png', 60, 60, 2); //Û
		this.load.spritesheet('ú', 'assets/img/letras/palavra/u2.png', 60, 60, 2); //Ú
		this.load.spritesheet('ù', 'assets/img/letras/palavra/u3.png', 60, 60, 2); //Ù
	},

	create: function () {
		this.state.start('MainMenu');
	},

};
