import "styles/_theme.scss";
import React, {useState} from "react";
import 'styles/views/GameStart.scss';
import SideBarStart from "../ui/GameStart/SideBarStart";
import {useHistory} from "react-router-dom";
import {api_with_token, handleError} from "../../helpers/api";
import Game from "../../models/Game";
import LocalStorageManager from "../../helpers/LocalStorageManager";
import Player from "../../models/Player";
import "styles/views/Dashboard.scss";
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';

const GameStart = () => {

    const history = useHistory();

    const [creator] = useState(localStorage.getItem("username"));
    const [name, setName] = useState("");
    const [typeOfGame, setTypeOfGame] = useState("MULTIPLAYER");
    const [totalLobbySize, setTotalLobbySize] = useState(4);
    const [numberOfRoundsToPlay, setNumberOfRoundsToPlay] = useState(5);
    const [powerupsActive, setPowerupsActive] = useState(false);
    const [eventsActive, setEventsActive] = useState(false);

    const createGameRoom = async () => {
        try {
            // game creation
            console.log(creator);
            const requestBody = JSON.stringify({
                name, typeOfGame, totalLobbySize, numberOfRoundsToPlay, powerupsActive, eventsActive, creator});
            const gameResponse = await api_with_token().post("/games/create", requestBody);
            const game = new Game(gameResponse.data);
            LocalStorageManager.CreateGame(game);
            // player creation
            const creatorResponse = await api_with_token().get("/games/" + game.gameID + "/creator");
            const player = new Player(creatorResponse.data);
            LocalStorageManager.JoinGame(player);
            // push to lobby
            history.push("/game/lobby");
        } catch (error) {
            alert(`Something went wrong while creating a new game room: \n${handleError(error)}`);
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleTypeOfGameChange = (event) => {
        setTypeOfGame(event.target.checked ? "SINGLEPLAYER" : "MULTIPLAYER");
        if (typeOfGame === "MULTIPLAYER") {
            setTotalLobbySize(1);
        } else {
            setTotalLobbySize(4);
        }
    };
    const handleTotalLobbySizeChange = (event, value) => {
        setTotalLobbySize(value);
    };
    const handleNumberOfRoundsToPlayChange = (event, value) => {
        setNumberOfRoundsToPlay(value);
    };
    const handlePowerupsActiveChange = (event) => {
        setPowerupsActive(event.target.checked);
    };
    const handleEventsActiveChange = (event) => {
        setEventsActive(event.target.checked);
    };
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };


    return (
        <div className="db container">
            <SideBarStart
                history={history}
                click = {() => createGameRoom()}
            />
            <div className="gs primary-container">
                <div className="gs secondary-container">
                    <form onSubmit={createGameRoom}>
                        <div className="form-group">
                            <h3>Game Room Name</h3>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <Switch
                                    className="switch"
                                    {...label}
                                    id="typeOfGame"
                                    checked={typeOfGame === "SINGLEPLAYER"}
                                    onChange={handleTypeOfGameChange}
                                    defaultChecked
                                />
                                <h3 className="form-check-label">
                                    Singleplayer Mode
                                </h3>
                            </div>
                        </div>
                        <div className="form-group">
                            <h3>Max Lobby Size</h3>
                            <Slider
                                className="slider"
                                id="total-lobby-size"
                                value={totalLobbySize}
                                defaultValue={4}
                                min={1}
                                max={8}
                                step={1}
                                onChange={handleTotalLobbySizeChange}
                                valueLabelDisplay="on"
                                aria-label="Temperature"
                            />
                        </div>
                        <div className="form-group">
                            <h3>Number of Rounds</h3>
                            <Slider
                                className="slider"
                                id="number-of-rounds"
                                value={numberOfRoundsToPlay}
                                defaultValue={4}
                                min={1}
                                max={8}
                                step={1}
                                onChange={handleNumberOfRoundsToPlayChange}
                                valueLabelDisplay="on"
                                aria-label="Temperature"
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <Switch
                                    className="switch"
                                    {...label}
                                    id="powerupsActive"
                                    checked={powerupsActive}
                                    onChange={handlePowerupsActiveChange}
                                />
                                <h3 className="form-check-label">
                                    Enable Powerups
                                </h3>
                            </div>
                            <div className="form-check">
                                <Switch
                                    className="switch"
                                    {...label}
                                    id="eventsActive"
                                    checked={eventsActive}
                                    onChange={handleEventsActiveChange}
                                />
                                <h3 className="form-check-label">
                                    Enable Events
                                </h3>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GameStart;