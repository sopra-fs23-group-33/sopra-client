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
import PropTypes from "prop-types";
import "styles/views/GameResult.scss";


const InfoBox = props => {
    return (
        <div className="round wrapper">
            <p className="result p">{props.header}</p>
            <h1 className="result h1">{props.number}{props.icon}</h1>
            <h2 className="result h2">{props.unit}</h2>
        </div>
    );
};

InfoBox.propTypes = {
    header: PropTypes.string,
    number: PropTypes.any,
    icon: PropTypes.any,
    unit: PropTypes.string
};

InfoBox.defaultProps = {
    header: "Header",
    number: "123",
    unit: "unit"
};

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

    let accountBalance
    if (playerInfo) {
        accountBalance = playerInfo.accountBalance
    }

    let profit
    let bettingAmount
    if (betInfo) {
        profit = betInfo.profit
        bettingAmount = betInfo.bettingAmount
    }

    let arrow = <TrendingFlatIcon sx={{ fontSize: 50}}/>
    if (betInfo) {
        if (betInfo.outcome === "UP") {
            arrow = <TrendingUpIcon sx={{ fontSize: 50, color: "green" }}/>
        } else if (betInfo.outcome === "DOWN") {
            arrow = <TrendingDownIcon sx={{ fontSize: 50, color: "red" }}/>
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
                            <InfoBox
                            header="Your Bet"
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
                            >
                            </InfoBox>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoBox
                                header="Profit/Loss"
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