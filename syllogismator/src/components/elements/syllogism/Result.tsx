import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import React from "react";
import {CheckResults} from "../../../model/Rule.ts";
import {RULE_I18N_NAMESPACE} from "../../../model/Rule.ts";

const OKIcon : React.FC = () => {
    return (
        <img src="images/check_mark.svg" alt="OK"/>
    );
};

const KOIcon: React.FC = () => {
    return (
        <img src="images/close_mark.svg" alt="KO"/>
    );
};

interface ResultReportProps {
    checkResult: CheckResults | undefined
    messageKO: string[]
}

function ResultReport({checkResult, messageKO}: ResultReportProps) {

    const {t} = useTranslation(I18N_NS);
    const filterResults = (toFilter : CheckResults, valid: boolean)  => {

        if(messageKO.length > 0) {
            return (
                <div id="result">
                    <div id="msgko">
                        <p>{t("syllogism.summary.ko")}</p>
                        <p>{messageKO.length}</p>
                        {messageKO.map((koMessage, i) => (
                            <div key={i}>
                                <KOIcon/> {koMessage}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

        const res : string[] = []

        toFilter.results.forEach((value, key) => {
            if(value.valid == valid)
                res.push(key);
        })

        if(!valid) {
            return (
                (res.length !== 0) && (
                    <div id="msgko">
                        <p>{t("syllogism.summary.ko")}</p>
                        <p>{res.length}</p>
                        {res.map((ruleID) => (

                            <div>
                                <KOIcon/> {ruleID + " · " + t(`${RULE_I18N_NAMESPACE}.${ruleID}.${toFilter.results.get(ruleID)!.message}`)}
                            </div>
                        ))}
                    </div>
                )
            )
        }else{
            return (
                (res.length !== 0) && (
                    <div id="msgok">
                        <p>{t("syllogism.summary.ok")}</p>
                        <p>{res.length}</p>
                        {checkResult?.validWithUniversalConclusion &&
                            <div>
                                <OKIcon/> {t("universal")}
                            </div>
                        }
                        {res.map((ruleID) => (

                            <div>
                                <OKIcon/> {ruleID + " · " + t(`${RULE_I18N_NAMESPACE}.${ruleID}.${toFilter.results.get(ruleID)!.message}`)}
                            </div>
                        ))}
                    </div>
                )
            )
        }
    }

    if (messageKO.length === 0) {
        return (
            (checkResult) && (
                <div id="result">
                <p>{t(`syllogism.${checkResult.valid}`)}</p>

                    {
                        filterResults(checkResult, false)
                    }

                    {
                        filterResults(checkResult, true)
                    }
                </div>
            )
        );
    }else{
        return (
            <div id="result">
                {messageKO.length !== 0 && (
                    <div id="msgko">
                        <p>{t("syllogism.summary.ko")}</p>
                        <p>{messageKO.length}</p>
                        {messageKO.map((koMessage, i) => (
                            <div key={i}>
                                <KOIcon/> {koMessage}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

}

export default ResultReport