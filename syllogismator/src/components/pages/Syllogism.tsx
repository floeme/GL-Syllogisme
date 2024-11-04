import Basic_Syllogism from "../elements/syllogism/Basic_Syllogism.tsx"
import Expert_Syllogism from "../elements/syllogism/Expert_Syllogism.tsx"
import { useState } from "react"

export const Syllogism = () => {
	const [subject, setSubject] = useState("Socrate")
	const [predicate, setPredicate] = useState("Mortel")
	const [middle, setMiddle] = useState("Homme")
	const [figure, setFigure] = useState("figure1")
	const [prop1Quantifier, setProp1Quantifier] = useState("")
	const [prop2Quantifier, setProp2Quantifier] = useState("")
	const [prop3Quantifier, setProp3Quantifier] = useState("")
	const [expertMode, setExpertMode] = useState(false)

	return (
		<>
			{expertMode == false ?
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
				</div>
			}
		</>
  	)
}

export default Syllogism
