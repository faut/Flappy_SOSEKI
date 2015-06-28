enchant();
window.onload = function() {
    game = new Game(450, 800);
    game.fps = 60;
game.preload('img/back.png','img/click.png','img/exit.png','img/gameover.png','img/SOSEKI_100x100.png','img/kuma_pipe_400_750.png');
	game.rootScene.backgroundColor = "#ffffff"; // ゲームの背景色を黒色に設定
 	game.score = 0;  // スコアを入れる変数を用意する
	var gs = 0;	// ゲームの状態を表す変数 gs=0スタート画面,gs=1ゲーム画面,gs=2死亡描写画面,gs=3ゲームオーバー画面
    game.onload = function() {
		switch (gs) {
			case 0:
				startMenu();
				break;
			case 1:
				gamePlay();
				break;
			case 2:
				dying();
				break;
			case 3:
				gameOver();
				break;
			default:
				gs = 3;
		}
		score();
		background();
        drawSOSEKI();
    }
    game.start();
}
