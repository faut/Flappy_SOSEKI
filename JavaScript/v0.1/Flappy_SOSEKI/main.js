enchant();
window.onload = function() {
    game = new Game(450, 800);
    game.fps = 60;
    game.preload('img/SOSEKI_100x100.png');
    game.onload = function() {
        var sprite = new Sprite(50, 25);
        sprite.image = game.assets['img/SOSEKI_100x100.png'];
        game.rootScene.addChild(sprite);
        game.addEventListener('enterframe', function() {
			if(sprite.y<1 && sprite.x<350){
            sprite.x += 3;
		}else if(sprite.y<=620 && sprite.x>350)	{
			sprite.y += 3;
		}else if(sprite.y>620 && sprite.x >0) {
			sprite.x -= 3;
		}else if(sprite.y>0 && sprite.x == 0) {
			sprite.y -= 3;
		}
    	});
    }
    game.start();
}
