import { useEffect, useState } from 'react';
import useChecks from '../lib/useChecks';
import styles from '../styles/monitor-form.module.css';

export default function MonitorForm({ id = null, modalControl = () => {} }) {
    const { mutateChecks } = useChecks();
    const [protocol, setProtocol] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState({});

    useEffect(() => {
        async function fetchCheck() {
            if (id) {
                try {
                    const check = await fetch(`/api/check/${id}`);
                    const checkData = await check.json();
                    setProtocol(checkData.protocol);
                    setTitle(checkData.title);
                    setUrl(checkData.url);
                    setStatus(checkData.status);
                } catch {
                    console.log('there was an error');
                }
            }
        }
        fetchCheck();
    }, [id]);
    const submitAdd = async (e) => {
        e.preventDefault();
        try {
            const newCheck = await fetch('/api/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    protocol,
                    title,
                    url,
                }),
            });
            const newCheckData = await newCheck.json();
            if (!newCheckData.error) {
                setMessage({
                    success: true,
                    message: 'Check was added!',
                });
                mutateChecks();
                setTimeout(() => {
                    setMessage({
                        success: true,
                        message: '',
                    });
                }, 3000);
            } else {
                setMessage({
                    error: true,
                    message: newCheckData.error,
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
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            const updateCheck = await fetch(`/api/check/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    protocol,
                    title,
                    url,
                }),
            });
            const updateCheckData = await updateCheck.json();
            if (!updateCheckData.error) {
                mutateChecks(async (checks) => {
                    const updatedCheck = {
                        id,
                        protocol,
                        title,
                        url,
                        status,
                    };
                    // filter the list, and return it with the updated item
                    const filteredChecks = checks.filter((check) => check.id !== id);
                    return [...filteredChecks, updatedCheck];
                }, false);
                modalControl();
            } else {
                console.log('There was an error');
            }
        } catch (error) {
            console.log('There was an error');
        }
    };

    return (
        <form className={styles.monitorForm} onSubmit={id ? submitEdit : submitAdd}>
            <label htmlFor="">Protocol</label>
            <select
                name="protocol"
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                required
            >
                <option value="">Select</option>
                <option value="https">HTTPS</option>
                <option value="http">HTTP</option>
            </select>
            <label htmlFor="">Title</label>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
            />
            <label htmlFor="">URL (or IP)</label>
            <input
                type="text"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                required
            />

            <button type="submit" className="primary-btn">
                Submit
            </button>
            {message?.error && <p className="error">{message?.message}</p>}
            {message?.success && <p className="success">{message?.message}</p>}
        </form>
    );
}
