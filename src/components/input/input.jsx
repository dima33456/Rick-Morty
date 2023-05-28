import { useRef } from 'react'

import './input.css'

export function Input({ placeholder, onChange}) {
    const timer = useRef()

    function handleChange(e) {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            onChange(e.target.value)
        }, 300)
    }

    return (
        <input className="input" type="text" onChange={handleChange} placeholder={placeholder} />
    )
}