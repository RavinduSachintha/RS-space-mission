import { Sprite, keyPressed, degToRad, imageAssets } from 'kontra';
import { player } from './globals';

export function createPlayer() {
    return Sprite({
        x: 50,
        y: 50,
        type: 'player',
        anchor: { x: 0.5, y: 0.5 },
        radius: 6,
        image: imageAssets['assets/player'],
        update() {
            if (keyPressed('left')) {
                this.rotation += degToRad(-3) * (this.velocity.length() / player.maxSpeed);
            }
            if (keyPressed('right')) {
                this.rotation += degToRad(3) * (this.velocity.length() / player.maxSpeed);
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

            if (this.velocity.length() > player.maxSpeed) {
                this.dx *= 0.95;
                this.dy *= 0.95;
            }
        }
    });
}