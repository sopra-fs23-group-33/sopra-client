import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import * as React from "react";
import Button from "../ui/Button";

const Dashboard = () => {

    return (
        <div className="BaseContainer">
            <div className="db-primary-container">
                <div className="db-secondary-container">
                    <h2>Session Result</h2>
                    <TableFinalRanking />
                </div>

            </div>
        </div>
    );
}

export default Dashboard;