/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Block {\n    constructor(options) {\n        this.canvPos = options.canvPos;\n        this.gridPos = options.gridPos;\n        this.vel = options.vel;\n        this.color = options.color || this.randColor();\n        this.size = 50;\n    }\n\n    randColor() {\n        let tan = \"rgb(237, 201, 159)\";\n        let brightBlue = \"rgb(2, 239, 238)\";\n        let blue = \"rgb(4, 0, 248)\";\n        let darkestBlue = \"rgb(1, 1, 124)\";\n        let darkBlue = \"rgb(0, 1, 203)\";\n        let red = \"rgb(221, 81, 70)\";\n        let green = \"rgb(83, 181, 127)\";\n        let blonde = \"rgb(225,175,110)\"\n        let white = \"rgb(250,244,244)\"\n\n        const COLORS = [red, brightBlue, green, darkestBlue, blue]\n        let color = COLORS[Math.floor(Math.random() * COLORS.length)];\n        return color;\n    }\n\n    draw(ctx) {\n\n        ctx.fillStyle = this.color;\n        let x = this.canvPos[0];\n        let y = this.canvPos[1];\n        // if (!this.isWhite()) ctx.strokeRect(x, y, this.size, this.size);\n        if (!this.isWhite()) ctx.fillRect(x, y, this.size, this.size);\n\n    }\n\n    move() {\n        let x = this.canvPos[0];\n        let y = this.canvPos[1];\n\n        this.canvPos = [x, y - this.vel];\n    }\n\n    matches(otherBlock) {\n        return this.color === otherBlock.color;\n    }\n\n    isWhite() {\n        return this.color === \"white\"\n    }\n\n    swapBlock(otherBlock, grid) {\n        let temp = new Block({\n            canvPos: this.canvPos,\n            gridPos: this.gridPos,\n            color: this.color\n        });\n\n        let gridRow = this.gridPos[0]\n        let gridCol = this.gridPos[1]\n        let newRow = otherBlock.gridPos[0]\n        let newCol = otherBlock.gridPos[1];\n\n        [grid.blocks[gridRow][gridCol], grid.blocks[newRow][newCol]] = [grid.blocks[newRow][newCol], grid.blocks[gridRow][gridCol]]\n        this.canvPos = otherBlock.canvPos;\n        this.gridPos = otherBlock.gridPos;\n        otherBlock.canvPos = temp.canvPos;\n        otherBlock.gridPos = temp.gridPos;\n\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Block);\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Cursor {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.color = \"black\";\n        this.size = 50;\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n        ctx.lineWidth = \"6\";\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        ctx.strokeRect(x, y, this.size * 2, this.size);\n    }\n\n    move() {\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        if (this.pos[1] <= 50) {\n            this.pos = [x, y + 50];\n        } else {\n            this.pos = [x, y - this.vel];\n        }\n    }\n\n    changePos(dir, dimX, dimY) {\n        let newX = this.pos[0] + dir[0];\n        let newY = this.pos[1] + dir[1];\n        let data = {\n            x: newX,\n            y: newY,\n            dimX: dimX,\n            dimY: dimY\n        }\n\n        if (this.validMove(data)) this.pos = [newX, newY];\n    }\n\n    validMove(data) {\n        if (data.x > data.dimX - 200 || data.x < 0) {\n            return false;\n        } else if (data.y > data.dimY - 100 || data.y < 50) {\n            return false;\n        } else {\n            return true;\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cursor);\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursor */ \"./src/cursor.js\");\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ \"./src/grid.js\");\n/* harmony import */ var _matching_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./matching_blocks */ \"./src/matching_blocks.js\");\n\n\n\n\nclass Game {\n    constructor() {\n        this.DIM_X = 400;\n        this.DIM_Y = 800;\n        this.VEL = .5\n        this.grid = new _grid__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.DIM_X, this.DIM_Y, this.VEL)\n        this.cursor = new _cursor__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({pos: [100,600], vel: this.VEL});\n    }\n\n    drawGrid(ctx) {\n        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n \n\n\n        ctx.fillStyle = \"#F0F8FF\";\n        ctx.strokeRect(-10, 50, this.DIM_X, this.DIM_Y - 100);\n\n        this.grid.blocks.forEach(row => {\n            this.drawRow(row, ctx)\n        });\n        this.cursor.draw(ctx);\n    }\n\n    drawRow(blocks, ctx) {\n        blocks.forEach(block => {\n            block.draw(ctx);\n        });\n    }\n\n    moveGrid() {\n        this.grid.blocks.forEach(row => {\n            this.moveRow(row);\n        });\n    }\n\n    moveRow(blocks) {\n        blocks.forEach(block => {\n            block.move();\n        });\n    }\n\n    moveCursor() {\n        this.cursor.move();\n    }\n\n    removeMatchingBlocks() {\n        const matchingBlocks = new _matching_blocks__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.grid)\n        matchingBlocks.createMatches();\n        matchingBlocks.turnMatchesWhite()\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./score */ \"./src/score.js\");\n/* harmony import */ var _gameover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameover */ \"./src/gameover.js\");\n\n\n\nclass GameView {\n    constructor(game, ctx) {\n        this.ctx = ctx;\n        this.game = game;\n        this.grid = this.game.grid;\n        this.step = this.step.bind(this)\n        this.MOVES = {\n            w: [0, -50],\n            a: [-50, 0],\n            s: [0, 50],\n            d: [50, 0],\n        }\n        this.score = new _score__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.onKeyDown = this.onKeyDown.bind(this)\n    }\n\n    start() {\n        this.bindKeyHandlers();\n        requestAnimationFrame(this.step)\n\n    }\n\n    step() {\n        this.score.displayScore();\n\n        this.game.moveGrid();\n        this.game.moveCursor();\n\n        this.game.grid.removeEmptyRows();\n        this.game.removeMatchingBlocks();\n        this.game.grid.haveBlocksFall();\n        this.game.grid.addNewRow();\n        this.game.drawGrid(this.ctx);\n\n        if (!this.gameOver()) {\n            requestAnimationFrame(this.step)\n        }\n\n        if (this.gameOver()) {\n            let go = new _gameover__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n            go.initializeGameOver()\n        }\n    }\n\n    gameOver() {\n        return this.anyBlockAtTop()\n    }\n\n    anyBlockAtTop() {\n        let bool = false;\n        let numRows = this.grid.blocks.length;\n        this.grid.blocks[numRows - 1].forEach(block => {\n            if (block.canvPos[1] <= 50) bool = true;\n        })\n        return bool;\n    }\n\n    onKeyDown(e) {\n        const cursor = this.game.cursor;\n        const move = this.MOVES[e.key];\n\n        if (Object.keys(this.MOVES).includes(e.key)) {\n            cursor.changePos(move, this.game.DIM_X, this.game.DIM_Y)\n        } else if (e.key === \" \") {\n            this.game.grid.swapBlocks(cursor);\n        }\n    }\n\n    bindKeyHandlers() {\n        document.addEventListener(\"keydown\", this.onKeyDown)\n    };\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/gameover.js":
/*!*************************!*\
  !*** ./src/gameover.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Gameover {\n    constructor() {\n        this.ele =  document.getElementById(\"gameover-container\");\n    }\n\n    initializeGameOver() {\n        let button = document.getElementById(\"gameover-button\")\n        button.addEventListener(\"click\", this.reloadPage)\n\n        this.ele.style.visibility = \"visible\"\n    }\n\n    reloadPage(e) {\n        location.reload()\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Gameover);\n\n//# sourceURL=webpack:///./src/gameover.js?");

/***/ }),

