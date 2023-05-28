import './infoCard.css'
import Link from 'next/link'

export function InfoCard({ href, title, text, date }) {
    if (!text) {
        return null
    }
    if (href){
        return (
            <Link href={href} className="infoCard">
                <div>
                    <span className="infoCard__title">{title}</span>
                    <span className="infoCard__text">{text}</span>
                    {date ? (
                        <span className="infoCard__date">{date}</span>
                    ): null}
                </div>
                <div className="infoCard_symbol">{'>'}</div>
            </Link>
        )
    }
    return (
        <div className="infoCard">
            <div>
                <span className="infoCard__title">{title}</span>
                <span className="infoCard__text">{text}</span>
                {date ? (
                    <span className="infoCard__date">{date}</span>
                ): null}
            </div>
        </div>
    )
}
