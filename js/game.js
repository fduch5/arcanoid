let game = {
    cntx: null,
    background: null,
    start: function(){
        const gameCanvas = document.querySelector("#game-canvas");
        this.cntx = gameCanvas.getContext("2d");
        this.background = new Image();
        this.background.src = "./sprites/background.png";
        // console.log(this.background);
        // метод drawImage канваса готовит рисунок для отрисоки, но не рисует
        // метод requestAnimationFrame отрисовывает запланированные рисунки 
        window.requestAnimationFrame(() => {
            this.cntx.drawImage(this.background, 0, 0);
        });
    },
};

window.addEventListener('load', () => {
    game.start();
});