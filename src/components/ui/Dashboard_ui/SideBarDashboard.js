import Button from "../Button";
import * as React from "react";
import "styles/ui/SideBar.scss";
import {useHistory} from "react-router-dom";
import {api_with_token, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import {Spinner} from "../Spinner";
import {PieChart} from 'react-minimal-pie-chart';

const SideBarDashboard = () => {

    const history = useHistory();
    const [user, setUser] = useState(null);

    let winRate;

    function calculateWinRate(numberOfBetsWon, numberOfBetsLost) {
        if (!user) {
            winRate = 0;
        }
        else if (numberOfBetsLost === 0 && numberOfBetsWon === 0) {
            winRate = 0;
        }
        else if (numberOfBetsLost === 0) {
            winRate = 100.00;
        }
        else {
            winRate = ((1 - (user.numberOfBetsLost / user.numberOfBetsWon)) * 100).toFixed(2);
        }
    }


    const doLogout = async () => {
        try {
            const userID = localStorage.getItem("userID");
            await api_with_token().post('/users/' + userID + "/logout");

            localStorage.removeItem('token');
            localStorage.removeItem('creationDate');
            localStorage.removeItem('status');

        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userID');
            localStorage.removeItem('username');
            localStorage.removeItem('status');
            alert("Logout did not work.");
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const userID = localStorage.getItem("userID");
                const response = await api_with_token().get('/users/' + userID);
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));

            } catch (error) {
                console.log(localStorage.getItem('token'));
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the username and user statistics.");
            }
        }

        fetchData();
    }, );

    useEffect(() => {
        const handleTabClose = () => {
            doLogout();
        };

        window.addEventListener("beforeunload", handleTabClose);

        return () => {
            window.removeEventListener('beforeunload', handleTabClose);
        };
    }, []);


    let content = <Spinner/>;

    if (user) {
        calculateWinRate(user.numberOfBetsWon, user.numberOfBetsLost)
        content = (
            <div>
            <h2>
                Hello, {user.username}!
            </h2>
                <div>
                    <PieChart
                        data={[
                            { title: 'Bets won', value: user.numberOfBetsWon, color: '#31a838' },
                            { title: 'Bets lost', value: user.numberOfBetsLost, color: '#C13C37' },
                        ]}
                        startAngle={-90}
                    />
                </div>
            <p>
                Wins: {user.numberOfBetsWon}<br/>
                Defeats: {user.numberOfBetsLost}<br/>
                Total: {user.totalRoundsPlayed}<br/>
                Win Rate: {winRate}%
            </p>
            </div>
        );
    }
    return (
        <div className="SideBar">
            <h2>{content}</h2>
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
                    <Button className="SideBarButton">
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
                        onClick={() => doLogout()}
                    >
                        Logout
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default SideBarDashboard;