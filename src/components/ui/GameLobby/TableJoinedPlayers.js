import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {handleError, api_with_token} from "../../../helpers/api";
import TableList from "../TableList";
import "styles/_theme.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import "styles/ui/TableContainer.scss";

const Player = ({user}) => (
    <tr className="table user-overview row">
        <td className="table user-overview id">{user.userID}</td>
        <td className="table user-overview username">{user.username}</td>
        <td className="table user-overview status">{user.state}</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object
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
        <div className="table-container">
            <h2>Players in Lobby</h2>
            <div className="table-wrapper table">
                {players ? (
                    <TableList>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {players.map(user => (
                            <Player user={user} key={user.userID} />
                        ))}
                        </tbody>
                    </TableList>
                ) : (
                    <p>Loading Players...</p>
                )}
            </div>

        </div>
    );
}