import "styles/_theme.scss";
import React from "react";
import 'styles/views/GameLobby.scss';
import SideBarStart from "../ui/GameStart/SideBarStart";
import {useHistory} from "react-router-dom";





const GameLobby = () => {

    const history = useHistory();


    return (
        <div className="BaseContainer">
            <SideBarStart/>
            <div className="primary-container">
                Joined Players
            </div>
        </div>
    );
}

export default GameLobby;