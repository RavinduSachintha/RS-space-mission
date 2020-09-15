import './styles.css';

import { initKeys, GameLoop } from 'kontra';
import { BG_BRD_L, BG_BRD_U, BG_BRD_R, BG_BRD_D, sprites, loadAssets, assets } from './globals';
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

            createStars(100).forEach(star => sprites.stars.push(star));
            createEnemies().forEach(enemy => sprites.enemies.push(enemy));
            sprites.player = createPlayer();

            let loop = GameLoop({
                update() {
                    sprites.player.update();

                    sprites.enemies.map(enemy => {
                        enemy.update();

                        // collision detection with bullet
                        sprites.bullets.forEach(bullet => {
                            if (Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < enemy.radius + bullet.radius) {
                                enemy.energy -= bullet.energy;
                                bullet.ttl = 0;
                            }
                        });

                        // collision detection with player
                        if (Math.hypot(enemy.x - sprites.player.x, enemy.y - sprites.player.y) < enemy.radius + sprites.player.radius - 10) {
                            sprites.player.isEnable = false;
                            sprites.player.isDestroyed = true;
                        }

                        // enemy energy check
                        if (enemy.energy <= 0) {
                            enemy.ttl = 0;
                        }
                    });

                    sprites.smokes.map(smoke => smoke.update());
                    
                    sprites.bullets.map(bullet => bullet.update());

                    // check alive
                    sprites.enemies = sprites.enemies.filter(enemy => enemy.isAlive());
                    sprites.bullets = sprites.bullets.filter(bullet => bullet.isAlive());
                    sprites.smokes = sprites.smokes.filter(smoke => smoke.isAlive());
                },
                render() {
                    renderBgSpace(); // space background rendering (layer 1)
                    sprites.stars.map(star => star.render()); // stars rendering (layer 2);
                    sprites.enemies.map(enemy => enemy.render()); // enemies rendering (layer 3);
                    sprites.smokes.map(smoke => smoke.render());
                    sprites.player.render(); // player rendering (layer 4);
                    sprites.bullets.map(bullet => bullet.render()); // bullets rendering (layer 5);
                    renderBgBorder(); // space border rendering (layer 6)
                }
            });

            loop.start();
        }
    }).catch(function (err) {
        console.log(err);
    });
}

main();