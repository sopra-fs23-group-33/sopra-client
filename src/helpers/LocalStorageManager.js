const LocalStorageManager = {
    LoginRegister(user) {
        localStorage.setItem('userID', user.userID);
        localStorage.setItem('username', user.username);
        localStorage.setItem('status', user.status);
        localStorage.setItem('token', user.token);
        localStorage.setItem('creationDate', user.creationDate);
        localStorage.setItem('totalRoundsPlayed', user.totalRoundsPlayed);
        localStorage.setItem('numberOfBetsWon', user.numberOfBetsWon);
        localStorage.setItem('numberOfBetsLost', user.numberOfBetsLost);
        localStorage.setItem('rank', user.rank);
        localStorage.setItem('winRate', user.winRate);
        localStorage.setItem('profit', user.profit);
    },

    Logout() {
        localStorage.clear();
    },

    CreateGame(game) {
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
        localStorage.setItem("currentRoundPlayed", game.currentRoundPlayed);
    },

    JoinGame(player) {
        localStorage.setItem("username", player.username);
        localStorage.setItem("playerID", player.playerID);
        localStorage.setItem("accountBalance", player.accountBalance);
        localStorage.setItem("numberOfWonRounds", player.numberOfWonRounds);
        localStorage.setItem("numberOfLostRounds", player.numberOfLostRounds);
        localStorage.setItem("typeOfCurrentBet", player.typeOfCurrentBet);
    },

    LeaveGame() {
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