import Button from "../ui/Button";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {api_with_token, handleError} from "../../helpers/api";
import TableList from "../ui/TableList";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";


const Player = ({user, highlighted}) => (
    <tr className={`table overview-content sevenColumns ${highlighted ? "highlighted-row" : "row"}`}>
        <td className="table overview-content sevenColumns rank">{user.rank}</td>
        <td className="table overview-content sevenColumns">{user.username}</td>
        <td className="table overview-content sevenColumns">{user.numberOfBetsWon}</td>
        <td className="table overview-content sevenColumns">{user.numberOfBetsLost}</td>
        <td className="table overview-content sevenColumns">{user.totalRoundsPlayed}</td>
        <td className="table overview-content sevenColumns">{user.profit}</td>
        <td className="table overview-content sevenColumns">{(user.winRate * 100).toFixed(2)}%</td>
    </tr>
);

Player.propTypes = {
    user: PropTypes.object,
    highlight: PropTypes.bool
};

const Leaderboard = () => {
    const history = useHistory();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserTotalRounds = JSON.parse(localStorage.getItem("totalRoundsPlayed"));
    const roundsToBeInLeaderboard = 10;

    const [users, setUsers] = useState("");
    const highlightedUsername = loggedInUser.username;
    let topTenUsers = useState([]);

    const [sortColumn, setSortColumn] = useState('winRate'); // initial sorting
    const sortOrder = 'desc';


    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await api_with_token().get("/users/leaderboard");
                setUsers(response.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the leaderboard: \n${handleError(error)}`);
                console.error("Details: ", error);
                // alert("Something went wrong while fetching the leaderboard! See the console for details.");
            }
        }
        fetchLeaderboard();
    }, []);


    // only allow users in leaderboard if played more than 10 games
    const filteredUsers = useMemo(() => {
        if (!users) return null;
        return users.filter(user => user.totalRoundsPlayed >= roundsToBeInLeaderboard);
    }, [users]);

    const handleSort = (column) => {
        if (column !== 'rank' || column !== 'username') {
            setSortColumn(column);
        }
    };

    const sortedUsers = useMemo(() => {
        if (!filteredUsers) return null;

        const sorted = [...filteredUsers].sort((a, b) => {
            const columnA = a[sortColumn];
            const columnB = b[sortColumn];

            if (columnA < columnB) return sortOrder === 'asc' ? -1 : 1;
            if (columnA > columnB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // Always maintain ascending order of rank
        topTenUsers = sorted.slice(0, 10).map((user, i) => ({...user, rank: i + 1}));
        return topTenUsers;
    }, [filteredUsers, sortColumn, sortOrder]);

    function checkIfUserInLeaderboard(users) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === highlightedUsername) {
                return true;
            }
        }
        return false;
    }

    let looserTable;
    if (checkIfUserInLeaderboard(topTenUsers) === false) {
        if (loggedInUserTotalRounds < roundsToBeInLeaderboard) {
            looserTable = (
                <><p>Play at least {roundsToBeInLeaderboard} games to qualify for a position in the Leaderboard!</p><br/></>
            );
        } else {
            looserTable = (
                <>
                    <p>...actually, I was not talking about YOU <em><u>{loggedInUser.username}</u></em> , since you couldn't make it.</p>
                    <div className="table-wrapper table">
                        <TableList>
                            <tbody>
                            <tr className={`table overview-content sevenColumns highlighted-row`}>
                                <td className="table overview-content sevenColumns rank none">LOOSER</td>
                                <td className="table overview-content sevenColumns">{loggedInUser.username}</td>
                                <td className="table overview-content sevenColumns">{loggedInUser.numberOfBetsWon}</td>
                                <td className="table overview-content sevenColumns">{loggedInUser.numberOfBetsLost}</td>
                                <td className="table overview-content sevenColumns">{loggedInUser.totalRoundsPlayed}</td>
                                <td className="table overview-content sevenColumns">{loggedInUser.profit}</td>
                                <td className="table overview-content sevenColumns">{(loggedInUser.winRate * 100).toFixed(2)}%</td>
                            </tr>
                            </tbody>
                        </TableList>
                    </div>
                </>
            );
        }

    } else {
        looserTable = <div/>
    }



    return (
        <div className="db container">
            <div className="db primary-container">
                <div className="db secondary-container">
                    <h1>Leaderboard</h1>
                    <p>you guys should really quit everything and start an investment banking career...</p><br/>
                    <div className="table-wrapper table">
                        {filteredUsers ? (
                            <TableList>
                                <thead>
                                <tr>
                                    <th className={`sevenColumns rank ${sortColumn === 'rank' ? 'clicked' : ''}`}>
                                        Rank
                                    </th>
                                    <th className={sortColumn === 'username' ? 'clicked' : ''}>
                                        Username
                                    </th>
                                    <th className={`leaderboard ${sortColumn === 'numberOfBetsWon' ? 'clicked' : ''}`}
                                        onClick={() => handleSort('numberOfBetsWon')}>Rounds Won {sortColumn === 'numberOfBetsWon' ? '↓' : ''}
                                    </th>
                                    <th className={`leaderboard ${sortColumn === 'numberOfBetsLost' ? 'clicked' : ''}`}
                                        onClick={() => handleSort('numberOfBetsLost')}>Rounds Lost {sortColumn === 'numberOfBetsLost' ? '↓' : ''}
                                    </th>
                                    <th className={`leaderboard ${sortColumn === 'totalRoundsPlayed' ? 'clicked' : ''}`}
                                        onClick={() => handleSort('totalRoundsPlayed')}>Total Rounds {sortColumn === 'totalRoundsPlayed' ? '↓' : ''}
                                    </th>
                                    <th className={`leaderboard ${sortColumn === 'profit' ? 'clicked' : ''}`}
                                        onClick={() => handleSort('profit')}>Total Profit {sortColumn === 'profit' ? '↓' : ''}
                                    </th>
                                    <th className={`leaderboard ${sortColumn === 'winRate' ? 'clicked' : ''}`}
                                        onClick={() => handleSort('winRate')}>Win Rate {sortColumn === 'winRate' ? '↓' : ''}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedUsers.map((user) => (
                                    <Player user={user}
                                            key={user.rank}
                                            highlighted={user.username === highlightedUsername}
                                    />
                                ))}
                                </tbody>
                            </TableList>
                        ) : (
                            <p>Loading Leaderboard...</p>
                        )}
                    </div>

                    {looserTable}

                    <div>
                        <Button
                            className="leave-button"
                            width="100%"
                            onClick={() => history.push("/dashboard")}>
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;