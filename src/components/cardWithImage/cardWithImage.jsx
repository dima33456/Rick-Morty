
import './cardWithImage.css'
import Link from 'next/link'

export function CardWithImage({ title, text, img, href }){
    return(
        <Link className="cardWithImage" href={href}>
            <img className="cardWithImage__img" src={img} alt="card" />
            <h3 className="cardWithImage__title">{title}</h3>
            <span className="cardWithImage__text">{text}</span>
        </Link>
    )
}