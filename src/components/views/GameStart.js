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
import "styles/views/Dashboard.scss";
import Button from "../ui/Button";
import { Slider } from "@material-ui/core";

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
                            <label htmlFor="name">Game Room Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="typeOfGame">Type of Game</label>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="typeOfGame"
                                    checked={typeOfGame === "SINGLEPLAYER"}
                                    onChange={handleTypeOfGameChange}
                                />
                                <label className="form-check-label" htmlFor="typeOfGame">
                                    Singleplayer Mode
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="total-lobby-size">Max Lobby Size</label>
                            <Slider
                                id="total-lobby-size"
                                value={totalLobbySize}
                                min={1}
                                max={8}
                                step={1}
                                onChange={handleTotalLobbySizeChange}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number-of-rounds">Number of Rounds</label>
                            <Slider
                                id="number-of-rounds"
                                value={numberOfRoundsToPlay}
                                min={1}
                                max={8}
                                step={1}
                                onChange={handleNumberOfRoundsToPlayChange}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="powerupsActive"
                                    checked={powerupsActive}
                                    onChange={handlePowerupsActiveChange}
                                />
                                <label className="form-check-label" htmlFor="powerupsActive">
                                    Enable Powerups
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="eventsActive"
                                    checked={eventsActive}
                                    onChange={handleEventsActiveChange}
                                />
                                <label className="form-check-label" htmlFor="eventsActive">
                                    Enable Events
                                </label>
                            </div>
                        </div>
                        <Button type="submit" className="btn btn-primary">
                            Create Game Room
                        </Button>
                    </form>
                </div>




                {/*<div className="gs secondary-container">*/}
                    {/*    <FormField*/}
                    {/*        header="Set Game Room Name"*/}
                    {/*        id="outlined-required"*/}
                    {/*        label="Game Room Name"*/}
                    {/*        helperText="At least one alphabetic character."*/}
                    {/*        onChange={n => setName(n)}*/}
                    {/*    />*/}
                    {/*    <FormField*/}
                    {/*        header="Set Game Mode"*/}
                    {/*        id="outlined-select-gameMode"*/}
                    {/*        select="select"*/}
                    {/*        label="Select"*/}
                    {/*        onChange={n => setTypeOfGame(n)}*/}
                    {/*        list={gameModes.map((option) => (*/}
                    {/*            <MenuItem key={option.value} value={option.value}>*/}
                    {/*                {option.label}*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="gs secondary-container">*/}
                    {/*    <FormField*/}
                    {/*        header="Do you want to play with Power-Ups?"*/}
                    {/*        id="outlined-select-gameMode"*/}
                    {/*        select="select"*/}
                    {/*        label="Select"*/}
                    {/*        onChange={n => setPowerupsActive(n)}*/}
                    {/*        list={booleanSelect.map((option) => (*/}
                    {/*            <MenuItem key={option.value} value={option.value}>*/}
                    {/*                {option.label}*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    />*/}
                    {/*    <FormField*/}
                    {/*        header="Do you want to play with Events?"*/}
                    {/*        id="outlined-select-gameMode"*/}
                    {/*        select="select"*/}
                    {/*        label="Select"*/}
                    {/*        onChange={n => setEventsActive(n)}*/}
                    {/*        list={booleanSelect.map((option) => (*/}
                    {/*            <MenuItem key={option.value} value={option.value}>*/}
                    {/*                {option.label}*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="gs secondary-container">*/}
                    {/*    <FormField*/}
                    {/*        header="Set Maximum Number of Players"*/}
                    {/*        id="outlined-number"*/}
                    {/*        label="Maximum Number of Players"*/}
                    {/*        type="number"*/}
                    {/*        inputProps={{ min: 1, max: 8 }}*/}
                    {/*        onChange={n => setTotalLobbySize(n)}*/}
                    {/*    />*/}
                    {/*    <FormField*/}
                    {/*        header="Set Maximum Number of Rounds"*/}
                    {/*        id="outlined-number"*/}
                    {/*        label="Maximum Number of Rounds"*/}
                    {/*        type="number"*/}
                    {/*        inputProps={{ min: 1, max: 8 }}*/}
                    {/*        onChange={n => setNumberOfRoundsToPlay(n)}*/}
                    {/*    />*/}
                    {/*</div>*/}
            </div>
        </div>
    );
}

export default GameStart;