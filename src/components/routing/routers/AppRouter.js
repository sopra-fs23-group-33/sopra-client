import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import {RegisterGuard} from "components/routing/routeProtectors/RegisterGuard";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";

import Login from "../../views/Login";
import Dashboard from "../../views/Dashboard";
import Register from "../../views/Register";
import GameStart from "../../views/GameStart";
import GameLobby from "../../views/GameLobby";
import SessionResult from "../../views/SessionResult";
import GameRound from "../../views/GameRound";
import Leaderboard from "../../views/Leaderboard";
import Rulebook from "../../views/Rulebook";
import About from "../../views/About";
import GameResult from "../../views/GameResult";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard">
                    <GameGuard>
                        <Dashboard/>
                    </GameGuard>
                </Route>
                <Route path="/game/start">
                    <GameGuard>
                        <GameStart/>
                    </GameGuard>
                </Route>
                <Route path="/game/lobby">
                    <GameGuard>
                        <GameLobby/>
                    </GameGuard>
                </Route>
                <Route path="/game/round">
                    <GameGuard>
                        <GameRound/>
                    </GameGuard>
                </Route>
                <Route path="/game/result">
                    <GameGuard>
                        <GameResult/>
                    </GameGuard>
                </Route>
                <Route path="/game/session-result">
                    <GameGuard>
                        <SessionResult/>
                    </GameGuard>
                </Route>
                <Route path="/leaderboard">
                    <GameGuard>
                        <Leaderboard/>
                    </GameGuard>                    
                </Route>
                <Route path="/rulebook">
                    <GameGuard>
                        <Rulebook/>
                    </GameGuard>  
                </Route>
                <Route path="/about">
                    <GameGuard>
                        <About/>
                    </GameGuard>  
                </Route>
                <Route path="/register">
                    <RegisterGuard>
                        <Register/>
                    </RegisterGuard>
                </Route>
                <Route exact path="/login">

                        <Login/>

                </Route>
                <Route exact path="/">
                    <Redirect to="/login"/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
export default AppRouter;