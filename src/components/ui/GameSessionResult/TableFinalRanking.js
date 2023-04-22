import {api_with_token, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import TableList from "../TableList";

const Player = ({player}) => (
    <tr className="table user-overview row">
        <td className="table user-overview">RANK</td> // TODO
        <td className="table user-overview">{player.username}</td>
        <td className="table user-overview">{player.accountBalance}</td>
        <td className="table user-overview">{player.numberOfBetsWon}</td>
        <td className="table user-overview">{player.numberOfBetsLost}</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object
};
const TableFinalRanking = () => {
    const [players, setPlayers] = useState(null);
    const [gameID] = useState(localStorage.getItem("gameID"));

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const response = await api_with_token().get("/games/" + gameID + "/players");
                setPlayers(response.data);

            } catch (error) {
                console.error(`Error while fetching the players: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Error while fetching the players.");
            }
        }
        fetchPlayers();
    });

    return (
        <div className="table-wrapper table">
            {players ? (
                <TableList>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Balance</th>
                        <th>Rounds Won</th>
                        <th>Rounds Lost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map(player => (
                        <Player user={player} key={player.accountBalance} />
                    ))}
                    </tbody>
                </TableList>
            ) : (
                <p>Loading players...</p>
            )}
        </div>
    );

}

export default TableFinalRanking;