import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import * as React from "react";
import Button from "../ui/Button";
import {useHistory} from "react-router-dom";
import {leaveGame} from "../../helpers/Utilities";

const SessionResult = () => {
    const history = useHistory();
    const roundsPlayed = localStorage.getItem("currentRoundPlayed");
    const totalRounds = localStorage.getItem("numberOfRoundsToPlay");
    const gameMode = localStorage.getItem("typeOfGame");
    const activatedPowerups = JSON.parse(localStorage.getItem("activatedPowerups"));
    const activatedPowerupNames = activatedPowerups ? Object.values(activatedPowerups) : [];

    let gameEndEarlyInformation;
    if (roundsPlayed !== totalRounds) {
        if (gameMode === "SINGLEPLAYER") {
            gameEndEarlyInformation = (
                <><p>well well well... game ended because you're bankrupt!</p></>
            )
        }
        else {
            gameEndEarlyInformation = (
                <><p>well well well... game ended because less than 2 traders still have <span className="dollar">$$$</span> left!</p></>
            )
        }
    }

    return (
        <div className="db primary-container">
            <div className="db secondary-container session-result">
                <h1>Game Session Result</h1>
                <h2>Completed Rounds: {roundsPlayed}/{totalRounds}</h2>

                {gameEndEarlyInformation}

                <TableFinalRanking />
                <br/>

                {activatedPowerups && (
                    <div>
                        <h2>Your used Power-Ups:</h2>
                        {activatedPowerupNames.map((name, index) => (
                            <p key={index}>{name}</p>
                        ))}
                    </div>
                )}

                <br/>
                <br/>
                <Button
                    className="leave-button"
                    onClick={() => leaveGame(history)}
                >
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );
};


export default SessionResult;