import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import React from "react";

interface ResultProposition {
    message: string | undefined
    messageOK: string[]
    messageKO: string[]
}

const CheckIcon : React.FC = () => {
    return (
        <img src="images/check_mark.svg" alt="delete"></img>
    );
};

const NoCheckIcon: React.FC = () => {
    return (
        <img src="images/close_mark.svg" alt="delete"></img>
    );
};

function ResultProposition({
                               message, messageKO, messageOK
                           }: ResultProposition) {

    const {t} = useTranslation(I18N_NS);
    return (
        (messageKO.length !== 0 || messageOK.length !== 0) && (
            <div id="result">
                {message && <p>{message}</p>}

                {messageKO.length !== 0 && (
                    <div id="msgko">
                        <p>{t("syllogism.summary.ko")}</p>
                        <p>{messageKO.length}</p>
                        {messageKO.map((koMessage, i) => (
                            <div key={i}>
                                <NoCheckIcon/> {koMessage}
                            </div>
                        ))}
                    </div>
                )}

                {messageOK.length !== 0 && (
                    <div id="msgok">
                        <p>{t("syllogism.summary.ok")}</p>
                        <p>{messageOK.length}</p>
                        {messageOK.map((okMessage, i) => (
                            <div key={i}>
                                <CheckIcon/> {okMessage}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    );

}

export default ResultProposition