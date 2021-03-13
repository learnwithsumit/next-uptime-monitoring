import db from '../../../lib/db';
import withSession from '../../../lib/session';

export default withSession(async (req, res) => {
    const user = req.session.get('user');
    if (user) {
        if (req.method === 'GET') {
            const { id } = req.query;
            if (id) {
                try {
                    const path = `/check/${user.phone}/${id}`;
                    const check = db.getData(path);
                    res.status(200).json(check);
                } catch {
                    res.status(200).json([]);
                }
            } else {
                res.status(400).json({
                    error: 'There was a problem in your request!',
                });
            }
        } else if (req.method === 'PUT') {
            const { id } = req.query;
            let { protocol, title, url } = req.body;
            title = typeof title === 'string' && title.trim().length > 0 ? title : false;
            protocol =
                typeof protocol === 'string' && ['http', 'https'].indexOf(protocol) > -1
                    ? protocol
                    : false;
            url = typeof url === 'string' && url.trim().length > 0 ? url : false;

            if (id && protocol && title && url) {
                try {
                    const path = `/check/${user.phone}/${id}`;
                    const check = {
                        protocol,
                        title,
                        url,
                    };
                    db.push(path, check, false);
                    res.status(200).json({
                        message: 'check updated',
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
        } else if (req.method === 'DELETE') {
            const { id } = req.query;
            if (id) {
                try {
                    const path = `/check/${user.phone}/${id}`;
                    db.delete(path);
                    res.status(200).json({
                        message: 'Data deleted!',
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
