import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Button from "./Button";
import * as React from "react";
import "styles/ui/SideBar.scss";
import {useHistory} from "react-router-dom";

const drawerWidth = 240;

const SideBar = () => {

    const history = useHistory();

    const doLogout = async () => {
        try {
            // const userID = localStorage.getItem('userID');
            // await api.post('/users/logout/' + userID);
            //
            // localStorage.removeItem('userID');
            // localStorage.removeItem('token');


            history.push('/login');
        } catch (error) {
            // localStorage.removeItem('userID');
            // localStorage.removeItem('token');
            history.push('/login');
        }
    }

    // useEffect(() => {
    //     // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    //     async function fetchData() {
    //         try {
    //             const response = await api.get('/users');
    //
    //             setUsers(response.data);
    //
    //             // This is just some data for you to see what is available.
    //             // Feel free to remove it.
    //             console.log('request to:', response.request.responseURL);
    //             console.log('status code:', response.status);
    //             console.log('status text:', response.statusText);
    //             console.log('requested data:', response.data);
    //
    //             // See here to get more data.
    //             console.log(response);
    //         } catch (error) {
    //             console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
    //             console.error("Details:", error);
    //             alert("Something went wrong while fetching the users! See the console for details.");
    //
    //             history.push('/login');
    //         }
    //     }
    //
    //     fetchData();
    // }, );

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <Drawer
                PaperProps={{
                    elevation: 10,
                    sx: {
                        backgroundColor: "rgb(111,101,171)",
                    }
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                Hello
                <Divider />
                <Button className="sidebar button">
                    New Game
                </Button>
                <Button className="sidebar button">
                    Leaderboard
                </Button>
                <Button className="sidebar button">
                    Rulebook
                </Button>
                <Button className="sidebar button">
                    About
                </Button>
                <Divider />
                <Button className="sidebar button"
                onClick={() => doLogout()}>
                    Logout
                </Button>
            </Drawer>
        </Box>
    );
};

export default SideBar;