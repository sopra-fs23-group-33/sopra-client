import Button from "../ui/Button";
import * as React from "react";
import {api_with_token, handleError} from "../../helpers/api";
import {useEffect, useMemo, useState} from "react";
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
    const [users, setUsers] = useState(null);
    const [sortColumn, setSortColumn] = useState('winRate'); // initial sorting
    const [sortOrder, setSortOrder] = useState('desc');
    const highlightedUsername = localStorage.getItem("username");


    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await api_with_token().get("/users/leaderboard");
                setUsers(response.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the leaderboard: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Something went wrong while fetching the leaderboard! See the console for details.");
            }
        }
        fetchLeaderboard();
    }, []);

    const handleSort = (column) => {
        if (column === 'rank' || column === 'username') {
            return; // do nothing if the user clicks on these header columns
        }
        // If clicking on the same column, toggle the sort order
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedUsers = useMemo(() => {
        if (!users) return null;

        const sorted = [...users].sort((a, b) => {
            const columnA = a[sortColumn];
            const columnB = b[sortColumn];

            if (columnA < columnB) return sortOrder === 'asc' ? -1 : 1;
            if (columnA > columnB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // Always maintain ascending order of rank
        return sorted.map((user, i) => ({ ...user, rank: i + 1 }));
    }, [users, sortColumn, sortOrder]);


    return (
        <div className="db container">
            <div className="db primary-container">
                <div className="db secondary-container">
                    <h1>Leaderboard</h1>
                    <p>you guys should actually quit everything and start an investment banking career...</p><br/>
                    <div className="table-wrapper table">
                        {users ? (
                            <TableList>
                                <thead>
                                <tr>
                                    <th className={`sevenColumns rank${sortColumn === 'rank' ? 'clicked' : ''}`}
                                        onClick={() => handleSort('rank')}>Rank
                                    </th>
                                    <th className={sortColumn === 'username' ? 'clicked' : ''}
                                        onClick={() => handleSort('username')}>Username
                                    </th>
                                    <th className={sortColumn === 'numberOfBetsWon' ? 'clicked' : ''}
                                        onClick={() => handleSort('numberOfBetsWon')}>Rounds Won {sortColumn === 'numberOfBetsWon' && (sortOrder === 'desc' ? '↑' : '↓')}
                                    </th>
                                    <th className={sortColumn === 'numberOfBetsLost' ? 'clicked' : ''}
                                        onClick={() => handleSort('numberOfBetsLost')}>Rounds Lost {sortColumn === 'numberOfBetsLost' && (sortOrder === 'desc' ? '↑' : '↓')}
                                    </th>
                                    <th className={sortColumn === 'totalRoundsPlayed' ? 'clicked' : ''}
                                        onClick={() => handleSort('totalRoundsPlayed')}>Total Rounds {sortColumn === 'totalRoundsPlayed' && (sortOrder === 'desc' ? '↑' : '↓')}
                                    </th>
                                    <th className={sortColumn === 'profit' ? 'clicked' : ''}
                                        onClick={() => handleSort('profit')}>Total Profit {sortColumn === 'profit' && (sortOrder === 'desc' ? '↑' : '↓')}
                                    </th>
                                    <th className={`${sortColumn === 'winRate' ? 'clicked' : ''}`}
                                        onClick={() => handleSort('winRate')}>Win Rate {sortColumn === 'winRate' && (sortOrder === 'asc' ? '↑' : '↓')}
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