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
  prop1Quantifier: string
  setProp1Quantifier: (value: string) => void
  prop2Quantifier: string
  setProp2Quantifier: (value: string) => void
  prop3Quantifier: string
  setProp3Quantifier: (value: string) => void
}

export const Basic_Syllogism = ({
	subject, setSubject,
	predicate, setPredicate,
	middle, setMiddle,
	figure, setFigure,
	expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier
}: Basic_SyllogismProps) => {
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
				prop1Quantifier={prop1Quantifier}
				setProp1Quantifier={setProp1Quantifier}
				prop2Quantifier={prop2Quantifier}
				setProp2Quantifier={setProp2Quantifier}
				prop3Quantifier={prop3Quantifier}
				setProp3Quantifier={setProp3Quantifier}
			/>
		</>
	)
}

export default Basic_Syllogism
