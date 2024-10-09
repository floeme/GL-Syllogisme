import SyllogismTerms from "../elements/SyllogismTerms";
import SyllogismPremises from "../elements/SyllogismPremises";
import SyllogismFigures from "../elements/SyllogismFigures";

export const Syllogismes = () => {
  return (
    <div className="syllogism-container">
      <div className="section-terms">
        <SyllogismTerms />
        <SyllogismFigures />
      </div>
      <SyllogismPremises />
    </div>
  );
};

export default Syllogismes;
