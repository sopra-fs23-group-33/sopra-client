import Button from "../ui/Button";
import * as React from "react";
import {api_with_token, handleError} from "../../helpers/api";
import {useEffect, useState} from "react";
import TableList from "../ui/TableList";
import PropTypes from "prop-types";


const Player = ({player}) => (
    <tr className="table user-overview row">
        <td className="table user-overview">{player.rank}</td>
        <td className="table user-overview">{player.username}</td>
        <td className="table user-overview">{player.accountBalance}</td>
        <td className="table user-overview">{player.numberOfBetsWon}</td>
        <td className="table user-overview">{player.numberOfBetsLost}</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object
};

const Leaderboard = () => {
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await api_with_token().get("/users/leaderboard");
                setPlayers(response.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the leaderboard: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Something went wrong while fetching the leaderboard! See the console for details.");
            }
        }
        fetchLeaderboard();
    });



    return (
        <div className="table-wrapper table">
            {players ? (
                <TableList>
                    <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Username</th>
                        <th>Balance</th>
                        <th>Rounds Won</th>
                        <th>Rounds Lost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map(player => (
                        <Player user={player} key={player.rank} />
                    ))}
                    </tbody>
                </TableList>
            ) : (
                <p>Loading Leaderboard...</p>
            )}
        </div>
    );
}

export default Leaderboard;