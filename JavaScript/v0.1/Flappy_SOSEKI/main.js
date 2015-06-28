
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



// 定数宣言
var BS = 3
	,GA = 0.05
    ;

// 変数宣言
var gs = 0;	// ゲームの状態を表す変数 gs=0スタート画面,gs=1ゲーム画面,gs=2死亡描写画面,gs=3ゲームオーバー画面

var BACK1 = new Sprite(900, 800);
var BACK2 = new Sprite(900, 800);
var PIPE = new Sprite(100, 750);
var SOSEKI = new Sprite(50, 25);
var CLICK = new Sprite(400, 100);
var EXIT = new Sprite(125, 50);
var GAMEOVER = new Sprite(300, 300);

	game.onload = function() {
	// 画像読み込み
		BACK1.image = game.assets['img/back1.png'];
		BACK2.image = game.assets['img/back2.png'];
		CLICK.image = game.assets['img/click.png'];
		EXIT.image = game.assets['img/exit.png'];
		GAMEOVER.image = game.assets['img/gameover.png'];
		PIPE.image = game.assets['img/kuma_pipe_400_750.png'];
		SOSEKI.image = game.assets['img/SOSEKI_100x100.png'];


		switch (gs) {
			case 0:
				mv = true;
				firstProcess();
			case 1:
				mv = true;
				startMenu();
				break;
			case 2:
				mv = true;
				gamePlay();
				break;
			case 3:
				mv = false;
				dyingState();
				break;
			case 4:
				mv = false;
				gameOver();
				break;
			default:
				gs = 3;
		}

		setBackground(mv);
        setSOSEKI();
		setScore();
		drawAll()

		function firstProcess() {

			// 初期初期化
			BACK1.x = 0;
			BACK1.y = 0;
			BACK2.x = 900;
			BACK2.y = 0;
			gs = 1;
		}

		function startMenu() {
			var timeCount = 0
				;

		}

		function gamePlay() {
		    var timeCount = 0
		        ;

		}

		function dyingState() {
		    var timeCount = 0
		        ;
		}

		function gameOver() {
		    var timeCount = 0
		        ;

		}

		function resetVariable() {

		}

		function setBackground(mv) {
			SOSEKI.addEventListener('enterframe', function() {
		    // move BG
		    if(mv == true) {
				if(BACK1 >-450) {
		        BACK1.x -= BS;
				}else if(BACK1 < 450) {
				BACK1.x = 900
				}
				if(BACK2 >-450) {
		        BACK2.x -= BS;
				}else if(BACK2 < 450) {
				BACK2.x = 900
				}
		    // stop BG
		} else {
		        BACK1.x = BACK1.x;
		        BACK2.x = BACK2.x;
			}

			});
		}

		function setPipe() {

		    // 障害物描画

		}

		function setSOSEKI() {

		    // 初期画像のフレーム位置の設定
		    SOSEKI.frame = 1;        // 歩行アニメーションの制御用
		    var num = 1        // 5フレームごとに画像を切り替えるための変数
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
		    });
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

		function setScore() {
		    // スコアを表示するラベルを作成
		    var scoreLabel = new Label("SCORE : 0");
		    scoreLabel.font = "16px Tahoma";
		    scoreLabel.color = "red";
		    scoreLabel.x = 10; // X座標
		    scoreLabel.y = 5; // Y座標
		}

		function drawAll() {
			// 背景
			game.rootScene.addChild(BACK1);
			game.rootScene.addChild(BACK2);
			// 障害物

			// 漱石
			game.rootScene.addChild(SOSEKI);

		}
    }
    game.start();
}
