import Head from 'next/head';
import Card from '../components/card';
import Header from '../components/header';
import Layout from '../components/layout';
import Loader from '../components/loader';
import useUser from '../lib/useUser';
import styles from '../styles/how-it-works.module.css';

export default function HowItWorks({ howItWorksText }) {
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
            <main className={[styles.manual, 'container'].join(' ')}>
                <h1>{howItWorksText}</h1>
                <div className={styles.cards}>
                    <Card text="Create an Account / Login" icon="images/login.svg" link="/auth" />
                    <Card
                        text="Add Your link to monitor"
                        icon="images/website.svg"
                        link="/dashboard"
                    />
                    <Card text="Get Notified when your link is up/down" icon="images/links.svg" />
                </div>
            </main>
        </Layout>
    );
}

export async function getServerSideProps({ locale }) {
    const howItWorksText = locale === 'bn-BD' ? 'এটা কিভাবে কাজ করে?' : 'How it works';
    return {
        props: {
            howItWorksText,
        },
    };
}
