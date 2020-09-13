import './styles.css';

import { initKeys, GameLoop } from 'kontra';
import { BG_BRD_L, BG_BRD_U, BG_BRD_R, BG_BRD_D, BG_BRD_OFS, sprites, player, loadAssets, assets } from './globals';
import { renderBgSpace, createStars, renderBgBorder } from './background';
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

            let stars = createStars(80);
            stars.forEach(function (star) {
                sprites.push(star);
            });

            let player = createPlayer();
            sprites.push(player);

            let loop = GameLoop({
                update() {
                    sprites.map(sprite => {
                        sprite.update();

                        if (sprite.type == 'player' && (sprite.x < BG_BRD_L || sprite.x > BG_BRD_R || sprite.y < BG_BRD_U || sprite.y > BG_BRD_D)) {
                            loseLife();
                        }
                    });
                },
                render() {
                    renderBgSpace(); // space background rendering (layer 1)
                    sprites.map(sprite => sprite.render()); // sprites(player, stars, enemies) rendering (layer 2)
                    renderBgBorder(); // space border rendering (layer 3)
                }
            });

            loop.start();
        }
    }).catch(function (err) {
        console.log(err);
    });
}

main();