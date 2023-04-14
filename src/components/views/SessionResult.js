import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import * as React from "react";
import Button from "../ui/Button";
import {api_with_token, handleError} from "../../helpers/api";
import {useHistory} from "react-router-dom";

const SessionResult = () => {
    const history = useHistory();

    const goToDashboard = async () => {
        try {
            const username = localStorage.getItem("username");
            const gameID = localStorage.getItem("gameID");
            const requestBody = JSON.stringify({
                username
            })
            await api_with_token().post(`/games/${gameID}/leave`, requestBody);
            history.push("/dashboard");
        } catch (error) {
            console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong when leaving the GameSession.");

        }
    }

    return (
        <div className="BaseContainer">
            <div className="db-primary-container">
                <div className="db-secondary-container">
                    <h2>Session Result</h2>
                    <TableFinalRanking />
                </div>
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