class Game {
    constructor(data = {}) {
        this.gameID = null;
        this.name = null;
        this.status = null;
        this.typeOfGame = null;
        this.totalLobbySize = null;
        this.numberOfPlayersInLobby = null;
        this.numberOfRoundsToPlay = null;
        this.currentRoundPlayed = null;
        this.powerupsActive = null;
        this.eventsActive = null;
        this.timer = null;
        this.creator = null;
        Object.assign(this, data);
    }
}
export default Game;
