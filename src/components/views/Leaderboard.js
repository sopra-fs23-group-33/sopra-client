import Button from "../ui/Button";
import * as React from "react";
import {api_with_token, handleError} from "../../helpers/api";
import {useEffect, useState} from "react";
import TableList from "../ui/TableList";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

const Player = ({user}) => (
    <tr className="table overview-content row">
        <td className="table overview-content">{user.rank}</td>
        <td className="table overview-content">{user.username}</td>
        <td className="table overview-content">{user.accountBalance}</td>
        <td className="table overview-content">{user.numberOfBetsWon}</td>
        <td className="table overview-content">{user.numberOfBetsLost}</td>
        <td className="table overview-content">{user.winRate}</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object
};

const Leaderboard = () => {
    const history = useHistory();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await api_with_token().get("/users/leaderboard");
                setUsers(response.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the leaderboard: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Something went wrong while fetching the leaderboard! See the console for details.");
            }
        }
        fetchLeaderboard();
    });



    return (
        <div className="db container">
            <div className="db primary-container">
                <div className="db secondary-container">
                    <h1>Leaderboard</h1>
                    <div className="table-wrapper table">
                        {users ? (
                            <TableList>
                                <thead>
                                <tr>
                                    <th>Ranking</th>
                                    <th>Username</th>
                                    <th>Balance</th>
                                    <th>Rounds Won</th>
                                    <th>Rounds Lost</th>
                                    <th>Win Rate</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map(user => (
                                    <Player user={user} key={user.rank} />
                                ))}
                                </tbody>
                            </TableList>
                        ) : (
                            <p>Loading Leaderboard...</p>
                        )}
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <Button
                            width="100%"
                            onClick={() => history.push("/dashboard")}>
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Leaderboard;