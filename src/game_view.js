class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.step = this.step.bind(this)
    }

    start() {
        setInterval(this.step, 20)
    }

    step() {
        this.game.moveObjects();
        this.game.draw(this.ctx);
    }
}

export default GameView