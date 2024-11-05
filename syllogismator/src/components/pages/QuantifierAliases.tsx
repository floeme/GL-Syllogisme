import { useContext } from 'react'
import QuantifierContext from '../../contexts/QuantifierContext'
import QuantifierAliasSection from "../elements/quantifier/QuantifierAliasSection"

const QuantifiersAliases = () => {
    const { resetQuantifiers } = useContext(QuantifierContext)

    return (
        <div className="quantifiers-aliases">
            <h2>Quantifiers Aliases</h2>

            <div className="alias-sections">
                <QuantifierAliasSection type="A" />
                <QuantifierAliasSection type="E" />
                <QuantifierAliasSection type="I" />
                <QuantifierAliasSection type="O" />
            </div>

            <button onClick={resetQuantifiers} className="reset-button">
                Reset to defaults
            </button>
        </div>
    )
}

export default QuantifiersAliases
