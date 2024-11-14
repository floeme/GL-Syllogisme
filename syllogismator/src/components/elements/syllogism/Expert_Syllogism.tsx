import { Quantifier } from "../../../model/Quantifier"
import { Term } from "../../../model/Term"
import SyllogismPropositions from "./expert/SyllogismPropositions"
import { useState } from "react"
import {Syllogism} from "../../../model/Syllogism.ts";

interface Expert_SyllogismProps {
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
}

export const Expert_Syllogism = ({
	subject, setSubject,
	predicate, setPredicate,
	middle, setMiddle,
	expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier,
	verb, setVerb,
	syllogism
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
			/>
		</>
	)
}

export default Expert_Syllogism
