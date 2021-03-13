import Image from 'next/image';
import styles from '../styles/hero.module.css';

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.pseudobg} />
            <Image src="/images/fly.png" alt="Fly" width={463} height={522} />
            <p>Copyright © 2021 Learn with Sumit</p>
        </div>
    );
}
