import './styles.css';

import { init, Text, Sprite, initKeys, keyPressed, degToRad, GameLoop } from 'kontra';

const { canvas, context } = init("canvas1");
let sprites = [];
let isPlayerEnable = false;
let test_count = 0;

const bg_border_width = 15;
const bg_border_l = bg_border_width;
const bg_border_r = canvas.width - bg_border_width;
const bg_border_u = bg_border_width;
const bg_border_d = canvas.height - bg_border_width;
const bg_border_offset = 10;

// should remove at final build -------------------------------------------------
document.write('<script src="http://'
    + (location.host || 'localhost').split(':')[0]
    + ':35729/livereload.js?snipver=1"></' + 'script>');

function renderBackground() {
    context.beginPath();
    context.rect(bg_border_l, bg_border_u, bg_border_r - bg_border_l, bg_border_d - bg_border_u);
    context.stroke();
}

function renderPlayer() {
    context.strokeStyle = 'blue';
    context.beginPath();
    context.moveTo(-3, -5);
    context.lineTo(12, 0);
    context.lineTo(-3, 5);
    context.closePath();
    context.stroke();
}

function createPlayer() {
    return Sprite({
        x: 50,
        y: 50,
        type: 'player',
        radius: 6,
        color: 'red',
        render() {
            renderPlayer();
        },
        update() {
            if (keyPressed('left')) {
                this.rotation += degToRad(-3);
            }
            if (keyPressed('right')) {
                this.rotation += degToRad(3);
            }

            const cos = Math.cos(this.rotation);
            const sin = Math.sin(this.rotation);

            if (keyPressed('s')) {
                isPlayerEnable = true;
            }

            if (keyPressed('d')) {
                isPlayerEnable = false;
            }

            if (isPlayerEnable) {
                this.ddx = cos * 0.05;
                this.ddy = sin * 0.05;
            } else {
                this.ddx = 0;
                this.ddy = 0;
                this.dx = 0;
                this.dy = 0;
            }
            this.advance();

            if (this.velocity.length() > 3) {
                this.dx *= 0.95;
                this.dy *= 0.95;
            }
        }
    });
}

function loseLife() {
    // temparary
    isPlayerEnable = false;
}

function main() {
    initKeys();

    let player = createPlayer();
    sprites.push(player);

    let text = Text({
        text: 'Hello World ! : ' + test_count,
        font: '12px Arial',
        color: 'red',
        x: 40,
        y: 500,
        textAlign: 'center',
        update() {
            this.text = 'Test Count: ' + test_count;
        }
    });

    let loop = GameLoop({
        update() {
            sprites.map(sprite => {
                sprite.update();

                if (sprite.type == 'player' && (sprite.x < bg_border_l - bg_border_offset || sprite.x > bg_border_r + bg_border_offset || sprite.y < bg_border_u - bg_border_offset || sprite.y > bg_border_d + bg_border_offset)) {
                    loseLife();
                }
            });

            text.update();
        },
        render() {
            renderBackground();
            text.render();
            sprites.map(sprite => sprite.render());
        }
    });

    loop.start();
}

main();