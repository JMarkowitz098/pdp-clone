import GameView from './game_view'
import Game from './game'



document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById("game-canvas")
    const ctx = canvasEl.getContext("2d");
    const game = new Game();

    const gameView = new GameView(game, ctx)

    gameView.start();
});