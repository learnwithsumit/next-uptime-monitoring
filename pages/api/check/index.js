import { v4 as uuidv4 } from 'uuid';
import db from '../../../lib/db';
import withSession from '../../../lib/session';

export default withSession(async (req, res) => {
    const user = req.session.get('user');
    if (user) {
        if (req.method === 'GET') {
            try {
                const path = `/check/${user.phone}`;
                const checks = db.getData(path);
                res.status(200).json(Object.values(checks));
            } catch {
                res.status(200).json([]);
            }
        } else if (req.method === 'POST') {
            let { protocol, title, url } = req.body;
            title = typeof title === 'string' && title.trim().length > 0 ? title : false;
            protocol =
                typeof protocol === 'string' && ['http', 'https'].indexOf(protocol) > -1
                    ? protocol
                    : false;
            url = typeof url === 'string' && url.trim().length > 0 ? url : false;
            const status = ['up', 'down'][Math.floor(Math.random() * 2)];

            if (protocol && title && url) {
                const id = uuidv4();
                const check = {
                    id,
                    protocol,
                    title,
                    url,
                    status,
                };
                try {
                    const path = `/check/${user.phone}/${id}`;
                    db.push(path, check);
                    res.status(200).json({
                        message: 'check added',
                    });
                } catch {
                    res.status(500).json({
                        error: 'There was a problem server side!',
                    });
                }
            } else {
                res.status(400).json({
                    error: 'There was a problem in your request!',
                });
            }
        } else {
            res.status(400).json({
                error: 'There was a problem in your request!',
            });
        }
    } else {
        res.status(401).json({
            error: 'Unauthorized!',
        });
    }
});
