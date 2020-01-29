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

        this.onKeyDown = this.onKeyDown.bind(this)
    }

    start() {
        this.bindKeyHandlers();
        
        requestAnimationFrame(this.step)
        
    }

    step() {
        //disabled for testing
        this.game.moveGrid();
        this.game.moveCursor();
        
        this.game.grid.removeEmptyRows();
        this.game.drawGrid(this.ctx);
        this.game.grid.haveBlocksFall();
        this.game.grid.clearMatchingBlocks();
        this.game.grid.addNewRow();

        if (!this.gameOver()) {
            requestAnimationFrame(this.step)
        }
    }

    gameOver() {
        if (this.anyBlockAtTop()) {
            return true;
        } else {
            return false;
        }
    }

    anyBlockAtTop() {
        let bool = false;
        let numRows = this.grid.blocks.length;
        this.grid.blocks[numRows - 1].forEach(block => {
            if (block.pos[1] <= 50) bool = true;
        })
        return bool;
    }

    onKeyDown(e) {
        const cursor = this.game.cursor;
        const move = this.MOVES[e.key];

        if (Object.keys(this.MOVES).includes(e.key)){
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