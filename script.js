window.onload = function() {
  document.getElementById("start-game").onclick = function() {
    startGame();
    
  };
};

function startGame() {
  console.log("Game started");
  let cookieGame = new CanvasGame(900, 700);
  let interaction = new InteractionManual(300, 700);
  let scoreDisplay = new ScoreDisplay(300, 700);
  let gameBoardCanvas= document.getElementById("game-board");
  let interactionCanvas= document.getElementById("interactions");
  let scoreDisplayCanvas= document.getElementById("score");
  if(document.getElementById("game-board").children.length >0){
    gameBoardCanvas.removeChild(gameBoardCanvas.childNodes[0]);
    interactionCanvas.removeChild(interactionCanvas.childNodes[0]);
    scoreDisplayCanvas.removeChild(scoreDisplayCanvas.childNodes[0]);
  }
}

//Beschreibung für den Nutzer wie das Spiel gespielt werden muss
class InteractionManual {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = "border: 2px solid whitesmoke";
    document.getElementById("interactions").appendChild(this.canvas);
  }
}

//Anzeige der gesammelten Punkte
class ScoreDisplay {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = "border: 2px solid whitesmoke";
    document.getElementById("score").appendChild(this.canvas);
  }
}

//Hier fangen die Klassen für das Cookiemonsterspiel an
class CanvasGame {
  constructor(width, height) {
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
    this.bild =new Image();
    this.bild.src="pictures/cookie2.png";
    //Animation der Bewegung
    this.frames = 0;
    this.updateGameState = this.updateGameState.bind(this);
    this.interval = setInterval(this.updateGameState, 30);
    this.gamesObjects = [];
    this.monster = new MovingMonster(this.ctx);
    this.gamesObjects.push(this.monster);
     
  }

  updateGameState() {
    
    this.clearCanvas();
    this.frames += 1;    
    if (this.frames % 100 === 0){
        this.addFruits();
        console.log(this.gamesObjects);
    }
    this.gamesObjects.forEach(function(gameObject) {
        gameObject.update();
    });

    this.checkGameOver();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
  }

  addFruits(){
    this.gamesObjects.push(this.fruit = new MovingFruits(this.ctx));
  }

  checkGameOver(){
      let crashed = this.gamesObjects.some(object => {
          return this.monster.isCollidedWith(object);
      });
     
      if (crashed) this.stopGame();

  }

  stopGame(){
    clearInterval(this.interval);
    //clearCanvas, damit Cookiemonster und das Kollisionsobjekt verschwindet
    this.clearCanvas();
    /*Dieser Teil ändert die Transparenz unseres Hintergrundes indem ein weißes Rectangle mit Transparenzwert 0,7
        drüber gelegt wird
    */
    this.ctx.fillStyle="whitesmoke";
    this.ctx.globalAlpha=0.7;
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    /*Damit die Schrift nicht auch Transparent wird muss hier nochmal die Farbe 
    und die Transparenz wieder auf 1 gesetzt werden
    */
    this.ctx.drawImage(this.bild, 110,215, 85,85);
    this.ctx.font="100px Permanent Marker";
    this.ctx.fillStyle="orange";
    this.ctx.globalAlpha=1;
    this.ctx.fillText("Game Over", (this.canvas.width/2-230), 300);
    

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
  left(){
      return this.xPosition;
  }
  right(){
      return this.xPosition+this.width;
  }
  top(){
      return this.yPosition;
  }
  bottom(){
      return this.yPosition+this.height;
  }

  isCollidedWith(object){
    // if (this.right()> object.left() &&
    //     this.left() < object.right() &&
    //     this.top() < object.bottom() &&
    //     this.bottom() > object.top())
    //     return true;

      if (this === object) return false;
      return!(
          this.bottom()-10 < object.top() ||
          this.top() > object.bottom() ||
          this.left() > object.right() ||
          this.right() < object.left()
      );
   
  }
}

//Klasse für den Spieler, der sich bewegt
class MovingMonster extends MovingObjects {
  constructor(ctx) {
    super(450, 570, ctx, 80, 90);
    this.img = new Image();
    this.img.src = "pictures/cookiemonster_player.png";
    document.onkeydown = e => {
      switch (e.keyCode) {
        case 37:
          this.xSpeed -= 9;
          break;
        case 39:
          this.xSpeed += 9;
          break;
        case 32:
          this.ySpeed -= 30;
          break;
        default:
      }
    };
    document.onkeyup = e => {
      this.xSpeed = 0;
      if (this.yPosition < 570) {
        this.ySpeed = 30;
      }
    };
  }
  //MonsterUpdate Methode lässt Monster springen, nach rechts und links bewegen ohne das Spielfeld zu verlassen
  update() { 
    this.xPosition += this.xSpeed;
    this.yPosition += this.ySpeed;
    if (this.yPosition <= 240) {
      this.ySpeed = 30;
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
      this.img,
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );
  }
}

class MovingFruits extends MovingObjects {
    constructor(ctx){
        super(ctx.canvas.width, 570, ctx, 50, 50 );

        this.color = "orange";
        this.xSpeed = -10;

    }
    //fruitsUpdate
    update(){
        this.xPosition += this.xSpeed;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.xPosition, this.yPosition, this.width, this.height);
    }
}



