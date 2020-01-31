class Gameover {
    constructor() {
        this.ele =  document.getElementById("gameover-container");
    }

    initializeGameOver() {
        let button = document.getElementById("gameover-button")
        button.addEventListener("click", this.reloadPage)

        this.ele.style.visibility = "visible"
    }

    reloadPage(e) {
        location.reload()
    }
}

export default Gameover;