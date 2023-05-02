import {useEffect, useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import TableList from "../TableList";
import * as React from "react";


const Powerup = ({powerup}) => (
    <tr className="table overview-content row">
        <td className="table overview-content">{powerup.name}</td>
    </tr>
);

export default function ActivatedPowerups() {
    const [activatedPowerups, setPowerups] = useState(null);

    useEffect(() => {
        async function fetchActivatedPowerups() {
            try {
                const gameID = localStorage.getItem("gameID")
                const response = await api_with_token().get("/games/" + gameID + "/powerups/");
                setPowerups(response.data);
            } catch (error) {
                console.error(`Error while fetching the Powerups used in Round: \n${handleError(error)}`);
                console.error("Details: ", error);
                alert("Error while fetching the Powerups used in Round!");
            }
        }
        fetchActivatedPowerups();
    }, []);

    return (
        <div className="round wrapper">
            <h3>Activated Powerups</h3>
            <div className="table">
                <TableList>
                    <tbody>
                    {activatedPowerups &&
                        activatedPowerups.map((powerup, index) => (
                            <Powerup key={index} powerup={powerup} />
                        ))}
                    </tbody>
                </TableList>
            </div>
        </div>
    );
}