import 'styles/ui/SideBar.scss';
import Button from "../Button";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {api, handleError} from "../../../helpers/api";
import User from "../../../models/User";
import Game from "../../../models/Game";


const SideBarLobby = () => {

    const history = useHistory();
    const [roomName, setRoomName] = useState(null);
    const [gameMode, setGameMode] = useState(null);
    const [powerUps, setPowerUps] = useState(null);
    const [events, setEvents] = useState(null);
    const [maxPlayer, setMaxPlayer] = useState(null);
    const [maxRound, setMaxRound] = useState(null);

    const createGameRoom = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.post("/users/register", requestBody);

            const game = new Game(response.data);

            history.push("/game/lobby");
        } catch (error) {

        }
    }

    return (
        <div className="SideBar">
            <h2>Game Lobby</h2>
            <ul className="SideBarList">
                <li className="SideBarList row">
                    <Button className="SideBarButton">
                        Create Game Room
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button className="SideBarButton">
                        Back to Dashboard
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button className="SideBarButton">
                        Rulebook
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button className="SideBarButton">
                        About
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default SideBarLobby;