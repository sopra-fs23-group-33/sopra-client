import {api_with_token, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import TableList from "../TableList";

const Player = ({ rank, player, highlighted }) => (
    <tr className={`table overview-content ${highlighted ? "highlighted-row" : "row"}`}>
        <td className="table overview-content fiveColumns">{rank}</td>
        <td className="table overview-content fiveColumns">{player.username}</td>
        <td className="table overview-content fiveColumns">{player.numberOfWonRounds}</td>
        <td className="table overview-content fiveColumns">{player.numberOfLostRounds}</td>
        <td className="table overview-content fiveColumns">{player.accountBalance}</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object
};

const TableFinalRanking = () => {
    const [players, setPlayers] = useState(null);
    const [gameID] = useState(localStorage.getItem("gameID"));
    const highlightedUsername = localStorage.getItem("username");

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
                // alert("Error while fetching the players.");
            }
        }
        fetchPlayers();
    }, []);


    return (
        <div className="table-wrapper table final-ranking session-result">
            {players ? (
                <TableList>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Rounds Won</th>
                        <th>Rounds Lost</th>
                        <th>Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player, index) => (
                        <Player
                            rank={index + 1}
                            player={player}
                            key={player.accountBalance}
                            highlighted={player.username === highlightedUsername}
                        />
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