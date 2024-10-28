import SyllogismPropositions from "./expert/SyllogismPropositions"
import { useState } from "react"

interface Expert_SyllogismProps {
  subject: string
  setSubject: (value: string) => void
  predicate: string
  setPredicate: (value: string) => void
  middle: string
  setMiddle: (value: string) => void
  figure: string
  setFigure: (value: string) => void
  expertMode: boolean
  setExpertMode: (value: boolean) => void
}

export const Expert_Syllogism = ({ subject, setSubject, predicate, setPredicate, middle, setMiddle, figure, setFigure, expertMode, setExpertMode }: Expert_SyllogismProps) => {
  const [MP1FirstTerm, setMP1FirstTerm] = useState("Homme")
  const [MP1SecondTerm, setMP1SecondTerm] = useState("Mortel")

  return (
    <>
        <SyllogismPropositions
          MP1FirstTerm={MP1FirstTerm}
          setMP1FirstTerm={setMP1FirstTerm}
          MP1SecondTerm={MP1SecondTerm}
          setMP1SecondTerm={setMP1SecondTerm}
          subject={subject}
          setSubject={setSubject}
          predicate={predicate}
          setPredicate={setPredicate}
          middle={middle}
          setMiddle={setMiddle}
          figure={figure}
          setFigure={setFigure}
          expertMode={expertMode}
          setExpertMode={setExpertMode}
        />
    </>
  )
}

export default Expert_Syllogism
