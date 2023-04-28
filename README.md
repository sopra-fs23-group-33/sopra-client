# Bull V$ Bear
## The Big Idea
Do you think you can spot a _Head and Soulders_ trading pattern? And the breaking of the _support level_? Did you just finish The Wolf of Wall Street and you're feeling cocky? Boy do we have a game for you - put your intuition and knowledge about financial trading to the test with Bull V$ Bear, a gamified application that lets you place bets on the evolution of the price of up to 200 currencies (or currency pairs? to be fact checked) and measure your accuracy.

## What You'll Need
Create an account with only username and password, get some friends to do the same (or don't, you can also play singleplayer), create a game room, launch, and go!

## The Workings of the Game
At the begining of the game, you are allocated 1000 coins to kickstart your investment banking career. In each of the following rounds you will have the possibility to bet your hard-earned capital on the evolution of certain Forex products. The main objective is to finish the game with the maximum amount of coins possible. A word of advice for the risk-lovers among you, though: if you go bankrupt (that is, if your coin balance goes negative) you will automatically loose the game.

Let's see the concrete workings in more detail. In each round of the game you will be presented with a plot of the price evolution of a currency pair for a span of 5 (fact check?) days, simultaneously setting off a time counter. In the following 15 (flexible in the future?) seconds you will have to assess the course of the financial product and place a bet. You place a bet by writing the amount of coins you are willing to risk, and the direction of the bet. If you place a long order, you are betting that the plot will follow an upward trend in the near future. If you place a short order, you are betting on a price fall. 

After all the players have placed their bets, or the time counter hits 0, the plot is expanded to show the evolution for one further day. That's the moment where your profit/loss for the round is calculated, and you realize you should pick up a job at Goldman Sachs (or that you should stick to playing cards, respectively). In this moment, your coin balance is updated with the result of this round, and you also have a peek on how the other players, if any, are faring.
This schema goes on for as many rounds as you chose in the game configuration screen, and in the end, the final ranking with some statistics is displayed.

## How to Spice Things Up
If the thrilling world of Forex Trading is not enough to fire your dopamine receptors, consider enabling Power-Ups and Events. Notice that, due to their nature, some of them are only available during multiplayer.

### Power-Ups
Power-Ups are special abilities that you can activate anytime to your benefit. At the begining of the game you are randomly allocated as many power-ups as rounds the game has. Let's take a look at each one of them:
- X2, X5, X10: Activate these power-ups to multiply your gain or loss by a constant factor.
- Plus 100, Plus 200, Plus 500, Plus 1000: These power-ups add the specified number of coins into your account. As simple as.
- Risk Insurance: All the rush without the hassle! In case of loss your balance won't be affected.
- Robin Hood: Activate this power-up to steal from the leading player and redistribute the stash among the rest of players.
- Guardian: Use it if peasants try to take your riches away - it protects you against Robin Hood.
- Hacker: Robin', but without the Hood. You steal from the leading player and keep it to yourself.
- Cyber Security: One more tool to keep the money where it belongs. It renders the Hacker useless.
- High Risk High Reward 100, 200, 500: In case of profit, you get a flat-rate, one-off bonus of the specified amount of coins. In case of loss, the specified amount is deducted.
- Life Line: Just when you thought you were done for... In case of bakrupcy, half of your initial balance is restored.
- Incendiary: Some people just want to see the world burn. An unlucky player sees their balance drop to flat 0.

### Events
Events are similar to power-ups, except that out of your reach. They randomly occur during the gamethrough without anyone setting them off. There are different types:
- Wealth Tax: There's nowhere to hide, the taxation authority takes away 10% of your balance.
- Interest: Favourable winds blow (and interest rates are sky-high) and you collect 10% interest on your balance.
- Stimulus: Governmental authorities, worried that you're loosing welfare, give everyone a lump-sum subsidy of 100 coins.
- Bailout: Gotta take care of the too-bigs-to-fail! Those with losses see their bets restored to 0.
- Winners win more: Due to money's gravitational pull, those with profits get twice as many coins.
- Loosers lose more:  When it rains, it pours. Those who had losses loose twice as much.
- Tohuwabohu: Dadaism sweeps across the Forex markets, account balances get inverted, all active powerups are ignored, chaos ensures.


## Credits
This game was possible thanks to (ask for consent), who designed and implemented it for the course Softwarepraktikum at the UZH, spring 2023.

-----------------------------------

# SoPra FS23 - Client Template with build pack

## Getting started

Read and go through these Tutorials. It will make your life easier:)

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](https://www.w3schools.com/Css/), [SCSS](https://sass-lang.com/documentation/syntax), and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Next, there are two other technologies that you should look at:

* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) offers declarative routing for React. It is a collection of navigational components that fit nicely with the application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) let you access the router's state and perform navigation from inside your components.

## Prerequisites and Installation
For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
Testing is optional, and you can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).


> Thanks to Lucas Pelloni and Kyrill Hux for working on the template.
