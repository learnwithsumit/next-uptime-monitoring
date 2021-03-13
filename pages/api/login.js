import bcrypt from 'bcrypt';
import db from '../../lib/db';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
    if (req.method === 'POST') {
        let { phone, password } = req.body;
        phone = typeof phone === 'string' && phone.trim().length === 11 ? phone : false;
        password = typeof password === 'string' && password.trim().length > 0 ? password : false;

        if (phone && password) {
            try {
                const path = `/user/${phone}`;
                const user = db.getData(path);
                const valid = await bcrypt.compare(password, user.password);
                if (valid) {
                    req.session.set('user', {
                        name: user.name,
                        phone,
                        isLoggedIn: true,
                    });
                    await req.session.save();
                    res.status(200).json({
                        name: user.name,
                        phone,
                        isLoggedIn: true,
                    });
                } else {
                    res.status(401).json({
                        error: 'Invalid login!',
                    });
                }
            } catch {
                res.status(401).json({
                    error: 'Invalid login!',
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
});
