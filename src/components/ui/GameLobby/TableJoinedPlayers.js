import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {handleError, api_with_token} from "../../../helpers/api";
import TableList from "../TableList";
import "styles/_theme.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import {apiRequestIntervalGameLobbyJoinedUsers} from "../../../helpers/apiFetchSpeed";

const Player = ({player}) => (
    <tr className="table overview-content row">
        <td className="table overview-content fourColumns">{player.username}</td>
        <td className="table overview-content fourColumns">{player.numberOfWonRounds}</td>
        <td className="table overview-content fourColumns">{player.numberOfLostRounds}</td>
        <td className="table overview-content fourColumns">{player.accountBalance}</td>
    </tr>
);

Player.propTypes = {
    username: PropTypes.string,
    numberOfWonRounds: PropTypes.string,
    numberOfLostRounds: PropTypes.string,
    accountBalance: PropTypes.string
};

export default function TableJoinedPlayers() {
    const [players, setPlayers] = useState([]);
    const [gameID] = useState(localStorage.getItem("gameID"));

    useEffect(() => {
        const fetchJoinedUsers = async () => {
            try {
                const response = await api_with_token().get("/games/" + gameID + "/players");
                setPlayers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the players: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Something went wrong while fetching the players! See the console for details.");
            }
        };

        fetchJoinedUsers();
        const intervalId = setInterval(fetchJoinedUsers, apiRequestIntervalGameLobbyJoinedUsers);

        return () => clearInterval(intervalId);
    }, []);

    const numPlayers = players.length;

    return (
        <div className="table-wrapper table">
            <h3 className="gameLobby">Total Rounds: {localStorage.getItem("numberOfRoundsToPlay")}</h3>
            <h3 className="gameLobby">Joined Players: {numPlayers}/{localStorage.getItem("totalLobbySize")}</h3>
            {numPlayers > 0 ? (
                <TableList>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Wins</th>
                        <th>Defeats</th>
                        <th>Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map(player => (
                        <Player player={player} key={player.username} />
                    ))}
                    </tbody>
                </TableList>
            ) : (
                <p>Loading Players...</p>
            )}
        </div>
);
}