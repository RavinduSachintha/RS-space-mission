import './styles.css';

import { initKeys, GameLoop } from 'kontra';
import { BG_BRD_L, BG_BRD_U, BG_BRD_R, BG_BRD_D, sprites, player, loadAssets, assets } from './globals';
import { renderBgSpace, createStars, renderBgBorder } from './background';
import { createPlayer } from './player';
import { createEnemies } from './enemy';

// should remove at final build -------------------------------
document.write('<script src="http://'
    + (location.host || 'localhost').split(':')[0]
    + ':35729/livereload.js?snipver=1" async></' + 'script>');
// ------------------------------------------------------------

// main game method
function main() {
    loadAssets().then(function () {
        if (assets.assetsLoaded == assets.numOfItems) {
            initKeys(); // keyboard events initialization

            let stars = createStars(80);
            stars.forEach(function (star) {
                sprites.items.push(star);
            });

            let enemies = createEnemies();
            enemies.forEach(function (enemy) {
                sprites.items.push(enemy);
            });

            let playerSprite = createPlayer();
            sprites.items.push(playerSprite);

            let loop = GameLoop({
                update() {
                    sprites.items.map((sprite, index) => {
                        sprite.update();

                        // collision detection
                        for (let i = 0; i < sprites.items.length; i++) {
                            if (sprites.items[i].type === 'enemy') {
                                let enemy = sprites.items[i];
                                for (let j = 0; j < sprites.items.length; j++) {
                                    if (sprites.items[j].type === 'bullet' || sprites.items[j].type === 'player') {
                                        let item = sprites.items[j];
                                        let dx = enemy.x - item.x;
                                        let dy = enemy.y - item.y;

                                        if (Math.hypot(dx, dy) < enemy.radius + item.radius - 10) {
                                            if (sprites.items[j].type === 'bullet') {
                                                enemy.energy -= item.energy;
                                                item.ttl = 0;
                                            }
                                            if (sprites.items[j].type === 'player') {
                                                player.isEnable = false;
                                                player.isDestroyed = true;
                                            }
                                        }
                                    }
                                }

                                if (enemy.energy <= 0) {
                                    enemy.ttl = 0;
                                }
                            }
                        }
                    });

                    sprites.items = sprites.items.filter(sprite => sprite.isAlive());
                },
                render() {
                    renderBgSpace(); // space background rendering (layer 1)
                    sprites.items.map(sprite => sprite.render()); // sprites.items(player, stars, enemies) rendering (layer 2)
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