import SyllogismTerms from "./basic/SyllogismTerms"
import SyllogismPropositions from "./basic/SyllogismPropositions"
import SyllogismFigures from "./basic/SyllogismFigures"

interface Basic_SyllogismProps {
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

export const Basic_Syllogism = ({subject, setSubject, predicate, setPredicate, middle, setMiddle, figure, setFigure, expertMode, setExpertMode}: Basic_SyllogismProps) => {
  return (
    <>
      <div className="section-terms-figures">
        <SyllogismTerms
          subject={subject}
          setSubject={setSubject}
          predicate={predicate}
          setPredicate={setPredicate}
          middle={middle}
          setMiddle={setMiddle}
          figure={figure}
          setFigure={setFigure}
        />
        <SyllogismFigures
          figure={figure}
          setFigure={setFigure}
        />
      </div>
        <SyllogismPropositions
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

export default Basic_Syllogism
