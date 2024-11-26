import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import React from "react";
import {CheckResults} from "../../../model/Rule.ts";
import {RULE_I18N_NAMESPACE} from "../../../model/Rule.ts";

interface ResultProposition {
    checkResult: CheckResults | undefined
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

function ResultProposition({checkResult, messageKO}: ResultProposition) {

    const {t} = useTranslation(I18N_NS);
    const filterResults = (toFilter : CheckResults, valid: boolean)  => {
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
                                <NoCheckIcon/> {ruleID + " · " + t(`${RULE_I18N_NAMESPACE}.${ruleID}.${toFilter.results.get(ruleID)!.message}`)}
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
                        {res.map((ruleID) => (

                            <div>
                                <CheckIcon/> {ruleID + " · " + t(`${RULE_I18N_NAMESPACE}.${ruleID}.${toFilter.results.get(ruleID)!.message}`)}
                            </div>
                        ))}
                    </div>
                )
            )
        }
    }

    if(messageKO.length === 0) {
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
                                <NoCheckIcon/> {koMessage}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

}

export default ResultProposition