import "styles/_theme.scss";
import React, {useState} from "react";
import 'styles/views/GameLobby.scss';
import TableJoinedPlayers from "../ui/GameLobby/TableJoinedPlayers";
import Button from "../ui/Button";
import {api_with_token, handleError} from "../../helpers/api";
import {useHistory} from "react-router-dom";

const GameLobby = () => {

    const [gameID] = useState(localStorage.getItem("gameID"));
    const history = useHistory();

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

            history.push("/dashboard");
        } catch (error) {
            alert(`Player did not leave: \n${handleError(error)}`);
        }
    };

    return (
        <div className="gl-base-container">
            <div className="gl-primary-container">
                <div className="gl-secondary-container">
                    <h2>Players in Game Room</h2>

                    <TableJoinedPlayers/>
                    <div className="gl button-container">
                        <Button
                            width="100%"
                            onClick={() => startGame()}>
                            Start Game
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => leaveGame()}>
                            Delete Game Room
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;