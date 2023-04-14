class Player {
    constructor(data = {}) {
        this.username = null;
        this.playerID = null;
        this.accountBalance = null;
        this.numberOfWonRounds = null;
        this.numberOfLostRounds = null;
        Object.assign(this, data)
    }
}

export default Player;