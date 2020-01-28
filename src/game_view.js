class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.step = this.step.bind(this)
        this.MOVES = {
            w: [0, -50],
            a: [-50, 0],
            s: [0, 50],
            d: [50, 0],
        }

        this.onKeyDown = this.onKeyDown.bind(this)
    }

    start() {
        this.bindKeyHandlers();
        setInterval(this.step, 20)
    }

    step() {
        //disabled for testing
        // this.game.moveBlocks();
        // this.game.moveCursor();
        this.game.draw(this.ctx);
    }

    onKeyDown(e) {
        const cursor = this.game.cursor;
        const move = this.MOVES[e.key];

        if (Object.keys(this.MOVES).includes(e.key)){
            cursor.changePos(move)    
        } else if (e.key === " ") {
            this.game.swapBlocks();
        } 
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