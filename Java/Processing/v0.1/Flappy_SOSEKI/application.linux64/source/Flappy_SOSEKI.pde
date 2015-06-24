
// image object
PImage back1;
PImage back2;
PImage title;
PImage click;
PImage clickC;
PImage pEXIT;  // exit is reserverd. so I use pEXIT.
PImage gameover;
PImage kumamon1;
PImage kumamon2;
PImage kumamon3;
PImage kumamon4;
PImage soseki_fan1;
PImage soseki_fan2;
PImage soseki_fan3;
PImage soseki_fan4;
PImage soseki_fire1;
PImage soseki_fire2;
PImage soseki_fire3;
PImage soseki_fire4;

// set constants
int bs = 2;  // back image move speed

//float cSx, cSy, deg;  // SOSEKI image center X,Y position and lotate degree
float Sx = 150;  // SOSEKI X position
float tSx = 150;  // temporary SOSEKI X position for bound()
float Sy = 400;  // SOSEKI Y posirion (initial)
int Simx;  // SOSEKI fire middle X position for colision
int Simy;  // SOSEKI fire middle Y position for colision
int Samx;  // SOSEKI fan middle X position for colision
int Samy;  // SOSEKI fan middle Y position for colision
int Scx;  // SOSEKI fan middle X center position for colision
int Scy;  // SOSEKI fan middle Y center position for colision
int Sup = 6;  // SOSEKI Y up acceleration
float Sys = 0;  // SOSEKI Y speed
float SysMAX= 5.5;  // SOSEKI Y MAX speed
float GA = 0.04;  // Gravity acceleration
int fd = 600;  // Flight duration ( frame )
boolean fire = false;  // SOSEKI erupt fire or not

// set variable
int gs = 0;  // game state ; 0=start menue : 1=playing : 2=gameover
boolean life = true; // when SOSEKI die, life = false;
int pipe_no ; // kumamon pipe for colision
int bos = 0;  // bound state / 0 = noting / 1 = fall on ground / 2 = hit pipe /
int cby = 0;  // count touch ground

int b1x = 0;  // backgournd image back1 initial position
int db1x;  // backgournd image back1 apparent position
int b2x = 1801;  // backgournd image back2 initial position
int db2x;  // backgournd image back2 apparent position
int bxt;  // temporarily value of background move X position
int bxpt1 = 0;  // temporarily value of background move X position for pipe1
int bxpt2 = -60;  // temporarily value of background move X position for pipe2
int bxpt3 = -90;  // temporarily value of background move X position for pipe3
int bxc;  // count value of background move
int bxcs = 650;  // count value of background move for score

int pipe1;  // random kumamon pipe1 variable
int pipe2;  // random kumamon pipe2 variable
int pipe3;  // random kumamon pipe3 variable
int pc;  // kumamon pipe count variable
int kpx1 = 600;  // kumamon pipe 1 x position
int kpx2 = 820;  // = kpx1 + 100 + sp  // kumamon pipe 2 x position
int kpx3 = 1040;  // = kpx2 + 100 + sp  // kumamon pipe 2 x position
int dkpx1;  // kumamon pipe 1 x position
int dkpx2;  // = kpx1 + 100 + sp  // kumamon pipe 2 x position
int dkpx3;  // = kpx2 + 100 + sp  // kumamon pipe 2 x position
int sp = 120;  // spacing of pipe
int kpvv;  // most near pipe tipefor collision detection
int kpxn;  // most near pipe tipefor collision detection
int cs = 10;  // colision size

boolean mc = false;  // mouse click true or false
int score = 0;  // score
int score_pipe;
int scoreMAX = 0;  // max score
int best;  // best score
long t;  //time keeper
long jt;  //time keeper for jump
long ft;  //time keeper for SOSEKI fan
long et;  //time keeper for SOSEKI effect
long dt;  //time keeper for gravity
long kt;  //time keeper for kill()
long sec;  // second (t / frame rate)

boolean deb = false;
int kiyh;
int kiyl;


/////////////////////////////////////////////////
//  SETUP FUNCTION
/////////////////////////////////////////////////

