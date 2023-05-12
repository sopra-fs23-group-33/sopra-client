import * as React from "react";
import "styles/views/GameRound.scss";
import "styles/ui/Text.scss";
import Button from "../ui/Button";
import {useHistory} from "react-router-dom";


const About = () => {
    const history = useHistory();

    return (
        <div className="round base-container">
            <br/>
            <h1 align="center">About</h1>
                <br/>
                <div className="round wrapper" >
                <h2 align="center">About the Game</h2>
                <p>
                        <em><span className="bull-text">BULL</span> V<span className="dollar">$</span>. <span className="bear-text">BEAR</span> - The Battle</em> is a gamified
                        application that lets you have fun while simultaneously making yourself familiar with trading, risk management and financial patterns. A crucial 
                        aspect is that you are not confronted with synthetic data, but rather with real and up-to-date exchange currency courses - as fresh as some hours
                        ago.
                    </p>

                    <p>
                        Gamification features such as power-ups, events, round structure and time pressure make for an exciting experience. Even more
                        exciting if played in multiplayer mode with some friends. For a detailed description of how the game actually works, check
                        out the Rulebook.
                    </p>
                <div align="center">
                    <Button
                        className="leave-button"
                        onClick={() => history.push("/rulebook")}
                    >
                        More about the rules
                    </Button>
                </div>

            <h2 align="center">About the Project</h2>
            <p>
                This online game came to life during the late winter and early spring of 2023, as a student project for the course <em>Softwarepraktikum</em> at the UZH, motivated by our interest
                in the workings of the financial markets.
                By now and in the near future, the game is free to play, without ads and at no cost for you. In the future however, we may consider keeping a share of the gainzzz you make
                in your trades, as a brokerage fee.
            </p>

            <p>
                You are very welcome to come by our <a href="https://github.com/orgs/sopra-fs23-group-33/repositories">GitHub project</a> to request any new features, report bugs, contribute or
                just say hi.
            </p>

            <h2 align="center">About the People Behind</h2>
            <p>
            <em><span className="bull-text">BULL</span> V<span className="dollar">$</span>. <span className="bear-text">BEAR</span> - The Battle</em> 
                was designed, developed and implemented by the following actual humans:
            </p>
            <ul>
                <li><b>Christian Berger​</b> [@c-b123],</li>
                <li><b>Maria Letizia Jannibelli ​</b> [@Marlet12],</li>
                <li><b>Josep Cunquero Orts​</b> [@COrtsJosep],</li>
                <li><b>Stefan Richard Saxer </b> [@stsaxe], and</li>
                <li><b>Cedric Egon Von Rauscher​</b> [@cedric-vr],</li>
            </ul>

            <p>
                under the supervision of Jerome Meier, and using as a starting point the client and server templates provided by Luis Torrejón, Roy Rutishauser and Dennys Huber. 
            </p>
            <div align="center">
                <Button
                    className="leave-button"
                    onClick={() => history.push("/dashboard")}
                >
                    Back to Dashboard
                </Button>
            </div>
            </div>
        </div>
    );
}

export default About;
