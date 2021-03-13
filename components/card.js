import Link from 'next/link';

export default function Card({ text, icon, link = '#' }) {
    return (
        <Link href={link}>
            <a className="card">
                <img src={icon} alt="" />
                <h4>{text}</h4>
            </a>
        </Link>
    );
}
