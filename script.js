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
        this.intervall = setInterval(this.updateGameState, 30);
        this.monster = new MovingMonster(this.ctx);
        
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
                this.xSpeed -= 3;
                break;
              case 39:
              this.xSpeed += 3;
                break;
              case 32:
              this.ySpeed-=15; 
              break;
              default:
            }
          };
          document.onkeyup = e => {
            this.xSpeed = 0;
            //this.ySpeed=15;

            
            
          };
    }

    updateMonster(){
        this.xPosition+=this.xSpeed;
        this.yPosition+=this.ySpeed;
        if(this.yPosition<=285){
            this.ySpeed=15;
            this.yPosition+=this.ySpeed
                       
        }
        if(this.yPosition==570){
            this.yPosition=570;
            this.ySpeed=0;
        } 
        if(this.xPosition<=0){
           this.xPosition+=10;
        }  
        if(this.xPosition>=820){
            this.xPosition-=10;
        }
    }

    draw (){
        
        this.ctx.drawImage(this.img, this.xPosition, this.yPosition, this.width, this.height)
         
}
}

