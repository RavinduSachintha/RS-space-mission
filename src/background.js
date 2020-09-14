import { Sprite } from 'kontra';
import { context, BG_BRD_L, BG_BRD_U, BG_BRD_R, BG_BRD_D, BG_BRD_W } from './globals';

export function renderBgSpace() {
    let gradient = context.createLinearGradient((BG_BRD_R - BG_BRD_L) / 2, BG_BRD_U, (BG_BRD_R - BG_BRD_L) / 2, BG_BRD_D);
    gradient.addColorStop(0, "#070B34");
    gradient.addColorStop(1, '#854088');
    context.fillStyle = gradient;
    context.fillRect(BG_BRD_L, BG_BRD_U, BG_BRD_R - BG_BRD_L, BG_BRD_D - BG_BRD_U);
}

export function renderBgBorder() {
    let gradient = context.createRadialGradient((BG_BRD_R - BG_BRD_L) / 2, (BG_BRD_D - BG_BRD_U) / 2, 100, (BG_BRD_R - BG_BRD_L) / 2, (BG_BRD_D - BG_BRD_U) / 2, (BG_BRD_R - BG_BRD_L) / 2 + 300);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, 'black');
    context.strokeStyle = gradient;
    context.lineWidth = BG_BRD_W;
    context.strokeRect(BG_BRD_L / 2, BG_BRD_U / 2, BG_BRD_R, BG_BRD_D);
}

function renderStar() {
    context.translate(0, 0);

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
    context.fillStyle = "#FFF";
    context.fill();
}

export function createStars(count) {
    let starsList = [];
    for (let i = 0; i < count; i++) {
        const star = Sprite({
            x: (Math.random() * (BG_BRD_R - BG_BRD_L - 75)) + 50,
            y: (Math.random() * (BG_BRD_D - BG_BRD_U - 75)) + 50,
            type: 'star',
            opacity: Math.random() * 0.4,
            scaleX: 0.2,
            scaleY: 0.2,
            render() {
                renderStar();
            }
        });
        starsList.push(star);
    }
    return starsList;
}