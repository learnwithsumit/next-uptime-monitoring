import styles from '../styles/link.module.css';

export default function Link({ check, modalControl, setId }) {
    const { protocol, url, status, id, title } = check;
    const statusStyles = status === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
    return (
        <tr>
            <td className={styles.link}>{title}</td>
            <td className={styles.link}>{protocol}</td>
            <td className={styles.link}>{url}</td>
            <td className={styles.link}>
                <i className={statusStyles} /> <span>{status}</span>
            </td>
            <td className={styles.link}>
                <button type="button" className={[styles.btn, styles.editBtn].join(' ')}>
                    <i className="fas fa-edit" />{' '}
                    <a
                        tabIndex="0"
                        role="button"
                        onClick={() => {
                            modalControl();
                            setId(id);
                        }}
                    >
                        Edit
                    </a>
                </button>{' '}
                <button type="button" className={[styles.btn, styles.textDanger].join(' ')}>
                    <i className="fas fa-trash-alt" /> <span>Delete</span>
                </button>
            </td>
        </tr>
    );
}
