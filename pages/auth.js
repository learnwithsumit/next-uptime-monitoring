import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Header from '../components/header';
import Layout from '../components/layout';
import Loader from '../components/loader';
import Login from '../components/login';
import Registration from '../components/registration';
import useUser from '../lib/useUser';
import styles from '../styles/auth.module.css';

export default function Auth() {
    const [currentForm, setCurrentForm] = useState('registration');
    const [message, setMessage] = useState({});
    const { user, mutateUser } = useUser({
        loggedIn: '/dashboard',
    });

    async function handleLogin(e) {
        e.preventDefault();

        const body = {
            phone: e.currentTarget.phone.value,
            password: e.currentTarget.password.value,
        };

        try {
            const newUser = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const newuserData = await newUser.json();
            mutateUser(newuserData);
            if (!newuserData.error) {
                setMessage({
                    success: true,
                    message: 'Successfully logged in!',
                });
            } else {
                setMessage({
                    error: true,
                    message: newuserData.error,
                });
            }
        } catch (error) {
            setMessage({
                error: true,
                message: error.message,
            });
        }
    }

    async function handleRegistration(e) {
        e.preventDefault();

        const body = {
            name: e.currentTarget.name.value,
            phone: e.currentTarget.phone.value,
            password: e.currentTarget.password.value,
            tosAgreement: e.currentTarget.tosAgreement.checked,
        };

        try {
            const newUser = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const newuserData = await newUser.json();
            if (!newuserData.error) {
                setMessage({
                    success: true,
                    message: 'Successfully signed up! Now you can login.',
                });
                setCurrentForm('login');
                setTimeout(() => {
                    setMessage({
                        success: true,
                        message: '',
                    });
                }, 3000);
            } else {
                setMessage({
                    error: true,
                    message: newuserData.error,
                });
                setTimeout(() => {
                    setMessage({
                        error: true,
                        message: '',
                    });
                }, 3000);
            }
        } catch (error) {
            setMessage({
                error: true,
                message: error.message,
            });
            setTimeout(() => {
                setMessage({
                    error: true,
                    message: '',
                });
            }, 3000);
        }
    }

    if (!user || user.loggedIn) {
        return <Loader />;
    }

    return (
        <Layout>
            <Head>
                <title>Login / Signup: Uptime Monitoring Application</title>
            </Head>
            <Header />
            <section className={[styles.loginRegistration, 'container'].join(' ')}>
                <div className={styles.padder}>
                    <Image
                        src="/images/programming.png"
                        alt="Programming"
                        className="img-fluid"
                        width={502}
                        height={307}
                    />
                </div>
                <div className={[styles.formContainer, styles.padder].join(' ')}>
                    <div className={styles.tabToggler}>
                        <button
                            type="button"
                            className={
                                currentForm === 'registration'
                                    ? [styles.big, styles.active].join(' ')
                                    : [styles.big].join(' ')
                            }
                            onClick={() => setCurrentForm('registration')}
                        >
                            Registration
                        </button>
                        <button
                            type="button"
                            className={
                                currentForm === 'login'
                                    ? [styles.big, styles.active].join(' ')
                                    : [styles.big].join(' ')
                            }
                            onClick={() => setCurrentForm('login')}
                        >
                            Login
                        </button>
                    </div>
                    {currentForm === 'registration' ? (
                        <Registration onSubmit={handleRegistration} message={message} />
                    ) : (
                        <Login onSubmit={handleLogin} message={message} />
                    )}
                </div>
            </section>
        </Layout>
    );
}
