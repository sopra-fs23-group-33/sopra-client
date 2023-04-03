import "styles/views/Dashboard.scss";
import "styles/_theme.scss";
import SideBar from "../ui/SideBar";
import * as React from "react";

import TableUserOverview from "../ui/TableUserOverview";

const Dashboard = () => {

    return (
        <div>
            <div>
                <SideBar />,
            </div>
            <div>
                <TableUserOverview />
            </div>

        </div>

    );
}

export default Dashboard;
