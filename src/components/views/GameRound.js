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
import {leaveGame} from "../../helpers/Utilities";
import Game from "../../models/Game";
import Player from "../../models/Player";
import Chart from "../../models/Chart";


const GameRound = () => {

    const history = useHistory();
    const gameID = localStorage.getItem("gameID");
    const playerID = localStorage.getItem("playerID");
    const [game, setGame] = useState(new Game());
    const [player, setPlayer] = useState(new Player());
    const [chart, setChart] = useState(new Chart());

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const responseGame = await api_with_token().get("/games/" + gameID + "/status");
                setGame(responseGame.data);
                if (game.status === "RESULT") {
                    history.push("/game/result");
                } else if (game.status === "CORRUPTED") {
                    await leaveGame(history);
                }
            } catch (error) {
                console.log(error);
            }
        }, apiRequestIntervalGameRound);

        return () => clearInterval(intervalId);


    }, [game, history, gameID]);

    useEffect(() => {
        async function updateData() {
            try {
                // Get player data
                const responsePlayer = await api_with_token().get("/players/" + playerID);
                setPlayer(responsePlayer.data);
                // Get chart data
                const responseChart = await api_with_token().get("/games/" + gameID + "/chart");
                setChart(responseChart.data);
            } catch (error) {
                console.error(`Something went wrong while fetching data: \n${handleError(error)}`);
                console.error("Details:", error);
                // alert("Something went wrong while fetching data.");
            }
        }

        void updateData();

    }, [playerID, gameID]);

    let numbers = [];
    let dates = [];
    if (chart.numbers !== null) {
        numbers = chart.numbers;
        dates = chart.dates;
    }

    let data = dates.map((date, index) => {
        const time = date.split(' ')[1].split(':');
        const formattedDate = time[0] + ':' + time[1];
        return { date: formattedDate, value: numbers[index] };
    });

    let powerUps;
    if (game.powerupsActive === true) {
        powerUps = <TablePowerups/>
    }


    return (
        <div className="round base-container">
            <h2>Round {game.currentRoundPlayed || " "}/{game.numberOfRoundsToPlay || " "}</h2>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <div className="round wrapper">
                        <h2>{chart.fromCurrency || "fromCurrency"}/{chart.toCurrency || "toCurrency"}</h2>
                        <RenderLineChart data={data} />
                    </div>
                    <Betting balance={player.accountBalance}/>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InfoBox
                                header="Time left"
                                number={game.timer}
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
                    {powerUps}
                </Grid>
            </Grid>
        </div>
    );
}

export default GameRound;
