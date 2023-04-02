import "styles/views/Dashboard.scss";
import "styles/_theme.scss";
import SideBar from "../ui/SideBar";
import TableUserOverview from "../ui/TableUserOverview";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import PropTypes from "prop-types";
import UserList from "../ui/UserList";

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
