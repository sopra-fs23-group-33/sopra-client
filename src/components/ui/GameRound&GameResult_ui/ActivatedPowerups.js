import {useEffect, useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import TableList from "../TableList";
import * as React from "react";


const Powerup = ({powerup, highlighted}) => (
    <tr className="table overview-content row">
        <td className="table overview-content">{powerup.name}</td>
        <td className="table overview-content"><span className={highlighted ? "dollar" : ""}>({powerup.ownerName})</span></td>
    </tr>
);

export default function ActivatedPowerups() {
    const [activatedPowerups, setPowerups] = useState(null);
    const loggedInUsername = JSON.parse(localStorage.getItem("user"))?.username;

    useEffect(() => {
        async function fetchActivatedPowerups() {
            try {
                const gameID = localStorage.getItem("gameID")
                const response = await api_with_token().get("/games/" + gameID + "/powerups/");
                setPowerups(response.data);
            } catch (error) {
                console.error(`Error while fetching the Powerups used in Round: \n${handleError(error)}`);
                console.error("Details: ", error);
                // alert("Error while fetching the Powerups used in Round!");
            }
        }
        fetchActivatedPowerups();
    }, []);

    return (
        <>
            {activatedPowerups && activatedPowerups.length > 0 && (
                <div className="round wrapper">
                    <h3>Occurred Power-Ups in Round</h3>
                    <div className="table">
                        <TableList>
                            <tbody>
                            {activatedPowerups.map((powerup, index) => (
                                <Powerup key={index}
                                         powerup={powerup}
                                         highlighted={loggedInUsername === powerup.ownerName}
                                />
                            ))}
                            </tbody>
                        </TableList>
                    </div>
                </div>
            )}
        </>
    );
}