// global variables and constants

import { init, load, on } from 'kontra';

export const { canvas, context } = init("canvas1");

// background border related
export let gameWindow = {
    BG_BRD_W: 5, // border width
    BG_BRD_OFS: 30, // border offset for sprites
    BG_BRD_L: 5, // border left margin
    BG_BRD_R: canvas.width - 5, // border right margin
    BG_BRD_U: 5, // border up margin
    BG_BRD_D: canvas.height - 5, // border down margin

    BG_TXT_W: 20, // user text area width

    BG_SPC_W: canvas.width - 10,
    BG_SPC_H: canvas.height - 10
};

export const ENEMY_ENERGY_LVL = 20;

export let sprites = {
    player: null,
    enemies: [],
    stars: [],
    bullets: [],
    smokes: []
};

export let assets = {
    numOfItems: 0,
    assetsLoaded: 0
};

on('assetLoaded', (asset, url) => {
    assets.assetsLoaded++;
});

export function loadAssets() {
    return load();
}