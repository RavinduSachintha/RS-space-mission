import { Button } from 'kontra';
import { BG_BRD_R, BG_TXT_W, BG_BRD_W, sprites, context, canvas } from './globals';

export function startButton() {
    return Button({
        x: BG_BRD_R - 80,
        y: BG_TXT_W - BG_BRD_W,
        anchor: { x: 0.5, y: 0.5 },

        text: {
            text: 'Click To Start',
            color: 'white',
            font: '12px Arial, sans-serif',
            anchor: { x: 0.2, y: 0.45 }
        },

        onUp() {
            sprites.player.isEnable = true;
            sprites.player.isDestroyed = false;
        },

        render() {
            context.translate(0, 0);
            context.beginPath();
            context.rect(0, -4, 115, 20);
            context.closePath();
            context.fillStyle = "#000";
            context.fill();

            if (sprites.player.isEnable) {
                this.disabled = true;
                this.textNode.anchor.x = 0;
                this.textNode.text = convertLifeTime(sprites.player.lifeTime);
            }

            if (this.hovered) {
                this.textNode.color = 'skyblue';
                canvas.style.cursor = 'pointer';
            } else {
                this.textNode.color = 'white';
                canvas.style.cursor = 'initial';
            }
        }
    });
}

function convertLifeTime(lifeTime) {
    let frame_num = parseInt(lifeTime, 10);
    let minutes = Math.floor(frame_num / 3600);
    let seconds = Math.floor((frame_num - (minutes * 3600)) / 60);
    let frames = frame_num - (minutes * 3600) - (seconds * 60);

    if (minutes < 10) { minutes = "0" + minutes };
    if (seconds < 10) { seconds = "0" + seconds };
    if (frames < 10) { frames = "0" + frames };
    return minutes + ':' + seconds + ':' + frames;
}