import "styles/_theme.scss";
// import {Link} from "react-router-dom";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "../ui/Button";
// import UserList from "../ui/UserList";
// import {useEffect, useState} from "react";
// import {api_with_token, handleError} from "../../helpers/api";


const FormField = props => {
    return (
        <div className="login field">
            <TextField
                id="outlined-number"
                label={props.label}
                type="number"
                //variant="outlined-number"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

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
            <div className="login container">
                <div className="login form">
                    <h2>Set Game Room Name</h2>
                    <FormField
                        label="Game Room Name"
                        // value={username}
                        // onChange={un => setUsername(un)}
                    />
                    <div className="login button-container">
                        <Button
                            // disabled={!username || !password}
                            // width="100%"
                            // onClick={() => doLogin()}
                        >
                            Set
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;