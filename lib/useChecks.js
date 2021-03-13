import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useUser() {
    const { data: checks, mutate: mutateChecks } = useSWR('/api/check', fetcher, {
        revalidateOnFocus: false,
    });

    return { checks, mutateChecks };
}
