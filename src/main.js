import './styles.css';

import { initKeys, GameLoop } from 'kontra';
import { BG_BRD_L, BG_BRD_U, BG_BRD_R, BG_BRD_D, BG_BRD_OFS, sprites, player, loadAssets, assets } from './globals';
import { renderBackground } from './background';
import { createPlayer } from './player';

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
    loadAssets().then(function () {
        if (assets.assetsLoaded == assets.numOfItems) {
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
                    sprites.map(sprite => sprite.render());
                }
            });

            loop.start();
        }
    }).catch(function (err) {
        console.log(err);
    });
}

main();