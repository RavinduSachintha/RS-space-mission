import { Sprite } from 'kontra';

export function createBullet(x, y, dx, dy, color, by) {
    return Sprite({
        x, y, dx, dy,
        width: 4,
        height: 4,
        radius: 4,
        color,
        energy: 1,
        ttl: 100,
        type: 'bullet',
        by
    });
}