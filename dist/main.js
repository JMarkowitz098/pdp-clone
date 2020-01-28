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
eval("__webpack_require__.r(__webpack_exports__);\nclass Block {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = 2;\n        this.color = this.randColor();\n        this.size = 50;\n    }\n\n    randColor() {\n        const COLORS = [\"red\", \"yellow\", \"green\", \"blue\"]\n        let color = COLORS[Math.floor(Math.random() * COLORS.length)];\n        return color;\n    }\n\n    draw(ctx) {\n\n        ctx.fillStyle = this.color;\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        ctx.fillRect(x, y, this.size, this.size);\n\n    }\n\n    move() {\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        this.pos = [x, y - this.vel];\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Block);\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Cursor {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = 2;\n        this.color = \"black\";\n        this.size = 50;\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n        ctx.lineWidth = \"6\";\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        ctx.strokeRect(x, y, this.size * 2, this.size);\n    }\n\n    move() {\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        this.pos = [x, y - this.vel];\n    }\n\n    changePos(dir) {\n        let newX = this.pos[0] + dir[0];\n        let newY = this.pos[1] + dir[1];\n\n        this.pos = [newX, newY];\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cursor);\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ \"./src/block.js\");\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cursor */ \"./src/cursor.js\");\n\n\n\nclass Game {\n    constructor() {\n\n        this.DIM_X = 400;\n        this.DIM_Y = 800;\n        this.NUM_START_ROWS = 4;\n        this.NUM_COLUMNS = 6;\n        this.blocks = this.createAllRows();\n        this.cursor = new _cursor__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({pos: [100,600]});\n    }\n\n    createAllRows() {\n        let blocks = [];\n        let yPos = 700;\n        for(let i = 0; i < this.NUM_START_ROWS; i++) {\n            blocks.push(this.createSingleRow(yPos));\n            yPos -= 50;\n        }\n        return blocks\n    }\n\n    createSingleRow(rowStartPos) {\n        let pos = [0, rowStartPos]\n        let blocks = []\n        for(let i = 0; i < this.NUM_COLUMNS; i ++){\n            let block = new _block__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({pos: [pos[0], pos[1]]})\n            blocks.push(block);\n            pos[0] += 50;\n        }\n        return blocks;\n    } \n\n    draw(ctx) {\n        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n        ctx.fillStyle = \"white\";\n        ctx.fillRect(0, 50, this.DIM_X, this.DIM_Y);\n\n        this.blocks.forEach(row => {\n            this.drawRow(row, ctx)\n        });\n        this.cursor.draw(ctx);\n    }\n\n    drawRow(blocks, ctx) {\n        blocks.forEach(block => {\n            block.draw(ctx);\n        });\n    }\n\n    moveBlocks() {\n        this.blocks.forEach(row => {\n            this.moveRow(row);\n        });\n    }\n\n    moveRow(blocks) {\n        blocks.forEach(block => {\n            block.move();\n        });\n    }\n\n    moveCursor() {\n        this.cursor.move();\n    }\n\n    swapBlocks() {\n        const cursorPos = this.cursor.pos;\n\n        this.blocks.forEach((row, rowIdx) => {\n            row.forEach((block, colIdx) => {\n                if (block.pos[0] === cursorPos[0] && block.pos[1] === cursorPos[1]) {\n                    let nextBlock = this.blocks[rowIdx][colIdx + 1]\n                    this.swapBlockPositions(block, nextBlock)\n                    this.swapPosInBlocksArrHor(rowIdx, colIdx)\n                }\n            })\n        })\n    }\n\n    swapBlockPositions(firstBlock, nextBlock) {\n        let firstBlockPos = firstBlock.pos;\n        firstBlock.pos = nextBlock.pos;\n        nextBlock.pos = firstBlockPos;\n    }\n\n    swapPosInBlocksArrHor(rowIdx, colIdx) {\n        let first = this.blocks[rowIdx][colIdx];\n        this.blocks[rowIdx][colIdx] = this.blocks[rowIdx][colIdx + 1]\n        this.blocks[rowIdx][colIdx + 1] = first\n    }\n\n    clearMatchingBlocks() {\n        for (let rowIdx = 0; rowIdx < this.blocks.length; rowIdx ++){\n            for (let colIdx = 0; colIdx < this.NUM_COLUMNS; colIdx ++) {\n                if (colIdx < this.blocks[rowIdx].length - 2){\n                    this.clearMatchingRow(rowIdx, colIdx)\n                }\n                if (rowIdx < this.blocks.length - 2) {\n                    this.clearMatchingCol(rowIdx, colIdx)\n                }\n            }\n        }\n    }\n\n    clearMatchingRow(rowIdx, colIdx) {\n        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'row');\n\n        if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {\n            this.turnBlocksWhite(matchingBlocks)\n        }\n    }\n\n    clearMatchingCol(rowIdx, colIdx) {\n        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'col');\n\n        if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {\n            this.turnBlocksWhite(matchingBlocks)\n        }\n    }\n\n    createMatchingBlocksArr(rowIdx, colIdx, type) {\n        let matchingBlocks = [];\n        matchingBlocks.push(this.blocks[rowIdx][colIdx])\n        if (type === \"row\"){\n            while(this.nextBlockExists(rowIdx, colIdx,type) && this.nextBlockMatched(rowIdx, colIdx, type)) {\n                colIdx += 1;\n                matchingBlocks.push(this.blocks[rowIdx][colIdx]);\n            }\n        } else {\n            while(this.nextBlockExists(rowIdx, colIdx, type) && this.nextBlockMatched(rowIdx, colIdx, type)) {\n                rowIdx += 1;\n                matchingBlocks.push(this.blocks[rowIdx][colIdx]);\n            }\n        }\n        return matchingBlocks;\n    }\n\n    nextBlockMatched(rowIdx, colIdx, type) {\n        let block = this.blocks[rowIdx][colIdx]\n        let nextBlock = this.nextBlock(rowIdx, colIdx, type);\n    \n        if (block.color === nextBlock.color) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    nextBlock(rowIdx, colIdx, type) {\n        if (type === 'row') {\n            return this.blocks[rowIdx][colIdx + 1]\n        } else {\n            return this.blocks[rowIdx + 1][colIdx]\n        }\n    }\n\n    nextBlockExists(rowIdx, colIdx, type) {\n        if(type === \"row\" && colIdx + 1 > this.NUM_COLUMNS - 1) {\n            return false;\n        } else if (type === \"col\" && rowIdx + 1 > this.blocks.length - 1) {\n            return false\n        } else {\n            return true;\n        }\n    }\n\n    colorsMatched(matchingBlocks) {\n        if (matchingBlocks[0].color === matchingBlocks[1].color \n            && matchingBlocks[0].color === matchingBlocks[2].color \n            && matchingBlocks[0].color !== \"white\")\n        {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    turnBlocksWhite(matchingBlocks) {\n        matchingBlocks.forEach(block => {\n            block.color = \"white\"\n        })\n    }\n\n    haveBlocksFall() {\n        for (let rowIdx = 1; rowIdx < this.blocks.length; rowIdx++) {\n            for (let colIdx = 0; colIdx < this.blocks[0].length; colIdx++) {\n                let topBlock = this.blocks[rowIdx][colIdx];\n                let bottomBlock = this.blocks[rowIdx - 1][colIdx];\n\n                if(bottomBlock.color === \"white\" && topBlock.color !== \"white\") {\n                    this.swapBlockPositions(topBlock, bottomBlock)\n                    this.swapPosInBlocksArrVert(rowIdx, colIdx);\n                }\n            }\n        }\n    }\n\n    swapPosInBlocksArrVert(rowIdx, colIdx) {\n        let first = this.blocks[rowIdx][colIdx];\n        this.blocks[rowIdx][colIdx] = this.blocks[rowIdx - 1][colIdx]\n        this.blocks[rowIdx - 1][colIdx] = first\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameView {\n    constructor(game, ctx) {\n        this.ctx = ctx;\n        this.game = game;\n        this.step = this.step.bind(this)\n        this.MOVES = {\n            w: [0, -50],\n            a: [-50, 0],\n            s: [0, 50],\n            d: [50, 0],\n        }\n\n        this.onKeyDown = this.onKeyDown.bind(this)\n    }\n\n    start() {\n        this.bindKeyHandlers();\n        requestAnimationFrame(this.step)\n    }\n\n    step() {\n        //disabled for testing\n        // this.game.moveBlocks();\n        // this.game.moveCursor();\n\n        this.game.draw(this.ctx);\n        this.game.haveBlocksFall();\n        this.game.clearMatchingBlocks();\n\n        requestAnimationFrame(this.step)\n    }\n\n    onKeyDown(e) {\n        const cursor = this.game.cursor;\n        const move = this.MOVES[e.key];\n\n        if (Object.keys(this.MOVES).includes(e.key)){\n            cursor.changePos(move)    \n        } else if (e.key === \" \") {\n            this.game.swapBlocks();\n        } \n    }\n\n    bindKeyHandlers() {\n        document.addEventListener(\"keydown\", this.onKeyDown)\n    };\n\n    //Using keymaster\n    // bindKeyHandlers() {\n    //     const cursor = this.game.cursor;\n    //     document.addEventListener(\"keydown\", this.onKeyDown)\n\n    //     Object.keys(this.MOVES).forEach((k) => {\n    //         const move = this.MOVES[k];\n    //         key(k, () => cursor.changePos(move));\n    //     });\n    // };\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvasEl = document.getElementById(\"game-canvas\")\n    const ctx = canvasEl.getContext(\"2d\");\n    const game = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n    const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](game, ctx)\n\n    gameView.start();\n    // document.addEventListener(\"keydown\", () => console.log('banana'))\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });