import { Sprite, keyPressed, degToRad } from 'kontra';
import { context, player } from './globals';

function renderPlayer() {
    context.strokeStyle = 'blue';
    context.beginPath();
    context.moveTo(-3, -5);
    context.lineTo(12, 0);
    context.lineTo(-3, 5);
    context.closePath();
    context.stroke();
}

export function createPlayer() {
    return Sprite({
        x: 50,
        y: 50,
        type: 'player',
        radius: 6,
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
                player.isEnable = true;
            }

            if (keyPressed('d')) {
                player.isEnable = false;
            }

            if (player.isEnable) {
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