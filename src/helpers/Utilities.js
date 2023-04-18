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

export const doForcedLogout = async () => {
    try {
        const userID = localStorage.getItem("userID");
        await api_with_token().post('/users/' + userID + "/logout");
        LocalStorageManager.Logout();
    } catch (error) {
        LocalStorageManager.Logout();
    }
}

export const doTabCloseLogout = async () => {
        const handleTabClose = () => {
            void doForcedLogout();
        };

        window.addEventListener("beforeunload", handleTabClose);

        return () => {
            window.removeEventListener('beforeunload', handleTabClose);
        };
}