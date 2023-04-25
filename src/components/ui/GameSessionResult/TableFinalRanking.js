import {api_with_token, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import TableList from "../TableList";

const Player = ({ rank, player }) => (
    <tr className="table overview-content row">
        <td className="table overview-content">{rank}</td>
        <td className="table overview-content">{player.username}</td>
        <td className="table overview-content">{player.accountBalance}</td>
        <td className="table overview-content">{player.numberOfWonRounds}</td>
        <td className="table overview-content">{player.numberOfLostRounds}</td>
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
                const sortedPlayers = response.data.sort((a, b) => b.accountBalance - a.accountBalance);
                setPlayers(sortedPlayers);
                console.log(sortedPlayers);
            } catch (error) {
                console.error(`Error while fetching the players: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Error while fetching the players.");
            }
        }
        fetchPlayers();
    }, []);


    return (
        <div className="table-wrapper table final-ranking">
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
                    {players.map((player, index) => (
                        <Player rank={index + 1} player={player} key={player.accountBalance} />
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