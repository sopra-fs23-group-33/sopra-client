import * as React from "react";
import "styles/views/GameRound.scss";
import "styles/ui/Text.scss";
import Button from "../ui/Button";
import {useHistory} from "react-router-dom";


const Rulebook = () => {
    const history = useHistory();
    const username = localStorage.getItem("username")

    return (
        <div className="round base-container">
            <br/>
            <h1 align="center">Game Rules</h1>
            <br/>
            <div className="round wrapper" >
                <h2 align="center">The Idea</h2>
                <p>
                    Did you just finish <i>The Wolf of Wall Street</i> and you're feeling cocky?
                    Do you think you can spot a Head and Shoulders trading pattern? And the breaking of the support level?
                    Boy, do we have a game for you, <em><u>{username}</u></em> - put your
                    intuition and knowledge about financial trading to the test with
                </p>
                <h3 align="center"><span className="bull-text">BULL</span> V<span className="dollar">$</span>. <span className="bear-text">BEAR</span> - The Battle</h3>
                <p>
                    ... a gamified application that lets you place bets on the evolution of the
                    price of up to 200 currency pairs and see how you measure up.
                </p>

                <h2 align="center">How It Works</h2>
                <p>
                    Join an existing Game Room from the Dashboard or create a new one. In case of the latter; Give it a name
                    so your friends can recognize it and choose how many of them you want to play with and for how many rounds.
                    But if you are tired of your friends or don't have any, you can also play alone...
                </p>
                <p>Wait in the Game Lobby for everyone to join you and then the money can be made!</p>
                <p>
                    At the beginning of the game, you are allocated <span className="dollar">1000</span> coins to kickstart your investment banking career.
                    In each of the following rounds you will have the possibility to bet your "hard-earned" capital (actually
                    customer funds) on the evolution of certain Forex products. The main objective is - obviously - to finish
                    the game as rich as possible and have more coins than any of your snobby competitors. A word of advice for the
                    risk-lovers among you, though: if you go bankrupt (that is, if your coin balance goes negative) you will
                    automatically loose the game.
                </p>
                <p>
                    Let's see the workings in more detail: In each round of the game you will be presented with
                    a plot of the price evolution of a currency pair for a span of 2.5 trading days, simultaneously
                    setting off a countdown timer. In the following 15 seconds you will have to
                    assess the course of the financial product and place a bet. You place a bet by writing the amount
                    of coins you are willing to risk, and the direction of the bet. If you go <span className="green-text">LONG</span>, you are
                    betting that the currency will follow an upward trend in the near future. If you place a <span className="red-text">SHORT</span> order,
                    you are betting on a price fall.
                </p>
                <p>
                    After all the players have placed their bets, or the countdown timer hits 0, the plot is expanded to show
                    the evolution for one further day. That's the moment where your profit or loss for the round is calculated,
                    and you either realize you should pick up a job at Goldman Sachs or just stick to playing cards.
                    At this moment, your coin balance is updated with the result of this round, and you also
                    have a peek at how the other players, if there are any, are faring. This goes on for as many rounds as you
                    chose in the game setup. In the end, the final ranking will show who of you and your friends
                    has a future as a professional trader!
                </p>

                <h2 align="center">How to Spice Things Up</h2>
                <p>
                    If the thrilling world of Forex Trading is not enough to fire your dopamine receptors,
                    consider enabling Power-Ups and Events. Notice that, due to their nature, some of them
                    are only available during multiplayer.
                </p>
                <h3 className="dollar underline">Power-Ups</h3>
                <p>
                    Power-Ups are special abilities that you can activate anytime to your benefit.
                    At the beginning of the game you are randomly allocated as many Power-Ups as rounds the game has.
                    Let's take a look at each one of them:
                </p>
                <ul>
                    <li><b>X2, X5, X10</b>: Activate these Power-Ups to multiply your gain or loss by a constant factor.</li>
                    <li><b>Plus 100, 200, 500, 1000</b>: These Power-Ups add the specified number of coins to your account. As simple as that.</li>
                    <li><b>Risk Insurance</b>: All the rush without the risk! In case of loss your balance won't be affected.</li>
                    <li><b>High Risk High Reward 100, 200, 500</b>: In case of profit, you get a flat-rate, one-off bonus of the specified amount of coins.
                        In case of loss, the specified amount is deducted.</li>
                    <br/>
                    <li><b>Robin Hood</b>: Activate this Power-Up to steal from the leading player and redistribute the stash among the rest of players.</li>
                    <li><b>Guardian</b>: Use it if peasants try to take your riches away - it protects you against <b>Robin Hood</b>. <i>Only useful, when you're #1.</i></li>
                    <br/>
                    <li><b>Hacker</b>: Robin', but without the Hood. You steal from the leading player and keep it to yourself.</li>
                    <li><b>Cyber Security</b>: One more tool to keep the money where it belongs. It renders the <b>Hacker</b> useless. <i>Only useful, when you're #1.</i></li>
                    <br/>
                    <li><b>Life Line</b>: Just when you thought you were done for... In case of bankruptcy, half of your initial balance is restored.</li>
                    <li><b>Incendiary</b>: Some people just want to see the world burn. An unlucky player sees their balance eradicate to flat 0.
                        There is a way out though: You can get coins for example with a <b>Plus 200</b> Power-Up if available. <i>Yes, investment bankers NEVER die!</i></li>
                </ul>

                <h3 className="dollar underline">Events</h3>
                <p>
                    Events are similar to Power-Ups, except that out of your control. They randomly occur during the game
                    without anyone setting them off. There are different types:
                </p>
                <ul>
                    <li><b>Wealth Tax</b>: There's nowhere to hide, the taxation authority takes away 10% of your balance.</li>
                    <li><b>Interest</b>: Favourable winds blow (and interest rates are sky-high) and you collect 10% interest on your balance.</li>
                    <li><b>Stimulus</b>: Governmental authorities, worried that you're loosing welfare, give everyone a lump-sum subsidy of 100 coins.</li>
                    <li><b>Bailout</b>: Gotta take care of the too-big-to-fail! Those with losses see their bets restored to 0.</li>
                    <li><b>Winners win more</b>: Due to money's gravitational pull, those with profits get twice as many coins.</li>
                    <li><b>Losers loose more</b>: When it rains, it pours. Those who had losses loose twice as much.</li>
                    <li><b>TOHUWABOHU</b>: Dadaism sweeps across the Forex markets; account balances get inverted, all active Power-Ups are ignored. <i>Chaos ensured!</i></li>
                </ul>

                <h2 align="center">... and now, GET 'YA RICHE<span className="dollar">$</span>, <em><u>{username}</u></em> !</h2>
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

export default Rulebook;