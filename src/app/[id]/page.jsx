'use client'
import { useRouter } from 'next/navigation'
import './page.css'
import { useState, useEffect } from 'react'
import { InfoCard } from '@/components/infoCard/infoCard'

export default function CharacterPage({ params: {id} }) {
    const [character, setCharacter] = useState(null)
    const router = useRouter()
    const [episodes, setEpisodes] = useState([])

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(res => res.json())
            .then(data => setCharacter(data))
    }, [])

    useEffect(() => {
        const fetchData = async url => fetch(url).then(res => res.json())

        if(character) {
            Promise.all(character.episode.map(fetchData)).then(setEpisodes)
        }
    }, [character])

    if (!character) {
        return (
            <div className="characterPage">
                <div className="characterPage__container">
                    Загрузка...
                </div>
            </div>
        )
    }

    return (
        <div className="characterPage">
            <div className="characterPage__container">
                <div className="characterPage__header">
                    <button className="characterPage__back" onClick={() => router.back()}>
                        {'< Назад'}
                    </button>
                    <div className="characterPage__mainInfo">
                        <img 
                            className="characterPage__img"
                            src={character.image} 
                            alt={character.name} 
                        />
                        <h1 
                            className="characterPage__title">
                            {character.name}
                        </h1>
                    </div>
                </div>
                <div className="characterPage__content">
                    <div>
                        <h3>Informations</h3>
                        <InfoCard
                            title="Gender"
                            text={character.gender}
                        />
                        <InfoCard
                            title="Status"
                            text={character.status}
                        />
                        <InfoCard
                            title="Specie"
                            text={character.specie}
                        />
                        <InfoCard
                            title="Origin"
                            text={character.origin.name}
                        />
                        <InfoCard
                            title="Type"
                            text={character.type}
                        />
                        <InfoCard
                            title="Location"
                            text={character.location.name}
                        />
                    </div>
                    <div>
                        <h3>Episodes</h3>
                        {episodes.slice(0, 4).map(episode => (
                            <InfoCard
                                key={episode.id}
                                href={`/episode/${episode.id}`}
                                title={episode.episode}
                                text={episode.name}
                                date={episode.air_date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}