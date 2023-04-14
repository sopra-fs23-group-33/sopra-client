import "styles/_theme.scss";
import React from "react";
import 'styles/views/GameLobby.scss';
import TableJoinedPlayers from "../ui/GameLobby/TableJoinedPlayers";
import Button from "../ui/Button";

const GameLobby = () => {

    return (
        <div className="gl-base-container">
            <div className="gl-primary-container">
                <div className="gl-secondary-container">
                    <h2>Players in Game Room</h2>

                    <TableJoinedPlayers/>
                    <div className="gl button-container">
                        <Button
                            width="100%">
                            Start Game
                        </Button>
                        <Button
                            width="100%">
                            Delete Game Room
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;