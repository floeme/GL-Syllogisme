import { Term } from "../../../../model/Term"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";

interface SyllogismTermsProps {
    subject: Term
    setSubject: (value: Term) => void
    middle: Term
    setMiddle: (value: Term) => void
    predicate: Term
    setPredicate: (value: Term) => void
}

function SyllogismTerms({
    subject, setSubject,
    middle, setMiddle,
    predicate, setPredicate
}: SyllogismTermsProps) {
    return (
        <div className="section-terms-input">
            {/* Minor term (Subject of the conclusion) */}
            <TermInput term={subject}
                       kind="minor"
                       letter="S"
                       onTermUpdate={(term) => {
                           setSubject({...term});
                       }}
                       inputName="SubjectTerm"
            />

            {/* Major term (Predicate of the conclusion) */}
            <TermInput term={predicate}
                       kind="major"
                       letter="P"
                       onTermUpdate={(term) => {
                           setPredicate({...term});
                       }}
                       inputName="predicateTerm"
            />

            {/* Middle term */}
            <TermInput term={middle}
                       kind="middle"
                       letter="M"
                       onTermUpdate={(term) => {
                           setMiddle({...term});
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
    onTermUpdate: (term: Term) => void;
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
                   term.value = e.target.value;
                   onTermUpdate(term);
               }}
        />
    </>;
}

export default SyllogismTerms
