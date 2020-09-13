import { Sprite, imageAssets, degToRad } from 'kontra';
import { BG_SPC_H, BG_SPC_W } from './globals';

const enemyPositions = [
    [Math.round(BG_SPC_W * 0.35), Math.round(Math.random() * (BG_SPC_H - 80) + 30)],
    [Math.round(BG_SPC_W * 0.6), Math.round(Math.random() * (BG_SPC_H - 80) + 30)],
    [Math.round(BG_SPC_W * 0.9), Math.round(Math.random() * (BG_SPC_H - 80) + 30)],
];

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
            shaking: 0,
            image: imageAssets['assets/enemy'],
            rotation: degToRad((Math.random() - 0.5) * 30),
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