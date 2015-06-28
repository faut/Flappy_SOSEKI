enchant();
if(location.protocol == 'file:'){
	enchant.ENV.USE_WEBAUDIO = false;
	console.log('1');
}

window.onload = function() {
	var Rectangle = enchant.Class.create({
		initialize: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		},
		right: {
			get: function() {
				return this.x + this.width;
			}
		},
		bottom: {
			get: function() {
				return this.y + this.height;
			}
		}
	});

	var game = new Game(450, 800);
	game.fps = 24;

// GLOUBAL CONSISTENT
var GA = 0.05;	// gravity acceralation
var BG_SPEED = 3;	// background move speed
var S_X 

// GLOUBAL VARIABLE
// game state 
var gs = 0;	// 0 start menu /1 playing /2 dying /3 gameover
// timekeeper
var roopNum = 0;
