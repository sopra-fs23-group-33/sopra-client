const LocalStorageManager = {
    UpdateUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    },

    Logout() {
        localStorage.clear();
    },

    CreateGame(game) {
        localStorage.setItem("game", JSON.stringify(game));
        localStorage.setItem("gameID", game.gameID);
        localStorage.setItem("name", game.name);
        localStorage.setItem("status", game.status);
        localStorage.setItem("typeOfGame", game.typeOfGame);
        localStorage.setItem("totalLobbySize", game.totalLobbySize);
        localStorage.setItem("numberOfPlayersInLobby", game.numberOfPlayersInLobby);
        localStorage.setItem("numberOfRoundsToPlay", game.numberOfRoundsToPlay);
        localStorage.setItem("currentRoundPlayed", game.currentRoundPlayed);
        localStorage.setItem("powerupsActive", game.powerupsActive);
        localStorage.setItem("eventsActive", game.eventsActive);
        localStorage.setItem("timer", game.timer);
        localStorage.setItem("creator", game.creator);
    },

    UpdateGame(game) {
        localStorage.setItem("game", JSON.stringify(game));
        localStorage.setItem("currentRoundPlayed", game.currentRoundPlayed);
    },

    JoinGame(player) {
        localStorage.setItem("player", JSON.stringify(player));
    },

    LeaveGame() {
        localStorage.removeItem("game");
        localStorage.removeItem("player");

        localStorage.removeItem("gameID");
        localStorage.removeItem("playerID");
        localStorage.removeItem("name");
        localStorage.removeItem("status");
        localStorage.removeItem("typeOfGame");
        localStorage.removeItem("totalLobbySize");
        localStorage.removeItem("numberOfPlayersInLobby");
        localStorage.removeItem("numberOfRoundsToPlay");
        localStorage.removeItem("currentRoundPlayed");
        localStorage.removeItem("powerupsActive");
        localStorage.removeItem("eventsActive");
        localStorage.removeItem("activatedPowerups");
        localStorage.removeItem("timer");
        localStorage.removeItem("powerups");
        localStorage.removeItem("creator");
        localStorage.removeItem("typeOfCurrentBet");
        localStorage.removeItem("numberOfWonRounds");
        localStorage.removeItem("numberOfLostRounds");
        localStorage.removeItem("accountBalance");
        localStorage.removeItem("occurredEvents");
    },


}

export default LocalStorageManager;