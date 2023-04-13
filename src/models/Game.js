/**
 * Game model
 */
class Game {
    constructor(data = {}) {
        this.gameID = null;
        this.name = null;
        this.numberOfRoundsPlayed = null;
        this.totalLobbySize = null;
        this.numberOfRoundsToPlay = null;
        this.currentRoundPlayed = null;
        this.gameRounds = null;
        this.players = null;
        this.creator = null;
        this.powerupsActive = null;
        this.eventsActive = null;
        this.timer = null;
        this.gameStatus = null;
        Object.assign(this, data);
    }
}
export default Game;
