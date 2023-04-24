import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import * as React from "react";
import Button from "../ui/Button";
import {useHistory} from "react-router-dom";
import {LeaveGame} from "../../helpers/Utilities";

const SessionResult = () => {
    const history = useHistory();

    return (
        <div className="db primary-container">
            <div className="db secondary-container">
                <h2>Session Result</h2>
                <TableFinalRanking />
                <br/>
                <Button
                    onClick={() => LeaveGame(history)}>
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );
}

export default SessionResult;