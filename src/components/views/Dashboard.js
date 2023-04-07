import "styles/views/Dashboard.scss";
import "styles/_theme.scss";
import SideBar from "../ui/Dashboard_ui/SideBar";
import * as React from "react";

import TableUserOverview from "../ui/Dashboard_ui/TableUserOverview";

const Dashboard = () => {

    return (
        <div>
            <div>
                <SideBar />
            </div>
            <div>
                <TableUserOverview />
            </div>

        </div>

    );
}

export default Dashboard;
