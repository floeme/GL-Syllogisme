import { Figure } from "../../model/Figure.ts"
import { Quantifier } from "../../model/Quantifier.ts"
import { QuantifierType } from "../../model/QuantifierType.ts"
import { Term } from "../../model/Term.ts"
import Expert_Syllogism from "../elements/syllogism/Expert_Syllogism.tsx"
import Basic_Syllogism from "../elements/syllogism/Basic_Syllogism.tsx"
import { useState } from "react"
import {Syllogism} from "../../model/Syllogism.ts";

export const SyllogismPage = () => {
	const [subject, setSubject] = useState(new Term(""))
	const [predicate, setPredicate] = useState(new Term(""))
	const [middle, setMiddle] = useState(new Term(""))
	const [figure, setFigureFinale] = useState(Figure.Figure1)
	const [prop1Quantifier, setProp1Quantifier] = useState(new Quantifier("prop1Quantifier", QuantifierType.A))
	const [prop2Quantifier, setProp2Quantifier] = useState(new Quantifier("prop2Quantifier", QuantifierType.A))
	const [prop3Quantifier, setProp3Quantifier] = useState(new Quantifier("prop3Quantifier", QuantifierType.A))
	const [verb, setVerb] = useState("")
	const [expertMode, setExpertMode] = useState(false)
	const [syllogism, setSyllogism] = useState(Syllogism.ofFigure(figure, subject, predicate, middle))

	syllogism.getProposition(0).quantifier = prop1Quantifier
	syllogism.getProposition(1).quantifier = prop2Quantifier
	syllogism.getProposition(2).quantifier = prop3Quantifier

	const setFigure = (figure: Figure): void => {
		setFigureFinale(figure)
		setSyllogism(Syllogism.ofFigure(figure, subject, predicate, middle))
		syllogism.getProposition(0).quantifier = prop1Quantifier
		syllogism.getProposition(1).quantifier = prop2Quantifier
		syllogism.getProposition(2).quantifier = prop3Quantifier
	}

	return (
		<>
			{expertMode ?
				<div className="syllogism-container-easy">
					<Expert_Syllogism
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
						syllogism={syllogism}
					/>
				</div>
				:
				<div className="syllogism-container-expert">
					<Basic_Syllogism
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
				</div>
			}
		</>
  	)
}

export default SyllogismPage
