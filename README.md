<img width="1168" alt="Logo" src="https://github.com/sopra-fs23-group-33/sopra-client/assets/80516573/a5b31c18-e415-4dfc-ad79-3bc1491cb5f1">
&nbsp;

Bull V$. Bear - the Battle is a PvP game that aims to provide an interactive and educational experience in the world of forex trading. This game brings together multiple players who compete against each other by placing bets on currency pairs. The motivation behind developing Bull V$. Bear - the Battle was to create a platform that combines the excitement of PvP gameplay with the fundamental understanding of chart analysis, long positions, and short positions in the financial market.

## Technologies

* ReactJS
* JavaScript
* MUI
* HTML & CSS
* Recharts
* AXIOS API

## High-level components

After [registering](src/components/views/Register.js) or [login](src/components/views/Login.js) in, the user lands on the [dashboard](src/components/views/Dashboard.js) page, from there, they can join an existing game room, make a new one or look at the [rules](src/components/views/Rulebook.js), [about](src/components/views/About.js) page or the [leaderboard](src/components/views/Leaderboard.js).
When creating a [new game room](src/components/views/GameStart.js), the game parameters (number of players & rounds, powerups and events) can be choosen. After this, the creator and anybody joining from the dashboard is redirected to the [lobby](src/components/views/GameLobby.js). When erveryone is ready, the first round can be launched. After starting the game, the players will see the [game round](src/components/views/GameRound.js) screen with a chart, a betting field, their current balance, a timer and (depending on the game mode) a list of available power-ups.
After the completion of a round, the [round results](src/components/views/GameResult.js) are displayed before moving on to the next round. After all rounds have been played, a [summary](src/components/views/SessionResult.js) of the entire game session is shown.

<img width="1350" alt="Screenshot 2023-05-20 at 10 53 52" src="https://github.com/sopra-fs23-group-33/sopra-client/assets/80516573/8a1c4c8d-7390-4bbf-9cc8-7bfc6aac9ff8">

<img width="1338" alt="Screenshot 2023-05-20 at 10 49 41" src="https://github.com/sopra-fs23-group-33/sopra-client/assets/80516573/29ae94cf-4780-4df5-b099-77eb81cb2f82">

<img width="1338" alt="Screenshot 2023-05-20 at 10 50 02" src="https://github.com/sopra-fs23-group-33/sopra-client/assets/80516573/f95db9bd-c880-409c-8e44-17fa4085208c">

<img width="1333" alt="Screenshot 2023-05-20 at 10 50 25" src="https://github.com/sopra-fs23-group-33/sopra-client/assets/80516573/d2bae8b1-9a07-4f8d-aa76-ae9c9bc3da3f">

<img width="1434" alt="Screenshot 2023-05-20 at 10 51 54" src="https://github.com/sopra-fs23-group-33/sopra-client/assets/80516573/5a0fcf88-30c6-4319-be49-4ef39e855cd4">

## Launch & Deployment

To set up your local development environment, Node.js has to be installed (download [here](https://nodejs.org))
Install all other dependencies, including React, using:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Finally, 
```npm run build``` 
builds the app for production to the `build` folder.<br>

The application is hosted on Google Clouds App engine and is deployed automatically with every push to the main branch.

## Roadmap
Potentially interesting additions to our project could be:
- Implementation of Websockets
- Tracking and displaying the effects of powerups (e.g., track who was affected by a powerup and how)  
- Adding stocks in addition to forex

## Authors and Acknowledgments

This game was possible thanks to following students, who designed and implemented it for the bachelor course **Software Engineering Lab** at UZH, spring 2023.

* **Cedric Egon Von Rauscher** - *Frontend*
* **Christian Berger** - *Frontend*
* **Maria Letizia Jannibelli** - *Frontend*
* **Stefan Richard Saxer** - *Backend*
* **Josep Cunquero Orts** - *Backend*

We are grateful to Jerome Maier for his consistently helpful guidance and insightful comments.

## License

This project is licensed under [Apache-2.0](LICENSE).


