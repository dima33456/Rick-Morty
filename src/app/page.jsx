'use client'

import { useState, useEffect } from "react"
import { CardWithImage } from "@/components/cardWithImage/cardWithImage"
import Image from "next/image"
import './page.css'
import { Input } from "@/components/input/input"
import img from './img.png'
import { Select } from "@/components/select/select"

export default function MainPge() {
    const [cards, setCards] = useState([])
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')
    const [page, setPage] = useState(1)

    async function getData(page) {
        const apiBase = 'https://rickandmortyapi.com/api/character'
        const url = `${apiBase}?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`

        return fetch(url)
            .then(res => res.json())
            .then(data => data.results)
    }
    
    useEffect(() => {
        setPage(1)
        getData().then(data => setCards(data?.slice(0, 8) ?? []))
    }, [name, species, gender, status])

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
                <Image src={img} alt="absba" width={600} height={200}/>
                <div className="mainPage__filters">
                    <Input placeholder="Filter by name..." onChange={setName} />
                    <Select
                        placeholder="Species"
                        options=
                        {[
                            {name: 'Human',value: 'Human'},
                            {name: 'Alien',value: 'Alien'}
                        ]}
                        onChange={setSpecies}
                    />
                    <Select
                        placeholder="Gender"
                        options=
                        {[
                            {name: 'Male',value: 'Male'},
                            {name: 'Female',value: 'Female'},
                            {name: 'Genderless',value: 'genderless'},
                            {name: 'Unknown',value: 'unknown'}
                        ]}
                        onChange={setGender}
                    />
                    <Select
                        placeholder="Status"
                        options=
                        {[
                            {name: 'Alive',value: 'alive'},
                            {name: 'Dead',value: 'dead'},
                            {name: 'Unknown',value: 'unknown'}
                        ]}
                        onChange={setStatus}
                    />
                </div>
                <div className="mainPage__content">
                    {cards.map(card => (
                        <CardWithImage 
                            key={card.id}
                            title={card.name}
                            href={`/${card.id}`}
                            text={card.species}
                            img={card.image}
                        />
                    ))} 
                </div>
                <button className="mainPage__button" onClick={loadMore}>Показать еще</button>
            </div>  
        </div>
    )
}