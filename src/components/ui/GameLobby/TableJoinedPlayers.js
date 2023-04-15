import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {handleError, api_with_token} from "../../../helpers/api";
import TableList from "../TableList";
import "styles/_theme.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";

const Player = ({player}) => (
    <tr className="table overview-content row">
        <td className="table overview-content">{player.username}</td>
        <td className="table overview-content">{player.numberOfWonRounds}</td>
        <td className="table overview-content">{player.numberOfLostRounds}</td>
        <td className="table overview-content">{player.accountBalance}</td>
    </tr>
);

Player.propTypes = {
    username: PropTypes.string,
    numberOfWonRounds: PropTypes.string,
    numberOfLostRounds: PropTypes.string,
    accountBalance: PropTypes.string
};

export default function TableJoinedPlayers() {
    const [players, setPlayers] = useState(null);
    const [gameID] = useState(localStorage.getItem("gameID"));

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api_with_token().get("/games/" + gameID + "/players");
                setPlayers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the players: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Something went wrong while fetching the players! See the console for details.");
            }
        }

        fetchData();
    });

    return (
            <div className="table-wrapper table">
                {players ? (
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