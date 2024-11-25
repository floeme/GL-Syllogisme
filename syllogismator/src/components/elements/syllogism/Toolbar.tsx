import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../constants/routes.ts";

interface ToolbarButtonsProps {
    clearSyllogism?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    help?: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

export function ToolbarButtons({clearSyllogism, help}: ToolbarButtonsProps) {
    const navigate = useNavigate();
    const { t } = useTranslation(I18N_NS, {keyPrefix: "toolbar"});

    return <>
        <button type="button"
                name="clearSyllogismButton"
                title={t("clear_syllogism")}
                onClick={clearSyllogism}>
            <img src="images/delete_icon.svg" alt={t("clear_syllogism")}/>
        </button>
        <button type="button"
                name="helpButton"
                title={t("help")}
                onClick={help}>
            <img src="images/help_icon.svg" alt={t("help")}/>
        </button>
        <button type="button"
                name="settingsButton"
                title={t("settings")}
                onClick={() => navigate(ROUTES.quantifiers)}>
            <img src="images/settings_icon.svg" alt={t("settings")}/>
        </button>
    </>;
}