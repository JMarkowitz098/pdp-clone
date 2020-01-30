import Score from './score'

class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.grid = this.game.grid;
        this.step = this.step.bind(this)
        this.MOVES = {
            w: [0, -50],
            a: [-50, 0],
            s: [0, 50],
            d: [50, 0],
        }
        this.score = new Score();
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    start() {
        this.bindKeyHandlers();
        requestAnimationFrame(this.step)
    }

    step() {
        this.score.displayScore();

        this.game.moveGrid();
        this.game.moveCursor({});

        this.game.grid.removeEmptyRows();
        this.game.removeMatchingBlocks();
        this.game.grid.haveBlocksFall();
        this.game.grid.addNewRow();
        this.game.drawGrid(this.ctx);

        if (!this.gameOver()) {
            requestAnimationFrame(this.step)
        }
    }

    gameOver() {
        return this.anyBlockAtTop()
    }

    anyBlockAtTop() {
        let bool = false;
        let numRows = this.grid.blocks.length;
        this.grid.blocks[numRows - 1].forEach(block => {
            if (block.canvPos[1] <= 50) bool = true;
        })
        return bool;
    }

    onKeyDown(e) {
        const cursor = this.game.cursor;
        const move = this.MOVES[e.key];

        if (Object.keys(this.MOVES).includes(e.key)) {
            cursor.changePos(move, this.game.DIM_X, this.game.DIM_Y)
        } else if (e.key === " ") {
            this.game.grid.swapBlocks(cursor);
        }
    }

    bindKeyHandlers() {
        document.addEventListener("keydown", this.onKeyDown)
    };

}

export default GameView