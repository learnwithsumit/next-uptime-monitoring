import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useTest() {
    const { data, error, mutate } = useSWR('http://localhost:5000/', fetcher, {
        revalidateOnFocus: false,
    });

    return { data, error, mutate };
}
