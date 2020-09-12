import { context, BG_BRD_L, BG_BRD_U, BG_BRD_R, BG_BRD_D } from './globals';

export function renderBackground() {
    context.beginPath();
    context.rect(BG_BRD_L, BG_BRD_U, BG_BRD_R - BG_BRD_L, BG_BRD_D - BG_BRD_U);
    context.stroke();
}