import { Figure } from "../../model/Figure.ts"
import { Quantifier } from "../../model/Quantifier.ts"
import { QuantifierType } from "../../model/QuantifierType.ts"
import { Term } from "../../model/Term.ts"
import Basic_Syllogism from "../elements/syllogism/Basic_Syllogism.tsx"
import Expert_Syllogism from "../elements/syllogism/Expert_Syllogism.tsx"
import { useState } from "react"

export const Syllogism = () => {
	const [subject, setSubject] = useState(new Term("Socrate"))
	const [predicate, setPredicate] = useState(new Term("Mortel"))
	const [middle, setMiddle] = useState(new Term("Homme"))
	const [figure, setFigure] = useState(Figure.Figure1)
	const [prop1Quantifier, setProp1Quantifier] = useState(new Quantifier("prop1Quantifier", QuantifierType.A))
	const [prop2Quantifier, setProp2Quantifier] = useState(new Quantifier("prop2Quantifier", QuantifierType.A))
	const [prop3Quantifier, setProp3Quantifier] = useState(new Quantifier("prop3Quantifier", QuantifierType.A))
	const [verb, setVerb] = useState("are")
	const [expertMode, setExpertMode] = useState(false)

	return (
		<>
			{expertMode == true ?
				<div className="syllogism-container-easy">
					<Basic_Syllogism
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
				</div>
				:
				<div className="syllogism-container-expert">
					<Expert_Syllogism
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
					/>
				</div>
			}
		</>
  	)
}

export default Syllogism
