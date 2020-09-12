// global variables and constants

import { init } from 'kontra';

export const { canvas, context } = init("canvas1");

// background border related
export const BG_BRD_W = 15; // border width
export const BG_BRD_OFS = 10; // border offset for sprites
export const BG_BRD_L = BG_BRD_W; // border left margin
export const BG_BRD_R = canvas.width - BG_BRD_W; // border right margin
export const BG_BRD_U = BG_BRD_W; // border up margin
export const BG_BRD_D = canvas.height - BG_BRD_W; // border down margin

export let sprites = [];
export let player = {
    isEnable: true
};