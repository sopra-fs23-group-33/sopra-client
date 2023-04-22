import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import * as React from "react";
import Button from "../ui/Button";
import {api_with_token, handleError} from "../../helpers/api";
import {useHistory} from "react-router-dom";
import LocalStorageManager from "../../helpers/LocalStorageManager";

const SessionResult = () => {
    const history = useHistory();

    const goToDashboard = async () => {
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
            alert("Error while leaving the GameSession.");

        }
    }

    return (
        <div className="db primary-container">
            <div className="db secondary-container">
                <h2>Session Result</h2>
                <TableFinalRanking />
                <br/>
                <Button
                    className="SideBarButton"
                    onClick={() => goToDashboard()}>
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );
}

export default SessionResult;