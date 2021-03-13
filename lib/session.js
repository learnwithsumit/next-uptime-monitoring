import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
    return withIronSession(handler, {
        password: process.env.COOKIE_PASSWORD,
        cookieName: process.env.COOKIE_NAME,
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    });
}
