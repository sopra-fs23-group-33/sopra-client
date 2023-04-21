import "styles/_theme.scss";
import React, {useState} from "react";
import FormField from "../ui/FormField";
import 'styles/views/GameStart.scss';
import {MenuItem} from "@mui/material";
import {booleanSelect, gameModes} from "../../helpers/constants";
import SideBarStart from "../ui/GameStart/SideBarStart";
import {useHistory} from "react-router-dom";
import {api_with_token, handleError} from "../../helpers/api";
import Game from "../../models/Game";
import LocalStorageManager from "../../helpers/LocalStorageManager";
import Player from "../../models/Player";


const GameStart = () => {

    const history = useHistory();

    const [creator] = useState(localStorage.getItem("username"));
    const [name, setName] = useState(null);
    const [typeOfGame, setTypeOfGame] = useState(null);
    const [totalLobbySize, setTotalLobbySize] = useState(null);
    const [numberOfRoundsToPlay, setNumberOfRoundsToPlay] = useState(null);
    const [powerupsActive, setPowerupsActive] = useState(null);
    const [eventsActive, setEventsActive] = useState(null);

    const createGameRoom = async () => {
        try {
            // game creation
            const requestBody = JSON.stringify({
                name, typeOfGame, totalLobbySize, numberOfRoundsToPlay, powerupsActive, eventsActive, creator});
            const gameResponse = await api_with_token().post("/games/create", requestBody);
            const game = new Game(gameResponse.data);
            LocalStorageManager.CreateGame(game);
            // player creation
            const creatorResponse = await api_with_token().get("/games/" + game.gameID + "/creator");
            const creator = new Player(creatorResponse.data);
            LocalStorageManager.JoinGame(creator);
            // push to lobby
            history.push("/game/lobby");
        } catch (error) {
            alert(`Something went wrong while creating a new game room: \n${handleError(error)}`);
        }
    }


    return (
        <div className="gs container">
            <SideBarStart
                history={history}
                click = {() => createGameRoom()}
            />
            <div className="gs primary-container">
                <div className="gs secondary-container">
                    <FormField
                        header="Set Game Room Name"
                        id="outlined-required"
                        label="Game Room Name"
                        helperText="At least one alphabetic character."
                        onChange={n => setName(n)}
                    />
                    <FormField
                        header="Set Game Mode"
                        id="outlined-select-gameMode"
                        select="select"
                        label="Select"
                        onChange={n => setTypeOfGame(n)}
                        list={gameModes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    />
                </div>
                <div className="gs secondary-container">
                    <FormField
                        header="Do you want to play with Power-Ups?"
                        id="outlined-select-gameMode"
                        select="select"
                        label="Select"
                        onChange={n => setPowerupsActive(n)}
                        list={booleanSelect.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    />
                    <FormField
                        header="Do you want to play with Events?"
                        id="outlined-select-gameMode"
                        select="select"
                        label="Select"
                        onChange={n => setEventsActive(n)}
                        list={booleanSelect.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    />
                </div>
                <div className="gs secondary-container">
                    <FormField
                        header="Set Maximum Number of Players"
                        id="outlined-number"
                        label="Maximum Number of Players"
                        type="number"
                        inputProps={{ min: 1, max: 8 }}
                        onChange={n => setTotalLobbySize(n)}
                    />
                    <FormField
                        header="Set Maximum Number of Rounds"
                        id="outlined-number"
                        label="Maximum Number of Rounds"
                        type="number"
                        inputProps={{ min: 1, max: 8 }}
                        onChange={n => setNumberOfRoundsToPlay(n)}
                    />
                </div>
            </div>
        </div>
    );
}

export default GameStart;