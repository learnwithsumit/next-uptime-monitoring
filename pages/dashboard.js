import Head from 'next/head';
import Header from '../components/header';
import Layout from '../components/layout';
import Loader from '../components/loader';
import MonitorForm from '../components/monitor-form';
import SingleChart from '../components/single-chart';
import Table from '../components/table-container';
import useChecks from '../lib/useChecks';
import useUser from '../lib/useUser';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
    const { user } = useUser({
        loggedOut: '/auth',
    });

    const { checks } = useChecks();

    if (!user?.isLoggedIn || !checks) {
        return <Loader />;
    }

    return (
        <Layout>
            <Head>
                <title>dashboard: Uptime Monitoring Application</title>
            </Head>
            <Header loggedIn={user?.isLoggedIn} />
            <main className={[styles.monitoring, 'container'].join(' ')}>
                <div>
                    <div className={styles.stats}>
                        <SingleChart
                            count={
                                checks && !checks.error
                                    ? checks.filter((obj) => obj.status === 'up').length
                                    : 0
                            }
                            status="up"
                        />
                        <SingleChart
                            count={
                                checks && !checks.error
                                    ? checks.filter((obj) => obj.status === 'down').length
                                    : 0
                            }
                            status="down"
                        />
                    </div>
                    <MonitorForm />
                </div>

                <Table checks={checks || []} />
            </main>
        </Layout>
    );
}
