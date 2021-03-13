import Head from 'next/head';
import Header from '../components/header';
import Hero from '../components/hero';
import Layout from '../components/layout';
import Loader from '../components/loader';
import StatusCard from '../components/statusCard';
import getCount from '../lib/count';
import useUser from '../lib/useUser';
import styles from '../styles/index.module.css';

export default function Home({ checkCount }) {
    const { up, down } = checkCount;
    const { user } = useUser();

    if (!user) {
        return <Loader />;
    }

    return (
        <Layout>
            <Head>
                <title>Home: Uptime Monitoring Application</title>
            </Head>
            <Header loggedIn={user?.isLoggedIn} />
            <main className={[styles.status, 'container'].join(' ')}>
                <div>
                    <h1>Monitor your links</h1>
                    <div className={styles.cards}>
                        <StatusCard status="up" number={up} />
                        <StatusCard status="down" number={down} />
                    </div>
                </div>
                <Hero />
            </main>
        </Layout>
    );
}

export async function getStaticProps() {
    const count = await getCount();
    return {
        props: {
            checkCount: count,
        },
        revalidate: 10,
    };
}
