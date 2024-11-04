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
	prop1Quantifier: string
	setProp1Quantifier: (value: string) => void
	prop2Quantifier: string
	setProp2Quantifier: (value: string) => void
	prop3Quantifier: string
	setProp3Quantifier: (value: string) => void
}

export const Expert_Syllogism = ({
	subject, setSubject,
	predicate, setPredicate,
	middle, setMiddle,
	figure, setFigure,
	expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier
}: Expert_SyllogismProps) => {
	const [MP1FirstTerm, setMP1FirstTerm] = useState("")
	const [MP1SecondTerm, setMP1SecondTerm] = useState("")
	const [MP2FirstTerm, setMP2FirstTerm] = useState("")
	const [MP2SecondTerm, setMP2SecondTerm] = useState("")

	return (
		<>
			<SyllogismPropositions
				MP1FirstTerm={MP1FirstTerm}
				setMP1FirstTerm={setMP1FirstTerm}
				MP1SecondTerm={MP1SecondTerm}
				setMP1SecondTerm={setMP1SecondTerm}
				MP2FirstTerm={MP2FirstTerm}
				setMP2FirstTerm={setMP2FirstTerm}
				MP2SecondTerm={MP2SecondTerm}
				setMP2SecondTerm={setMP2SecondTerm}
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

export default Expert_Syllogism