void setup() {
  size(450,800);
  // load images
  back1 = loadImage("back.png");
  back2 = loadImage("back.png");
  title = loadImage("title.png");
  click = loadImage("click.png");
  pEXIT = loadImage("exit.png");
  gameover = loadImage("gameover.png");
  clickC = loadImage("continue.png");
  kumamon1 = loadImage("kuma_pipe1.png");
  kumamon2 = loadImage("kuma_pipe2.png");
  kumamon3 = loadImage("kuma_pipe3.png");
  kumamon4 = loadImage("kuma_pipe4.png");
  soseki_fan1 = loadImage("SOSEKI_52x25_fan1.png");
  soseki_fan2 = loadImage("SOSEKI_52x25_fan2.png");
  soseki_fan3 = loadImage("SOSEKI_52x25_fan3.png");
  soseki_fan4 = loadImage("SOSEKI_52x25_fan4.png");
  soseki_fire1 = loadImage("SOSEKI_52x25_fire1.png");
  soseki_fire2 = loadImage("SOSEKI_52x25_fire2.png");
  soseki_fire3 = loadImage("SOSEKI_52x25_fire3.png");
  soseki_fire4 = loadImage("SOSEKI_52x25_fire4.png");
}

/////////////////////////////////////////////////
//  DISPLAY DRAWING
/////////////////////////////////////////////////

void draw() {
  // count draw() roop
  timecount();
  
  // move background image
  if(gs <= 1) {
    move_background();
  }
  /////////////////////////////////////////////////
  //  GAME PLAY PROCESS  / gs=0, gs=1, gs=2, gs=3
  /////////////////////////////////////////////////
  // diveide process by gama state valiable
  switch(gs) {
    case 0:  // start menu state (game state 0)
      gs0_processing();
      break;
    case 1:  // playing state (game state 1)
      gs1_processing();
      break;
    case 2:  // dieing state (game state 2)
      gs2_processing();
      break;
    case 3:  // gameover state (game state 3)
      gs3_processing();
      break;
    default:
      gs = 3;
      break;
  }
  
  // debag
  debag();
  // draw SOSEKI
  Draw_SOSEKI();
  // draw score
  score();
  
}

void mouseClicked() {
  mc = true;
}

/////////////////////////////////////////////////
//  SELF MADE FUNCTIONS
/////////////////////////////////////////////////

// SEE Flow chart.txt

void timecount() {
  t++;
  jt++;
  et++;
  ft++;
  dt++;
  
  if(gs == 1) {
    bxpt1++;
    bxpt2++;
    bxpt3++;
    bxcs -= bs;
  }
  if(gs == 1 | gs == 2) {
    kpx1 -= bs;
    kpx2 -= bs;
    kpx3 -= bs;
  }
}

void move_background() {
  // when game state is "not" gameover, move background image.
  // move same 2 images "alternately".
  if(gs != 2) {
    // back1 move (b1x initial = 0)
    if(b1x >= -1800) {
      image(back1,b1x,0);
      b1x -= bs;
    } else {  // when back1 off, move behind back2.
      b1x = 1801;
    }
    
    // back2 move (b2x initial = 1801)
    if(b2x >= -1800) {
      image(back2,b2x,0);
      b2x -= bs;
    } else {  // when back2 off, move behind back1.
      b2x = 1801;
    }
  }
  bxc -= bs;
}

void stop_background() {
  // stop back groumd image
  db1x = b1x;
  db2x = b2x;
  
  image(back1,b1x,0);
  image(back2,b2x,0);
  
  kuma_pipe_draw();
}

// start menue state (game state 0)
void gs0_processing() {
  // load image
  Sx = 150;
  Sy = 400;
  image(title,75,75);
  image(click,25,500);
  image(pEXIT,300,700);
  fire = true;
  // when clicked "exit", exit program.
  if(mouseX>=300 && mouseX<=425 && mouseY>=700 && mouseY<=750) {
    if(mc == true) {
      exit();
    }
  }
  // when clicked the area other than "exit" image, start game.
  else if(mc == true) {
    gs = 1;  // chenge game state to gs=1(playing).
    bxcs = bxc + 200;
    bxt = bxc;
    bxpt1 = bxc;
    bxpt2 = bxc;
    RV();
    // on starting, jump 1 time
    jump();
  }
}


void RV() {
// restet variable
  t = 0;
  dt = 0;
  ft = 0;
  et = 0;
  jt = 0;
  kt = 0;
  cby =0;
  
  Sx = 150;
  Sy = 400;
  bxpt1 = 0;
  bxpt2 = -60;
  kpx1 = 600;
  kpx2 = 820;
  kpx3 = 1040;
  bxcs = 650;
  score = 0;
  life = true;
  fire = true;
  kpvv = 0;
}

void jump() {
  if(mc == true) {
    jt = 0;
    dt = 0;
    Sys = Sup * (-1);
    fire = true;
    mc = false;
  }
  if(jt < 30) {
    fire = true;
  } else {
    fire = false;
  }
  
}

