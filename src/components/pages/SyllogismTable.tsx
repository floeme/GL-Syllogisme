import { useState } from "react";
import {useTranslation} from "react-i18next";
import {Tooltip} from "react-tooltip";

const INTERESTING_TOOLTIP_ID = "interesting-syllogism"

export const SyllogismTable = () => {
	const propositions = ["A", "E", "I", "O"]
	const figures = ["1", "2", "3", "4"]
	const [hoveredRow, setHoveredRow] = useState<number | null>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	const { t } = useTranslation('translation', { keyPrefix: 'syllogism.table' })

	function handleMouseMove(event: React.MouseEvent) {
		setMousePosition({ x: event.clientX, y: event.clientY })
	}

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
			let hasStrongerConclusion: boolean

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

	return <>
		<table className="syllogism-table">
			<thead>
				<tr>
					<th>{t("prop1")}</th>
					<th>{t("prop2")}</th>
					<th>{t("conc")}</th>
					<th>{t("figure")}</th>
					<th>{t("validity")}</th>
					<th>{t("validityhe")}</th>
					<th data-tooltip-id={INTERESTING_TOOLTIP_ID} className="info">{t("is")}</th>
				</tr>
			</thead>
			<tbody>
				{syllogisms.map((syllogism, index) => (
					<tr key={index}
						onMouseEnter={() => setHoveredRow(index)}
						onMouseMove={handleMouseMove}
						onMouseLeave={() => setHoveredRow(null)}
						className={hoveredRow === index ? "hovered" : ""}
					>
						<td>{syllogism.prop1}</td>
						<td>{syllogism.prop2}</td>
						<td>{syllogism.conclusion}</td>
						<td>{syllogism.figure}</td>
						<td className={syllogism.valid ?"valid" : "unvalid"}>{syllogism.valid ? t("yes") : t("no")}</td>
						<td className={syllogism.validWithExistentialHypothesis ?"valid" : "unvalid"}>{syllogism.validWithExistentialHypothesis ? t("yes") : t("no")}</td>
						<td className={syllogism.isInteresting ?"valid" : "unvalid"}>{syllogism.isInteresting ? t("yes") : t("no")}</td>
					</tr>
				))}
			</tbody>
		</table>

		{hoveredRow !== null && (
			<div
				className="hover-tooltip"
				style={{
					top: mousePosition.y + 15,
					left: mousePosition.x + 15,
				}}
			>
				Row {hoveredRow + 1}: {syllogisms[hoveredRow].prop1}, {syllogisms[hoveredRow].prop2},
				{syllogisms[hoveredRow].conclusion}, Figure {syllogisms[hoveredRow].figure}
				<br />
				Rmt: {syllogisms[hoveredRow].rulesResult.rmt.toString()} |
				Rlh: {syllogisms[hoveredRow].rulesResult.rlh.toString()} <br />
				Rnn: {syllogisms[hoveredRow].rulesResult.rnn.toString()} |
				Rn: {syllogisms[hoveredRow].rulesResult.rn.toString()} <br />
				Raa: {syllogisms[hoveredRow].rulesResult.raa.toString()} |
				Rpp: {syllogisms[hoveredRow].rulesResult.rpp.toString()} <br />
				Rp: {syllogisms[hoveredRow].rulesResult.rp.toString()} |
				Ruu: {syllogisms[hoveredRow].rulesResult.ruu.toString()}
			</div>
		)}

		<Tooltip id={INTERESTING_TOOLTIP_ID} style={{zIndex: 1, fontFamily: "sans-serif", maxWidth: "80vw"}}>
			{t("is_description")}
		</Tooltip>
	</>
}

export default SyllogismTable
