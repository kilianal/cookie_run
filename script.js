window.onload = function() {
    document.getElementById("start-game").onclick = function() {
    startGame();       
    }
}

function startGame() {
console.log("Game started");
let cookieGame = new CanvasGame(900,700);
}


class CanvasGame {
    constructor(width,height) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style = "border: inset 12px whitesmoke" ;
        this.canvas.style.backgroundImage = "url('../pictures/wintry-2915190_1280.png')";
        this.canvas.style.backgroundRepeat = "no-repeat";
        this.canvas.style.backgroundSize = "900px 700px";
        document.getElementById("game-board").appendChild(this.canvas);
    }
}