// playing game state (game state 1)
void gs1_processing() {
  // pop up kumamon pipes
  kuma_pipe();  // determin pipe position
  kuma_pipe_draw();  // draw pipe
  
  // behavior when SOSEKI is in "un"movable area
  if(Sy < 0) {  // SOSEKI don't go "x <= 0"
    Sy = 0;
    Sys = 6;  // bound to lower direction
  } else if(Sy >= 700){  // when SOSEKI fall on ground, SOSEKI kick the bucket.
    bos = 1;
    cby++;
    kill();
    dt = 0;
  }
  
  // when SOSEKI is in movable area
  else /* ## if(Sy >= 0 && Sy < 700) ## */{
    // in this area, SOSEKI can jump to click
    jump();
    
    // when the speed of SOSEKI, remove Gravity.
    if(Sys >= SysMAX) {
      Sys = SysMAX;
    }
    // (else) SOSEKI is in Gravity.
    else {
      if(Sys != 0) {
        Sys += GA * dt / 2;
      }
      // flight duration
      else if(dt > fd){
        Sys += GA * dt / 2;
      }
    }
  Sy += Sys;
  }
  collision();
}

void kuma_pipe() {
/*
    600   700    820   920    1040  1140   1260  1360   1520  1620   1740  1840   1960  2090   2210  2330   2450  2570   2690
    |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |      ≈
    |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |      ≈
    | kuma|      | kuma|      | kuma|      | kuma|      | kuma|      | kuma|      | kuma|      | kuma|      | kuma|      | kuma ≈
    |  p1 |      |  p2 |      |  p3 |      | p1' |      | p2' |      | p3' |      | p1" |      | p2" |      | p3" |      | p1   ≈
sp  | 100 |  sp  | 100 |  sp  | 100 |  sp  | 100 |  sp  | 100 |  sp  | 100 |  sp  | 100 |  sp  | 100 |  sp  | 100 |  sp  | 100  ≈
    |     |  120 |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |      ≈
    |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |      ≈
    |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |     |      |      ≈
    kpx1         kpx2         kpx3         kpx1'        kpx2'        kpx3'        kpx1"        kpx2"        kpx3"        kpx1
    |<-------- 100*3+sp*3 = 660 ---------->|            |            |
    |<--100+sp-->|<------------ 100*3+sp*3 ------------>|            |
    |<------ 100*2+sp*2 ----->|<------------ 100*3+sp*3 ------------>|
*/

  // draw pipe1 per pre-pipe1 go out of window
  if(kpx1 <= -100) {
    bxpt1 = 0;
    // pop up behind pipe 3
    kpx1 = 100 * 3 + sp * 3;  // sp is Distance of pipes
  }
  // draw pipe2 per pre-pipe2 go out of window
  if(kpx2 <= -100) {
    bxpt2 = 0;
    // pop up behind pipe 1
    kpx2 = 100 * 3 + sp * 3;
  }
  // draw pipe3 per pre-pipe3 go out of window
  if(kpx3 <= -100) {
    bxpt3 = 0;
    // pop up behind pipe 2
    kpx3 = 100 * 3 + sp * 3;  // sp is Distance of pipes
  }
  dkpx1 = kpx1;
  dkpx2 = kpx2;
  dkpx3 = kpx3;
}

void kuma_pipe_draw() {
  if(dkpx1 == 450) {
    // choose a pipe from 4 pipe and draw
    pipe1 = (int)random(4);
  } else if(dkpx2 == 450) {
    // choose a pipe from 4 pipe and draw
    pipe2 = 4 - (int)random(8) / 2;
  } else if(dkpx3 == 450) {
    // choose a pipe from 4 pipe and draw
    pipe3 = (int)random(12) / 3;
  }
  switch(pipe1) {
    case 0:
      image(kumamon1,dkpx1,0);
      break;
    case 1:
      image(kumamon2,dkpx1,0);
      break;
    case 2:
      image(kumamon3,dkpx1,0);
      break;
    case 3:
      image(kumamon4,dkpx1,0);
      break;
    default:
      deb = true;
      pipe1 = 0;
      break;
  }
  switch(pipe2) {
    case 0:
      image(kumamon1,dkpx2,0);
      break;
    case 1:
      image(kumamon2,dkpx2,0);
      break;
    case 2:
      image(kumamon3,dkpx2,0);
      break;
    case 3:
      image(kumamon4,dkpx2,0);
      break;
    default:
      pipe2 = 0;
      break;
  }
  switch(pipe3) {
    case 0:
      image(kumamon1,dkpx3,0);
      break;
    case 1:
      image(kumamon2,dkpx3,0);
      break;
    case 2:
      image(kumamon3,dkpx3,0);
      break;
    case 3:
      image(kumamon4,dkpx3,0);
      break;
    default:
      pipe3 = 0;
      break;
  }
}

