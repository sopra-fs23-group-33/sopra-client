import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {handleError, api_with_token} from "../../../helpers/api";
import TableList from "../TableList";
import "styles/_theme.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import "styles/ui/TableContainer.scss";
import Button from "../Button";
import * as React from "react";
import Player from 'models/User';
import localStorageManager from "../../../helpers/LocalStorageManager";

const Game = ({game}) => {

    const history = useHistory();

    const joinGame = async () => {
        try {
            const response = await api_with_token().post(`/games/${game.gameID}/join`, {
                gameID: game.gameID,
                userID: localStorage.getItem("userID"),
                username: localStorage.getItem("username"),
            });
            const player = new Player(response.data);
            localStorageManager.JoinGame(player);
            localStorageManager.CreateGame(game);
            history.push("/game/lobby");
        } catch (error) {
            console.error(`Failed to join game ${game.gameID}: ${handleError(error)}`);
            alert(`Failed to join game ${game.gameID}: ${handleError(error)}`);
        }
    };
    return (
        <tr className="table overview-content row">
            <td className="table overview-content">{game.gameID}</td>
            <td className="table overview-content">{game.name}</td>
            <td className="table overview-content">{game.creator}</td>
            <td className="table overview-content">{game.totalLobbySize}</td>
            <td className="table overview-content">{game.numberOfRoundsToPlay}</td>
            <td><Button
                className="primary-button join-button"
                onClick={joinGame}
                disabled={game.totalLobbySize === 1}
            >
                Join
            </Button></td>
        </tr>
    );

};

Game.propTypes = {
    game: PropTypes.object
};


export default function GameLobbyOverview() {
    // const history = useHistory();
    const [games, setGames] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await api_with_token().get('/games');
                setGames(response.data);
            } catch (error) {
                console.error(`Error while fetching Games in Dashboard: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Error while fetching Games in Dashboard.");
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="table-wrapper table">
            {games && games.length > 0 ? (
                <TableList>
                    <thead>
                        <tr>
                            <th>Game ID</th>
                            <th>Lobby Name</th>
                            <th>Creator</th>
                            <th>Size</th>
                            <th>Rounds</th>
                            <th>Join Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map(game => (
                            <Game game={game} key={game.gameID}/>
                        ))}
                    </tbody>
                </TableList>
            ) : (
                <p>No available games...</p>
            )}
        </div>

    );
}
