class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.step = this.step.bind(this)
        this.MOVES = {
            w: [0, -65],
            a: [-65, 0],
            s: [0, 65],
            d: [65, 0],
        }

        this.onKeyDown = this.onKeyDown.bind(this)
    }

    start() {
        this.bindKeyHandlers();
        setInterval(this.step, 20)
    }

    step() {
        this.game.moveBlocks();
        this.game.moveCursor();
        this.game.draw(this.ctx);
    }

    onKeyDown(e) {
        const cursor = this.game.cursor;
        const move = this.MOVES[e.key];
        if (e.key == "w") cursor.changePos(move)
        if (e.key == "a") cursor.changePos(move)
        if (e.key == "s") cursor.changePos(move)
        if (e.key == "d") cursor.changePos(move)
        
    }

    bindKeyHandlers() {
        document.addEventListener("keydown", this.onKeyDown)
    };

    //Using keymaster
    // bindKeyHandlers() {
    //     const cursor = this.game.cursor;
    //     document.addEventListener("keydown", this.onKeyDown)

    //     Object.keys(this.MOVES).forEach((k) => {
    //         const move = this.MOVES[k];
    //         key(k, () => cursor.changePos(move));
    //     });
    // };


}

export default GameView