/***/ "./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ \"./src/block.js\");\n\n\nclass Grid {\n    constructor(dimX, dimY, vel) {\n        this.DIM_X = 400;\n        this.DIM_Y = 800;\n        this.NUM_START_ROWS = 3;\n        this.NUM_COLUMNS = 6;\n        this.VEL = vel;\n        this.blocks = this.createAllRows();\n\n    }\n\n    createAllRows() {\n        let blocks = [];\n        let yPos = 700;\n        for (let i = 0; i < this.NUM_START_ROWS; i++) {\n            let newRow = this.createSingleRow(i, yPos);\n            blocks.push(newRow);\n            yPos -= 50;\n        }\n\n        if (this.anyColMatch(blocks)) {\n            return this.createAllRows()\n        } else {\n            return blocks;\n        }\n    }\n\n    createSingleRow(rowIdx, rowStartPos) {\n        let canvPos = [0, rowStartPos]\n        let blocks = []\n\n        for (let i = 0; i < this.NUM_COLUMNS; i++) {\n            let block = new _block__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ \n                canvPos: [canvPos[0], canvPos[1]],\n                gridPos: [rowIdx, i] ,\n                vel: this.VEL\n            })\n            blocks.push(block);\n            canvPos[0] += 50;\n        }\n\n        if (this.anyMatch(blocks)) {\n            return this.createSingleRow(rowIdx, rowStartPos);\n        } else {\n            return blocks\n        }\n    }\n\n    anyMatch(blocks, arrLength = this.NUM_COLUMNS) {\n        let matchingBlocks = [];\n        matchingBlocks.push(blocks[0]);\n        let colIdx = 1;\n\n        while (colIdx < arrLength) {\n            if (matchingBlocks.length > 2) {\n                break;\n            } else if (matchingBlocks[0].color === blocks[colIdx].color) {\n                matchingBlocks.push(blocks[colIdx]);\n            } else {\n                matchingBlocks = [blocks[colIdx]]\n            }\n            colIdx += 1;\n        }\n\n        return (matchingBlocks.length > 2)\n    }\n\n    anyColMatch(blocks) {\n        blocks = this.transposeBlocks(blocks);\n        let bool = false;\n\n        blocks.forEach(row => {\n            if (this.anyMatch(row, row.length)) {\n                bool = true;\n            }\n        })\n        return bool;\n    }\n\n    transposeBlocks(blocks) {\n        const transposed = [];\n        for (let i = 0; i < blocks[0].length; i++) {\n            transposed.push([]);\n        };\n\n        for (let i = 0; i < blocks.length; i++) {\n            for (let j = 0; j < blocks[0].length; j++) {\n                transposed[j].push(blocks[i][j]);\n            };\n        };\n\n        return transposed;\n    }\n\n    addNewRow() {\n        if (this.shouldCreateNewRow()) {\n            this.updateGridPosOnNewRow();\n            this.blocks.unshift(this.createSingleRow(0, 700))\n        }\n    }\n\n    updateGridPosOnNewRow() {\n        this.blocks.forEach(row => {\n            row.forEach(block => block.gridPos[0] += 1)\n        })\n    }\n\n    shouldCreateNewRow() {\n        let bool = false;\n        this.blocks[0].forEach(block => {\n            if (block.canvPos[1] <= 650) bool = true;\n        })\n        return bool;\n    }\n\n    removeEmptyRows() {\n        this.blocks.forEach(row => {\n            if (this.rowIsEmpty(row)) {\n                this.blocks.splice(this.blocks.indexOf(row), 1);\n            }\n        })\n    }\n\n    rowIsEmpty(row) {\n        let bool = true\n        row.forEach(block => {\n            if (block.color !== \"white\") {\n                bool = false;\n            }\n        })\n        return bool;\n    }\n\n    swapBlocks(cursor) {\n        const cursorPos = cursor.pos;\n        let currentBlock;\n        let nextBlock;\n        let blocksSwapped = false;\n\n        for (let row = 0; row < this.blocks.length; row ++) {\n            for(let col = 0; col < this.blocks[row].length - 1; col ++) {\n                if (this.positionsMatch(this.blocks[row][col].canvPos, cursorPos)) {\n                    currentBlock = this.blocks[row][col];\n                    nextBlock = this.blocks[row][col + 1];\n                    currentBlock.swapBlock(nextBlock, this);\n                    blocksSwapped = true\n                    break;\n                }\n            }\n            if (blocksSwapped) break;\n        }\n\n    }\n\n    positionsMatch(blockPos, cursorPos) {\n        let cX = cursorPos[0];\n        let cY = cursorPos[1];\n        let bY = blockPos[1]\n        let bX = blockPos[0];\n\n        return (this.between(cX, bX - 5, bX + 5) && this.between(cY, bY - 5, bY + 5))\n    }\n\n    between(num, min, max) {\n        return num >= min && num <= max;\n}\n    \n    haveBlocksFall() {\n        for (let rowIdx = 1; rowIdx < this.blocks.length; rowIdx++) {\n            for (let colIdx = 0; colIdx < this.blocks[0].length; colIdx++) {\n                let topBlock = this.blocks[rowIdx][colIdx];\n                let bottomBlock = this.blocks[rowIdx - 1][colIdx];\n\n                if (bottomBlock.isWhite() && !topBlock.isWhite()) {\n                    topBlock.swapBlock(bottomBlock, this);\n                }\n            }\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n//# sourceURL=webpack:///./src/grid.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvasEl = document.getElementById(\"game-canvas\")\n    const ctx = canvasEl.getContext(\"2d\");\n    const game = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n    const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](game, ctx)\n    \n    //Starts game when 'm' is pressed-----------\n    ctx.fillStyle = \"#3F91C3\";\n    ctx.fillRect(-10, 50, 400, 700);\n    ctx.fillStyle = \"black\";\n    ctx.font = \"30px Arial\";\n    ctx.fillText(\"Press 'm' to start \", 40, 600);\n\n    const startGame = () => {\n        gameView.start();\n        document.removeEventListener('keydown', gameFunc)\n    }\n    \n    const gameFunc = (e) => {\n        if (e.key === 'm') {\n            startGame()\n        }\n    }\n    \n    document.addEventListener('keydown', gameFunc) //Start game if 'm' is pressed\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/matching_blocks.js":
/*!********************************!*\
  !*** ./src/matching_blocks.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MatchingBlocks {\n    constructor(grid) {\n        this.grid = grid\n        this.blocks = grid.blocks\n        this.numRows = this.blocks.length;\n        this.numColumns = this.blocks[0].length;\n        this.matches = [];\n    }\n\n    createMatches() {\n        this.blocks.forEach(row => {\n            this.matches.push(...this.createMatchesFromSingleRow(row))\n        })\n\n        let cols = this.grid.transposeBlocks(this.blocks);\n        cols.forEach(row => {\n            this.matches.push(...this.createMatchesFromSingleRow(row))\n        })\n    }\n\n    createMatchesFromSingleRow(blocks) {\n        let matchingBlocks = [];\n        let matchesArr = []\n        matchingBlocks.push(blocks[0]);\n        let block;\n\n        for (let colIdx = 1; colIdx < blocks.length; colIdx ++) {\n            block = blocks[colIdx]\n\n            if (matchingBlocks[0].matches(block)) {\n                matchingBlocks.push(block);\n\n                //If match is for final 3 blocks\n                if (colIdx === blocks.length - 1 && this.actualMatch(matchingBlocks)){\n                    matchesArr.push(matchingBlocks)\n                }\n            } else {\n                if (this.actualMatch(matchingBlocks)) {\n                   matchesArr.push(matchingBlocks)\n                } \n                matchingBlocks = [blocks[colIdx]];\n            }\n        }\n\n        return matchesArr;\n    }\n\n    actualMatch(matchingBlocks) {\n        return !matchingBlocks[0].isWhite() && matchingBlocks.length > 2\n    }\n\n    turnMatchesWhite() {\n        this.matches.forEach(blocks => {\n            if (this.blocksOnGround(blocks)){\n                blocks.forEach(block => block.color = \"white\")\n            }\n        })\n    }\n\n    blocksOnGround(blocks) {\n        let bool = true;\n        \n        blocks.forEach(block => {\n            let blockUnder;\n            if(block.gridPos[0] > 0){\n                blockUnder = this.grid.blocks[block.gridPos[0] - 1][block.gridPos[1]]\n            }\n            if (blockUnder && blockUnder.isWhite()) {\n                bool = false;\n            }\n        })\n        return bool;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MatchingBlocks);\n\n\n//# sourceURL=webpack:///./src/matching_blocks.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Score {\n    constructor (){\n        this.startTime = Date.now();\n        this.scoreEle = this.createScoreEle();\n    }\n\n    getSecondsPasssed() {\n        return Math.floor((Date.now() - this.startTime) / 1000)\n    }\n\n    createScoreEle() {\n        let scoreContainer = document.createElement(\"div\");\n        scoreContainer.id = \"score-container\"\n        let scoreWord = document.createElement(\"div\")\n        scoreWord.innerHTML = \"Score\"\n        let scoreEle = document.createElement(\"div\")\n        scoreEle.id = \"score\"\n\n        scoreContainer.append(scoreWord)\n        scoreContainer.append(scoreEle)\n        let left = document.getElementById(\"left-container\")\n        left.insertBefore(scoreContainer, left.firstChild)\n        return scoreEle;\n    }\n\n\n    displayScore() {\n        this.scoreEle.innerHTML = this.getSecondsPasssed();\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Score);\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ })

/******/ });