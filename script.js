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
let monster = new MovingMonster(cookieGame.ctx);
console.log(monster.img);
monster.draw();

}

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
        
        
        //this.updateCanvas = this.updateCanvas.bind(this);
        //this.intervall = setInterval(this.updateCanvas, 50);
        //this.monster = new MovingMonster(this.ctx);
    }
    updateGameState() {
       
    }
    clearCanvas(){
        
}
}


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
updateMonster(){
    
    
}

}


class MovingMonster extends MovingObjects {
    constructor( ctx ){
        super(450, 570, ctx, 80, 90);
        this.img = new Image();
        this.img.src = "pictures/cookiemonster_player.png";
        
    }

    draw (){
        this.img.onload = () => {
            this.ctx.drawImage(this.img, this.xPosition, this.yPosition, this.width, this.height)
        }
}
}

