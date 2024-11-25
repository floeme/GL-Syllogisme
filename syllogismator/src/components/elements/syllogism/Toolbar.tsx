import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../constants/routes.ts";
import PolyModal from "../modals/PolyModal.tsx";

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
        console.log("help")
    }

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
        <PolyModal isOpen={modalIsOpen} onRequestClose={closeModal} path={path} />
        <button type="button"
                name="settingsButton"
                title={t("settings")}
                onClick={() => navigate(ROUTES.quantifiers)}>
            <img src="images/settings_icon.svg" alt={t("settings")}/>
        </button>
    </>;
}