// import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {handleError, api_with_token} from "../../../helpers/api";
import TableList from "../TableList";
import "styles/_theme.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import "styles/ui/TableContainer.scss";

const Game = ({game}) => (
    <tr className="table user-overview row">
        <td className="table user-overview id">{game.gameID}</td>
        <td className="table user-overview username">{game.name}</td>
        <td className="table user-overview status">{game.totalLobbySize}</td>
    </tr>
);

Game.propTypes = {
    game: PropTypes.object
};


export default function TableUserOverview() {
    // const history = useHistory();
    const [games, setGames] = useState(null);

    useEffect(() => {

        async function fetchGameData() {
            try {
                const response = await api_with_token().get('/games');
                setGames(response.data);

                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the games: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Something went wrong while fetching the games! See the console for details.");

                // history.push('/login');
            }
        }

        fetchGameData();
    },);

    return (
        <div className="table-wrapper table">
            {games ? (
                <TableList>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lobby Name</th>
                        <th>Size</th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map(game => (
                        <Game game={game} key={game.gameID} />
                    ))}
                    </tbody>
                </TableList>
            ) : (
                <p>Loading Games...</p>
            )}
        </div>

    );
}
