import { useState } from 'react';
import styles from '../styles/table.module.css';
import Link from './link';
import Modal from './modal';
import MonitorForm from './monitor-form';

export default function Table({ checks = [] }) {
    const [showModal, setModal] = useState(false);
    const [id, setId] = useState(null);

    function control() {
        setModal(!showModal);
    }

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Protocol</th>
                        <th>Link</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(checks) &&
                        checks.map((check) => (
                            <Link
                                key={check.id}
                                check={check}
                                modalControl={control}
                                setId={setId}
                            />
                        ))}
                </tbody>
            </table>

            <Modal show={showModal} control={control}>
                <MonitorForm id={id} modalControl={control} />
            </Modal>
        </div>
    );
}
