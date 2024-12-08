import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { Quantifier } from '../model/Quantifier'
import { QuantifierRepository } from '../model/QuantifierRepository'
import { defaultQuantifiers } from '../model/Quantifier'

type QuantifierContextType = {
    quantifiers: Quantifier[]
    setQuantifiers: React.Dispatch<React.SetStateAction<Quantifier[]>>
    resetQuantifiers: () => void
    addQuantifier: (quantifier: Quantifier) => void
    removeQuantifier: (quantifier: Quantifier) => void
}

const QuantifierContext = createContext<QuantifierContextType>({
    quantifiers: Object.values(defaultQuantifiers),
    setQuantifiers: () => {},
    resetQuantifiers: () => {},
    addQuantifier: () => {},
    removeQuantifier: () => {},
})

export const QuantifierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [quantifiers, setQuantifiers] = useState<Quantifier[]>(() => {
        const savedQuantifiers = QuantifierRepository.getAll()
        return savedQuantifiers.length ? savedQuantifiers : Object.values(defaultQuantifiers)
    })

    useEffect(() => {
        QuantifierRepository.persist(quantifiers)
    }, [quantifiers])

    const resetQuantifiers = () => {
        QuantifierRepository.reset()
        setQuantifiers(Object.values(defaultQuantifiers))
    }

    const addQuantifier = (quantifier: Quantifier) => {
        QuantifierRepository.add(quantifier)
        setQuantifiers(QuantifierRepository.getAll())
    }

    const removeQuantifier = (quantifier: Quantifier) => {
        QuantifierRepository.remove(quantifier)
        setQuantifiers(prev => prev.filter(q => q.name !== quantifier.name))
    }

    return (
        <QuantifierContext.Provider value={{ quantifiers, setQuantifiers, resetQuantifiers, addQuantifier, removeQuantifier }}>
            {children}
        </QuantifierContext.Provider>
    )
}

export default QuantifierContext
