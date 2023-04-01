import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {api, handleError} from "../../helpers/api";
import {Spinner} from "../ui/Spinner";
import TableUserOverview from "../ui/TableUserOverview";
import UserList from "../ui/UserList";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
import "styles/views/Game.scss";

const Player = ({user}) => (
    <tr className="user-overview row">
        <td className="user-overview id">{user.id}</td>
        <td className="user-overview username">{user.username}</td>
        <td className="user-overview status">{user.status}</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object
};

const TableUserOverview = () => {
    // use react-router-dom's hook to access the history
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

    let content = <Spinner/>;

    if (users) {
        content = (
            <div className="game">
                <h2>User Overview</h2>
                <UserList>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Online Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => {
                        return (
                            <Player user={user} key={user.id}/>
                        );
                    })}
                    </tbody>
                </UserList>
            </div>
        );
    }

    return (
        <BaseContainer className="game container">
            {content}
        </BaseContainer>
    );

}