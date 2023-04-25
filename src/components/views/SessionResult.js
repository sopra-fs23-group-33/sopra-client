import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import * as React from "react";
import Button from "../ui/Button";
import {useHistory} from "react-router-dom";
import {LeaveGame} from "../../helpers/Utilities";

const SessionResult = () => {
    const history = useHistory();
    const roundsPlayed = localStorage.getItem("numberOfRoundsToPlay");
    const activatedPowerups = JSON.parse(localStorage.getItem("activatedPowerups"));
    const activatedPowerupNames = Object.values(activatedPowerups);

    return (
        <div className="db primary-container">
            <div className="db secondary-container">
                <h1>Game Session Result</h1>
                <h2>Completed Rounds: {roundsPlayed}</h2>

                <TableFinalRanking />
                <br/>
                <div>
                    <h2>Used Powerups:</h2>
                    {activatedPowerupNames.map((name, index) => (
                        <p key={index}>{name}</p>
                    ))}
                </div>

                <br/>
                <br/>
                <Button onClick={() => LeaveGame(history)}>Return to Dashboard</Button>
            </div>
        </div>
    );
};


export default SessionResult;