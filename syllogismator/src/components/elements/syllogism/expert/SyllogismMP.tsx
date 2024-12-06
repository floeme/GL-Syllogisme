import QuantifierSelector from "../../QuantifierSelector"
import { Quantifier } from "../../../../model/Quantifier"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";
import {LINK_VERB_TOOLTIP_ID} from "../../LinkVerbTooltip.tsx";

interface SyllogismMPProps {
    firstTerm: string
    secondTerm: string
    quantifier: Quantifier
    setPropQuantifier: (value: Quantifier) => void
	verb: string
	setVerb: (value: string) => void
}

function SyllogismMP({
    firstTerm,
    secondTerm,
    quantifier, setPropQuantifier,
	verb, setVerb
}: SyllogismMPProps) {
    const { t } = useTranslation(I18N_NS);

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <QuantifierSelector quantifier={quantifier} setPropQuantifier={setPropQuantifier} />
                </div>

                <div className="term subject">
                    {firstTerm}
                </div>

                <div className="verb" data-tooltip-id={LINK_VERB_TOOLTIP_ID}>
                    <input type="text"
                        name="verbTerm"
                        placeholder={t("input.enter_verb")}
                        value={verb}
                        onChange={(e) => {
                            setVerb(e.target.value)
                        }}
                    />
                </div>

                <div className="term predicate">
                    {secondTerm}
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP
