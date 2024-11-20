import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

interface ResultProposition {
    message: string | undefined
    messageOK: string[]
    messageKO: string[]
}

function ResultProposition({
    message, messageKO, messageOK
}: ResultProposition) {

    const { t } = useTranslation(I18N_NS);

    return (
        <div style={{width:"max-content", backgroundColor:"black"}}>
        {
            message && <p style={{color:"white"}}>{message}</p>
        }
        {
            messageKO.length != 0 &&
            <div style={{width:"auto", color:"red"}}>

                <p>{t("syllogism.summary.ko")}</p>
                {
                    messageKO.map((koMessage, i) => (
                        <p key={i}>{i}: {koMessage}</p>
                    ))
                }
            </div>
        }
        {
            messageOK.length != 0 &&
            <div style={{width:"auto", color:"green"}}>
                <p>{t("syllogism.summary.ok")}</p>
                {
                    messageOK.map((okMessage, i) => (
                        <p key={i}>{i}: {okMessage}</p>
                    ))
                }
            </div>
        }
        </div>
    )
}

export default ResultProposition