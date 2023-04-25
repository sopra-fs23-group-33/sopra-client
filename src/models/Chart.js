class Chart {
    constructor(data = {}) {
        this.numbers = null;
        this.dates = null;
        this.fromCurrency = null;
        this.toCurrency = null;
        Object.assign(this, data);
    }
}

export default Chart;
