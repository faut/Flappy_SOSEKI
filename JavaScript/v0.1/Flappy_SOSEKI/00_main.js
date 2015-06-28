enchant();
window.onload = function() {
    game = new Game(450, 800);
    game.fps = 60;
	game.preload(
		'img/back1.png'
		,'img/back2.png'
		,'img/click.png'
		,'img/exit.png'
		,'img/gameover.png'
		,'img/SOSEKI_100x100.png'
		,'img/kuma_pipe_400_750.png'
	);
	game.rootScene.backgroundColor = "#ffffff"; // ゲームの背景色を白色に設定
 	game.score = 0;  // スコアを入れる変数を用意する
	firstProcessing();

	game.onload = function() {
		switch (gs) {
			case 0:
				startMenu();
				break;
			case 1:
				gamePlay();
				break;
			case 2:
				dyingState();
				break;
			case 3:
				gameOver();
				break;
			default:
				gs = 3;
		}
		background();
        drawSOSEKI();
		drawScore();
    }
    game.start();
}
