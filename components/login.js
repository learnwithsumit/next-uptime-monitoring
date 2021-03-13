import styles from '../styles/login.module.css';

export default function login({ message, onSubmit }) {
    return (
        <div id="loginForm" className={[styles.padder].join(' ')}>
            <h3 className={styles.formTitle}>Login</h3>

            <form className={styles.login} onSubmit={onSubmit}>
                <input type="phone" placeholder="Mobile Number" name="phone" required />
                <input type="password" placeholder="Password" name="password" required />

                <button type="submit" className="primary-btn">
                    Login
                </button>
            </form>
            {message?.error && <p className="error">{message?.message}</p>}
            {message?.success && <p className="success">{message?.message}</p>}
        </div>
    );
}
