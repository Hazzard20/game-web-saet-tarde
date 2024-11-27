console.log('game.js loaded');

const canvas = document.querySelector('#game');
const contexto = canvas.getContext('2d');

// images
var playerImage = new Image();
playerImage.src = "./images/bird-asa-baixo.png";

var groundImage = new Image();
groundImage.src = "./images/chao.png";

var backgroundImage = new Image();
backgroundImage.src = "./images/fundo.png";

var pipeTopImage = new Image();
pipeTopImage.src = "./images/cano-ceu.png";

var pipeBotImage = new Image();
pipeBotImage.src = "./images/cano-chao.png";

const gameSpeed = 1;

var player = {
    x: 50,
    y: 50,
    velocity: 0,
    gravity: 0.3,
    jumpForce: 6,

    draw() {
        contexto.drawImage(playerImage, this.x, this.y);
    },

    jump() {
        this.velocity = -this.jumpForce;
    },

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.draw();
    }
}

var ground = {
    x: 0,
    y: 368,
    draw() {
        contexto.drawImage(groundImage, this.x, this.y);
        contexto.drawImage(groundImage, this.x + 224, this.y);
        contexto.drawImage(groundImage, this.x - 224, this.y);
    },

    update() {
        this.draw(); 
        this.x -= gameSpeed;
        if(this.x < -112) {
            this.x += 224;
        }
    }
}

var background = {
    x: 0,
    y: 220,
    draw() {
        contexto.drawImage(backgroundImage, this.x, this.y);
        contexto.drawImage(backgroundImage, this.x + 276, this.y);
        contexto.drawImage(backgroundImage, this.x - 276, this.y);
    },

    update() {
        this.draw();
        this.x -= gameSpeed * 0.3;
        if(this.x < -138) {
            this.x += 276;
        }
    }
}

// -360 < y < -80
function newPipe() {
    var pipe = {
        x: 330,
        y: 0,
        pipeGap: 100,
        draw() {
            contexto.drawImage(pipeTopImage, this.x, this.y);
            contexto.drawImage(pipeBotImage, this.x, this.y + 400 + this.pipeGap);
        },

        start() {
            this.y = (Math.random() * (-280 + this.pipeGap)) -80 - this.pipeGap;
        },
    
        update() {
            this.draw();
            this.x -= gameSpeed;
        }
    }
    pipe.start();

    return pipe;
}

let pipesList = [];

function createPipes(frame) {
    if(frame % 150 == 0) {
        pipesList.push(newPipe())
    }
}

frame = -1;
function loop() {
    frame++;
    contexto.clearRect(0, 0, 320, 480);

    background.update();
    player.update();
    
    createPipes(frame);
    pipesList.forEach((pipe) => {
        pipe.update();
    });
    
    ground.update();

    requestAnimationFrame(loop);
}

document.addEventListener("keydown", function (event) {
    if(event.key == " ") {
        player.jump();
    }
}, true);

loop();