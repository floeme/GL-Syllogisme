import SyllogismTerms from "./basic/SyllogismTerms"
import SyllogismPropositions from "./basic/SyllogismPropositions"
import SyllogismFigures from "./basic/SyllogismFigures"
import { Figure } from "../../../model/Figure"
import { Term } from "../../../model/Term"
import { Quantifier } from "../../../model/Quantifier"

interface Basic_SyllogismProps {
	subject: Term
	setSubject: (value: Term) => void
	predicate: Term
	setPredicate: (value: Term) => void
	middle: Term
	setMiddle: (value: Term) => void
	figure: Figure
	setFigure: (value: Figure) => void
	expertMode: boolean
	setExpertMode: (value: boolean) => void
	prop1Quantifier: Quantifier
	setProp1Quantifier: (value: Quantifier) => void
	prop2Quantifier: Quantifier
	setProp2Quantifier: (value: Quantifier) => void
	prop3Quantifier: Quantifier
	setProp3Quantifier: (value: Quantifier) => void
	verb: string
	setVerb: (value: string) => void
}

export const Basic_Syllogism = ({
	subject, setSubject,
	predicate, setPredicate,
	middle, setMiddle,
	figure, setFigure,
	expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier,
	verb, setVerb
}: Basic_SyllogismProps) => {
	return (
		<>
			<div className="section-terms-figures">
				<SyllogismTerms
					subject={subject}
					setSubject={setSubject}
					middle={middle}
					setMiddle={setMiddle}
					predicate={predicate}
					setPredicate={setPredicate}
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
				verb={verb}
				setVerb={setVerb}
			/>
		</>
	)
}

export default Basic_Syllogism
