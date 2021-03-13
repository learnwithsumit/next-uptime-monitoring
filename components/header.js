import Link from 'next/link';

export default function Header({ loggedIn = false }) {
    return (
        <header className="container">
            <Link href="/">
                <a className="logo">
                    <img src="images/logo.png" alt="Learn with Sumit" />
                </a>
            </Link>
            <div>
                {!loggedIn ? (
                    <Link href="/auth">
                        <a className="primary-btn btn">Login/ Signup</a>
                    </Link>
                ) : (
                    <>
                        <Link href="/dashboard">
                            <a className="primary-btn btn">Dashboard</a>
                        </Link>
                        <Link href="/logout">
                            <a className="danger-btn">Logout</a>
                        </Link>
                    </>
                )}
                <Link href="/how-it-works">
                    <a className="secondary-btn btn">How it works</a>
                </Link>
            </div>
            <style jsx>
                {`
                    @media (min-width: 500px) {
                        a.btn {
                            font-size: 2vw;
                        }
                    }
                    @media (min-width: 768px) {
                        a.btn {
                            font-size: 1.5vw;
                        }
                    }
                    @media (min-width: 992px) {
                        a.btn {
                            font-size: 1.2vw;
                        }
                    }
                    @media (min-width: 1200px) {
                        a.btn {
                            font-size: 1vw;
                        }
                    }
                    @media (min-width: 1600px) {
                        a.btn {
                            font-size: 0.8vw;
                        }
                    }
                `}
            </style>
        </header>
    );
}
