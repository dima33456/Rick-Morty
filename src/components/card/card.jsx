import './card.css'
import Link from 'next/link'

export function Card({ title, date, text, href }) {
    return (
        <Link className="card" href ={href}>
            <h3 className="card__title">{title}</h3>
            <span className="card__date">{date}</span>
            <span className="card__text">{text}</span>
        </Link>
    )
}