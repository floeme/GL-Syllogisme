import { useState } from "react"

interface QuantifierAliasSectionProps {
    type: 'A' | 'E' | 'I' | 'O'
    aliases: string[]
    addAlias: (type: 'A' | 'E' | 'I' | 'O', alias: string) => void
    removeAlias: (type: 'A' | 'E' | 'I' | 'O', alias: string) => void
    initialQuantifiers: string[]
}

function QuantifierAliasSection({ type, aliases, addAlias, removeAlias, initialQuantifiers }: QuantifierAliasSectionProps) {
    const [newAlias, setNewAlias] = useState('')

    const handleAdd = () => {
        if (newAlias.trim()) {
            addAlias(type, newAlias.trim())
            setNewAlias('')
        }
    }

    return (
        <div className="quantifier-alias-section">
            <div className="quantifier-alias-section-title">
                <h3>{type}</h3>
            </div>

            <div className="list-alias">
                <ul className="list-alias-ul">
                    {aliases.map((alias, index) => (
                        <li key={index} className="list-alias-ul-li">
                            <input type="text" value={alias} readOnly />
                            {!initialQuantifiers.includes(alias) && (
                                <button onClick={() => removeAlias(type, alias)}>🗑️</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
           
            <div className="add-alias">
                <input
                    type="text"
                    value={newAlias}
                    onChange={(e) => setNewAlias(e.target.value)}
                    placeholder="Add a quantifier alias"
                    className="add-alias-input"
                />
                <button onClick={handleAdd} className="add-alias-button">Add</button>
            </div>
        </div>
    )
}

export default QuantifierAliasSection