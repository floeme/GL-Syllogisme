function SyllogismMP() {
    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <select>
                        <option>All</option>
                        <option>Some</option>
                        <option>No</option>
                    </select>
                </div>

                <div className="subject">
                    <label>Humans</label>
                </div>

                <div className="verb">
                    <label>are</label>
                </div>

                <div className="predicate">
                    <label>Mortal</label>
                </div>
            </div>
        </div>
    );
}

export default SyllogismMP;
