ForcaBRAS.EntrarSala = function (game) {
	
};


ForcaBRAS.EntrarSala.prototype = {

	create: function () {
        this.add.image(0, 0, 'entrar_sala');

        console.log(localStorage.getItem("sala_nome"));

	},
};