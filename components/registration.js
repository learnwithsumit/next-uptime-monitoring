import { useState } from 'react';
import styles from '../styles/registration.module.css';
import Modal from './modal';
import Terms from './terms';

export default function Registration({ message, onSubmit }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [tosAgreement, setTosAgreement] = useState(false);
    const [showModal, setModal] = useState(false);

    function control() {
        setModal(!showModal);
    }

    return (
        <div className={[styles.padder].join(' ')} id="registrationForm">
            <h3 className={styles.formTitle}>Registration</h3>

            <form className={styles.registration} onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="phone"
                    placeholder="Mobile Phone"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={[styles.checkbox, styles.padder].join(' ')}>
                    <input
                        type="checkbox"
                        name="tosAgreement"
                        checked={tosAgreement}
                        onChange={() => setTosAgreement(!tosAgreement)}
                    />
                    <label>
                        &nbsp;&nbsp;I agree to the{' '}
                        <a role="button" tabIndex="0" onClick={control}>
                            Terms and conditions
                        </a>
                    </label>
                </div>
                <button type="submit" className="primary-btn">
                    Registration
                </button>
            </form>
            {message?.error && <p className="error">{message?.message}</p>}
            {message?.success && <p className="success">{message?.message}</p>}
            <Modal show={showModal} control={control}>
                <Terms />
            </Modal>
            <style jsx>
                {`
                    a {
                        outline: none;
                        cursor: pointer;
                    }
                `}
            </style>
        </div>
    );
}
