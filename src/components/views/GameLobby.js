import "styles/_theme.scss";
import React from "react";
import FormField from "../ui/GameLobby/FormField";
import 'styles/views/GameLobby.scss';
import {MenuItem} from "@mui/material";
import {gameModes} from "../../helpers/constants";
import SideBarLobby from "../ui/GameLobby/SideBarLobby";
import 'styles/ui/SideBar.scss';





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
        <div className="BaseContainer">
            <SideBarLobby/>
            <div className="primary-container">
                <div className="secondary-container">
                    <FormField
                        header="Set Game Room Name"
                        id="outlined-required"
                        label="Game Room Name"
                    />
                    <FormField
                        header="Set Maximum Number of Players"
                        id="outlined-number"
                        label="Maximum Number of Players"
                        type="number"
                    />
                    <FormField
                        header="Set Maximum Number of Rounds"
                        id="outlined-number"
                        label="Maximum Number of Rounds"
                        type="number"
                    />
                    <FormField
                        header="Set Game Mode"
                        id="outlined-select-gameMode"
                        select="select"
                        label="Select"
                        list={gameModes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    />
                </div>
                <div className="secondary-container">
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
            </div>
        </div>
    );
}

export default GameLobby;