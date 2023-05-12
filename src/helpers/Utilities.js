import {api_with_token} from "./api";
import LocalStorageManager from "./LocalStorageManager";
import {handleError} from 'helpers/api';

export const doLogout = async (history) => {
    try {
        const userID = localStorage.getItem("userID");
        await api_with_token().post('/users/' + userID + "/logout");
        LocalStorageManager.Logout();
        history.push('/login');
    } catch (error) {
        history.push('/login');
        LocalStorageManager.Logout();
        alert(`Logout did not work. \n${handleError(error)}`);
    }
}

export const leaveGame = async (history) => {
    try {
        const username = localStorage.getItem("username");
        const gameID = localStorage.getItem("gameID");
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
