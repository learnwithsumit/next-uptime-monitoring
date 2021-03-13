import bcrypt from 'bcrypt';
import db from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let { name, phone, password, tosAgreement } = req.body;
        name = typeof name === 'string' && name.trim().length > 0 ? name : false;
        phone = typeof phone === 'string' && phone.trim().length === 11 ? phone : false;
        password = typeof password === 'string' && password.trim().length > 0 ? password : false;
        tosAgreement = typeof tosAgreement === 'boolean' && tosAgreement ? tosAgreement : false;

        if (name && phone && password && tosAgreement) {
            try {
                const path = `/user/${phone}`;
                const hashedPassword = await bcrypt.hash(password, 10);
                db.push(path, { name, phone, password: hashedPassword, tosAgreement });
                res.status(200).json({ message: 'Signup successful!' });
            } catch (error) {
                res.status(500).json({
                    error: error.message,
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
}
