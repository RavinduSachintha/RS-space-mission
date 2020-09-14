import { Sprite, keyPressed, degToRad, imageAssets } from 'kontra';
import { player, BG_BRD_U, BG_BRD_D, BG_BRD_L, BG_BRD_R, sprites, context } from './globals';
import { createBullet } from './bullet';

function renderPlayer(action, radius) {
    action = action || 'default';
    radius = radius || 0;

    context.translate(-radius, 0);

    // context.beginPath();
    // context.arc(radius, 0, radius, 0, Math.PI * 2);
    // context.closePath();
    // context.lineWidth = 1;
    // context.strokeStyle = "red";
    // context.stroke();

    context.beginPath();
    context.moveTo(25, -5);
    context.lineTo(20, -12);
    context.lineTo(9, -11);
    context.lineTo(8, -9);
    context.lineTo(18, -4);
    context.lineTo(18, 4);
    context.lineTo(8, 9);
    context.lineTo(9, 11);
    context.lineTo(20, 12);
    context.lineTo(25, 5);
    context.closePath();
    context.fillStyle = "#CCCCCC";
    context.fill();

    context.beginPath();
    context.moveTo(3, 0);
    context.quadraticCurveTo(36, -15, 48, 0);
    context.moveTo(3, 0);
    context.quadraticCurveTo(36, 15, 48, 0);
    context.closePath();
    context.fillStyle = "#48A0DC";
    context.fill();

    context.beginPath();
    context.arc(36, 0, 5, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "#4D4D4D";
    context.fill();

    context.beginPath();
    context.arc(36, 0, 3, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "#FFF";
    context.fill();

    context.beginPath();
    context.moveTo(12, -4);
    context.lineTo(12, 4);
    context.lineTo(9, 3);
    context.lineTo(9, -3);
    context.closePath();
    context.fillStyle = "#387AA7";
    context.fill();

    context.beginPath();
    context.moveTo(9, -3);
    if (action === 'default') {
        context.bezierCurveTo(-8, -2, -8, 2, 9, 3);
    } else if (action === 'turn-left') {
        context.bezierCurveTo(-8, -5, -8, -1, 9, 3);
    } else if (action === 'turn-right') {
        context.bezierCurveTo(-8, 1, -8, 5, 9, 3);
    }
    context.closePath();
    context.fillStyle = "#FFCC66";
    context.fill();

    context.beginPath();
    context.moveTo(9, -1.5);
    if (action === 'default') {
        context.bezierCurveTo(-4, -1, -4, 1, 9, 1.5);
    } else if (action === 'turn-left') {
        context.bezierCurveTo(-4, -3.5, -4, -1.5, 9, 1.5);
    } else if (action === 'turn-right') {
        context.bezierCurveTo(-4, 1.5, -4, 3.5, 9, 1.5);
    }
    context.closePath();
    context.fillStyle = "#ED7161";
    context.fill();

    if (action === 'destroyed') {
        context.translate(24, 0);

        context.beginPath();
        context.moveTo(0, -30);
        context.lineTo(10, -11);
        context.lineTo(30, -7);
        context.lineTo(16, 9);
        context.lineTo(19, 30);
        context.lineTo(0, 21);
        context.lineTo(-19, 30);
        context.lineTo(-16, 9);
        context.lineTo(-30, -7);
        context.lineTo(-10, -11);
        context.closePath();
        context.fillStyle = "#FFA500";
        context.fill();

        context.beginPath();
        context.moveTo(0, -15);
        context.lineTo(5, -5.5);
        context.lineTo(15, -3.5);
        context.lineTo(8, 4.5);
        context.lineTo(9.5, 15);
        context.lineTo(0, 10.5);
        context.lineTo(-9.5, 15);
        context.lineTo(-8, 4.5);
        context.lineTo(-15, -3.5);
        context.lineTo(-5, -5.5);
        context.closePath();
        context.fillStyle = "#F00";
        context.fill();
    }
}

export function createPlayer() {
    return Sprite({
        x: 50,
        y: (BG_BRD_D - BG_BRD_U) / 2,
        type: 'player',
        anchor: { x: 0.5, y: 0.5 },
        radius: 24,
        dt: 0,
        action: 'default',
        render() {
            renderPlayer(this.action, this.radius);
        },
        update() {
            this.action = 'default';
            if (keyPressed('left')) {
                this.action = 'turn-left';
                this.rotation += degToRad(-3) * (this.velocity.length() / player.maxSpeed);
            }
            if (keyPressed('right')) {
                this.action = 'turn-right';
                this.rotation += degToRad(3) * (this.velocity.length() / player.maxSpeed);
            }

            if (this.x < BG_BRD_L || this.x > BG_BRD_R || this.y < BG_BRD_U || this.y > BG_BRD_D) {
                player.isEnable = false;
                player.isDestroyed = true;
            }

            const cos = Math.cos(this.rotation);
            const sin = Math.sin(this.rotation);

            // should change later
            if (keyPressed('s')) {
                player.isEnable = true;
                player.isDestroyed = false;
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

            this.dt += 1 / 60;
            if (keyPressed('space') && this.dt > 0.25) {
                this.dt = 0;
                let bullet = createBullet(this.x + cos * 25, this.y + sin * 25, this.dx + cos * 5, this.dy + sin * 5, 'yellow');
                sprites.items.push(bullet);
            }

            if (player.isDestroyed) {
                this.action = 'destroyed';
            }
        }
    });
}