import "styles/_theme.scss";
import React from "react";
import 'styles/views/GameLobby.scss';
import TableJoinedPlayers from "../ui/GameLobby/TableJoinedPlayers";

const GameLobby = () => {

    return (
        <div className="gl-base-container">
            <div className="gl-primary-container">
                <div className="gl-secondary-container">
                    <h2>Players in Game Room</h2>
                    <TableJoinedPlayers/>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;