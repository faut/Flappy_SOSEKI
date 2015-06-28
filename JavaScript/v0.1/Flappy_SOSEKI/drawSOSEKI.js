function drawSOSEKI() {
    // 自機表示
    var SOSEKI = new Sprite(50, 25);
    SOSEKI.image = game.assets['img/SOSEKI_100x100.png'];

    // 初期画像のフレーム位置の設定
    SOSEKI.frame = 1;        // 歩行アニメーションの制御用
    var num = 1        // 5フレームごとに画像を切り替えるための変数
    var count = 0;

    // フレーム処理
    SOSEKI.addEventListener('enterframe', function() {
        if (count == 5)
        {
            count = 0;	// カウンターを戻す
            // 符号を反転させることで規則的に処理をするようにする
            if (SOSEKI.frame == 2 || SOSEKI.frame == 0) {
                num *= -1;
            }
            SOSEKI.frame += num;	// フレームの画像の切り替え
        }
        count++;	// カウンタを進める
    });
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
