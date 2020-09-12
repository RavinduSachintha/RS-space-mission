import './styles.css';

import { Sprite, initKeys, GameLoop } from 'kontra';
import { BG_BRD_L, BG_BRD_U, BG_BRD_R, BG_BRD_D, BG_BRD_OFS, sprites, player } from './globals';
import { renderBackground } from './background';
import { createPlayer } from './player';

let playerImage = new Image();
let x;
playerImage.src = './assets/drawing.png';
playerImage.onload = function () {
    console.log(playerImage);
    x = Sprite({
        x: 400,
        y: 200,
        anchor: { x: 0.5, y: 0.5 },
        image: playerImage
    });
}

// should remove at final build -------------------------------
document.write('<script src="http://'
    + (location.host || 'localhost').split(':')[0]
    + ':35729/livereload.js?snipver=1" async></' + 'script>');
// ------------------------------------------------------------

function loseLife() {
    // temparary
    player.isEnable = false;
}

// main game method
function main() {
    initKeys(); // keyboard events initialization

    let player = createPlayer();
    sprites.push(player);

    let loop = GameLoop({
        update() {
            sprites.map(sprite => {
                sprite.update();

                if (sprite.type == 'player' && (sprite.x < BG_BRD_L - BG_BRD_OFS || sprite.x > BG_BRD_R + BG_BRD_OFS || sprite.y < BG_BRD_U - BG_BRD_OFS || sprite.y > BG_BRD_D + BG_BRD_OFS)) {
                    loseLife();
                }
            });
        },
        render() {
            renderBackground();
            x.render();
            sprites.map(sprite => sprite.render());
        }
    });

    loop.start();
}

main();