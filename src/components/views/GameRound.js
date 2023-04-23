import * as React from "react";
import Grid from '@mui/material/Grid';
import "styles/views/GameRound.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import RenderLineChart from "../ui/GameRound&RoundResult_ui/Chart";
import Timer from "../ui/GameRound&RoundResult_ui/CountDownTimer.js"
import Betting from "../ui/GameRound&RoundResult_ui/Betting";
import TablePowerups from "../ui/GameRound&RoundResult_ui/TablePowerups";
import {api_with_token, handleError} from "../../helpers/api";
import {useEffect, useState} from "react";


const GameRound = () => {

    const [timerValue] = useState(15);
    const [playerID] = useState(localStorage.getItem("playerID"));
    const [playerInfo, setPlayerInfo] = useState(null);

    useEffect(() => {
        async function getPlayerInfo() {
            try {
                const response = await api_with_token().get("/players/" + playerID);
                setPlayerInfo(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the player info: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the player info.");
            }
        }
        void getPlayerInfo();
    })

    let balance = 0;
    if (playerInfo) {
        balance = (<p>{playerInfo.accountBalance}</p>)
    }

    let content = <h2>Currency Pair</h2>;

    const [gameID] = useState(localStorage.getItem("gameID"))
    const [chart, setChart] = useState(null);

    useEffect(() => {
        async function fetchChart() {
            try {
                const response = await api_with_token().get("/games/" + gameID + "/chart");
                setChart(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the chart data: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the chart data.");
            }
        }
        void fetchChart();
    }, [])

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
        return { date: date, value: numbers[index] };
    });


    return (
        <div className="round base-container">
            <h1>Round 1/10</h1>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <div className="round wrapper">
                        {content}
                        <RenderLineChart data={data} />
                    </div>
                    <Betting
                    timer={timerValue}>
                    </Betting>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Timer
                                timer={timerValue}>
                            </Timer>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="round wrapper">
                                My Balance
                                <h1 style={{ fontSize: 40.5 }} align="center">{balance}</h1>
                                <h1 align="center">coins</h1>
                            </div>
                        </Grid>
                    </Grid>
                    <TablePowerups />
                </Grid>
            </Grid>
        </div>
    );
}

export default GameRound;
