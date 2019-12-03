window.onload = function() {
    document.getElementById("start-game").onclick = function() {
    startGame();       
    }
}

function startGame() {
console.log("Game started");
let cookieGame = new CanvasGame(900,700);
let interaction = new InteractionManual (200,700);
let scoreDisplay = new ScoreDisplay(200,700);
}


//Beschreibung für den Nutzer wie das Spiel gespielt werden muss
class InteractionManual {
    constructor(width,height) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style = "border: 2px solid whitesmoke" ;
        document.getElementById("interactions").appendChild(this.canvas);
}
}


//Anzeige der gesammelten Punkte
class ScoreDisplay {
    constructor(width,height) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style = "border: 2px solid whitesmoke" ;
        document.getElementById("score").appendChild(this.canvas);
}
}


//Hier fangen die Klassen für das Cookiemonsterspiel an
class CanvasGame {
    constructor(width,height) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style = "border: inset 12px whitesmoke" ;
        this.canvas.style.backgroundImage = "url('pictures/wintry-2915190_1280.png')";
        this.canvas.style.backgroundRepeat = "no-repeat";
        this.canvas.style.backgroundSize = "900px 700px";
        this.canvas.style.marginRight = "10px";
        this.canvas.style.marginLeft = "10px";
        document.getElementById("game-board").appendChild(this.canvas);
        this.updateGameState = this.updateGameState.bind(this);
        this.intervall = setInterval(this.updateGameState, 10);
        this.monster = new MovingMonster(this.ctx);
        this.monster.draw();
    }
    updateGameState() {
        
        this.clearCanvas();
        this.monster.updateMonster();
        this.monster.draw();
    }
    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
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


}


//Klasse für den Spieler, der sich bewegt
class MovingMonster extends MovingObjects {
    constructor( ctx ){
        super(450, 570, ctx, 80, 90);
        this.img = new Image();
        this.img.src = "pictures/cookiemonster_player.png";
        document.onkeydown = e => {
             switch (e.keyCode) {
              case 37:
                this.xSpeed -= 1;
                break;
              case 39:
              //this.speedX+=5, damit er sich beim springen schneller nach vorne bewegt
                this.xSpeed += 1;
                break;
              //damit er springt
              case 32:
                this.yPosition-=280;
                break;
              default:
            }
            
          };
          document.onkeyup = e => {
            this.xSpeed = 0;
                     
            this.yPosition=570;
            
            
          };
    }

    updateMonster(){
        this.xPosition+=this.xSpeed;
        this.yPosition+=this.ySpeed;
        
    }

    draw (){
        
        this.ctx.drawImage(this.img, this.xPosition, this.yPosition, this.width, this.height)
        
}
}

