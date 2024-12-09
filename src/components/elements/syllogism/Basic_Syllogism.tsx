import { Quantifier } from "../../../model/Quantifier"
import { Term } from "../../../model/Term"
import SyllogismPropositions from "./basic/SyllogismPropositions"
import {Syllogism} from "../../../model/Syllogism.ts";
import {Figure} from "../../../model/Figure.ts";

interface Basic_SyllogismProps {
	subject: Term
	setSubject: (value: Term) => void
	predicate: Term
	setPredicate: (value: Term) => void
	middle: Term
	setMiddle: (value: Term) => void
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
	syllogism : Syllogism
	figure: Figure
	setFigure: (value: Figure) => void
}

export const Basic_Syllogism = ({
	subject, setSubject,
	predicate, setPredicate,
	middle, setMiddle,
	expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier,
	verb, setVerb,
	syllogism,
	figure, setFigure
}: Basic_SyllogismProps) => {

	return (
		<>
			<SyllogismPropositions
				subject={subject}
				setSubject={setSubject}
				predicate={predicate}
				setPredicate={setPredicate}
				middle={middle}
				setMiddle={setMiddle}
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
				syllogism={syllogism}
				figure={figure}
				setFigure={setFigure}
			/>
		</>
	)
}

export default Basic_Syllogism
