import { useContext, useState } from "react"
import QuantifierContext from '../../../contexts/QuantifierContext'
import { DEFAULT_QUANTIFIERS_I18N_NAMESPACE, isDefaultQuantifierName, Quantifier } from '../../../model/Quantifier'
import { QuantifierType } from '../../../model/QuantifierType'
import { useTranslation } from "react-i18next";

interface QuantifierAliasSectionProps {
    type: 'A' | 'E' | 'I' | 'O'
}

const QuantifierAliasSection = ({ type }: QuantifierAliasSectionProps) => {
    const [newAlias, setNewAlias] = useState('')
    const { quantifiers, addQuantifier, removeQuantifier } = useContext(QuantifierContext)

    const { t } = useTranslation('translation', { keyPrefix: DEFAULT_QUANTIFIERS_I18N_NAMESPACE });

    const aliases = quantifiers.filter(q => q.type === QuantifierType.of(type)).map(q => q.name)


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
            <div className="quantifier-alias-section-title">
                <h3>{type} – {t(type)}</h3>
            </div>

            <div className="list-alias">
                <ul className="list-alias-ul">
                    { aliases.map((alias, index) => {
                        const isDefault = isDefaultQuantifierName(alias);
                        return (
                            <li key={index} className="list-alias-ul-li">
                                <input type="text" value={isDefault ? t(alias) : alias} readOnly/>
                                {!isDefault && (
                                    <button onClick={() => handleRemove(alias)}>🗑️</button>
                                )}
                            </li>
                        );
                    }) }
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
