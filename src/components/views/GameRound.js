import * as React from "react";
import Grid from '@mui/material/Grid';
import "styles/views/GameRound.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import RenderLineChart from "../ui/GameRound&GameResult_ui/Chart";
import Betting from "../ui/GameRound&GameResult_ui/Betting";
import TablePowerups from "../ui/GameRound&GameResult_ui/TablePowerups";
import {api_with_token, handleError} from "../../helpers/api";
import {useEffect, useState} from "react";
import {apiRequestIntervalGameRound} from "../../helpers/apiFetchSpeed";
import {useHistory} from "react-router-dom";
import InfoBox from "../ui/GameRound&GameResult_ui/InfoBox";

const GameRound = () => {

    const history = useHistory();
    const [gameID] = useState(localStorage.getItem("gameID"));
    const [playerID] = useState(localStorage.getItem("playerID"));
    const [gameStatus, setGameStatus] = useState(null);
    const [playerStatus, setPlayerStatus] = useState(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const game = await api_with_token().get("/games/" + gameID + "/status");
                setGameStatus(game.data);
                if (gameStatus.status === "RESULT") {
                    history.push("/game/result");
                }
            } catch (error) {
                console.log(error);
            }
        }, apiRequestIntervalGameRound);

        return () => clearInterval(intervalId);

    }, [gameStatus]);

    useEffect(() => {
        async function updateData() {
            try {
                // Get player data
                const responsePlayer = await api_with_token().get("/players/" + playerID);
                setPlayerStatus(responsePlayer.data);
                // Get chart data
                const responseChart = await api_with_token().get("/games/" + gameID + "/chart");
                setChart(responseChart.data);
            } catch (error) {
                console.error(`Something went wrong while fetching data: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching data.");
            }
        }

        void updateData();

    }, []);

    let timerValue
    if (gameStatus) {
        timerValue = gameStatus.timer
    }


    let balance = 0;
    if (playerStatus) {
        balance = (<p>{playerStatus.accountBalance}</p>)
    }

    let content = <h2>Currency Pair</h2>;

    let numbers = [];
    let dates = [];

    if (chart) {
        content = (
            <h2>{chart.fromCurrency}/{chart.toCurrency}</h2>
        );
        numbers = chart.numbers;
        dates = chart.dates;
    }

    let data = dates.map((date, index) => {
        const time = date.split(' ')[1].split(':');
        const formattedDate = time[0] + ':' + time[1];
        return { date: formattedDate, value: numbers[index] };
    });

    let rounds = <h2>Rounds played</h2>;

    if (gameStatus) {
        rounds = (
            <h2>Round {gameStatus.currentRoundPlayed}/{gameStatus.numberOfRoundsToPlay}</h2>
        );
    }

    let powerups = "";

    if (gameStatus) {
        if (gameStatus.powerupsActive === true) {
            powerups = <TablePowerups />
        }
    }


    return (
        <div className="round base-container">
            <h2>{rounds}</h2>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <div className="round wrapper">
                        {content}
                        <RenderLineChart data={data} />
                    </div>
                    <Betting/>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InfoBox
                                header="Time left"
                                number={timerValue}
                                unit="secs"
                            >
                            </InfoBox>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="round wrapper">
                                My Balance
                                <h1 style={{ fontSize: 40.5 }} align="center">{balance}</h1>
                                <h1 align="center">coins</h1>
                            </div>
                        </Grid>
                    </Grid>
                    {powerups}
                </Grid>
            </Grid>
        </div>
    );
}

export default GameRound;
