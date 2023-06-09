import {api_with_token} from "./api";
import LocalStorageManager from "./LocalStorageManager";
import {handleError} from 'helpers/api';

export const doLogout = async (history) => {
    try {
        const userID = JSON.parse(localStorage.getItem("user"))?.userID;
        await api_with_token().post('/users/' + userID + "/logout");
        LocalStorageManager.Logout();
        history.push('/login');
    } catch (error) {
        console.error(`Error while logging out: \n${handleError(error)}`);
        console.error("Details:", error);
        history.push('/login');
        LocalStorageManager.Logout();
        // alert(`Logout did not work. \n${handleError(error)}`);
    }
}

export const leaveGame = async (history) => {
    try {
        const username = JSON.parse(localStorage.getItem("user"))?.username;
        const gameID = JSON.parse(localStorage.getItem("game"))?.gameID;
        const requestBody = JSON.stringify({
            username
        })
        await api_with_token().post("/games/" + gameID + "/leave", requestBody);
        history.push("/dashboard");
        LocalStorageManager.LeaveGame();

    } catch (error) {
        console.error(`Error while leaving the GameSession: \n${handleError(error)}`);
        console.error("Details:", error);
        // alert("Error while leaving the GameSession.");
        history.push("/dashboard");
        LocalStorageManager.LeaveGame();
    }
}
