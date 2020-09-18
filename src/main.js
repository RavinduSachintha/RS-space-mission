import './styles.css';

import { initKeys, GameLoop, initPointer } from 'kontra';
import { sprites, loadAssets, assets } from './globals';
import { renderBgSpace, createStars, renderBgBorder } from './background';
import { createPlayer } from './player';
import { createEnemies } from './enemy';
import { startButton } from './user-panel';

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
            initPointer(); // pointer events initialization

            createStars(100).forEach(star => sprites.stars.push(star));
            createEnemies().forEach(enemy => sprites.enemies.push(enemy));
            sprites.player = createPlayer();

            let startBtnObj = startButton();

            let loop = GameLoop({
                update() {
                    sprites.player.update();

                    sprites.enemies.map(enemy => {
                        enemy.update();

                        // collision detection with bullet
                        sprites.bullets.forEach(bullet => {

                            // player firing
                            if (bullet.by === 'player' && Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < enemy.radius + bullet.radius) {
                                enemy.energy -= bullet.energy;
                                bullet.ttl = 0;
                            }

                            // enemy firing
                            if (bullet.by === 'enemy' && Math.hypot(sprites.player.x - bullet.x, sprites.player.y - bullet.y) < sprites.player.radius + bullet.radius) {
                                sprites.player.energy -= bullet.energy;
                                bullet.ttl = 0;
                            }
                        });

                        // collision detection with player
                        let playerDist = Math.hypot(enemy.x - sprites.player.x, enemy.y - sprites.player.y);
                        if (playerDist < enemy.range) {
                            enemy.isFiring = true;

                            if (playerDist < enemy.radius + sprites.player.radius - 10) {
                                sprites.player.isEnable = false;
                                sprites.player.isDestroyed = true;
                                enemy.isFiring = false;
                            }
                        } else {
                            enemy.isFiring = false;
                        }

                        // enemy energy check
                        if (enemy.energy <= 0) {
                            enemy.ttl = 0;
                        }

                        // player energy check
                        if (sprites.player.energy <= 0) {
                            sprites.player.isEnable = false;
                            sprites.player.isDestroyed = true;
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
                    startBtnObj.render();
                }
            });

            loop.start();
        }
    }).catch(function (err) {
        console.log(err);
    });
}

main();