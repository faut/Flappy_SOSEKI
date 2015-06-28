enchant();
window.onload = function() {
	game = new Game(450, 800);
	game.fps = 60;
	game.preload(
		'img/back1.png'
		,'img/back2.png'
        ,'img/title.png'
		,'img/click.png'
		,'img/exit.png'
		,'img/gameover.png'
		,'img/SOSEKI_100x100.png'
		,'img/kuma_pipe_400_750.png'
	);
	game.rootScene.backgroundColor = "#ffffff"; // ゲームの背景色を白色に設定
 	game.score = 0;  // スコアを入れる変数を用意する

    // 定数宣言
    var BS = 3
    	, GA = 0.05
    	;

    // 変数宣言
    var gs = 0;	// ゲームの状態を表す変数 gs=0スタート画面,gs=1ゲーム画面,gs=2死亡描写画面,gs=3ゲームオーバー画面
    var timeCount = 0
        ,　mv = true
        , clickedSTART = false
        , clickedEXIT = false
        , Sx = 125
        , Sy = 375
        ;

	game.onload = function() {
    // 背景
	// 画像読み込み
        //var BackgroundScene = function() {
        //    var scene = new Scene();
            var BackgroundScene = new Scene();
            var BACK1 = new Sprite(900, 800);
    		BACK1.image = game.assets['img/back1.png'];
			BACK1.x = 0;
			BACK1.y = 0;
            BackgroundScene.addChild(BACK1);
            var BACK2 = new Sprite(900, 800);
    		BACK2.image = game.assets['img/back2.png'];
			BACK2.x = 900;
			BACK2.y = 0;
            BackgroundScene.addChild(BACK2);
            if(mv == true) {
                moveBackground();
            } else {
                stopBackground();
            }
            game.pushScene(BackgroundScene);
            return scene;
        };



                var TitleScene = function() {
			mv = true;
            timeCount++;
            var scene = new Scene();
            var TITLE = new Sprite(300, 200);
    		TITLE.image = game.assets['img/title.png'];
				TITLE.x = 75;
				TITLE.y = 100;
            scene.addChild(TITLE);
            var CLICK_S = new Sprite(400, 100);
    		CLICK_S.image = game.assets['img/clickS.png'];
				CLICK_S.x = 25;
				CLICK_S.y = 500;
            scene.addChild(CLICKs);
            var EXIT = new Sprite(125, 50);
            EXIT.image = game.assets['img/exit.png'];
				EXIT.x = 300;
				EXIT.y = 705;
            scene.addChild(EXIT);
            // スタート画像にタッチイベントを設定
            CLICK_S.addEventListener(Event.TOUCH_START, function(e) {
                // 現在表示しているシーンをゲームシーンに置き換える
                game.replaceScene(PlayScene());
                timeCount = 0;
            });

            // タイトルシーンを返します。
            return scene;
        };
        var PlayScene = function() {    // include playGame and dying
			mv = true;
            timeCount = 0;
            timeCount++;
            resetVariable();
            startMenu();

            moveSOSEKI();

            var scene = new Scene();
            var PIPE = new Sprite(100, 750);
    		PIPE.image = game.assets['img/kuma_pipe_400_750.png'];
            scene.addChild(PIPE);

            return scene;
        };
        var OverScene = function() {
			mv = false;
            var timeCount = 0;
            timeCount++;
            var scene = new Scene();

            var GAMEOVER = new Sprite(300, 300);
    		GAMEOVER.image = game.assets['img/gameover.png'];
				GAMEOVER.x = 75;
				GAMEOVER.y = 100;
            scene.addChild(GAMEOVER);

            var CLICK_C = new Sprite(400, 100);
            CLICK_C.image = game.assets['img/clickC.png'];
				CLICK_C.x = 25;
				CLICK_C.y = 500;
            scene.addChild(CLICK);

            var EXIT = new Sprite(125, 50);
            EXIT.image = game.assets['img/exit.png'];
				EXIT.x = 300;
				EXIT.y = 705;
            scene.addChild(EXIT);
            CLICK_C.addEventListener(Event.TOUCH_START, function(e) {
                // 現在表示しているシーンをゲームシーンに置き換える
                game.replaceScene(TitleScene());
                mv = true;
                timeCount = 0;
            });
            return scene;
        };
        var CharaScene = function() {
            var scene = new Scene();
            SOSEKI.image = game.assets['img/SOSEKI_100x100.png'];
            var SOSEKI = new Sprite(50, 25);
            SOSEKI.x = Sx;
            SOSEKI.y = Sy;
            scene.addChild(SOSEKI);
            return scene;
        };
        var ScoreScene = function() {
			// スコアを表示するラベルを作成
			var scoreLabel = new Label("SCORE : 0");
			scoreLabel.font = "16px Tahoma";
			scoreLabel.color = "red";
			scoreLabel.x = 10; // X座標
			scoreLabel.y = 5; // Y座標
            var scene = new Scene();
        scene.addChild(SCORE);
        return scene;
        };


		firstProcession();
        resetVariable();
		startMenu();
		gamePlay();
		dyingState();
		gameOver();
		setScore();
		drawAll()

		function firstProcession() {
		}
		function startMenu() {
            if(timeCount >= 300) {
                mv = false;
            }
		}
		function gamePlay() {
		}
		function dyingState() {
		}
		function gameOver() {
		}
		function resetVariable() {
		}

		function moveBackground() {
			// 背景
			SOSEKI.addEventListener('enterframe', function() {
				// move BG
				BACK1.x -= BS;
				BACK2.x -= BS;
				// 巻き戻し
				if(BACK1.x <= -900) {
					BACK1.x = 900;
				}
				if(BACK2.x <= -900) {
					BACK2.x = 900;
				}
			});
		}

		function stopBackground() {
			// 背景
			BACK1.addEventListener('enterframe', function() {
				   BACK1.x = BACK1.x;
			});
			BACK2.addEventListener('enterframe', function() {
				   BACK2.x = BACK2.x;
			});
			return ;
		}

		function setPipe() {
		}

		function moveSOSEKI() {

			// 初期画像のフレーム位置の設定
			SOSEKI.frame = 1;		// 歩行アニメーションの制御用
			var num = 1		// 5フレームごとに画像を切り替えるための変数
			var count = 0;

			// フレーム処理
			SOSEKI.addEventListener('enterframe', function() {
				if (count == 8)
				{
					count = 0;	// カウンターを戻す
					// 符号を反転させることで規則的に処理をするようにする
					if (SOSEKI.frame == 2 || SOSEKI.frame == 0) {
						num *= -1;
					}
					SOSEKI.frame += num;	// フレームの画像の切り替え
				}
				count++;	// カウンタを進める
	/*		});
			game.addEventListener('enterframe', function() {
    */
                SOSEKI.x = SOSEKI.x += Sx;
                SOSEKI.y = Sy;
			});
		}

		function setScore() {
		}

		function drawAll() {
        }
	}
    */
	game.start();
}
