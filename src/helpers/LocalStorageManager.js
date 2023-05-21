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
    },

    UpdateGame(game) {
        localStorage.setItem("game", JSON.stringify(game));
    },

    JoinGame(player) {
        localStorage.setItem("player", JSON.stringify(player));
    },

    LeaveGame() {
        localStorage.removeItem("game");
        localStorage.removeItem("player");
        localStorage.removeItem("gameID");
        localStorage.removeItem("powerups");
        localStorage.removeItem("activatedPowerups");
    },


}

export default LocalStorageManager;