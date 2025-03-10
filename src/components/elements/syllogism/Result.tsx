import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import {CheckResults} from "../../../model/Rule.ts";
import {RULE_I18N_NAMESPACE} from "../../../model/Rule.ts";
import {Tooltip} from "react-tooltip";
import {Figure} from "../../../model/Figure.ts";

const RULE_TOOLTIP_ID = "rule-tooltip";

interface ResultReportProps {
    checkResults?: CheckResults;
    inputErrors?: string[];
    figure?: Figure;
}

function ResultReport({checkResults, inputErrors, figure}: ResultReportProps) {
    const inputErrorsPresent = inputErrors && inputErrors.length > 0;

    return (checkResults || inputErrorsPresent) ? <section className="result">
        {(inputErrorsPresent) && <InputErrors inputErrors={inputErrors}/>}
        {(checkResults) && <RuleReport checkResults={checkResults} figure={figure}/>}
    </section> : <></>
}

export default ResultReport;

function InputErrors({inputErrors}: {inputErrors: string[]}) {
    const { t } = useTranslation(I18N_NS);

    return <>
        <p className="result__header">{t("input.invalid")}</p>

        <ul className="result__msgko">
            { inputErrors.map((koMessage, i) => (
                <li key={i}>{koMessage}</li>
            )) }
        </ul>
    </>
}

function RuleReport({checkResults, figure}: ResultReportProps) {
    const { t } = useTranslation(I18N_NS);

    const renderResults = (toFilter: CheckResults, valid: boolean)  => {
        const ruleIDs : string[] = []

        toFilter.results.forEach((value, key) => {
            if(value.valid == valid)
                ruleIDs.push(key);
        })

        return (ruleIDs.length > 0) ? <div className="result__group">
            <p>{t(`syllogism.summary.${valid ? "ok" : "ko"}`)} ({ruleIDs.length})</p>

            <ul className={`result__${valid ? "msgok" : "msgko"}`}>
                { ruleIDs.map((ruleID) => {
                    const ruleResult = toFilter.results.get(ruleID)!;

                    return <li key={ruleID}>
                        <span className="result__ruleid"
                              data-tooltip-id={RULE_TOOLTIP_ID}
                              data-tooltip-content={ruleID}>
                            {ruleID}
                        </span>
                        &nbsp;·&nbsp;
                        {t(`${RULE_I18N_NAMESPACE}.${ruleID}.${ruleResult.message}`, {extra: ruleResult.extras})}
                    </li>
                }) }
            </ul>
        </div> : <></>
    }

    return checkResults ? <>
        <p className="result__header">{t(`syllogism.${checkResults.valid}`)}</p>

        {/* Figure */}
        { figure ? <ul className="result__msginfo">
            <li>
                {t("syllogism.has_figure", {number: figure})}
            </li>
        </ul> : <></> }

        {/* Uninteresting Syllogisms */}
        { checkResults.valid && !checkResults.isInteresting && <ul className="result__msginfo">
            <li>
                <b>{t("syllogism.valid_with_universal_conclusion")}</b>&nbsp;
                {t("syllogism.valid_with_universal_conclusion_description")}
            </li>
        </ul> }

        { !checkResults.valid && renderResults(checkResults, false) }
        { renderResults(checkResults, true) }

        <RuleTooltip/>
    </> : <></>
}

function RuleTooltip() {
    const { t } = useTranslation(I18N_NS);

    return <Tooltip id={RULE_TOOLTIP_ID}
                    render={({content}) =>
                        // content = ruleID
                        content && <>
                            <p><b>{t(`${RULE_I18N_NAMESPACE}.${content}.name`)}</b></p>
                            <p>{t(`${RULE_I18N_NAMESPACE}.${content}.description`)}</p>
                        </>
                    }
                    style={{fontFamily: "sans-serif", maxWidth: "80vw"}}/>
}