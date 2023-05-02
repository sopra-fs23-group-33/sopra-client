import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { handleError, api_with_token } from "../../../helpers/api";
import TableList from "../TableList";
import "styles/_theme.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import "styles/ui/TableContainer.scss";
import {apiRequestIntervalNormal} from "../../../helpers/apiFetchSpeed";

const Player = ({ user }) => (
    <tr className="table overview-content row">
        <td className="table overview-content">{user.username}</td>
        <td className="table overview-content">{user.totalRoundsPlayed}</td>
        <td className="table overview-content">{(user.winRate * 100).toFixed(2)}%</td>
        <td className="table overview-content">{user.status}</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object
};


export default function TableUserOverview() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api_with_token().get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error(`Error while fetching Users in Dashboard: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Error while fetching Users in Dashboard.");
            }
        };

        fetchUsers();
        const intervalId = setInterval(fetchUsers, apiRequestIntervalNormal);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="table-wrapper table">
            {users ? (
                <TableList>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Total Rounds Played</th>
                        <th>Win-Rate</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <Player user={user} key={user.userID} />
                    ))}
                    </tbody>
                </TableList>
            ) : (
                <p>Loading users...</p>
            )}
        </div>
    );
}
