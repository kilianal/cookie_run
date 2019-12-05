let points;
let timer;
let lives;

//Seiten Canvas Bilder Ressourcen
let snowflake2 = new Image();
snowflake2.src = "pictures/snowflake2-white.png";
let snowflake1 = new Image();
snowflake1.src = "pictures/snowflake-white.png";
let bittenCookie = new Image();
bittenCookie.src = "pictures/cookie2.png";
let cookie = new Image();
cookie.src = "pictures/cookie1.png";
let cookie3 = new Image();
cookie3.src = "pictures/cookie3.png";
let monsterkopf = new Image();
monsterkopf.src = "pictures/cookiemonster-kopf.png";
let cookiemonster = new Image();
cookiemonster.src = "pictures/cookiemonster.png";



window.onload = function () {
  document.getElementById("start-game").onclick = function () {
    startGame();
    points = 0;
    timer = 60;
    lives = 3;
  };
};

function startGame() {
  let scoreDisplay = new ScoreDisplay(300, 724);
  let interaction = new InteractionManual(300, 724);
  let cookieGame = new CanvasGame(900, 700, scoreDisplay);
  let gameBoardCanvas = document.getElementById("game-board");
  let interactionCanvas = document.getElementById("interactions");
  let scoreDisplayCanvas = document.getElementById("score");
  //Blockiert den Start Button um unfreiwilligen Neustart zu verhindern, bis stopGame() ausgeführt wird. 
  document.getElementById("start-game").setAttribute("disabled", "disabled");
  //Wenn bereits ein Game gestartet wurde, verhindert dies, dass einfach nur ein weiteres unten hinzugefügt wird.
  if (document.getElementById("game-board").children.length > 0) {
    gameBoardCanvas.removeChild(gameBoardCanvas.childNodes[0]);
    interactionCanvas.removeChild(interactionCanvas.childNodes[0]);
    scoreDisplayCanvas.removeChild(scoreDisplayCanvas.childNodes[0]);
  }
}



//Hier fangen die Klassen für das Cookiemonsterspiel an
class CanvasGame {
  constructor(width, height, scoreCanvas) {
    this.scoreCanvas = scoreCanvas;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = "border: inset 12px whitesmoke";
    this.canvas.style.backgroundImage =
      "url('pictures/wintry-2915190_1280.png')";
    this.canvas.style.backgroundRepeat = "no-repeat";
    this.canvas.style.backgroundSize = "900px 700px";
    this.canvas.style.marginRight = "10px";
    this.canvas.style.marginLeft = "10px";
    document.getElementById("game-board").appendChild(this.canvas);

    //Animation der Bewegung
    this.frames = 0;
    this.updateGameState = this.updateGameState.bind(this);
    this.interval = setInterval(this.updateGameState, 25);
    this.gamesObjects = [];
    this.monster = new MovingMonster(this.ctx);
    this.gamesObjects.push(this.monster);
    this.gamePoints = [];
    this.gamePoints.push(this.monster);
    
    
  }

