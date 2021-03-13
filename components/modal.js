import styles from '../styles/modal.module.css';

export default function Modal({ children, show = false, control }) {
    return (
        <div>
            <div
                role="button"
                tabIndex="0"
                className={styles.backdrop}
                style={show ? { display: 'block' } : { display: 'none' }}
                onClick={control}
            />
            <div
                className={styles.modalBody}
                style={show ? { display: 'block' } : { display: 'none' }}
            >
                {children}
            </div>
        </div>
    );
}
