// adapted from https://mui.com/material-ui/react-drawer/

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Button from "./Button";
import "styles/views/SideBar.scss";

const drawerWidth = 240;

export default function SideBar() {
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
}