  updateGameState() {
    this.scoreCanvas.updateScore();
    this.clearCanvas();
    //Bedingung damit zu einer bestimmten Zeit die Obstacles ins Canvas laufen
    this.frames += 1;

    let randomFrames = (Math.floor(Math.random() * 150)) + 125;
    
    if (this.frames % randomFrames === 0) {
      this.addFruits();
    
    }

    this.gamesObjects.forEach(function (gameObject) {
      gameObject.update();
    });

    //Bedingung damit die Cookies zu einer bestimmten Zeit runterfallen
    if (this.frames % 50 === 0) {
      this.addCookies();
    }

    this.gamePoints.forEach(function (gameObject) {
      gameObject.update();
    });

    this.checkGameOver();
    this.checkWinner();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  //Methode damit eine Instanz unserer Fruits gemacht wird und in unser Array für die Cookies gespushed wird
  addFruits() {
    this.gamesObjects.push(this.fruit = new MovingFruits(this.ctx));
    
  }

  //Methode damit eine Instanz unserer Cookies gemacht wird und in unser Array für die Cookies gespushed wird
  addCookies() {
    let randomCookie = 15 + (Math.floor(Math.random() * (this.canvas.width - 80)));
    this.gamePoints.push(this.cookie = new MovingCookies(randomCookie, this.ctx));
  }

  score() {
    points++;
  }


  checkWinner() {
    let catched = this.gamePoints.some(object => {
      if (this.monster.isCollidedWith(object)) {
        this.gamePoints.splice(this.gamePoints.indexOf(object), 1)
      }
      return this.monster.isCollidedWith(object);
    });

    if (catched) this.score();
    if (timer === 0 && points > 0) this.stopGame("win");
  }

  checkGameOver() {
    let crashed = this.gamesObjects.some(object => {
      return this.monster.isCollidedWith(object);
    });

    if (crashed || (timer === 0 && points === 0)) this.stopGame("lose");
  }

  stopGame(status) {
    clearInterval(this.interval);
    //Start Game Button wieder activieren
    document.getElementById("start-game").removeAttribute("disabled");

    //clearCanvas, damit Cookiemonster und das Kollisionsobjekt verschwindet
    this.clearCanvas();

    if (status === "win") {
      this.ctx.fillStyle = "whitesmoke";

      //Dieser Teil ändert die Transparenz unseres Hintergrundes indem ein weißes Rectangle mit Transparenzwert 0,7 drüber gelegt wird
      this.ctx.globalAlpha = 0.7;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.textAlign = "center";
      this.ctx.globalAlpha = 0.85;
      this.ctx.drawImage(bittenCookie,340, 35, 210,210)
      

      //Damit die Schrift nicht auch Transparent wird muss hier nochmal die Farbe und die Transparenz wieder auf 1 gesetzt werden
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = "#f2690f";
      this.ctx.font = "42px Permanent Marker";
      this.ctx.fillText("A full Monster", (this.canvas.width / 2), 310);
      this.ctx.fillText("is a happy Monster!", (this.canvas.width / 2), 360);
      this.ctx.fillText("Cookies eaten: " + points, (this.canvas.width / 2), 600);
      this.ctx.drawImage(cookiemonster,390,420,100,115);
      this.ctx.font = "110px Permanent Marker";
      
      this.ctx.shadowColor = "whitesmoke";
      this.ctx.shadowOffsetX = 5;
      this.ctx.shadowOffsetY = 5;
      //this.ctx.shadowBlur = 3;
      this.ctx.fillText("WIN!", (this.canvas.width / 2), 220);
      this.ctx.shadowColor = "#b2b8bf";
      this.ctx.shadowBlur = 3;
      this.ctx.drawImage(cookiemonster,390,420,100,115);
    }

    if (status === "lose") {
      this.ctx.font = "100px Permanent Marker";
      this.ctx.fillStyle = "#f2690f";
      this.ctx.globalAlpha = 1;
      this.ctx.shadowColor = "whitesmoke"; 
      this.ctx.shadowOffsetX = 4;
      this.ctx.shadowOffsetY = 4;
      this.ctx.fillText("Game Over ", (this.canvas.width / 2 - 240), 300);
      this.canvas.style.backgroundImage = "url('pictures/gameover.jpg')";
      this.canvas.style.backgroundPosition = "center center";
      this.canvas.style.backgroundSize = "900px";
    }
  }
}

//Beschreibung für den Nutzer wie das Spiel gespielt werden muss
class InteractionManual {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    
    
    document.getElementById("interactions").appendChild(this.canvas);


    
    this.ctx.font="45px Permanent Marker";
    this.ctx.fillStyle="#f2690f";
    this.ctx.shadowOffsetX =2
    this.ctx.shadowOffsetY =2;
    this.ctx.shadowColor = "white";
    this.ctx.fillText("Instructions", 15, 100);
    this.ctx.font="25px Permanent Marker";
    this.ctx.fillStyle="black";
    this.ctx.shadowOffsetX =2
    this.ctx.shadowOffsetY =2;
    this.ctx.shadowColor = "white";
    this.ctx.shadowOffsetX =0;
    this.ctx.shadowOffsetY =0;
    this.ctx.fillText("Catch as many cookies",15,150);
    this.ctx.fillText("as you can and don´t", 15,180);
    this.ctx.fillText("let yourself get hit by", 15,210);
    this.ctx.fillText("by the incoming apples", 15, 240);
    this.ctx.font="30px Permanent Marker";
    this.ctx.fillStyle="#f2690f";
    this.ctx.shadowOffsetX =2
    this.ctx.shadowOffsetY =2;
    this.ctx.shadowColor = "white";
    this.ctx.fillText("Game Control", 30,320);
    this.ctx.font="25px Permanent Marker";
    this.ctx.fillStyle="black";
    this.ctx.shadowOffsetX =2
    this.ctx.shadowOffsetY =2;
    this.ctx.shadowColor = "white";
    this.ctx.shadowOffsetX =0;
    this.ctx.shadowOffsetY =0;
    this.ctx.fillText("Use your keyboard to ",15,360)
    this.ctx.fillText("move around", 60,390)
    this.ctx.fillText("Moving left with  <<", 15,430);
    this.ctx.fillText("Moving right with >>", 15,470);
    this.ctx.fillText("Jumping with", 45, 510);
    this.ctx.fillText("spacebar", 60 ,540);
    this.ctx.shadowOffsetX =0;
    this.ctx.shadowOffsetY =0;
   
    //Cookies die als Bilder angezeigt werden
    this.ctx.drawImage(monsterkopf, 0, 560, 65, 65);
    this.ctx.drawImage(cookie3, 50,672, 50,50);
    this.ctx.drawImage(cookie3, 270,290, 50,50);
    
    this.ctx.drawImage(bittenCookie, 200 ,600, 50,50);
    

  }
}

