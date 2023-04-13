import "styles/_theme.scss";
import React from "react";
import 'styles/views/GameLobby.scss';
import TableJoinedPlayers from "../ui/GameLobby/TableJoinedPlayers";





const GameLobby = () => {


    return (
        <div className="BaseContainer">
            <div className="gl-primary-container">
                <TableJoinedPlayers/>
            </div>
        </div>
    );
}

export default GameLobby;