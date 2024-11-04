import { useContext } from 'react'
import QuantifierContext from '../../contexts/QuantifierContext'
import QuantifierAliasSection from "../elements/quantifier/QuantifierAliasSection"

export const QuantifiersAliases = () => {
  const { quantifiers, setQuantifiers, initialQuantifiers } = useContext(QuantifierContext)

  const resetToDefaults = () => {
    setQuantifiers(initialQuantifiers)
  }

  const addAlias = (type: 'A' | 'E' | 'I' | 'O', alias: string) => {
    setQuantifiers({
        ...quantifiers,
        [type]: [...quantifiers[type], alias]
    })
  }

  const removeAlias = (type: 'A' | 'E' | 'I' | 'O', alias: string) => {
    setQuantifiers({
        ...quantifiers,
        [type]: quantifiers[type].filter((item) => item !== alias)
    })
  }

  return (
    <div className="quantifiers-aliases">
        <div className="alias-title">
            <h2>Quantifiers Aliases</h2>
        </div>

        <div className="alias-sections">
        <QuantifierAliasSection
          type="A"
          aliases={quantifiers.A}
          addAlias={addAlias}
          removeAlias={removeAlias}
          initialQuantifiers={initialQuantifiers.A}
        />
        <QuantifierAliasSection
          type="E"
          aliases={quantifiers.E}
          addAlias={addAlias}
          removeAlias={removeAlias}
          initialQuantifiers={initialQuantifiers.E}
        />
        <QuantifierAliasSection
          type="I"
          aliases={quantifiers.I}
          addAlias={addAlias}
          removeAlias={removeAlias}
          initialQuantifiers={initialQuantifiers.I}
        />
        <QuantifierAliasSection
          type="O"
          aliases={quantifiers.O}
          addAlias={addAlias}
          removeAlias={removeAlias}
          initialQuantifiers={initialQuantifiers.O}
        />
      </div>
      <button onClick={resetToDefaults} className="reset-button">
          Reset to defaults
      </button>
    </div>
  )
}

export default QuantifiersAliases