//Klasse damit der Score angezeigt wird, der vom Spieler erreicht wurde
class ScoreDisplay {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.marginTop = "20px";
    document.getElementById("score").appendChild(this.canvas);

    this.frames = 0;
  }

  updateScore() {
    this.clearCanvas();
    this.frames += 1;
    this.ctx.globalAlpha =1;
    this.ctx.textAlign = "left";
    this.ctx.font = "40px Permanent Marker";
    this.ctx.fillStyle = "white";
    this.ctx.fillText('Score:', 30, 175);
    this.ctx.fillText(points, 250, 175);   
    this.ctx.drawImage(monsterkopf,220,640,70,70);
    this.ctx.drawImage(cookie3,190,142,35,35);
    

    this.ctx.globalAlpha = 0.4;
    this.ctx.drawImage(snowflake1, 250, -10, 90, 90);
    this.ctx.drawImage(snowflake2, 230, 15, 20, 20);
    this.ctx.drawImage(snowflake2, -10, 180, 50, 50);
    this.ctx.drawImage(snowflake1, 225, 335, 30, 30);
    this.ctx.drawImage(snowflake2, 210, 360, 15, 15);
    this.ctx.drawImage(snowflake2, 225, 360, 90, 90);
    this.ctx.drawImage(snowflake2, 75, 570, 40, 40);
    this.ctx.drawImage(snowflake1,-10, 600, 180, 180);
    this.ctx.drawImage(snowflake2, 150, 640, 20, 20);
    

    this.counter();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  counter() {
    //Timer der die Zeit runterzieht
    if (this.frames % 40 == 0) {
      timer = timer - 1;
    }

    this.ctx.globalAlpha = 1;
    this.ctx.textAlign = "left";
    this.ctx.font = "40px Permanent Marker";
    this.ctx.fillStyle = "white";

    this.ctx.fillText('Time left:', 30, 120);
    if (timer <=10){
      this.ctx.fillStyle = "#f2690f";
      this.ctx.shadowColor = "whitesmoke"; //#c3d0de
      this.ctx.shadowOffsetX = 3;
      this.ctx.shadowOffsetY = 3;
      };
    
    this.ctx.fillText(timer,250,120);
    
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
   
    //Timer der die Zeit runterzieht
  }
}


//Klasse für die bewegenden Objekte
class MovingObjects {
  constructor(xPosition, yPosition, ctx, width, height) {
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.ySpeed = 0;
    this.xSpeed = 0;
  }
  left() {
    return this.xPosition;
  }
  right() {
    return this.xPosition + this.width;
  }
  top() {
    return this.yPosition;
  }
  bottom() {
    return this.yPosition + this.height;
  }

  isCollidedWith(object) {
    if (this === object) return false;
    return !(
      this.bottom() - 10 < object.top() ||
      this.top() > object.bottom() ||
      this.left() -10 > object.right() ||
      this.right() -10 < object.left()
    );
  }
}

//Klasse für den Spieler, der sich bewegt
class MovingMonster extends MovingObjects {
  constructor(ctx) {
    super(450, 570, ctx, 80, 90);


    document.onkeydown = e => {
      switch (e.keyCode) {
        case 37:
          this.xSpeed -= 8;
          break;
        case 39:
          this.xSpeed += 8;
          break;
        case 32:
          this.ySpeed -= 22;
          break;
        default:
      }
    };
    document.onkeyup = e => {
      this.xSpeed = 0;
      if (this.yPosition < 570) {
        this.ySpeed = 14;
      }
    };
  }

  //MonsterUpdate Methode lässt Monster springen, nach rechts und links bewegen ohne das Spielfeld zu verlassen
  update() {
    this.xPosition += this.xSpeed;
    this.yPosition += this.ySpeed;
    if (this.yPosition <= 200) {
      this.ySpeed = 22;
      this.yPosition += this.ySpeed;
    }
    if (this.yPosition >= 570) {
      this.yPosition = 570;
      this.ySpeed = 0;
    }
    if (this.xPosition <= 0) {
      this.xPosition = 5;
    }
    if (this.xPosition >= 820) {
      this.xPosition = 815;
    }
    this.draw();
  }

  draw() {
    this.ctx.drawImage(
      cookiemonster,
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );
  }
}


class MovingCookies extends MovingObjects {
  constructor(xPosition, ctx) {
    super(xPosition, 0, ctx, 50, 50);
    this.ySpeed = 10;
    this.xPosition = xPosition;
  }

  update() {
    this.yPosition += this.ySpeed;
    this.draw();
  }

  draw() {
    
    this.ctx.drawImage(
      cookie,
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );
  }
}


class MovingFruits extends MovingObjects {
  constructor(ctx) {
    super(900, 600, ctx, 50, 50);
    this.xSpeed = -6;
    this.img = new Image();
    this.img.src = "pictures/apfel.png";
  }

  update() {
    this.xPosition += this.xSpeed;
    this.draw();
  }
  
  draw() {
    this.ctx.drawImage(
      this.img,
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );
  }
}

