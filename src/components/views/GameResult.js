import {useEffect, useState} from "react";
import {api_with_token, handleError} from "../../helpers/api";
import Grid from "@mui/material/Grid";
import RenderLineChart from "../ui/GameRound&GameResult_ui/Chart";
import * as React from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import Button from "../ui/Button";
import TableFinalRanking from "../ui/GameSessionResult/TableFinalRanking";
import {leaveGame} from "../../helpers/Utilities";
import {useHistory} from "react-router-dom";
import {apiRequestIntervalGameRound} from "../../helpers/apiFetchSpeed";
import "styles/views/GameResult.scss";
import ActivatedPowerups from "../ui/GameRound&GameResult_ui/ActivatedPowerups";
import InfoBox from "../ui/GameRound&GameResult_ui/InfoBox";
import Game from "../../models/Game";
import Chart from "../../models/Chart";
import Player from "../../models/Player";
import Result from "../../models/Result";
import {Alert, AlertTitle} from "@mui/material";
import CelebrationIcon from '@mui/icons-material/Celebration';
import LocalStorageManager from "../../helpers/LocalStorageManager";


const GameResult = () => {

    const history = useHistory();
    const gameID = localStorage.getItem("gameID");
    const playerID = JSON.parse(localStorage.getItem("player"))?.playerID;
    const [game, setGame] = useState(new Game());
    const [chart, setChart] = useState(new Chart());
    const [result, setResult] = useState(new Result());
    const [player, setPlayer] = useState(new Player());
    const [event, setEvent] = useState(null);


    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const responseGame = await api_with_token().get("/games/" + gameID + "/status");
                setGame(responseGame.data);
                LocalStorageManager.UpdateGame(game);

                if (game.status === "BETTING") {
                    history.push("/game/round");
                } else if (game.status === "OVERVIEW") {
                    history.push("/game/session-result");
                } else if (game.status === "CORRUPTED") {
                    await leaveGame(history);
                }
            } catch (error) {
                console.log(error);
            }
        }, apiRequestIntervalGameRound);

        return () => clearInterval(intervalId);

    }, [game]);

    useEffect(() => {
        async function updateData() {
            try {
                // Get player data, e.g. type of current bet
                const responsePlayer = await api_with_token().get("/players/" + playerID);
                setPlayer(responsePlayer.data);
                // Get result data, e.g. outcome of current bet
                const responseResult = await api_with_token().get("/players/" + playerID + "/result");
                setResult(responseResult.data);
                // Get chart data
                const responseChart = await api_with_token().get("/games/" + gameID + "/chart");
                setChart(responseChart.data);
                LocalStorageManager.UpdateGame(responseResult.data);
            } catch (error) {
                console.error(`Error while fetching data: \n${handleError(error)}`);
                console.error("Details:", error);
                // alert(`Error while fetching data: \n${handleError(error)}`);
            }
        }

        void updateData();

    }, []);

    let data;
    if (chart.numbers !== null && chart.dates !== null) {
        data = chart.dates.map((date, index) => {
            const time = date.split(' ')[1].split(':');
            const formattedDate = time[0] + ':' + time[1];
            return {date: formattedDate, value: chart.numbers[index]};
        });
    }

    let move;
    let arrow = <TrendingFlatIcon sx={{ fontSize: 50}}/>
    if (result.outcome === "UP") {
        arrow = <TrendingUpIcon sx={{fontSize: 50, color: "#5bb44a"}}/>
        move = <h2 className="result h2 long">Up</h2>
    } else if (result.outcome === "DOWN") {
        arrow = <TrendingDownIcon sx={{fontSize: 50, color: "#b44a4a"}}/>
        move = <h2 className="result h2 short">Down</h2>
    }

    let profit;
    if (result.profit > 0) {
        profit = <h1 className="result h1 profit">+{result.profit}</h1>
    } else if (result.profit < 0) {
        profit = <h1 className="result h1 loss">{result.profit}</h1>
    } else {
        profit = <h1 className="result h1">{result.profit}</h1>
    }

    let betType;
    if (player.typeOfCurrentBet === "UP") {
        betType = <h2 className="result h2 long">Long</h2>
    } else if (player.typeOfCurrentBet === "DOWN") {
        betType = <h2 className="result h2 short">Short</h2>
    }

    let occurred_powerups;
    if (game.powerupsActive === true) {
        occurred_powerups = <ActivatedPowerups/>
    }

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const responseEvent = await api_with_token().get("/games/" + gameID + "/event");
                setEvent(responseEvent.data);
            } catch (error) {
                console.error(`Error while fetching Event: \n${handleError(error)}`);
                console.error("Details: ", error);
                // alert("Error while fetching Event.");
            }
        };

        if (game.eventsActive === true && game.event !== null) {
            fetchEvent();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game]);


    let eventDisplay;
    if (event !== null && event.name !== "none") {
        eventDisplay = (
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{width: "50%", }}>
                    <Alert severity="info"
                            variant="filled"
                           icon={<CelebrationIcon fontSize="inherit" />}>
                        <AlertTitle>An Event has Occurred!</AlertTitle>
                        <strong><u>{event.name}</u></strong> - {event.description}
                    </Alert>
                    <br/>
                </div>
            </div>
        );
    }

    return (
        <div className="round base-container">
            <h2>Result of Round {game.currentRoundPlayed || " "}/{game.numberOfRoundsToPlay || " "}</h2>
            {eventDisplay}
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <div className="round wrapper">
                        <h2>{chart.fromCurrency || " "}/{chart.toCurrency || " "}</h2>
                        <RenderLineChart data={data} />
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <InfoBox
                                className="infoBox result wrapper"
                                header="You bet"
                                event={betType}
                                number={result.bettingAmount}
                                unit="coins"
                                height="100%"
                            >
                            </InfoBox>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoBox
                                className="infoBox result wrapper"
                                header="The Currency went"
                                number={arrow || undefined}
                                unit={move || undefined}
                                height="100%"
                            >
                            </InfoBox>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoBox
                                className="infoBox result wrapper"
                                header="Outcome"
                                number={profit}
                                unit="coins"
                                height="100%"
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
                                number={game.timer || undefined}
                                unit="secs"
                            >
                            </InfoBox>
                        </Grid>
                        <Grid item xs={6}>
                            <InfoBox
                                header="My Balance"
                                number={player.accountBalance}
                                unit="coins"
                            >
                            </InfoBox>
                        </Grid>
                    </Grid>
                    {occurred_powerups}
                    <TableFinalRanking />
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
            <div style={{ marginBottom: '20px' }}></div>
        </div>
    );
}

export default GameResult;