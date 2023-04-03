import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {api, handleError} from "../../helpers/api";
import {Spinner} from "../ui/Spinner";
import UserList from "../ui/UserList";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
import "styles/_theme.scss";
import "styles/ui/TableUserOverview.scss";
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


export default function TableUserOverview() {
    const history = useHistory();
    const [users, setUsers] = useState(null);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Something went wrong while fetching the users! See the console for details.");

                history.push('/login');
            }
        }

        fetchData();
    },);

    return (
        <div className="table-container">
            <h2>User Overview</h2>
            <div className="table-wrapper table">
                {users ? (
                    <UserList>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <Player user={user} key={user.userID} />
                        ))}
                        </tbody>
                    </UserList>
                ) : (
                    <p>Loading users...</p>
                )}
            </div>

        </div>
    );
}
