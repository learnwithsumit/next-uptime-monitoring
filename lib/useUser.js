import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useUser({ loggedOut = false, loggedIn = false } = {}) {
    const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher, {
        revalidateOnFocus: false,
    });

    useEffect(() => {
        if (loggedOut && !user?.isLoggedIn) {
            Router.push(loggedOut);
        }

        if (loggedIn && user?.isLoggedIn) {
            Router.push(loggedIn);
        }
    }, [user, loggedOut, loggedIn]);

    return { user, mutateUser };
}
