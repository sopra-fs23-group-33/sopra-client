/**
 * User model
 */
class User {
    constructor(data = {}) {
        this.userID = null;
        this.username = null;
        this.status = null;
        this.token = null;
        this.creationDate = null;
        this.totalRoundsPlayed = null;
        this.numberOfBetsWon = null;
        this.numberOfBetsLost = null;
        this.rank = null;
        this.winRate = null;
        Object.assign(this, data);
    }
}

export default User;
