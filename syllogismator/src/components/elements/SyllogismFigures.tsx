interface SyllogismFigureProps {
    setFigure: (value: string) => void;
}

function SyllogismTerms({ setFigure }: SyllogismFigureProps) {
    return (
        <div className="section-figures">
            {/* FIGURE 1 */}
            <div className="figure">
                <label>Figure 1</label>
                <img src="/images/figure1.png" alt="Figure 1" />
                <input type="radio"
                    name="radioFigure"
                    value="figure1"
                    onChange={(e) => setFigure(e.target.value)}
                />
            </div>

            {/* FIGURE 2 */}
            <div className="figure">
                <label>Figure 2</label>
                <img src="/images/figure2.png" alt="Figure 2" />
                <input type="radio"
                    name="radioFigure"
                    value="figure2"
                    onChange={(e) => setFigure(e.target.value)}
                />
            </div>

            {/* FIGURE 3 */}
            <div className="figure">
                <label>Figure 3</label>
                <img src="/images/figure3.png" alt="Figure 3" />
                <input type="radio"
                    name="radioFigure"
                    value="figure3"
                    onChange={(e) => setFigure(e.target.value)}
                />
            </div>

            {/* FIGURE 4 */}
            <div className="figure">
                <label>Figure 4</label>
                <img src="/images/figure4.png" alt="Figure 4" />
                <input type="radio"
                    name="radioFigure"
                    value="figure4"
                    onChange={(e) => setFigure(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SyllogismTerms
