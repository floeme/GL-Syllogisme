import QuantifierSelector from "../../QuantifierSelector"
import {Quantifier} from "../../../../model/Quantifier"
import {I18N_NS} from "../../../../i18n.ts";
import {useTranslation} from "react-i18next";

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

                <div className="subject">
                    <label>{subject}</label>
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

                <div className="predicate">
                    <label>{predicate}</label>
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP3
