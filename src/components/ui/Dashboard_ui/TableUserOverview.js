import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { handleError, api_with_token } from "../../../helpers/api";
import TableList from "../TableList";
import "styles/_theme.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import "styles/ui/TableContainer.scss";

const Player = ({ user }) => (
    <tr className="table overview-content row">
        <td className="table overview-content">{user.userID}</td>
        <td className="table overview-content">{user.username}</td>
        <td className="table overview-content">{user.totalRoundsPlayed}</td>
        <td className="table overview-content">{user.winRate}</td>
        <td className="table overview-content">{user.status}</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object
};


export default function TableUserOverview() {
    const [users, setUsers] = useState(null);
    const [sortOrder, setSortOrder] = useState({ field: null, ascending: true });

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await api_with_token().get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error(`Error while fetching Users in Dashboard: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Error while fetching Users in Dashboard.");
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function sortUsers(field) {
        let ascending = true;
        if (sortOrder.field === field) {
            ascending = !sortOrder.ascending;
        }
        setSortOrder({ field, ascending });
        const sortedUsers = [...users].sort((a, b) => {
            let compareResult = 0;
            if (a[field] < b[field]) {
                compareResult = -1;
            } else if (a[field] > b[field]) {
                compareResult = 1;
            }
            return sortOrder.ascending ? compareResult : -compareResult;
        });
        setUsers(sortedUsers);
    }

    return (
        <div className="table-wrapper table">
            {users ? (
                <TableList>
                    <thead>
                    <tr>
                        <th onClick={() => sortUsers('userID')}>User ID &#x2195;</th>
                        <th onClick={() => sortUsers('username')}>Username &#x2195;</th>
                        <th onClick={() => sortUsers('totalRoundsPlayed')}>Rounds Played &#x2195;</th>
                        <th onClick={() => sortUsers('winRate')}>Win-Rate &#x2195;</th>
                        <th onClick={() => sortUsers('state')}>Status &#x2195;</th>
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
