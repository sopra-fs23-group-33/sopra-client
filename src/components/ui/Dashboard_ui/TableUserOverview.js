// import {useHistory} from "react-router-dom";
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


export default function TableUserOverview() {
    // const history = useHistory();
    const [users, setUsers] = useState(null);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await api_with_token().get('/users');
                setUsers(response.data);

                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Something went wrong while fetching the users! See the console for details.");

                // history.push('/login');
            }
        }

        fetchData();
    },);

    return (
            <div className="table-wrapper table">
                {users ? (
                    <TableList>
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
                    </TableList>
                ) : (
                    <p>Loading users...</p>
                )}
            </div>
    );
}
