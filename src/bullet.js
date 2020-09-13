import { Sprite } from 'kontra';

export function createBullet(x, y, dx, dy, color) {
    return Sprite({
        x, y, dx, dy,
        width: 4,
        height: 4,
        radius: 4,
        color,
        energy: 1,
        ttl: 50,
        type: 'bullet'
    });
}