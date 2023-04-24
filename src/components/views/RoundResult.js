import {useEffect, useState} from "react";
import {api, api_with_token, handleError} from "../../helpers/api";
import Grid from "@mui/material/Grid";
import RenderLineChart from "../ui/GameRound&RoundResult_ui/Chart";
import Betting from "../ui/GameRound&RoundResult_ui/Betting";
import Timer from "../ui/GameRound&RoundResult_ui/CountDownTimer";
import TablePowerups from "../ui/GameRound&RoundResult_ui/TablePowerups";
import TableIntermediateRanking from "../ui/GameRound&RoundResult_ui/TableIntermediateRanking";
import * as React from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TableEventsOccurred from "../ui/GameRound&RoundResult_ui/TableEventsOccurred";
import {useHistory} from "react-router-dom";
import LocalStorageManager from "../../helpers/LocalStorageManager";
import Button from "../ui/Button";

const RoundResult = () => {

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

    let profit = 0;
    if (playerInfo) {
        profit = (<p>{playerInfo.profit}</p>)
    }

    let bettingAmount = 0;
    if (playerInfo) {
        bettingAmount = (<p>{playerInfo.bettingAmount}</p>)
    }

    let arrow = <TrendingFlatIcon sx={{ fontSize: 50}}/>
    let uparrow = <TrendingUpIcon sx={{ fontSize: 50, color: "green" }}/>
    let downarrow = <TrendingDownIcon sx={{ fontSize: 50, color: "red" }}/>

    let movement =
        <div className="round wrapper">
            The Currency went:
            <h1 style={{ fontSize: 50 }} align="center"> {arrow} </h1>
            <h1 align="center"></h1>
        </div>

    if (playerInfo) {
        if (playerInfo.outcome == "UP") {
            movement =
                <div className="round wrapper">
                    The Currency went:
                    <h1 style={{ fontSize: 50 }} align="center"> {uparrow} </h1>
                    <h1 align="center">up</h1>
                </div>
        }
        if (playerInfo.outcome == "DOWN") {
            movement =
                <div className="round wrapper">
                    The Currency went:
                    <h1 style={{ fontSize: 50 }} align="center"> {downarrow} </h1>
                    <h1 align="center">down</h1>
                </div>
        }
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


    const history = useHistory();

    const LeaveGame = async () => {
        try {
            const username = localStorage.getItem("username");
            const gameID = localStorage.getItem("gameID");
            const requestBody = JSON.stringify({
                username
            })
            await api_with_token().post("/games/" + gameID + "/leave", requestBody);
            history.push("/dashboard");
            LocalStorageManager.LeaveGame();

        } catch (error) {
            console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong when leaving the GameSession.");

        }
    }



    return (
        <div className="round base-container">
            <h1>Round 1/10</h1>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <div className="round wrapper">
                        {content}
                        <RenderLineChart data={data} />
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className="round wrapper">
                                You Bet:
                                <h1 style={{ fontSize: 50 }} align="center">{bettingAmount}</h1>
                                <h1 align="center">coins</h1>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            {movement}
                        </Grid>
                        <Grid item xs={4}>
                            <div className="round wrapper">
                                Your Profit/Loss:
                                <h1 style={{ fontSize: 50 }} align="center">{profit}</h1>
                                <h1 align="center">coins</h1>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Timer />
                        </Grid>
                        <Grid item xs={6}>
                            <div className="round wrapper">
                                My Balance
                                <h1 style={{ fontSize: 50 }} align="center">{balance}</h1>
                                <h1 align="center">coins</h1>
                            </div>
                        </Grid>
                    </Grid>
                    <TableEventsOccurred />
                    <TableIntermediateRanking />
                    <Button
                        className="SideBarButton"
                        onClick={() => LeaveGame()}>
                        Leave Game
                    </Button>

                </Grid>
            </Grid>
        </div>
    );
}

export default RoundResult;