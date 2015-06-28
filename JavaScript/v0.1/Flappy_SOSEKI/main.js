enchant();
window.onload = function() {
    game = new Game(450, 800);
    game.fps = 60;
game.preload('img/back.png','img/click.png','img/exit.png','img/gameover.png','img/SOSEKI_100x100.png','img/kuma_pipe_400_750.png');
	game.rootScene.backgroundColor = "#ffffff"; // ゲームの背景色を黒色に設定
 	game.score = 0;  // スコアを入れる変数を用意する
	 // スコアを表示するラベルを作成
	 var scoreLabel = new Label("SCORE : 0");
	 scoreLabel.font = "16px Tahoma";
	 scoreLabel.color = "red";
	 scoreLabel.x = 10; // X座標
	 scoreLabel.y = 5; // Y座標
    game.onload = function() {
        var SOSEKI = new Sprite(50, 25);
        SOSEKI.image = game.assets['img/SOSEKI_100x100.png'];
	        var BACK1 = new Sprite(50, 25);
		BACK1.image = game.assets['img/back.png'];
	        var BACK2 = new Sprite(50, 25);
		BACK2.image = game.assets['img/back.png'];
	        var CLICK = new Sprite(50, 25);
		CLICK.image = game.assets['img/click.png'];
	        var EXIT = new Sprite(50, 25);
		EXIT.image = game.assets['img/exit.png'];
	        var GAMEOVER = new Sprite(50, 25);
		GAMEOVER.image = game.assets['img/gameover.png'];
	        var PIPE = new Sprite(50, 25);
		PIPE.image = game.assets['img/kuma_pipe_400_750.png'];

        game.rootScene.addChild(SOSEKI);
        game.addEventListener('enterframe', function() {
			if(SOSEKI.y<1 && SOSEKI.x<350){
            SOSEKI.x += 3;

		}else if(SOSEKI.y<=620 && SOSEKI.x>350)	{
			SOSEKI.y += 3;
		}else if(SOSEKI.y>620 && SOSEKI.x >0) {
			SOSEKI.x -= 3;
		}else if(SOSEKI.y>0 && SOSEKI.x == 0) {
			SOSEKI.y -= 3;
		}
    	});
    }
    game.start();
}
