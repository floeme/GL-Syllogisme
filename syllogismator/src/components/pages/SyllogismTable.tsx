export const SyllogismTable = () => {
  	const propositions = ["A", "E", "I", "O"]
  	const figures = ["1", "2", "3", "4"]

	function generateProposition(row: number) {
		const prop1 = propositions[Math.floor(row / 64) % 4]
		const prop2 = propositions[Math.floor(row / 16) % 4]
		const conclusion = propositions[Math.floor(row / 4) % 4]
		const figure = figures[row % 4]

		return { prop1, prop2, conclusion, figure }
	}

	function checkRmt(prop1: string, prop2: string, figure: string) {
		return prop1 === "E" || prop2 === "E" ||
			(figure === "1" && (prop1 === "A" || prop2 === "O")) ||
			(figure === "2" && (prop1 === "O" || prop2 === "O")) ||
			(figure === "3" && (prop1 === "A" || prop2 === "A")) ||
			(figure === "4" && (prop1 === "O" || prop2 === "A"))
	}

	function checkRlh(prop1: string, prop2: string, conclusion: string, figure: string) {
		if (conclusion === "I") return true

		if (conclusion === "E") {
			return (figure === "1" && ((prop1 === "O" || prop1 === "E") && (prop2 === "A" || prop2 === "E"))) ||
				   (figure === "2" && ((prop1 === "A" || prop1 === "E") && (prop2 === "A" || prop2 === "E"))) ||
				   (figure === "3" && ((prop1 === "O" || prop1 === "E") && (prop2 === "O" || prop2 === "E"))) ||
				   (figure === "4" && ((prop1 === "A" || prop1 === "E") && (prop2 === "O" || prop2 === "E")))
		}

		if (conclusion === "A") {
			if (prop2 === "E") return true
			return (figure === "1" || figure === "2") ? prop2 === "A" : prop2 === "O"
		}

		if (conclusion === "O") {
			if (prop1 === "E") return true
			return (figure === "1" || figure === "3") ? prop1 === "O" : prop1 === "A"
		}

		return false
	}

	function checkRnn(prop1: string, prop2: string) {
		return !((prop1 === "E" || prop1 === "O") && (prop2 === "E" || prop2 === "O"))
	}

	function checkRn(prop1: string, prop2: string, conclusion: string) {
		if (prop1 === "E" || prop1 === "O" || prop2 === "E" || prop2 === "O") {
			return conclusion === "E" || conclusion === "O"
		}

		return true
	}

	function checkRaa(prop1: string, prop2: string, conclusion: string) {
		if ((prop1 === "A" || prop1 === "I") && (prop2 === "A" || prop2 === "I")) {
			return conclusion === "A" || conclusion === "I"
		}

		return true
	}

	function checkRpp(prop1: string, prop2: string) {
		return !((prop1 === "I" || prop1 === "O") && (prop2 === "I" || prop2 === "O"))
	}

	function checkRp(prop1: string, prop2: string, conclusion: string) {
		if (prop1 === "I" || prop1 === "O" || prop2 === "I" || prop2 === "O") {
			return conclusion === "I" || conclusion === "O"
		}

		return true
	}

	function checkRuu(prop1: string, prop2: string, conclusion: string) {
		if ((prop1 === "A" || prop1 === "E") && (prop2 === "A" || prop2 === "E")) {
			return !(conclusion === "I" || conclusion === "O")
		}

		return true
	}

	function isInterestingSyllogism(prop1: string, prop2: string, conclusion: string, figure: string) {
		const isValid = checkValidity(prop1, prop2, conclusion, figure, false)
		const isUniversalConclusion = conclusion === "A" || conclusion === "E"

		if (!isUniversalConclusion) {
			let hasStrongerConclusion = false

			if (conclusion === "I") {
				hasStrongerConclusion = checkValidity(prop1, prop2, "A", figure, false)
			} else {
				hasStrongerConclusion = checkValidity(prop1, prop2, "E", figure, false)
			}

			return isValid && !hasStrongerConclusion
		}

		return isValid && isUniversalConclusion
	}

	function checkValidity(prop1: string, prop2: string, conclusion: string, figure: string, existentialHypothesis: boolean) {
		const rmt = checkRmt(prop1, prop2, figure)
		const rlh = checkRlh(prop1, prop2, conclusion, figure)
		const rnn = checkRnn(prop1, prop2)
		const rn = checkRn(prop1, prop2, conclusion)
		const raa = checkRaa(prop1, prop2, conclusion)
		const rpp = checkRpp(prop1, prop2)
		const rp = checkRp(prop1, prop2, conclusion)

		if (existentialHypothesis) {
			const ruu = checkRuu(prop1, prop2, conclusion)

			return rmt && rlh && rnn && rn && raa && rpp && rp && ruu
		} else {
			return rmt && rlh && rnn && rn && raa && rpp && rp
		}
	}

	function checkRules(prop1: string, prop2: string, conclusion: string, figure: string) {
		const rmt = checkRmt(prop1, prop2, figure)
		const rlh = checkRlh(prop1, prop2, conclusion, figure)
		const rnn = checkRnn(prop1, prop2)
		const rn = checkRn(prop1, prop2, conclusion)
		const raa = checkRaa(prop1, prop2, conclusion)
		const rpp = checkRpp(prop1, prop2)
		const rp = checkRp(prop1, prop2, conclusion)
		const ruu = checkRuu(prop1, prop2, conclusion)

		return {rmt, rlh, rnn, rn, raa, rpp, rp, ruu}
	}

	function generateSyllogisms(rows: number) {
		const syllogisms = []

		for (let i = 0; i < rows; i++) {
			const { prop1, prop2, conclusion, figure } = generateProposition(i)
			const valid = checkValidity(prop1, prop2, conclusion, figure, false)
			const validWithExistentialHypothesis = checkValidity(prop1, prop2, conclusion, figure, true)
			const isInteresting = isInterestingSyllogism(prop1, prop2, conclusion, figure)
			const rulesResult = checkRules(prop1, prop2, conclusion, figure)

			syllogisms.push({ prop1, prop2, conclusion, figure, valid, validWithExistentialHypothesis, isInteresting, rulesResult })
		}

		return syllogisms
	}

	const syllogisms = generateSyllogisms(256)

	return (
		<table className="syllogism-table">
			<thead>
				<tr>
					<th>Proposition 1</th>
					<th>Proposition 2</th>
					<th>Conclusion</th>
					<th>Figure</th>
					<th>Validity</th>
					<th>Validity with Existential Hypothesis</th>
					<th>Interesting Syllogism</th>
				</tr>
			</thead>
			<tbody>
				{syllogisms.map((syllogism, index) => (
					<tr key={index}>
						<td>{syllogism.prop1}</td>
						<td>{syllogism.prop2}</td>
						<td>{syllogism.conclusion}</td>
						<td>{syllogism.figure}</td>
						<td>{syllogism.valid ? "Yes" : "No"}</td>
						<td>{syllogism.validWithExistentialHypothesis ? "Yes" : "No"}</td>
						<td>{syllogism.isInteresting ? "Yes" : "No"}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default SyllogismTable
