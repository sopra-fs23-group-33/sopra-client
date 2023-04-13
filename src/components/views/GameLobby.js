import "styles/_theme.scss";
import React from "react";
import 'styles/views/GameStart.scss';
import SideBarStart from "../ui/GameStart/SideBarStart";





const GameLobby = () => {


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