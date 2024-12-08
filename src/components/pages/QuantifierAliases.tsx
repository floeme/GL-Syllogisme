import { useContext } from 'react'
import QuantifierContext from '../../contexts/QuantifierContext'
import QuantifierAliasSection from "../elements/quantifier/QuantifierAliasSection"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../i18n.ts";

const QuantifiersAliases = () => {
    const { resetQuantifiers } = useContext(QuantifierContext)

    const { t } = useTranslation(I18N_NS, {keyPrefix: "quantifier_aliases"});

    return (
        <div className="quantifiers-aliases">
            <div className="alias-title">
                <h2>{t("title")}</h2>
            </div>

            <div className="alias-sections">
                <QuantifierAliasSection type="A" />
                <QuantifierAliasSection type="E" />
                <QuantifierAliasSection type="I" />
                <QuantifierAliasSection type="O" />
            </div>

            <button onClick={resetQuantifiers} className="reset-button">
                {t("reset")}
            </button>
        </div>
    )
}

export default QuantifiersAliases
