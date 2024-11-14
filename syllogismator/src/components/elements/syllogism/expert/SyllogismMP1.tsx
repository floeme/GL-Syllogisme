import SyllogismMPQuantifier from "../SyllogismMPQuantifier"
import {Quantifier} from "../../../../model/Quantifier"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";

interface SyllogismMP1Props {
    MP1FirstTerm: string
    setMP1FirstTerm: (value: string) => void
    MP1SecondTerm: string
    setMP1SecondTerm: (value: string) => void
    quantifier: Quantifier
	setProp1Quantifier: (value: Quantifier) => void
	verb: string
	setVerb: (value: string) => void
}

function SyllogismMP1({
    MP1FirstTerm, setMP1FirstTerm,
    MP1SecondTerm, setMP1SecondTerm,
    quantifier, setProp1Quantifier,
	verb, setVerb
}: SyllogismMP1Props) {
    const { t } = useTranslation(I18N_NS);

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} quantifier={quantifier} setPropQuantifier={setProp1Quantifier} />
                </div>

                <div className="first-term">
                    <input
                        type="text"
                        name="firstTerm"
                        placeholder={t("input.enter_term", {kind: t("syllogism.term_kind.subject")})}
                        value={MP1FirstTerm}
                        onChange={(e) => setMP1FirstTerm(e.target.value)}
                    />
                </div>

                <div className="verb">
                    <input type="text"
                        name="verbTerm"
                        placeholder={t("input.enter_verb")}
                        value={verb}
                        onChange={(e) => {
                            setVerb(e.target.value)
                        }}
                    />
                </div>

                <div className="second-term">
                    <input
                        type="text"
                        name="secondTerm"
                        placeholder={t("input.enter_term", {kind: t("syllogism.term_kind.predicate")})}
                        value={MP1SecondTerm}
                        onChange={(e) => setMP1SecondTerm(e.currentTarget.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP1
