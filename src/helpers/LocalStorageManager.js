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
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        localStorage.removeItem('status');
        localStorage.removeItem('token');
        localStorage.removeItem('creationDate');
        localStorage.removeItem('totalRoundsPlayed');
        localStorage.removeItem('numberOfBetsWon');
        localStorage.removeItem('numberOfBetsLost');
        localStorage.removeItem('rank');
        localStorage.removeItem('winRate');
    },

    CreateGame(game) {
        localStorage.setItem("gameID", game.gameID);
        localStorage.setItem("creator", game.creator);
    },

    LeaveGame() {
        localStorage.removeItem("gameID");
        localStorage.removeItem("creator");
    },


}

export default LocalStorageManager;