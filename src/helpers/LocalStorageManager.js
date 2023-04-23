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
        localStorage.removeItem("creator");
    },


}

export default LocalStorageManager;