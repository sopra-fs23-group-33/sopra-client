import "styles/views/Dashboard.scss";
import "styles/_theme.scss";
import SideBarDashboard from "../ui/Dashboard_ui/SideBarDashboard";
import TableUserOverview from "../ui/Dashboard_ui/TableUserOverview";
import GameLobbyOverview from "../ui/Dashboard_ui/GameLobbyOverview";
import * as React from "react";

const Dashboard = () => {

    return (
        <div className="BaseContainer">
            <SideBarDashboard/>
            <div className="primary-container">
                <div className="secondary-container">
                    <h2>Game Overview</h2>
                    <GameLobbyOverview />
                </div>
                {/*<br/>*/}
                <div className="secondary-container">
                    <h2>User Overview</h2>
                    <TableUserOverview />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
