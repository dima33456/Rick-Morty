'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import './page.css'
import { Input } from "@/components/input/input"
import img from './img.png'
import { Card } from "@/components/card/card"

export default function MainPge() {
    const [cards, setCards] = useState([])
    const [name, setName] = useState('')
    const [page, setPage] = useState(1)

    async function getData(page) {
        const apiBase = 'https://rickandmortyapi.com/api/episode'
        const url = `${apiBase}?name=${name}&page=${page}`

        return fetch(url)
            .then(res => res.json())
            .then(data => data.results)
    }
    
    useEffect(() => {
        setPage(1)
        getData().then(data => setCards(data?.slice(0, 8) ?? []))
    }, [name])

    function loadMore() {
        const newPage = page % 2 ? page -1 : page
        const i = (page + 1) % 2
        getData(newPage).then(data => setCards(state => [
            ...state,
            ...(data?.slice(i ? 0 : 8, i ? 8 : 16) ?? [])
        ]))
        setPage(page => page +1)
    }

    return (
        <div className="mainPage">
            <div className="mainPage__container">
                <Image src={img} alt="baner" width={270} height={210}/>
                <div className="mainPage__filters">
                    <Input placeholder="Filter by name..." onChange={setName} />
                    
                </div>
                <div className="mainPage__content">
                    {cards.map(card => (
                        <Card
                            href={`/episode/${card.id}`}
                            title={card.name}
                            date={card.air_date}
                            text={card.episode}
                        />
                    ))}
                </div>
                <button className="mainPage__button" onClick={loadMore}>Показать еще</button>
            </div>  
        </div>
    )
}