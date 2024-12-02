import QuantifierSelector from "../../QuantifierSelector"
import {Quantifier} from "../../../../model/Quantifier"
import {I18N_NS} from "../../../../i18n.ts";
import {useTranslation} from "react-i18next";
import {Tooltip} from "react-tooltip";

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

                <div className="subject" style={{display: "flex", alignItems: "baseline"}}>
                    <label>{subject}</label>
                    <TermTooltip termKind="subject" />
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

                <div className="predicate" style={{display: "flex", alignItems: "baseline"}}>
                    <label>{predicate}</label>
                    <TermTooltip termKind="predicate" />
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP3

function TermTooltip({termKind}: {termKind: string}) {
    const { t } = useTranslation(I18N_NS, {keyPrefix: "syllogism.conclusion_term_tooltip"});

    const tooltipId = `conclusion_${termKind}_tooltip`;

    return <>
        <img src="images/info_icon.svg" alt="info" style={{width: "18px", cursor: "pointer", marginLeft: "1em"}}
             data-tooltip-id={tooltipId} />
        <Tooltip id={tooltipId} style={{ fontFamily: "sans-serif" }}>
            <p><b>{t(termKind)}</b></p>
            <p>{t("swap")}</p>
        </Tooltip>
    </>
}
