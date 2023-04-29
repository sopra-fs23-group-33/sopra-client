import Button from "../Button";
import * as React from "react";
import "styles/ui/SideBar.scss";
import {useHistory} from "react-router-dom";
import {api_with_token, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import {Spinner} from "../Spinner";
import {PieChart} from 'react-minimal-pie-chart';
import {doLogout, doTabCloseLogout} from "../../../helpers/Utilities";
import {apiRequestIntervalNormal} from "../../../helpers/apiFetchSpeed";

// Documentation for react-minimal-pie-chart
// https://www.npmjs.com/package/react-minimal-pie-chart


const SideBarDashboard = () => {

    void doTabCloseLogout();

    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const userID = localStorage.getItem("userID");
                const response = await api_with_token().get('/users/' + userID);
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));

            } catch (error) {
                console.log(localStorage.getItem('token'));
                console.error(`Error while fetching User Statistics: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Error while fetching User Statistics.");
            }
        }, apiRequestIntervalNormal);

        return () => clearInterval(intervalId);
    }, );


    let content;

    if (user?.numberOfBetsWon || user?.numberOfBetsLost) {
        content = (
            <div>
                <PieChart
                    data={[
                        { title: `Bets won: ${user.numberOfBetsWon}`, value: user.numberOfBetsWon, color: '#31a838' },
                        { title: `Bets won: ${user.numberOfBetsLost}`, value: user.numberOfBetsLost, color: '#C13C37' },
                    ]}
                    startAngle={-90}
                    radius={35}
                />
            </div>
        );

    } else {
        content = <div/>;
    }

    return (
        <div className="SideBar">
            <h2>
                Hello, {user?.username}!
            </h2>

            {content}

            <p>
                Wins: {user?.numberOfBetsWon}<br/>
                Defeats: {user?.numberOfBetsLost}<br/>
                Total: {user?.totalRoundsPlayed}<br/>
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
                    <Button className="SideBarButton">
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