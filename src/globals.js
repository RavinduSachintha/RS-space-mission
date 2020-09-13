// global variables and constants

import { init, load, on } from 'kontra';

export const { canvas, context } = init("canvas1");

// background border related
export const BG_BRD_W = 15; // border width
export const BG_BRD_OFS = 30; // border offset for sprites
export const BG_BRD_L = BG_BRD_W; // border left margin
export const BG_BRD_R = canvas.width - BG_BRD_W; // border right margin
export const BG_BRD_U = BG_BRD_W; // border up margin
export const BG_BRD_D = canvas.height - BG_BRD_W; // border down margin

export const BG_SPC_W = BG_BRD_R - BG_BRD_L;
export const BG_SPC_H = BG_BRD_D - BG_BRD_U;

export let sprites = [];
export let player = {
    isEnable: false,
    maxSpeed: 3.5
};

export let assets = {
    numOfItems: 2,
    assetsLoaded: 0
};

on('assetLoaded', (asset, url) => {
    assets.assetsLoaded++;
});

export function loadAssets() {
    return load('assets/star.png', 'assets/enemy.png');
}