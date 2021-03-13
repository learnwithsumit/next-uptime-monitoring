import db from './db';

export default async function getCount() {
    try {
        const users = Object.keys(db.getData(`/user`));
        let upCount = 0;
        let downCount = 0;
        users.forEach((user) => {
            const checks = Object.values(db.getData(`/check/${user}`));
            upCount += checks.filter((obj) => obj.status === 'up').length;
            downCount += checks.filter((obj) => obj.status === 'down').length;
        });
        return {
            up: upCount,
            down: downCount,
        };
    } catch (err) {
        return {
            up: 0,
            down: 0,
        };
    }
}
