import { Sprite, degToRad } from 'kontra';
import { BG_SPC_H, BG_SPC_W, ENEMY_ENERGY_LVL, context, sprites } from './globals';
import { createBullet } from './bullet';

const enemyPositions = [
    [Math.round(BG_SPC_W * 0.35), Math.round(Math.random() * (BG_SPC_H - 75) + 60)],
    [Math.round(BG_SPC_W * 0.6), Math.round(Math.random() * (BG_SPC_H - 75) + 60)],
    [Math.round(BG_SPC_W * 0.9), Math.round(Math.random() * (BG_SPC_H - 75) + 60)],
];

function renderEnemy(action, radius, energy) {
    action = action || 'default';
    radius = radius || 0;
    energy = energy || ENEMY_ENERGY_LVL;

    context.translate(-radius, 0);

    context.beginPath();
    context.ellipse(radius, 10, 14, 8, 0, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "#FFA500";
    context.fill();

    context.beginPath();
    context.ellipse(radius, -8, 12, 12, 0, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "#FF0";
    context.fill();

    context.lineWidth = 2;
    context.beginPath();
    context.ellipse(radius, -8, 12, 12, 0, 0, Math.PI * 2);
    context.closePath();
    context.strokeStyle = "#080";
    context.stroke();

    context.beginPath();
    context.moveTo(12, 0);
    context.lineTo(4, -20);
    context.lineTo(6, -20);
    context.lineTo(20, 0);
    context.closePath();
    context.fillStyle = "#080";
    context.fill();

    context.beginPath();
    context.arc(5, -20, 2, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "#FFA500";
    context.fill();

    context.beginPath();
    context.moveTo(52, 0);
    context.lineTo(60, -20);
    context.lineTo(58, -20);
    context.lineTo(44, 0);
    context.closePath();
    context.fillStyle = "#080";
    context.fill();

    context.beginPath();
    context.arc(59, -20, 2, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "#FFA500";
    context.fill();

    context.beginPath();
    context.ellipse(radius, 0, 32, 12, 0, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "#0A0";
    context.fill();

    context.beginPath();
    context.ellipse(radius, 0, 32, 12, 0, 0, Math.PI * 2);
    context.closePath();
    context.strokeStyle = "#080";
    context.stroke();

    // middle circles line
    context.beginPath();
    context.arc(radius, 0, 2, 0, Math.PI * 2);
    context.arc(radius - 9, 0, 2, 0, Math.PI * 2);
    context.arc(radius + 9, 0, 2, 0, Math.PI * 2);
    context.arc(radius - 18, 0, 2, 0, Math.PI * 2);
    context.arc(radius + 18, 0, 2, 0, Math.PI * 2);
    context.arc(radius - 27, 0, 2, 0, Math.PI * 2);
    context.arc(radius + 27, 0, 2, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "#FFF";
    context.fill();

    // energy meter
    context.beginPath();
    context.rect(radius - 10, -30, (energy * 20) / ENEMY_ENERGY_LVL, 5);
    context.closePath();
    context.fillStyle = "#F00";
    context.fill();

    context.lineWidth = 1;
    context.beginPath();
    context.rect(radius - 10, -30, 20, 5);
    context.closePath();
    context.strokeStyle = "#FF8080";
    context.stroke();
}

function smokeSprites(size, x, y, dx, dy) {
    let lst = [];
    for (let i = 0; i < size; i++) {
        lst.push(Sprite({
            x: x + (Math.random() - 0.5) * 40,
            y: y + Math.random() * 50,
            dx: dx * (Math.random() - 0.5) * 2, dy,
            type: 'smoke',
            width: 2,
            height: 5,
            color: '#FFF',
            ttl: 10
        }));
    }
    return lst;
}

export function createEnemies() {
    let enemiesList = [];
    // console.log(randomSelectionStartPoint);
    for (let i = 0; i < 3; i++) {
        const pos = enemyPositions[i];
        const enemy = Sprite({
            x: pos[0],
            y: pos[1],
            anchor: { x: 0.5, y: 0.5 },
            type: 'enemy',
            energy: ENEMY_ENERGY_LVL,
            shaking: 0,
            rotation: degToRad((Math.random() - 0.5) * 30),
            action: 'default',
            radius: 32,
            range: 120,
            isFiring: false,
            dt: 0,
            render() {
                renderEnemy(this.action, this.radius, this.energy);
            },
            update() {
                // shaking animation
                if (this.shaking == 0) {
                    this.rotation += degToRad(-1.5);
                    this.shaking = (this.rotation > degToRad(-20) ? 0 : 1);
                } else if (this.shaking == 1) {
                    this.rotation += degToRad(1.5);
                    this.shaking = (this.rotation < degToRad(20) ? 1 : 0);
                }

                this.dt += 1 / 60;

                if (this.isFiring && this.dt > 0.1) {
                    let distance =  Math.hypot(sprites.player.x - this.x, sprites.player.y - this.y);
                    let dx = (sprites.player.x - this.x) / distance;
                    let dy = (sprites.player.y - this.y) / distance;
                    let bullet = createBullet(this.x, this.y, dx * 4, dy * 4, '#AFA', 'enemy');
                    sprites.bullets.push(bullet);
                }

                if (this.dt > 0.1) {
                    this.dt = 0;
                    smokeSprites(15, this.x, this.y + 15, 1, 2).forEach(smoke => sprites.smokes.push(smoke));
                }
            }
        });
        enemiesList.push(enemy);
    }
    return enemiesList;
}