import 'styles/ui/SideBar.scss';
import {SideBarDataGameLobby} from "./GameLobby/SideBarDataGameLobby";
import {useHistory} from 'react-router-dom';
import Button from "./Button";
import React from "react";



function SideBar() {
    const history = useHistory();
    return (
        <div className="SideBar">
            <h2>Game Lobby</h2>
            <ul className="SideBarList">
                {SideBarDataGameLobby.map((val, key) => {
                return (
                    <li className="SideBarList row">
                        <Button
                            className="SideBarButton"
                            key = {key}
                            onClick={() => {
                                history.push(val.link)
                            }}
                        >
                            {val.title}
                        </Button>
                    </li>

                );
                })}
            </ul>
        </div>
    );
}

export default SideBar;