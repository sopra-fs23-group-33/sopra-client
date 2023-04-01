// adapted from https://mui.com/material-ui/react-drawer/

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Button from "./Button";
import "styles/views/SideBar.scss";

const drawerWidth = 240;

export default function SideBar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
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
                <List>
                    {['New Game', 'Leaderboard', 'Rulebook', 'About'].map((text) => (
                        <ListItem key={text}>
                            <Button classname="sidebar button">
                                {text}
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Button>
                    Logout
                </Button>
                <Button className="sidebar button">
                    Logout
                </Button>
            </Drawer>
        </Box>
    );
}