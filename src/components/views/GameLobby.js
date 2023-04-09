import "styles/_theme.scss";
// import UserList from "../ui/UserList";
// import {useEffect, useState} from "react";
// import {api_with_token, handleError} from "../../helpers/api";


const GameLobby = () => {

    // const [users, setUsers] = useState(null);
    //
    // useEffect(() => {
    //
    //     async function fetchData() {
    //         try {
    //             const gameID = localStorage.getItem("gameID");
    //             const response = await api_with_token().get('/games/' + gameID + '/players');
    //             setUsers(response.data);
    //
    //             console.log('request to:', response.request.responseURL);
    //             console.log('status code:', response.status);
    //             console.log('status text:', response.statusText);
    //             console.log('requested data:', response.data);
    //
    //             // See here to get more data.
    //             console.log(response);
    //         } catch (error) {
    //             console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
    //             console.error("Details: ", error);
    //             alert("Something went wrong while fetching the joined players! See the console for details.");
    //         }
    //     }
    //
    //     fetchData();
    // },);

    return (
        <div className="table-container">
            <h2>Players in Game Room</h2>
                <div className="table-wrapper table">
                    {/*{users ? (*/}
                    {/*    <UserList>*/}
                    {/*        <thead>*/}
                    {/*        <tr>*/}
                    {/*            <th>ID</th>*/}
                    {/*            <th>Username</th>*/}
                    {/*            <th>Status</th>*/}
                    {/*        </tr>*/}
                    {/*        </thead>*/}
                    {/*        <tbody>*/}
                    {/*        {users.map(user => (*/}
                    {/*            <Player user={user} key={user.userID} />*/}
                    {/*        ))}*/}
                    {/*        </tbody>*/}
                    {/*    </UserList>*/}
                    {/*) : (*/}
                    {/*    <p>Loading users...</p>*/}
                    {/*)}*/}
                </div>
        </div>
    );
}

export default GameLobby;