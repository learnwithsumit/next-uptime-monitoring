import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Test() {
    const { data, error, mutate } = useSWR('http://localhost:5000/', fetcher, {
        revalidateOnFocus: false,
    });
    console.log(data);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return (
        <div>
            hello {data.message}!{' '}
            <Link href="/about">
                <a>About</a>
            </Link>
            <br />
            <button onClick={mutate} type="button">
                Mutate
            </button>
        </div>
    );
}
