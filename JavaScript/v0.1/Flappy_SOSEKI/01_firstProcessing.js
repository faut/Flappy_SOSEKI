//グローバル変数の宣言
function firstProcessing() {

	// 背景描画
    var BACK1 = new Sprite(50, 25);
	BACK1.image = game.assets['img/back1.png'];
    var BACK2 = new Sprite(50, 25);
	BACK2.image = game.assets['img/back2.png'];

    // その他の画像描画
    var CLICK = new Sprite(50, 25);
	CLICK.image = game.assets['img/click.png'];
    var EXIT = new Sprite(50, 25);
	EXIT.image = game.assets['img/exit.png'];
    var GAMEOVER = new Sprite(50, 25);
	GAMEOVER.image = game.assets['img/gameover.png'];

    // 障害物描画
    var PIPE = new Sprite(50, 25);
    PIPE.image = game.assets['img/kuma_pipe_400_750.png'];

    // 自機描画
    var SOSEKI = new Sprite(50, 25);
    SOSEKI.image = game.assets['img/SOSEKI_100x100.png'];


    // 定数宣言
    var bs = 3
        ;

    // 変数宣言
    var gs = 0;	// ゲームの状態を表す変数 gs=0スタート画面,gs=1ゲーム画面,gs=2死亡描写画面,gs=3ゲームオーバー画面

    // 初期設定
    BACK1.x = 0;
    BACK1.y = 0;
    BACK2.x = 0;
    BACK2.y = 0;
}
