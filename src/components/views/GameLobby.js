import "styles/_theme.scss";
import React, {useState} from "react";
import 'styles/views/GameLobby.scss';
import TableJoinedPlayers from "../ui/GameLobby/TableJoinedPlayers";
import Button from "../ui/Button";
import {api_with_token, handleError} from "../../helpers/api";
import {useHistory} from "react-router-dom";
import LocalStorageManager from "../../helpers/LocalStorageManager";

const GameLobby = () => {

    const history = useHistory();
    const [gameID] = useState(localStorage.getItem("gameID"));
    const [creator] = useState(localStorage.getItem("creator"));

    const startGame = async () => {
        try {
            await api_with_token().post("/games/" + gameID + "/start");
            alert("Game started successfully.");
        } catch (error) {
            alert(`Game did not start: \n${handleError(error)}`);
        }
    };

    const leaveGame = async () => {
        try {
            await api_with_token().post("/games/" + gameID + "/leave", {
                gameID: gameID,
                userID: localStorage.getItem("userID"),
                username: localStorage.getItem("username")
            });

            LocalStorageManager.LeaveGame();
            history.push("/dashboard");
        } catch (error) {
            LocalStorageManager.LeaveGame();
            alert(`Player did not leave: \n${handleError(error)}`);
        }
    };

    let startButton;
    let leaveButton;

    if (creator === localStorage.getItem("username")) {
        startButton =
        <Button
            width="100%"
            onClick={() => startGame()}>
            Start Game
        </Button>
        leaveButton =
        <Button
            width="100%"
            onClick={() => leaveGame()}>
            Delete Game Room
        </Button>;
    } else {
        leaveButton =
        <Button
            width="100%"
            onClick={() => leaveGame()}>
            Leave Game Room
        </Button>;
    }

    return (
        <div className="gl container">
            <div className="gl primary-container">
                <div className="gl secondary-container">
                    <h2>Players in Game Room</h2>
                    <TableJoinedPlayers/>
                    <div className="gl button-container">
                        {startButton}
                        {leaveButton}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;