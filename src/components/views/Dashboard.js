import "styles/views/Dashboard.scss";
// import SideBar from "../ui/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Button from "../ui/Button";
import * as React from "react";


const drawerWidth = 240;

const SideBar = props => {
    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <Drawer
                PaperProps={{
                    elevation: 10,
                    sx: {
                        backgroundColor: "rgb(126, 133, 148)",

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
                <Button className="sidebar button">
                    Logout
                </Button>
            </Drawer>
        </Box>
    );
};




const Dashboard = () => {

    return (
        <SideBar>
        </SideBar>
    );
}

export default Dashboard;
