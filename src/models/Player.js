class Player {
    constructor(data = {}) {
        this.username = null;
        this.playerID = null;
        this.accountBalance = null;
        this.numberOfWonRounds = null;
        this.numberOfLostRounds = null;
        this.typeOfCurrentBet = null;
        this.outcome = null;
        this.profit = null;
        this.bettingAmount = null;
        Object.assign(this, data);
    }
}

export default Player;