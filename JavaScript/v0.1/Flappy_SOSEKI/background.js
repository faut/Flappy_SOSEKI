function background(mv) {
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

}