void collision() {
  // (Scx,Scy) is center of the SOSEKI collision area.
  // Scx' +- cs', Scy' +- cs' is collision area.
  
  // X
  // kpxn' is most near kuma_pipe x position.
  // kpvv' is most near pipe type from 3 pipe.
  if(dkpx1 < (Scx + cs*2) && (dkpx1+100) > (Scx - cs*2)) {
    kpxn = dkpx1;
    kpvv = pipe1;
  } else if(dkpx2 < (Scx + cs*2) && (dkpx2+100) > (Scx - cs*2)) {
    kpxn = dkpx2;
    kpvv = pipe2;
  } else if(dkpx3 < (Scx + cs*2) && (dkpx3+100) > (Scx - cs*2)) {
    kpxn = dkpx3;
    kpvv = pipe3;
  } else {
    text("BAG : collision(), kpvv",250,720);
  }
  // X collision detection
  if( /* right side of SOSEKI */Scx >= dkpx1 - cs && 
    /* left side of SOSEKI */Scx <= (dkpx1 + 100 + cs) |
    /* right side of SOSEKI */Scx >= dkpx2 - cs && 
    /* left side of SOSEKI */Scx <= (dkpx2 + 100 + cs) |
    /* right side of SOSEKI */Scx >= dkpx3 -cs && 
    /* left side of SOSEKI */Scx <= (dkpx3 + 100 + cs) ) {
    
    // Y collition detection
      // most near pipe is kpvv.
    switch(kpvv) {
      case 1:
      kiyh = 123;
      kiyl = 258;
        if( /* higher */(Scy + cs) <= kiyh |
          /* lower */(Scy - cs) >= kiyl) {
          //kill();
          text("out",200,200);
          bos = 2;
        } break;
      case 2:
      kiyh = 246;
      kiyl = 381;
        if( /* higher */(Scy + cs) <= kiyh |
          /* lower */(Scy - cs) >= kiyl) {
          //kill();
          text("out",200,200);
          bos = 2;
        } break;
      case 3:
      kiyh = 369;
      kiyl = 504;
        if( /* higher */(Scy + cs) <= kiyh |
          /* lower */(Scy - cs) >= kiyl) {
          //kill();
          text("out",200,200);
          bos = 2;
        } break;
      case 4:
      kiyh = 492;
      kiyl = 627;
        if( /* higher */(Scy + cs) <= kiyh |
          /* lower */(Scy - cs) >= kiyl) {
          //kill();
          text("out",200,200);
          bos = 2;
        } break;
      default:
        text("BAG : collision(), Y",250,720);
        break;
      }
  }
}

void kill() {
  gs = 2;
  dkpx1 = kpx1;
  dkpx2 = kpx2;
  dkpx3 = kpx3;
}

// dying state ( bound -> stop -> gameover gs3 )
void gs2_processing() {
  // count the frame after death
  kt++;
  // while 20 frame(=0.3sec) after fall or hit, not draw gameover
  if(kt <= 20) {
    bound();
  } else {
    gs = 3;
  }
}

void bound() {
  // stop background & kuma_pipe
  stop_background();
  
  if(bos == 1) {  // fall on ground (bos is bound state)
    if(cby < 2) {  // bound only 1 time
      Sys += GA * kt * kt / 2 - 2;
      Sy += Sys;
      tSx += bs;
      Sx = tSx;
    } else if(Sy >=700) {
      Sy = 700;
      gs = 3;
    }
  }
  if(bos == 2) {  // hit pipe
    ////////
    gs=3;
  }
}

// game state is gameover. (game state 3)
void gs3_processing() {
  stop_background();
  image(back1,db1x,0);
  image(back2,db2x,0);
  image(gameover,75,120);
  image(clickC,75,500);
  image(pEXIT,300,700);
  Sy = 700;
  
  // when clicked "exit", exit program.
  if(mouseX>=300 && mouseX<=425 && mouseY>=700 && mouseY<=750) {
    if(mc == true) {
      exit();
    }
  } else if(mc == true) {
    Sy = 400;
    gs = 0;  // chenge game state to gs=0(start menue).
    mc = false;
  }
  // auto restart 4sec
  if(dt >= 240) {
  gs = 0;
  mc = false;
  }
}

