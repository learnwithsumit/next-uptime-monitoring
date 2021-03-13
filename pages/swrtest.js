import Link from 'next/link';
import useTest from '../lib/useTest';

export default function Test() {
    const { data, error, mutate } = useTest();

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
