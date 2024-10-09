function SyllogismTerms() {
    return (
        <div className="section-figures">
            {/* 4 radio buttons */}
            <input type="radio" name="radioFigure" value="figure1" />
            {/* Image de la figure 1 */}
            <label>Figure 1</label>
            <input type="radio" name="radioFigure" value="figure2" />
            {/* Image de la figure 2 */}
            <label>Figure 2</label>
            <input type="radio" name="radioFigure" value="figure3" />
            {/* Image de la figure 3 */}
            <label>Figure 3</label>
            <input type="radio" name="radioFigure" value="figure4" />
            {/* Image de la figure 4 */}
            <label>Figure 4</label>
      </div>
    )
}

export default SyllogismTerms
