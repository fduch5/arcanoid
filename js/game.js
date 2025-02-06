let game = {
    cntx: null,
    platform: null,
    ball: null,
    blocks: [],
    rows: 4,
    cols: 8,
    sprites: {
        background: null,
        ball: null,
        platform: null,
        block: null
    },

    init(){
        const gameCanvas = document.querySelector("#game-canvas");
        this.cntx = gameCanvas.getContext("2d");

        this.setEvents();
    },
    setEvents(){
        window.addEventListener("keydown", (e) => {
            if(e.keyCode === 37){
                this.platform.dx = -this.platform.velocity;
            } else if(e.keyCode === 39) {
                this.platform.dx = this.platform.velocity;
            }
        });
        window.addEventListener("keyup", (e) => {
            this.platform.dx = 0;
        });
    },
    preload(callback){
        let loaded  = 0;
        const required = Object.keys(this.sprites).length;
        let onImageLoad = () => {
            loaded += 1;
            if(loaded >= required){
                callback();
            }
        }
        // отследить событие когда картинки будут загружены полностью каждый
        for(let key in this.sprites){
            this.sprites[key] = new Image();
            this.sprites[key].src = `./sprites/${key}.png`;
            // отслеживаем загрузку картин, уже после callback
            this.sprites[key].addEventListener("load", onImageLoad);
        }
    },

    render(){
        this.cntx.drawImage(this.sprites.background, 0, 0);
        this.cntx.drawImage(this.sprites.ball,
            0, 0, this.ball.width, this.ball.height,
            this.ball.x, this.ball.y, this.ball.width, this.ball.height
        );
        this.cntx.drawImage(this.sprites.platform, this.platform.x,
            this.platform.y);

        this.renderBlocks();
    },

    renderBlocks(){
        for(let block of this.blocks){
            this.cntx.drawImage(this.sprites.block, block.x, block.y);
        }
    },

    create(){
        for(let row = 0; row < this.rows; row += 1){
            for(let col = 0; col < this.cols; col += 1){
                this.blocks.push({
                    x: 64 * col + 65,
                    y: 22 * row + 35
                });
            }
        }
    },

    update(){
        this.platform.move();
    },

    run(){
        window.requestAnimationFrame(() => {
            this.update();
            this.render();
            // this.run();
        });
    },

    start(){
        this.init();
        this.preload(() => {
            this.create();
            this.run();
        });
    },
};

game.platform = {
    velocity: 4,
    dx: 0,
    x: 620 / 2 - 32,
    y: 300,

    move(){
        if(this.dx) {
            this.x += this.dx;
        }
    },
};

game.ball = {
    x: 320,
    y: 280,
    width: 20,
    height: 20,
};

window.addEventListener('load', () => {
    game.start();
});