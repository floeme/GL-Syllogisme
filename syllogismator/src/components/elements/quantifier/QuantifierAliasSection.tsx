import { useContext, useState } from "react"
import QuantifierContext from '../../../contexts/QuantifierContext'
import { defaultQuantifiers, Quantifier } from '../../../model/Quantifier'
import { QuantifierType } from '../../../model/QuantifierType'

interface QuantifierAliasSectionProps {
    type: 'A' | 'E' | 'I' | 'O'
}

const QuantifierAliasSection = ({ type }: QuantifierAliasSectionProps) => {
    const [newAlias, setNewAlias] = useState('')
    const { quantifiers, addQuantifier, removeQuantifier } = useContext(QuantifierContext)

    const aliases = quantifiers.filter(q => q.type === QuantifierType.of(type)).map(q => q.name)

    const isDefaultQuantifier = (quantifierName: string) => {
        return Object.values(defaultQuantifiers).some(q => q.name === quantifierName);
    }


    const handleAdd = () => {
        if (newAlias.trim()) {
            const newQuantifier = new Quantifier(newAlias.trim(), QuantifierType.of(type))
            addQuantifier(newQuantifier)
            setNewAlias('')
        }
    }

    const handleRemove = (alias: string) => {
        const quantifierToRemove = quantifiers.find(q => q.name === alias && q.type === QuantifierType.of(type))
        if (quantifierToRemove) {
            removeQuantifier(quantifierToRemove)
        }
    }

    return (
        <div className="quantifier-alias-section">
            <h3>{type}</h3>
            <div className="list-alias">
                <ul>
                    {aliases.map((alias, index) => (
                        <li key={index}>
                            <input type="text" value={alias} readOnly />
                            {!isDefaultQuantifier(alias) && (
                                <button onClick={() => handleRemove(alias)}>🗑️</button>
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
                />
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    )
}

export default QuantifierAliasSection
