import "styles/_theme.scss";
import React, {useEffect, useState} from "react";
import 'styles/views/GameLobby.scss';
import TableJoinedPlayers from "../ui/GameLobby/TableJoinedPlayers";
import Button from "../ui/Button";
import {api_with_token, handleError} from "../../helpers/api";
import {useHistory} from "react-router-dom";
import Game from "../../models/Game";
import {apiRequestIntervalGameRound} from "../../helpers/apiFetchSpeed";
import {leaveGame} from "../../helpers/Utilities";

const GameLobby = () => {

    const history = useHistory();
    const gameID = localStorage.getItem("gameID");
    const [creator] = useState(localStorage.getItem("creator"));
    const [game, setGame] = useState(new Game());


    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const responseGame = await api_with_token().get("/games/" + gameID + "/status");
                setGame(responseGame.data);
                if (game.status === "BETTING") {
                    history.push("/game/round");
                } else if (game.status === "CORRUPTED") {
                    await leaveGame();
                }
            } catch (error) {
                console.log(error);
            }
        }, apiRequestIntervalGameRound);
        return () => clearInterval(intervalId);
    }, []);



    const startGame = async () => {
        try {
            await api_with_token().post("/games/" + gameID + "/start");
            history.push("/game/round");
        } catch (error) {
            alert(`Game did not start: \n${handleError(error)}`);
        }
    };

    // const leaveGame = async () => {
    //     try {
    //         await api_with_token().post("/games/" + gameID + "/leave", {
    //             gameID: gameID,
    //             userID: localStorage.getItem("userID"),
    //             username: localStorage.getItem("username")
    //         });
    //
    //         history.push("/dashboard");
    //         LocalStorageManager.LeaveGame();
    //     } catch (error) {
    //         LocalStorageManager.LeaveGame();
    //         alert(`Player did not leave: \n${handleError(error)}`);
    //     }
    // };

    let startButton;
    let leaveButton;

    if (creator === localStorage.getItem("username")) {
        startButton =
        <Button
            className="leave-button"
            width="100%"
            onClick={() => startGame()}>
            Start Game
        </Button>

        leaveButton =
        <Button
            className="leave-button"
            width="100%"
            onClick={() => leaveGame(history)}>
            Delete Game Room
        </Button>;
    } else {
        leaveButton =
        <Button
            className="leave-button"
            width="100%"
            onClick={() => leaveGame(history)}>
            Leave Game Room
        </Button>;
    }


    console.log(localStorage.getItem("name"));
    let content;

    if (game.status === "LOBBY") {
        content = <h2>Test</h2>
    }

    return (
        <div className="gl container">
            <div className="gl primary-container">
                <div className="gl secondary-container">
                    <h2>Players in Game Room '{localStorage.getItem("name")}'</h2>
                    <TableJoinedPlayers/>
                    <div className="gl button-container">
                        {startButton}
                        {leaveButton}
                        {game.status}
                    </div>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default GameLobby;