import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Button from "../Button";
import * as React from "react";
import "styles/ui/Dashboard_ui/SideBar.scss";
import {useHistory} from "react-router-dom";
import {api_with_token, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import {Spinner} from "../Spinner";

const drawerWidth = 240;

const SideBar = () => {

    const history = useHistory();

    const [user, setUser] = useState(null);

    const doLogout = async () => {
        try {
            const userID = localStorage.getItem("userID");
            await api_with_token().post('/users/' + userID + "/logout");

            localStorage.removeItem('token');
            localStorage.removeItem('userID');
            localStorage.removeItem('username');
            localStorage.removeItem('creationDate');
            localStorage.removeItem('status');

            history.push('/login');
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userID');
            localStorage.removeItem('username');
            localStorage.removeItem('creationDate');
            localStorage.removeItem('status');
            alert("Logout did not work.");
            history.push('/login');
        }
    }

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const userID = localStorage.getItem("userID");
                const response = await api_with_token().get('/users/' + userID);
                setUser(response.data);

            } catch (error) {
                console.log(localStorage.getItem('token'));
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the username and user statistics.");
            }
        }

        fetchData();
    }, );

    useEffect(() => {
        const handleTabClose = () => {
            doLogout()
        };

        window.addEventListener('beforeunload', handleTabClose);

        return () => {

            window.removeEventListener('beforeunload', handleTabClose);
        };
    }, []);



    let content = <Spinner/>;

    let winRate = ((1 - (user.numberOfBetsLost / user.numberOfBetsWon)) * 100).toFixed(2);

    if (user) {
        content = (
            <div>
            <h2 className="sidebar h2">
                Hello, {user.username}!
            </h2>
            <p className="sidebar p">
                Wins: {user.numberOfBetsWon}<br/>
                Defeats: {user.numberOfBetsLost}<br/>
                Total: {user.totalRoundsPlayed}<br/>
                Win Rate: {winRate}%
            </p>
            </div>
        );
    }
    return (
        <Box sx={{ display: 'flex'}}>
            {/*<CssBaseline />*/}
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
                <h2 className="sidebar h2">{content}</h2>
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
                <br/>
                <br/>
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