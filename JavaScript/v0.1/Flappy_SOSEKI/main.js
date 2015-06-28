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

core.fps = 15;
core.onload = function() {
    bear.on('enterframe', function() {
        this.x += 10;
        this.rotate(2); // 2度ずつ回転
        this.scale(1.01, 1.01); // 縦横1.01倍ずつ拡大
        if (this.x > 320) this.x = 0; // 画面からはみ出したらx座標を0に戻す
    });
};
