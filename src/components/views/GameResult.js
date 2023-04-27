import {useEffect, useState} from "react";
import {api_with_token, handleError} from "../../helpers/api";
import Grid from "@mui/material/Grid";
import RenderLineChart from "../ui/GameRound&RoundResult_ui/Chart";
import Timer from "../ui/GameRound&RoundResult_ui/CountDownTimer";
import * as React from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TableEventsOccurred from "../ui/GameRound&RoundResult_ui/TableEventsOccurred";
import Button from "../ui/Button";
import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import {LeaveGame} from "../../helpers/Utilities";
import {useHistory} from "react-router-dom";
import {apiRequestIntervalGameRound} from "../../helpers/apiFetchSpeed";


const GameResult = () => {
    const history = useHistory();
    const [timerValue] = useState(15);
    const [playerID] = useState(localStorage.getItem("playerID"));
    const [playerInfo, setPlayerInfo] = useState(null);
    const [betInfo, setBetInfo] = useState(null);

    useEffect(() => {
        async function getPlayerInfo() {
            try {
                const responsePlayer = await api_with_token().get("/players/" + playerID);
                setPlayerInfo(responsePlayer.data);
            } catch (error) {
                console.error(`Error while fetching the player info: \n${handleError(error)}`);
                console.error("Details:", error);
                alert(`Error while fetching the player info: \n${handleError(error)}`);
            }
        }

        void getPlayerInfo();

        async function getBetInfo() {
            try {
                const responseBet = await api_with_token().get("/players/" + playerID + "/result");
                setBetInfo(responseBet.data);
            } catch (error) {
                console.error(`Error while fetching the bet info: \n${handleError(error)}`);
                console.error("Details:", error);
                alert(`Error while fetching the bet info: \n${handleError(error)}`);
            }
        }

        void getBetInfo();
    }, []);

    let balance = 0;
    if (playerInfo) {
        balance = (<p>{playerInfo.accountBalance}</p>)
    }

    let profit = 0;
    if (betInfo) {
        profit = (<p>{betInfo.profit}</p>)
    }

    let bettingAmount = 0;
    if (betInfo) {
        bettingAmount = (<p>{betInfo.bettingAmount}</p>)
    }

    let arrow = <TrendingFlatIcon sx={{ fontSize: 50}}/>
    let upArrow = <TrendingUpIcon sx={{ fontSize: 50, color: "green" }}/>
    let downArrow = <TrendingDownIcon sx={{ fontSize: 50, color: "red" }}/>

    let movement =
        <div className="round wrapper">
            The Currency went:
            <h1 style={{ fontSize: 50 }} align="center"> {arrow} </h1>
            <h1 align="center"></h1>
        </div>

    if (betInfo) {
        if (betInfo.outcome === "UP") {
            movement =
                <div className="round wrapper">
                    The Currency went:
                    <h1 style={{ fontSize: 50 }} align="center"> {upArrow} </h1>
                    <h1 align="center">up</h1>
                </div>
        }
        if (betInfo.outcome === "DOWN") {
            movement =
                <div className="round wrapper">
                    The Currency went:
                    <h1 style={{ fontSize: 50 }} align="center"> {downArrow} </h1>
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
                console.error(`Error while fetching the chart data: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Error while fetching the chart data.");
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

    const [gameInfo, setGameInfo] = useState(null);

    useEffect(() => {
        async function getGameInfo() {
            try {
                const response = await api_with_token().get("/games/" + gameID + "/status");
                setGameInfo(response.data);
            } catch (error) {
                console.error(`Error while fetching the game info: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Error while fetching the game info.");
            }
        }
        void getGameInfo();
    }, [])

    let rounds = <h2>Rounds played</h2>;

    if (gameInfo) {
        rounds = (
            <h2>Result of Round {gameInfo.currentRoundPlayed}/{gameInfo.numberOfRoundsToPlay}</h2>
        );
    }

    let events = "";

    if (gameInfo) {
        if (gameInfo.eventsActive === true) {
            events = <TableEventsOccurred />
        }
    }

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await api_with_token().get("/games/" + gameID + "/status");
                if (response.data.status === "BETTING") {
                    history.push("/game/round");
                }
                if (response.data.status === "OVERVIEW") {
                    history.push("/game/session-result");
                }
            } catch (error) {
                console.log(error);
            }
        }, apiRequestIntervalGameRound);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="round base-container">
            <h2>{rounds}</h2>
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
                            <Timer
                                timer={timerValue}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div className="round wrapper">
                                My Balance
                                <h1 style={{ fontSize: 50 }} align="center">{balance}</h1>
                                <h1 align="center">coins</h1>
                            </div>
                        </Grid>
                    </Grid>
                    {events}
                    <TableFinalRanking />
                    <Button
                        className="SideBarButton"
                        onClick={() => LeaveGame(history)}>
                        Leave Game
                    </Button>

                </Grid>
            </Grid>
        </div>
    );
}

export default GameResult;