void Draw_SOSEKI() {
  Simx = (int)Sx + 38;
  Simy = (int)Sy + 12;
  Samx = (int)Sx + 12;
  Samy = (int)Sy + 38;
  Scx = Samx + 40;
  Scy = Samy + 11;
  
  // fan
  if( fire == false) {
    if(ft <= 4) {
      image(soseki_fan1,Simx,Simy);
    } else if(ft <= 8) {
      image(soseki_fan2,Simx,Simy);
    } else if(ft > 8 && ft <= 12) {
      image(soseki_fan3,Simx,Simy);
    } else if(ft > 12 && ft <= 16) {
      image(soseki_fan4,Simx,Simy);
    } else if(ft > 16) {
      image(soseki_fan4,Simx,Simy);
      ft = 0;
    }
  } 
  // jet
  if (fire == true){
    et = (et % 2) * 3;
    if(ft <= 2) {
      image(soseki_fire1,Samx,Samy);
    } else if(ft > 2 && ft <= 4) {
      image(soseki_fire2,Samx,Samy-et);
    } else if(ft > 4 && ft <= 6) {
      image(soseki_fire3,Samx,Samy);
    } else if(ft > 6) {
      image(soseki_fire4,Samx,Samy+et);
      ft = 0;
    }
  }
}

void debag() {
  fill(0);
  if(mc == true) {
    text("Clicked",200,400);
  }
  //rect(2,2,448,300);
  switch(gs) {
    case 0:  // start menu state (game state 0)
      text("START MENU",350,100);
      break;
    case 1:  // playing state (game state 1)
      text("PLAYING",350,100);
      break;
    case 2:  // gameover state (game state 2)
      text("DYING",350,100);
      break;
    case 3:  // gameover state (game state 3)
      text("GAMEOVER",350,100);
      break;
    default:
      break;
  }
  text("  t = " + t,10,10);
  text(" dt = " + dt,100,10);
  text(" kt = " + kt,200,10);
  sec = t / 60;
  text("sec = " + sec,10,30);
  text("(Sx,Sy) = (" + (int)Sx + "," + (int)Sy + ")",200,30);
  text("gs = " + gs,10,70);
  text("mc = " + mc,10,90);
  text("Sys = " + Sys,10,110);
  text("bxpt1 = " + bxpt1,10,130);
  text("bxpt2 = " + bxpt2,10,150);
  text("kpx1 = " + kpx1,110,30);
  text("kpx2 = " + kpx2,110,50);
  text("kpx3 = " + kpx3,110,70);
  text("d kp12 = " + (kpx1 -kpx2),200,50);
  text("d kp23 = " + (kpx2 -kpx3),200,70);
  text("bxcs = " + bxcs,110,90);
  text("cby = " + cby,200,90);
  text("jt = " + jt,200,110);
  text("ft = " + ft,200,130);
  text("Scx = " + Scx,10,400);
  text("Scy = " + Scy,10,420);
  text("kpxn = " + kpxn,10,440);
  text("kpvv = " + kpvv,10,460);
  text("pipe1 = " + pipe1,10,480);
  text("pipe2 = " + pipe2,10,500);
  text("pipe3 = " + pipe3,10,520);/*
  text(" = " + ,10,0);
  text(" = " + ,10,0);
  text(" = " + ,10,0);
  text(" = " + ,10,0);*/
  
  line(Scx,0,Scx,800);
  line(0,Scy,450,Scy);
  line(Scx+10,0,Scx+10,800);
  line(Scx-10,0,Scx-10,800);
  line(0,Scy+10,450,Scy+10);
  line(0,Scy-10,450,Scy-10);
  //line(0,0,0,800);
  line(kpxn-1,0,kpxn-1,800);
  /*line(kpx1,0,kpx1,800);
  line(kpx2,0,kpx2,800);
  line(kpx3,0,kpx3,800);*/
  if (deb) {
    ellipse(100,100,200,200);
  }/*
  colorMode(HSB,50,50,50,50);
  rect(dkpx1,0,dkpx1+100,kiyh);
  rect(dkpx1,kiyl,dkpx1+100,700);*/
  //rect(dkpx1,kiyh,dkpx1+100,kiyl);
  line(0,kiyh,450,kiyh);
  line(0,kiyl,450,kiyl);
}
void score() {
  fill(0xffFF0030);/*
  if(bxcs <= -1*(10)) {
    score++;
    bxcs = 0;
  }*/
  if(dkpx1 == Sx |dkpx2 == Sx|dkpx3 == Sx){
    score_pipe++;
  }
  textSize(30);
  text("score = " + score_pipe/* + " m"*/,150,680);
  textSize(12);
  if( gs == 2 && score > scoreMAX) {
    scoreMAX = score_pipe;
  }
  if(scoreMAX > best) {
    best = scoreMAX;
  }
    textSize(35);
    text("best   = " + best /*+ " m"*/,125,640);
    textSize(12);
}



