import { Term } from "../../../../model/Term"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";
import {Figure} from "../../../../model/Figure.ts";

interface SyllogismTermsProps {
    subject: Term
    setSubject: (value: Term) => void
    middle: Term
    setMiddle: (value: Term) => void
    predicate: Term
    setPredicate: (value: Term) => void
    figure: Figure
    setFigure: (value: Figure) => void
}

function SyllogismTerms({
    subject, setSubject,
    middle, setMiddle,
    predicate, setPredicate,
    figure, setFigure
}: SyllogismTermsProps) {
    return (
        <div className="section-terms-input">
            {/* Minor term (Subject of the conclusion) */}
            <TermInput term={subject}
                       kind="minor"
                       letter="S"
                       onTermUpdate={(term) => {
                           subject.value = term
                           setSubject({value: term})
                           setFigure(figure)
                       }}
                       inputName="SubjectTerm"
            />

            {/* Major term (Predicate of the conclusion) */}
            <TermInput term={predicate}
                       kind="major"
                       letter="P"
                       onTermUpdate={(term) => {
                           predicate.value = term
                           setPredicate({value: term})
                           setFigure(figure)
                       }}
                       inputName="predicateTerm"
            />

            {/* Middle term */}
            <TermInput term={middle}
                       kind="middle"
                       letter="M"
                       onTermUpdate={(term) => {
                           middle.value = term
                           setMiddle({value: term})
                           setFigure(figure)
                       }}
                       inputName="middleTerm"
            />
      </div>
    )
}

interface TermInputProps {
    term: Term;
    kind: string;
    letter: string;
    onTermUpdate: (term: string) => void;
    inputName: string;
}

function TermInput({term, kind, letter, onTermUpdate, inputName}: TermInputProps) {
    const { t } = useTranslation(I18N_NS);

    const _kind = t(`syllogism.term_kind.${kind}`);

    return <>
        <label htmlFor={`basicInput__${inputName}`}>{letter} <small>({_kind})</small></label>
        <input type="text"
               id={`basicInput__${inputName}`}
               name={inputName}
               placeholder={t("input.enter_term", {kind: _kind})}
               value={term.value}
               onChange={(e) => {
                   onTermUpdate(e.target.value);
               }}
        />
    </>;
}

export default SyllogismTerms
