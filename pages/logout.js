// import Router from 'next/router';
import { useEffect } from 'react';
import useUser from '../lib/useUser';

export default function Logout() {
    const { mutateUser } = useUser({
        loggedOut: '/auth',
    });

    useEffect(() => {
        async function fetchData() {
            await fetch('/api/logout');
            mutateUser({
                isLoggedIn: false,
            });
        }
        fetchData();
    }, [mutateUser]);

    return <div>Logged Out</div>;
}
