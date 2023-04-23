import {api_with_token} from "./api";
import LocalStorageManager from "./LocalStorageManager";
import {handleError} from 'helpers/api';

export const doLogout = async (history) => {
    try {
        const userID = localStorage.getItem("userID");
        await api_with_token().post('/users/' + userID + "/logout");
        history.push('/login');
        LocalStorageManager.Logout();
    } catch (error) {
        history.push('/login');
        LocalStorageManager.Logout();
        alert(`Logout did not work. \n${handleError(error)}`);
    }
}

export const updateGameStatus = async (gameID, gameObject) => {
    try {
        const response = await api_with_token().get("/games/" + gameID + "/status");
        gameObject.status = response.data.status;
        gameObject.numberOfRoundsToPlay = response.data.numberOfRoundsToPlay;
        gameObject.currentRoundPlayed = response.data.currentRoundPlayed;
        LocalStorageManager.CreateGame(gameObject);
    } catch (error) {
        alert(`Game status cannot be updated. \n${handleError(error)}`);
    }
}

export const doTabCloseLogout = async () => {
    // const handleTabClose = () => {
    //     void doForcedLogout();
    // };
    //
    // window.addEventListener("beforeunload", handleTabClose);
    //
    // return () => {
    //     window.removeEventListener('beforeunload', handleTabClose);
    // };
}