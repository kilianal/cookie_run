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
        this.canvas.style = "border: 3px solid whitesmoke";
        document.getElementById("game-board").appendChild(this.canvas);
    }
}
