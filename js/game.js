let game = {
    cntx: null,
    sprites: {
        background: null,
        ball: null,
        platform: null
    },
    init(){
        const gameCanvas = document.querySelector("#game-canvas");
        this.cntx = gameCanvas.getContext("2d");
    },
    preload(callback){
        let loaded  = 0;
        const required = Object.keys(this.sprites).length;
        // отследить событие когда картинки будут загружены полностью каждый
        for(let key in this.sprites){
            this.sprites[key] = new Image();
            this.sprites[key].src = `./sprites/${key}.png`;
            // отслеживаем загрузку картин, уже после callback
            this.sprites[key].addEventListener("load", () => {
                loaded += 1;
                if(loaded >= required){
                    callback();
                }
            });
        }
    },

    run(){
        window.requestAnimationFrame(() => {
            this.render();
        });
    },
    render(){
        this.cntx.drawImage(this.sprites.background, 0, 0);
        this.cntx.drawImage(this.sprites.ball, 0, 0);
        this.cntx.drawImage(this.sprites.platform, 100, 100);
    },
    start: function(){
        this.init();
        this.preload(() => {
            this.run();
        });
    },
};

window.addEventListener('load', () => {
    game.start();
});