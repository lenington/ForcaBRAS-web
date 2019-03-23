ForcaBRAS.Game = function (game) {
	
};

ForcaBRAS.Game.prototype = {
	

	create: function () {
		this.add.image(0, 0, 'Backgroud_Game');
	},

	createButton: function(string, x, y, callback){
        var button = this.add.button(x, y, string, callback, this, 1,0,2);
    },

};