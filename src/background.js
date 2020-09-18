import { Sprite } from 'kontra';
import { context, gameWindow } from './globals';

export function renderBgSpace() {
    let gradient = context.createLinearGradient((gameWindow.BG_BRD_R - gameWindow.BG_BRD_L) / 2, gameWindow.BG_BRD_U + 10, (gameWindow.BG_BRD_R - gameWindow.BG_BRD_L) / 2, gameWindow.BG_BRD_D);
    gradient.addColorStop(0, "#070B34");
    gradient.addColorStop(1, '#854088');
    context.fillStyle = gradient;
    context.fillRect(gameWindow.BG_BRD_L, gameWindow.BG_BRD_U + gameWindow.BG_TXT_W, gameWindow.BG_BRD_R - gameWindow.BG_BRD_L, gameWindow.BG_BRD_D - gameWindow.BG_BRD_U - gameWindow.BG_TXT_W);
}

export function renderBgBorder() {
    // ------- user-panel.js file background start ---------
    context.fillStyle = '#FFF';
    context.fillRect(gameWindow.BG_BRD_L, gameWindow.BG_BRD_U, gameWindow.BG_BRD_R - gameWindow.BG_BRD_L, gameWindow.BG_TXT_W);
    // -------  user-panel.js file background end  ---------

    let gradient = context.createRadialGradient((gameWindow.BG_BRD_R - gameWindow.BG_BRD_L) / 2, (gameWindow.BG_BRD_D - gameWindow.BG_BRD_U) / 2, 100, (gameWindow.BG_BRD_R - gameWindow.BG_BRD_L) / 2, (gameWindow.BG_BRD_D - gameWindow.BG_BRD_U) / 2, (gameWindow.BG_BRD_R - gameWindow.BG_BRD_L) / 2 + 300);
    gradient.addColorStop(0, '#FFF');
    gradient.addColorStop(1, '#000');
    context.strokeStyle = gradient;
    context.lineWidth = gameWindow.BG_BRD_W;
    context.strokeRect(gameWindow.BG_BRD_L / 2, gameWindow.BG_BRD_U / 2, gameWindow.BG_BRD_R, gameWindow.BG_BRD_D);
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
            x: (Math.random() * (gameWindow.BG_BRD_R - gameWindow.BG_BRD_L - 75)) + 50,
            y: (Math.random() * (gameWindow.BG_BRD_D - gameWindow.BG_BRD_U - 75)) + 50,
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