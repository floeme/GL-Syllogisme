import {Tooltip} from "react-tooltip";
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../i18n.ts";

export const LINK_VERB_TOOLTIP_ID = "LinkVerbTooltip";

export function LinkVerbTooltip() {
    const { t } = useTranslation(I18N_NS);

    return <Tooltip id={LINK_VERB_TOOLTIP_ID} style={{fontFamily: "sans-serif"}}>
        {t("input.verb_tooltip")}
    </Tooltip>
}