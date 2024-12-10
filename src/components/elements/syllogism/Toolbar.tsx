import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../constants/routes.ts";
import PolyModal from "../modals/PolyModal.tsx";
import {Tooltip} from "react-tooltip";

const TOOLBAR_TOOLTIP_ID = "toolbar";

interface ToolbarButtonsProps {
    clearSyllogism?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    path: string,
}

export function ToolbarButtons({clearSyllogism, path}: ToolbarButtonsProps) {
    const navigate = useNavigate();
    const { t } = useTranslation(I18N_NS, {keyPrefix: "toolbar"});
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const help = () => {
        setModalIsOpen(true)
    }

    return <>
        <button type="button"
                name="clearSyllogismButton"
                onClick={clearSyllogism}
                data-tooltip-id={TOOLBAR_TOOLTIP_ID}
                data-tooltip-content={t("clear_syllogism")}>
            <img src="images/delete_icon.svg" alt={t("clear_syllogism")}/>
        </button>
        <button type="button"
                name="helpButton"
                onClick={help}
                data-tooltip-id={TOOLBAR_TOOLTIP_ID}
                data-tooltip-content={t("help")}>
            <img src="images/help_icon.svg" alt={t("help")}/>
        </button>
        <PolyModal isOpen={modalIsOpen} onRequestClose={closeModal} path={path} />
        <button type="button"
                name="settingsButton"
                onClick={() => navigate(ROUTES.quantifiers)}
                data-tooltip-id={TOOLBAR_TOOLTIP_ID}
                data-tooltip-content={t("settings")}>
            <img src="images/settings_icon.svg" alt={t("settings")}/>
        </button>

        <Tooltip id={TOOLBAR_TOOLTIP_ID} style={{fontFamily: "sans-serif"}}/>
    </>;
}