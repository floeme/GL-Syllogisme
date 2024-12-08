import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

interface RuuCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function RuuCheckbox({checked, onChange}: RuuCheckboxProps) {
    const { t } = useTranslation(I18N_NS);

    return (
        <label>
            <input type="checkbox"
                   name="existenceHypothesis"
                   checked={checked}
                   onChange={(e) => onChange(e.target.checked)}/>
            &#x20;{t("input.check_ruu")}
        </label>
    );
}