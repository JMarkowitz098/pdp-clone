import GameView from './game_view'
import Game from './game'



document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById("game-canvas")
    const ctx = canvasEl.getContext("2d");
    const game = new Game();

    const gameView = new GameView(game, ctx)
    
    
    //Starts game when 'm' is pressed-----------
    ctx.fillStyle = "#3F91C3";
    ctx.fillRect(-10, 50, 400, 700);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Press 'm' to start ", 40, 600);

    const startGame = () => {
        gameView.start();
        document.removeEventListener('keydown', gameFunc)
        setInterval(game.increaseVelocity, 5000);
    }
    
    const gameFunc = (e) => {
        if (e.key === 'm') {
            startGame()
        }
    }
    
    document.addEventListener('keydown', gameFunc) //Start game if 'm' is pressed
});

