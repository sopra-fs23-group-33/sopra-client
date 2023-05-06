import {useEffect, useState} from "react";
import {api_with_token, handleError} from "../../helpers/api";
import Grid from "@mui/material/Grid";
import RenderLineChart from "../ui/GameRound&GameResult_ui/Chart";
import * as React from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TableEventsOccurred from "../ui/GameRound&GameResult_ui/TableEventsOccurred";
import Button from "../ui/Button";
import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import {leaveGame} from "../../helpers/Utilities";
import {useHistory} from "react-router-dom";
import {apiRequestIntervalGameRound} from "../../helpers/apiFetchSpeed";
import "styles/views/GameResult.scss";
import ActivatedPowerups from "../ui/GameRound&GameResult_ui/ActivatedPowerups";
import InfoBox from "../ui/GameRound&GameResult_ui/InfoBox";

const GameResult = () => {

    const history = useHistory();
    const [gameID] = useState(localStorage.getItem("gameID"));
    const [playerID] = useState(localStorage.getItem("playerID"));
    const [gameStatus, setGameStatus] = useState(null);
    const [chart, setChart] = useState(null);
    const [betStatus, setBetStatus] = useState(null);
    const [playerStatus, setPlayerStatus] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const game = await api_with_token().get("/games/" + gameID + "/status");
                setGameStatus(game.data);
                if (gameStatus.status === "BETTING") {
                    history.push("/game/round");
                }
                if (gameStatus.status === "OVERVIEW") {
                    history.push("/game/session-result");
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
                // Get player data, e.g. type of current bet
                const responsePlayer = await api_with_token().get("/players/" + playerID);
                setPlayerStatus(responsePlayer.data);
                // Get bet data, e.g. outcome of current bet
                const responseBet = await api_with_token().get("/players/" + playerID + "/result");
                setBetStatus(responseBet.data);
                // Get chart data
                const responseChart = await api_with_token().get("/games/" + gameID + "/chart");
                setChart(responseChart.data);
            } catch (error) {
                console.error(`Error while fetching data: \n${handleError(error)}`);
                console.error("Details:", error);
                alert(`Error while fetching data: \n${handleError(error)}`);
            }
        }

        void updateData();

    }, []);

    let rounds = <h2>Rounds played</h2>
    let timerValue
    let events
    if (gameStatus) {
        rounds = <h2>Result of Round {gameStatus.currentRoundPlayed}/{gameStatus.numberOfRoundsToPlay}</h2>
        timerValue = gameStatus.timer
        if (gameStatus.eventsActive === true) {
            events = <TableEventsOccurred/>
        }
    }

    let profit
    let bettingAmount
    let move
    let arrow = <TrendingFlatIcon sx={{ fontSize: 50}}/>
    if (betStatus) {
        bettingAmount = betStatus.bettingAmount
        if (betStatus.outcome === "UP") {
            arrow = <TrendingUpIcon sx={{fontSize: 50, color: "#5bb44a"}}/>
            move = <h2 className="result h2 long">Up</h2>
        } else if (betStatus.outcome === "DOWN") {
            arrow = <TrendingDownIcon sx={{fontSize: 50, color: "#b44a4a"}}/>
            move = <h2 className="result h2 short">Down</h2>
        }
        if (betStatus.profit >= 0) {
            profit = <h2 className="result h1 profit">+{betStatus.profit}</h2>
        } else if (betStatus.profit < 0) {
            profit = <h2 className="result h1 loss">{betStatus.profit}</h2>
        }
    }

    let betType
    let accountBalance
    if (playerStatus) {
        if (playerStatus.typeOfCurrentBet === "UP") {
            betType = (
                <div>
                    <h2 className="result h2 long">Long</h2>
                </div>
            )
        } else if (playerStatus.typeOfCurrentBet === "DOWN") {
            betType = (
                <div>
                    <h2 className="result h2 short">Short</h2>
                </div>
            )
        }
        accountBalance = playerStatus.accountBalance
    }

    let content = <h2>Currency Pair</h2>
    let numbers = []
    let dates = []
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
                            <InfoBox
                            header="You bet"
                            event={betType}
                            number={bettingAmount}
                            unit="coins"
                            >
                            </InfoBox>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoBox
                                header="The Currency went"
                                number={null}
                                icon={arrow}
                                unit={move}
                            >
                            </InfoBox>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoBox
                                header="Outcome"
                                number={profit}
                                unit="coins"
                            >
                            </InfoBox>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InfoBox
                                header="Next Round in"
                                number={timerValue}
                                unit="secs"
                            >
                            </InfoBox>
                        </Grid>
                        <Grid item xs={6}>
                            <InfoBox
                                header="My Balance"
                                number={accountBalance}
                                unit="coins"
                            >
                            </InfoBox>
                        </Grid>
                    </Grid>

                    <ActivatedPowerups />

                    <TableFinalRanking />

                    {events}
                    <div className="result button-container">
                        <Button
                            className="leave-button"
                            width="100%"
                            onClick={() => leaveGame(history)}>
                            Leave Game
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default GameResult;