import QuantifierSelector from "../../QuantifierSelector"
import {Quantifier} from "../../../../model/Quantifier"
import {I18N_NS} from "../../../../i18n.ts";
import {useTranslation} from "react-i18next";
import {Tooltip} from "react-tooltip";
import {LINK_VERB_TOOLTIP_ID} from "../../LinkVerbTooltip.tsx";

const TERM_TOOLTIP_ID = "term-tooltip";

interface SyllogismMP3Props {
    subject: string
    predicate: string
    quantifier: Quantifier
	setProp3Quantifier: (value: Quantifier) => void
	verb: string
	setVerb: (value: string) => void
}

function SyllogismMP3({
    subject,
    predicate,
    quantifier, setProp3Quantifier,
	verb, setVerb
}: SyllogismMP3Props) {
    const { t } = useTranslation(I18N_NS);

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <QuantifierSelector quantifier={quantifier} setPropQuantifier={setProp3Quantifier} />
                </div>

                <div className="term term--info subject"
                     data-tooltip-id={TERM_TOOLTIP_ID}
                     data-tooltip-content={"subject"}>
                    {subject}
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

                <div className="term term--info predicate"
                     data-tooltip-id={TERM_TOOLTIP_ID}
                     data-tooltip-content={"subject"}>
                    {predicate}
                </div>
            </div>

            <TermTooltip/>
        </div>
    )
}

export default SyllogismMP3

function TermTooltip() {
    const { t } = useTranslation(I18N_NS, {keyPrefix: "syllogism.conclusion_term_tooltip"});

    return <Tooltip id={TERM_TOOLTIP_ID}
                    style={{fontFamily: "sans-serif"}}
                    render={({content}) => {
                        // content: "subject" | "predicate"
                        if (content) {
                            return <>
                                <p><b>{t(content)}</b></p>
                                <p>{t("swap")}</p>
                            </>
                        } else {
                            return <></>
                        }
                    }}>
    </Tooltip>
}
