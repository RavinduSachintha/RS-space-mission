import { Sprite, degToRad } from 'kontra';
import { BG_SPC_H, BG_SPC_W, ENEMY_ENERGY_LVL, context } from './globals';

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
    context.lineWidth = 1;

    // context.beginPath();
    // context.arc(radius, 0, radius, 0, Math.PI * 2);
    // context.closePath();
    // context.strokeStyle = "red";
    // context.stroke();

    context.beginPath();
    context.ellipse(radius, 0, 32, 12, 0, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = "green";
    context.fill();

    // energy meter
    context.beginPath();
    context.rect(radius - 10, -30, (energy * 20) / ENEMY_ENERGY_LVL, 5);
    context.closePath();
    context.fillStyle = "#F00";
    context.fill();

    context.beginPath();
    context.rect(radius - 10, -30, 20, 5);
    context.closePath();
    context.strokeStyle = "#FF8080";
    context.stroke();


    // context.beginPath();
    // context.moveTo(3, 0);
    // context.quadraticCurveTo(36, -15, 48, 0);
    // context.moveTo(3, 0);
    // context.quadraticCurveTo(36, 15, 48, 0);
    // context.closePath();
    // context.fillStyle = "#48A0DC";
    // context.fill();

    // context.beginPath();
    // context.arc(36, 0, 5, 0, Math.PI * 2);
    // context.closePath();
    // context.fillStyle = "#4D4D4D";
    // context.fill();

    // context.beginPath();
    // context.arc(36, 0, 3, 0, Math.PI * 2);
    // context.closePath();
    // context.fillStyle = "#FFF";
    // context.fill();

    // context.beginPath();
    // context.moveTo(12, -4);
    // context.lineTo(12, 4);
    // context.lineTo(9, 3);
    // context.lineTo(9, -3);
    // context.closePath();
    // context.fillStyle = "#387AA7";
    // context.fill();

    // context.beginPath();
    // context.moveTo(9, -3);
    // if (action === 'default') {
    //     context.bezierCurveTo(-8, -2, -8, 2, 9, 3);
    // } else if (action === 'turn-left') {
    //     context.bezierCurveTo(-8, -5, -8, -1, 9, 3);
    // } else if (action === 'turn-right') {
    //     context.bezierCurveTo(-8, 1, -8, 5, 9, 3);
    // }
    // context.closePath();
    // context.fillStyle = "#FFCC66";
    // context.fill();

    // context.beginPath();
    // context.moveTo(9, -1.5);
    // if (action === 'default') {
    //     context.bezierCurveTo(-4, -1, -4, 1, 9, 1.5);
    // } else if (action === 'turn-left') {
    //     context.bezierCurveTo(-4, -3.5, -4, -1.5, 9, 1.5);
    // } else if (action === 'turn-right') {
    //     context.bezierCurveTo(-4, 1.5, -4, 3.5, 9, 1.5);
    // }
    // context.closePath();
    // context.fillStyle = "#ED7161";
    // context.fill();

    // if (action === 'destroyed') {
    //     context.translate(24, 0);

    //     context.beginPath();
    //     context.moveTo(0, -30);
    //     context.lineTo(10, -11);
    //     context.lineTo(30, -7);
    //     context.lineTo(16, 9);
    //     context.lineTo(19, 30);
    //     context.lineTo(0, 21);
    //     context.lineTo(-19, 30);
    //     context.lineTo(-16, 9);
    //     context.lineTo(-30, -7);
    //     context.lineTo(-10, -11);
    //     context.closePath();
    //     context.fillStyle = "#FFA500";
    //     context.fill();
    // }
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
            }
        });
        enemiesList.push(enemy);
    }
    return enemiesList;
}