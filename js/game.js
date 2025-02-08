const KEYS = {
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32
};

let game = {
    isGame: false,
    cntx: null,
    platform: null,
    ball: null,
    blocks: [],
    rows: 4,
    cols: 8,
    width: 640,
    height: 320,
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
            if(e.keyCode === KEYS.SPACE){
               this.platform.fire();
            } else if(e.keyCode === KEYS.LEFT || e.keyCode === KEYS.RIGHT){
                this.platform.start(e.keyCode);
            }
        });
        window.addEventListener("keyup", (e) => {
            this.platform.stop();
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
        // очистка накваса перед созданием нового кадра
        this.cntx.clearRect(0, 0, this.width, this.height);
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
        this.ball.move();
    },

    run(){
        window.requestAnimationFrame(() => {
            this.update();
            this.render();
            this.run();
        });
    },

    start(){
        this.init();
        this.preload(() => {
            this.create();
            this.run();
        });
    },

    random(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};

game.ball = {
    x: 320,
    y: 280,
    velocity: 3,
    dx: 0,
    dy: 0,
    width: 20,
    height: 20,

    start(){
        this.dy = -this.velocity;
        this.dx = game.random(-this.velocity, this.velocity);
    },

    move(){
        if(this.dy){
            this.y += this.dy;
        }
        if(this.dx){
            this.x += this.dx;
        }
    },
}

game.platform = {
    velocity: 6,
    dx: 0, 
    x: 620 / 2 - 32,
    y: 300,
    ball: game.ball,

    start(direction){
        if(direction === KEYS.LEFT){
            this.dx = -this.velocity;
        } else if(direction === KEYS.RIGHT){
            this.dx = this.velocity;
        }
    },

    fire(){
        if(this.ball){
            this.ball.start();
            this.ball = null;
        }
    },

    stop(){
        this.dx = 0;
    },

    move(){
        if(this.dx) {
            this.x += this.dx;
            if(this.ball){
                this.ball.x += this.dx;
            }
        }
    },
};

window.addEventListener('load', () => {
    game.start();
});