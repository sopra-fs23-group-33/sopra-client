import * as React from "react";
import "styles/views/GameRound.scss";
import Button from "../ui/Button";
import {useHistory} from "react-router-dom";


const Rulebook = () => {
    const history = useHistory();

    return (
        <div className="round base-container">
        <div className="round wrapper" >
            <h1 align="center">Game Rules</h1>
            <h2 align="center">The Idea</h2>
            <p> Did you just finish The Wolf of Wall Street and you're feeling cocky?
                Do you think you can spot a Head and Shoulders trading pattern? And the breaking of the support level?
                Boy do we have a game for you - put your intuition and knowledge about financial trading to the
                test with Bull V$ Bear - The Battle, a gamified application that lets you place bets on the evolution of the
                price of up to 200 currency pairs and see how you measure up.
            </p>

            <h2 align="center">How It Works</h2>
            <p> Join an existing Game Room from the dashboard or create a new one. In case of the latter; Give it a name
                so your friends can recognize it and choose how many of them you want to play with and for how many rounds.
                But if you are tired of your friends or don't have any, you can also play alone...
            </p>
            <p>Wait in the game Lobby for everyone to join you and then the fun can start!</p>
            <p>At the beginning of the game, you are allocated 1000 coins to kickstart your investment banking career.
                In each of the following rounds you will have the possibility to bet your hard-earned capital on the
                evolution of certain Forex products. The main objective is - obviously - to finish the game as rich as
                possible and have more coins than any of your competitors. A word of advice for the risk-lovers among you,
                though: if you go bankrupt (that is, if your coin balance goes negative) you will automatically loose the game.
            </p>
            <p>Let's see the workings in more detail. In each round of the game you will be presented with
                a plot of the price evolution of a currency pair for a span of 2.5 trading days, simultaneously
                setting off a countdown timer. In the following 15 seconds you will have to
                assess the course of the financial product and place a bet. You place a bet by writing the amount
                of coins you are willing to risk, and the direction of the bet. If you choose long, you are
                betting that the plot will follow an upward trend in the near future. If you place a short order,
                you are betting on a price fall.
            </p>
            <p>After all the players have placed their bets, or the countdown timer hits 0, the plot is expanded to show
                the evolution for one further day. That's the moment where your profit or loss for the round is calculated,
                and you either realize you should pick up a job at Goldman Sachs or that you should stick to playing cards. 
                In this moment, your coin balance is updated with the result of this round, and you also
                have a peek at how the other players, if there are any, are faring. This goes on for as many rounds as you
                chose in the game setup, and in the end, the final ranking will show who of you and your friends
                has a future as a trader!
            </p>

            <h2 align="center">How to Spice Things Up</h2>
            <p> If the thrilling world of Forex Trading is not enough to fire your dopamine receptors,
                consider enabling Power-Ups and Events. Notice that, due to their nature, some of them
                are only available during multiplayer.
            </p>
            <h3>Power-Ups</h3>
            <p> Power-Ups are special abilities that you can activate anytime to your benefit.
                At the beginning of the game you are randomly allocated as many Power-Ups as rounds the game has.
                Let's take a look at each one of them:
            </p>
            <ul>
                <li>X2, X5, X10: Activate these Power-Ups to multiply your gain or loss by a constant factor.</li>
                <li>Plus 100, Plus 200, Plus 500, Plus 1000: These Power-Ups add the specified number of coins into your account. As simple as that.</li>
                <li>Risk Insurance: All the rush without the risk! In case of loss your balance won't be affected.</li>
                <li>Robin Hood: Activate this Power-Up to steal from the leading player and redistribute the stash among the rest of players.</li>
                <li>Guardian: Use it if peasants try to take your riches away - it protects you against Robin Hood.</li>
                <li>Hacker: Robin', but without the Hood. You steal from the leading player and keep it to yourself.</li>
                <li>Cyber Security: One more tool to keep the money where it belongs. It renders the Hacker useless.</li>
                <li>High Risk High Reward 100, 200, 500: In case of profit, you get a flat-rate, one-off bonus of the specified amount of coins.
                    In case of loss, the specified amount is deducted.</li>
                <li>Life Line: Just when you thought you were done for... In case of bankruptcy, half of your initial balance is restored.</li>
                <li>Incendiary: Some people just want to see the world burn. An unlucky player sees their balance drop to flat 0.</li>
            </ul>

            <h3>Events</h3>
            <p>Events are similar to Power-Ups, except that out of your control. They randomly occur during the game
                without anyone setting them off. There are different types:</p>
            <ul>
                <li>Wealth Tax: There's nowhere to hide, the taxation authority takes away 10% of your balance.</li>
                <li>Interest: Favourable winds blow (and interest rates are sky-high) and you collect 10% interest on your balance.</li>
                <li>Stimulus: Governmental authorities, worried that you're loosing welfare, give everyone a lump-sum subsidy of 100 coins.</li>
                <li>Bailout: Gotta take care of the too-big-to-fail! Those with losses see their bets restored to 0.</li>
                <li>Winners win more: Due to money's gravitational pull, those with profits get twice as many coins.</li>
                <li>Losers lose more: When it rains, it pours. Those who had losses loose twice as much.</li>
                <li>Tohuwabohu: Dadaism sweeps across the Forex markets, account balances get inverted, all active Power-Ups are ignored, chaos ensures.</li>
            </ul>

            <h2 align="center">Have Fun!</h2>
            <p align="center">
                <Button onClick={() => history.push("/dashboard")}>Back to Dashboard</Button>
            </p>
        </div>
        </div>
    );
}

export default Rulebook;