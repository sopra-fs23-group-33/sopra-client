class Result {
    constructor(data = {}) {
        this.outcome = null;
        this.bettingAmount = null;
        this.profit = null;
        Object.assign(this, data);
    }
}

export default Result;