import Button from "../Button";
import * as React from "react";
import "styles/ui/SideBar.scss";
import {useHistory} from "react-router-dom";
import {api_with_token, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import {PieChart} from 'react-minimal-pie-chart';
import {doLogout} from "../../../helpers/Utilities";
import {apiRequestIntervalNormal} from "../../../helpers/apiFetchSpeed";
import localStorageManager from "../../../helpers/LocalStorageManager";

// Documentation for react-minimal-pie-chart
// https://www.npmjs.com/package/react-minimal-pie-chart


const SideBarDashboard = () => {

    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserStatistics = async () => {
            try {
                const userID = JSON.parse(localStorage.getItem("user"))?.userID;
                const response = await api_with_token().get('/users/' + userID);
                setUser(response.data);
                localStorageManager.UpdateUser(response.data);

            } catch (error) {
                console.log(localStorage.getItem('token'));
                console.error(`Error while fetching User Statistics: \n${handleError(error)}`);
                console.error("Details:", error);
                // alert("Error while fetching User Statistics.");
            }
        };

        void fetchUserStatistics();
        const intervalId = setInterval(fetchUserStatistics, apiRequestIntervalNormal);

        return () => clearInterval(intervalId);
    }, []);

    let content
    if (user?.numberOfBetsWon > 0 || user?.numberOfBetsLost > 0) {

        let filteredData = [
            {title: " W", value: user?.numberOfBetsWon, color: '#00BAA9'},
            {title: " L", value: user?.numberOfBetsLost, color: '#E30089'}
        ].filter(entry => entry.value > 0);

        let labelPosition = (user?.numberOfBetsWon > 0 && user?.numberOfBetsLost > 0) ? 58 : 0;

        content = (
            <div>
                <PieChart
                    data={filteredData}
                    startAngle={-75}
                    radius={42}
                    lineWidth={30}
                    paddingAngle={30}
                    rounded
                    label={({ dataEntry }) =>
                        dataEntry.value + dataEntry.title
                    }
                    labelStyle={(index) => ({
                        fill: filteredData[index].color,
                        fontSize: '8px'
                    })}
                    labelPosition={labelPosition}
                />
            </div>
        )
    }

    return (
        <div className="SideBar">
            <h2>
                Hello, {user?.username}!
            </h2>
            {content}
            <p>
                Games Played: {user?.totalRoundsPlayed}<br/>
                Win Rate: {(user?.winRate * 100)?.toFixed(2)}%
            </p>
            <ul className="SideBarList">
                <li className="SideBarList row">
                    <Button
                        className="SideBarButton"
                        onClick={() => history.push("/game/start")}
                    >
                        New Game
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button
                        className="SideBarButton"
                        onClick={() => history.push("/leaderboard")}
                    >
                        Leaderboard
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button
                        className="SideBarButton"
                        onClick={() => history.push("/rulebook")}
                    >
                        Rulebook
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button 
                        className="SideBarButton"
                        onClick={() => history.push("/about")}
                    >
                        About
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button
                        className="SideBarButton"
                        onClick={() => doLogout(history)}
                    >
                        Logout
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default SideBarDashboard;