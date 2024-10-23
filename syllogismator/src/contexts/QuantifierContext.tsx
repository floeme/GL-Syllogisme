import React, { createContext, useState, ReactNode } from 'react'

type QuantifierType = {
    A: string[]
    E: string[]
    I: string[]
    O: string[]
}

const initialQuantifiers: QuantifierType = {
    A: ['All', 'Every', 'Each', 'Every single'],
    E: ['None', 'There isn\'t any'],
    I: ['Some', 'There are', 'Several', 'A few'],
    O: ['Some not', 'Not every']
}

type QuantifierContextType = {
    quantifiers: QuantifierType
    setQuantifiers: React.Dispatch<React.SetStateAction<QuantifierType>>
    initialQuantifiers: QuantifierType
}

const QuantifierContext = createContext<QuantifierContextType>({
    quantifiers: initialQuantifiers,
    setQuantifiers: () => {},
    initialQuantifiers
})

export const QuantifierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [quantifiers, setQuantifiers] = useState<QuantifierType>(initialQuantifiers)

    return (
        <QuantifierContext.Provider value={{ quantifiers, setQuantifiers, initialQuantifiers }}>
            {children}
        </QuantifierContext.Provider>
    )
}

export default QuantifierContext
