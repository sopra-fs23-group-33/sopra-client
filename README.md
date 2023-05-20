# Bull V$ Bear

<img width="1168" alt="Logo" src="https://github.com/sopra-fs23-group-33/sopra-client/assets/80516573/a5b31c18-e415-4dfc-ad79-3bc1491cb5f1">

Bull V$. Bear - the Battle is a PvP game that aims to provide an interactive and educational experience in the world of forex trading. This game brings together multiple players who compete against each other by placing bets on currency pairs. The motivation behind developing Bull V$. Bear - the Battle was to create a platform that combines the excitement of PvP gameplay with the fundamental understanding of chart analysis, long positions, and short positions in the financial market.

## Technologies
[//]:  (GitHub)

[//]: # (SonarCube)

[//]: # (NPM)

[//]: # (MUI)

[//]: # (* [Dropwizard]&#40;http://www.dropwizard.io/1.0.2/docs/&#41; - The web framework used)

[//]: # (* [Maven]&#40;https://maven.apache.org/&#41; - Dependency Management)

[//]: # (* [ROME]&#40;https://rometools.github.io/rome/&#41; - Used to generate RSS Feeds)

## High-level components


### Launch & Deployment

For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## Contributing

[//]: # (Please read [CONTRIBUTING.md]&#40;https://gist.github.com/PurpleBooth/b24679402957c63ec426&#41; for details on our code of conduct, and the process for submitting pull requests to us.)

## Versioning

[//]: # (We use [SemVer]&#40;http://semver.org/&#41; for versioning. For the versions available, see the [tags on this repository]&#40;https://github.com/your/project/tags&#41;.)

## Authors

This game was possible thanks to following students, who designed and implemented it for the bachelor course **Software Engineering Lab** at UZH, spring 2023.

* **Cedric Egon Von Rauscher** - *Frontend*
* **Christian Berger** - *Frontend*
* **Maria Letizia Jannibelli** - *Frontend*
* **Stefan Richard Saxer** - *Backend*
* **Josep Cunquero Orts** - *Backend*


## License

[//]: # (This project is licensed under the MIT License - see the [LICENSE.md]&#40;LICENSE.md&#41; file for details)

## Acknowledgments
We are grateful to Jerome Maier for his consistently helpful guidance and insightful comments.




-----------------------------------

# Bull V$ Bear
## The Idea
Did you just finish The Wolf of Wall Street and you're feeling cocky? Do you think you can spot a Head and Shoulders trading pattern? And the breaking of the support level? Boy do we have a game for you - put your intuition and knowledge about financial trading to the test with Bull V$ Bear - The Battle, a gamified application that lets you place bets on the evolution of the price of up to 200 currency pairs and see how you measure up.

## How It Works
Join an existing Game Room from the dashboard or create a new one. In case of the latter; Give it a name so your friends can recognize it and choose how many of them you want to play with and for how many rounds. But if you are tired of your friends or don't have any, you can also play alone...

Wait in the game Lobby for everyone to join you and then the fun can start!

At the beginning of the game, you are allocated 1000 coins to kickstart your investment banking career. In each of the following rounds you will have the possibility to bet your hard-earned capital on the evolution of certain Forex products. The main objective is - obviously - to finish the game as rich as possible and have more coins than any of your competitors. A word of advice for the risk-lovers among you, though: if you go bankrupt (that is, if your coin balance goes negative) you will automatically loose the game.

Let's see the workings in more detail. In each round of the game you will be presented with a plot of the price evolution of a currency pair for a span of 2.5 trading days, simultaneously setting off a countdown timer. In the following 15 seconds you will have to assess the course of the financial product and place a bet. You place a bet by writing the amount of coins you are willing to risk, and the direction of the bet. If you choose long, you are betting that the plot will follow an upward trend in the near future. If you place a short order, you are betting on a price fall.

After all the players have placed their bets, or the countdown timer hits 0, the plot is expanded to show the evolution for one further day. That's the moment where your profit or loss for the round is calculated, and you either realize you should pick up a job at Goldman Sachs or that you should stick to playing cards.  In this moment, your coin balance is updated with the result of this round, and you also have a peek at how the other players, if there are any, are faring. This goes on for as many rounds as you chose in the game setup, and in the end, the final ranking will show who of you and your friends has a future as a trader!

## How to Spice Things Up
If the thrilling world of Forex Trading is not enough to fire your dopamine receptors, consider enabling Power-Ups and Events. Notice that, due to their nature, some of them are only available during multiplayer.

### Power-Ups
Power-Ups are special abilities that you can activate anytime to your benefit. At the begining of the game you are randomly allocated as many Power-Ups as rounds the game has. Let's take a look at each one of them:
- X2, X5, X10: Activate these Power-Ups to multiply your gain or loss by a constant factor.
- Plus 100, Plus 200, Plus 500, Plus 1000: These Power-Ups add the specified number of coins into your account. As simple as that.
- Risk Insurance: All the rush without the risk! In case of loss your balance won't be affected.
- Robin Hood: Activate this power-up to steal from the leading player and redistribute the stash among the rest of players.
- Guardian: Use it if peasants try to take your riches away - it protects you against Robin Hood.
- Hacker: Robin', but without the Hood. You steal from the leading player and keep it to yourself.
- Cyber Security: One more tool to keep the money where it belongs. It renders the Hacker useless.
- High Risk High Reward 100, 200, 500: In case of profit, you get a flat-rate, one-off bonus of the specified amount of coins. In case of loss, the specified amount is deducted.
- Life Line: Just when you thought you were done for... In case of bakrupcy, half of your initial balance is restored.
- Incendiary: Some people just want to see the world burn. An unlucky player sees their balance drop to flat 0.

### Events
Events are similar to Power-Ups, except that out of your control. They randomly occur during the gamethrough without anyone setting them off. There are different types:
- Wealth Tax: There's nowhere to hide, the taxation authority takes away 10% of your balance.
- Interest: Favourable winds blow (and interest rates are sky-high) and you collect 10% interest on your balance.
- Stimulus: Governmental authorities, worried that you're loosing welfare, give everyone a lump-sum subsidy of 100 coins.
- Bailout: Gotta take care of the too-bigs-to-fail! Those with losses see their bets restored to 0.
- Winners win more: Due to money's gravitational pull, those with profits get twice as many coins.
- Loosers lose more:  When it rains, it pours. Those who had losses loose twice as much.
- Tohuwabohu: Dadaism sweeps across the Forex markets, account balances get inverted, all active powerups are ignored, chaos ensures.


