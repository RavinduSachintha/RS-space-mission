import { Sprite, imageAssets } from 'kontra';
import { context, BG_BRD_L, BG_BRD_U, BG_BRD_R, BG_BRD_D } from './globals';

export function renderBgSpace() {
    let gradient = context.createLinearGradient((BG_BRD_R - BG_BRD_L) / 2, BG_BRD_U, (BG_BRD_R - BG_BRD_L) / 2, BG_BRD_D);
    gradient.addColorStop(0, "#070B34");
    gradient.addColorStop(1, '#854088');
    context.fillStyle = gradient;
    context.fillRect(BG_BRD_L, BG_BRD_U, BG_BRD_R - BG_BRD_L, BG_BRD_D - BG_BRD_U);
}

export function createStars(size) {
    let starsList = [];
    for (let i = 0; i < size; i++) {
        const star = Sprite({
            x: (Math.random() * (BG_BRD_R - BG_BRD_L - 75)) + 50,
            y: (Math.random() * (BG_BRD_D - BG_BRD_U - 75)) + 50,
            type: 'star',
            opacity: Math.random() * 0.4,
            image: imageAssets['assets/star']
        });
        starsList.push(star);
    }
    return starsList;
}