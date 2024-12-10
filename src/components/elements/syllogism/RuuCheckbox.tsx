import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import {Tooltip} from "react-tooltip";
import {RULE_DESCRIPTION_I18N_KEY, RULE_I18N_NAMESPACE, RULE_NAME_I18N_KEY} from "../../../model/Rule.ts";
import {Ruu} from "../../../model/RulesImpl.ts";

const RUU_TOOLTIP_ID = "ruu";

interface RuuCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function RuuCheckbox({checked, onChange}: RuuCheckboxProps) {
    const { t } = useTranslation(I18N_NS);

    return <>
        <label>
            <input type="checkbox"
                   name="existenceHypothesis"
                   checked={checked}
                   onChange={(e) => onChange(e.target.checked)}/>
            &#x20;
            <span className="info" data-tooltip-id={RUU_TOOLTIP_ID}>{t("input.check_ruu")}</span>
        </label>

        <Tooltip id={RUU_TOOLTIP_ID} style={{fontFamily: "sans-serif", maxWidth: "80vw"}}>
            <p><b>{t(`${RULE_I18N_NAMESPACE}.${Ruu.id}.${RULE_NAME_I18N_KEY}`)} ({Ruu.id})</b></p>
            <p>{t(`${RULE_I18N_NAMESPACE}.${Ruu.id}.${RULE_DESCRIPTION_I18N_KEY}`)}</p>
        </Tooltip>
    </>;
}