'use client'
import { useRouter } from 'next/navigation'
import { CardWithImage } from '@/components/cardWithImage/cardWithImage'
import './page.css'
import { useEffect, useState } from 'react'

export default function EpisodePage({ params: {id} }) {
    const [episode,setEpisode] = useState(null)
    const [characters, setCharacters] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/episode/${id}`)
            .then(res => res.json())
            .then(setEpisode)
    }, [])

    useEffect(() => {
        const fetchData = async url => fetch(url).then(res => res.json())

        if (episode) {
            Promise.all(episode.characters.map(fetchData)).then(setCharacters)
        }
    }, [episode])

    if (!episode) {
        return (
            <div className="episodePage">
                <div className="episodePage__container">
                    Загрузка...
                </div>
            </div>
        )
    }

    return(
        <div className="episodePage">
            <div className="episodePage__container">
                <div className="episodePage__header">
                    <button className="episodePage__back" onClick={() => router.back()}>
                        {'< Назад'}
                    </button>
                    <div>
                        <h1>
                            {episode.name}
                        </h1>
                        <div className="episodePage__info">
                            <div>
                                <span className="episodePage__infoTitle">
                                    Episode
                                </span>
                                <span className="episodePage__text">
                                    {episode.episode}
                                </span>
                            </div>
                            <div>
                                <span className="episodePage__infoTitle">
                                    Date
                                </span>
                                <span className="episodePage__text">
                                    {episode.air_date}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="episodePage__contect">
                    <h2>Cast</h2>
                    <div className="episodePage__cards">
                        {characters.slice(0, 12).map(character => (
                            <CardWithImage
                                key={character.id}
                                href={`/${character.id}`}
                                img={character.image}
                                title={character.name}
                                text={character.species} 
                            />   
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}