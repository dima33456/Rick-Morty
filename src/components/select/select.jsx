import './select.css'

export function Select ({ placeholder, options, onChange}) {
    return (
        <label className="select">
            <select onChange={e => onChange(e.target.value)}>
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                ))}
            </select>
        </label>
    )
}