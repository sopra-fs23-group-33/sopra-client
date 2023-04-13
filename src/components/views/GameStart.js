import "styles/_theme.scss";
import React, {useState} from "react";
import FormField from "../ui/GameLobby/FormField";
import 'styles/views/GameLobby.scss';
import {MenuItem} from "@mui/material";
import {booleanSelect, gameModes} from "../../helpers/constants";
import SideBarLobby from "../ui/GameLobby/SideBarLobby";
import {useHistory} from "react-router-dom";
import {api_with_token, handleError} from "../../helpers/api";
import Game from "../../models/Game";
import Button from "../ui/Button";





const GameStart = () => {

    const history = useHistory();
    const [name, setName] = useState(null);
    const [typeOfGame, setTypeOfGame] = useState(null);
    const [totalLobbySize, setTotalLobbySize] = useState(null);
    const [numberOfRoundsToPlay, setNumberOfRoundsToPlay] = useState(null);
    const [powerupsActive, setPowerupsActive] = useState(null);
    const [eventsActive, setEventsActive] = useState(null);
    const [creator, setCreator] = useState(null);

    const createGameRoom = async () => {
        try {
            setCreator(localStorage.getItem("username"));
            console.log(creator);
            const requestBody = JSON.stringify({name, typeOfGame, totalLobbySize, numberOfRoundsToPlay,
                powerupsActive, eventsActive, creator});
            const response = await api_with_token().post("/games/create", requestBody);

            const game = new Game(response.data);

            alert(`Success!`);
        } catch (error) {
            console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
            console.error("Details: ", error);
            alert(`Game Room not created.`);
        }
    }


    return (
        <div className="BaseContainer">
            <SideBarLobby/>
            <div className="primary-container">
                <div className="secondary-container">
                    <Button
                        onClick={() => createGameRoom()}
                    >
                    Create
                    </Button>
                    <FormField
                        header="Set Game Room Name"
                        id="outlined-required"
                        label="Game Room Name"
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
                <div className="secondary-container">
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
                <div className="secondary-container">
                    <FormField
                        header="Set Maximum Number of Players"
                        id="outlined-number"
                        label="Maximum Number of Players"
                        type="number"
                        onChange={n => setTotalLobbySize(n)}
                    />
                    <FormField
                        header="Set Maximum Number of Rounds"
                        id="outlined-number"
                        label="Maximum Number of Rounds"
                        type="number"
                        onChange={n => setNumberOfRoundsToPlay(n)}
                    />
                </div>
            </div>
        </div>
    );
}

export default GameStart;