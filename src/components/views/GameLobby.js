import "styles/_theme.scss";
import React, {useEffect, useState} from "react";
import 'styles/views/GameLobby.scss';
import TableJoinedPlayers from "../ui/GameLobby/TableJoinedPlayers";
import Button from "../ui/Button";
import {api_with_token} from "../../helpers/api";
import {useHistory} from "react-router-dom";
import Game from "../../models/Game";
import {apiRequestIntervalGameRound} from "../../helpers/apiFetchSpeed";
import {leaveGame} from "../../helpers/Utilities";
import {PieChart} from "react-minimal-pie-chart";
import InfoBox from "../ui/GameRound&GameResult_ui/InfoBox";
import BullBearBackground from "../ui/LoginRegister/BullBearBackground";


const GameLobby = () => {

    const history = useHistory();
    const gameID = JSON.parse(localStorage.getItem("game"))?.gameID;
    const creator = JSON.parse(localStorage.getItem("game"))?.creator;
    const [game, setGame] = useState(new Game());

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const responseGame = await api_with_token().get("/games/" + gameID + "/status");
                setGame(responseGame.data);
                if (game.status === "BETTING") {
                    history.push("/game/round");
                } else if (game.status === "CORRUPTED") {
                    await leaveGame(history);
                }
            } catch (error) {
                console.log(error);
            }
        }, apiRequestIntervalGameRound);

        window.addEventListener("beforeunload", leaveGame);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("beforeunload", leaveGame);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game, history]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            leaveGame(history);
            console.log("Automatic redirection to Dashboard due to inactivity.")
        }, 480000);  // 8 minutes

        return () => clearTimeout(timeoutId);
    }, [history]);

    const startGame = async () => {
        try {
            await api_with_token().post("/games/" + gameID + "/start");
            history.push("/game/round");
        } catch (error) {
            // alert(`Game did not start: \n${handleError(error)}`);
        }
    };

    const notEnoughPlayersInLobby = () => {
        return game.numberOfPlayersInLobby < 2 && game.typeOfGame === "MULTIPLAYER";
    };

    let startMessage;
    if (notEnoughPlayersInLobby()) {
        startMessage = (
            <><br/><p>need at least 2 players to start multiplayer game</p></>
        )
    }
    else {
        startMessage = (
            <><br/><p>ready to make those <span className="dollar">$$$</span> ?</p></>
        )
    }

    let startButton;
    let leaveButton;
    if (creator === JSON.parse(localStorage.getItem("user"))?.username) {
        startButton =
        <Button
            className="leave-button"
            width="100%"
            onClick={() => startGame()}
            disabled={notEnoughPlayersInLobby()}>
            Start Game
        </Button>

        leaveButton =
        <Button
            className="leave-button"
            width="100%"
            onClick={() => leaveGame(history)}>
            Delete Game Room
        </Button>;
    } else {
        leaveButton =
        <Button
            className="leave-button"
            width="100%"
            onClick={() => leaveGame(history)}>
            Leave Game Room
        </Button>;
    }

    let pieChartPlayers =
        <div className="pieChart-container">
            <PieChart
                data={[
                    {title: `numberOfPlayersInLobby`, value: game.numberOfPlayersInLobby, color: '#eed300'}
                ]}
                reveal={game.numberOfPlayersInLobby / game.totalLobbySize * 100}
                radius={50}
                lineWidth={25}
                background={'#f5f5f5'}
                startAngle={132.5}
                lengthAngle={275}
                rounded
                animate
                label={({dataEntry}) => dataEntry.value !== null && game.totalLobbySize !== null ? dataEntry.value + "/" + game.totalLobbySize: " "}
                labelStyle={(index) => ({
                    fill: [
                        {title: `numberOfPlayersInLobby`, value: game.numberOfPlayersInLobby, color: '#ffffff'}
                    ][index].color,
                    fontSize: '20px',
                })}
                labelPosition={0}
            />
        </div>

    let pieChartRounds =
        <div className="pieChart-container">
            <PieChart
                data={[
                    {title: `numberOfRoundsToPlay`, value: game.numberOfRoundsToPlay, color: '#eed300'}
                ]}
                reveal={game.numberOfRoundsToPlay / 8 * 100}
                radius={50}
                lineWidth={25}
                background={'#f5f5f5'}
                startAngle={132.5}
                lengthAngle={275}
                rounded
                animate
                label={({dataEntry}) => dataEntry.value}
                labelStyle={(index) => ({
                    fill: [
                        {title: `numberOfPlayersInLobby`, value: game.numberOfRoundsToPlay, color: '#ffffff'}
                    ][index].color,
                    fontSize: '20px',
                })}
                labelPosition={0}
            />
        </div>

    return (
        <div className="gl container">
            <div className="gl primary-container">
                <div className="gl secondary-container">
                    <h2>Game Room of '{game.name}'</h2>
                    <div className="gl third-container">
                        <InfoBox
                            className="infoBox lobby wrapper"
                            header="Rounds to Play"
                            number={pieChartRounds}
                            unit={null}
                            height="100%"
                        >
                        </InfoBox>
                        <TableJoinedPlayers/>
                        <InfoBox
                            className="infoBox lobby wrapper"
                            header="Joined Players"
                            number={pieChartPlayers}
                            unit={null}
                            height="100%"
                        >
                        </InfoBox>
                    </div>

                    {startMessage}

                    <div className="gl button-container">
                        {startButton}
                        {leaveButton}
                    </div>

                    <BullBearBackground/>

                </div>
            </div>
        </div>
    );
}

export default GameLobby;