import Button from "../Button";
import * as React from "react";
import TableList from "../TableList";
import "styles/ui/Button.scss";
import {useEffect, useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";

export default function TablePowerups() {

    const [powerups, setPowerups] = useState(null);

    function activatePowerup() {
        console.log("Powerup activated.");
    }

    // useEffect(() => {
    //     async function fetchPowerups() {
    //         try {
    //             const response = await api_with_token().get("POWERUPS");
    //             setPowerups(response.data);
    //         } catch (error) {
    //             console.error(`Error while fetching the Powerups: \n${handleError(error)}`);
    //             console.error("Details: ", error);
    //             alert("Error while fetching the Powerups!");
    //         }
    //     }
    //     fetchPowerups();
    // });

    return (
        <div className="round wrapper">
            <h3>Available Powerups</h3>
            <div className="table">
                <TableList>
                    <tbody>
                        <tr className="table overview-content row">
                            <td className="table overview-content">x10</td>
                            <td>
                                <Button
                                    className="powerup-button"
                                    onClick={activatePowerup}>
                                    Activate
                                </Button>
                            </td>
                        </tr>
                        <tr className="table overview-content row">
                            <td className="table overview-content">Cybersecurity</td>
                            <td>
                                <Button
                                    className="powerup-button"
                                    onClick={activatePowerup}>
                                    Activate
                                </Button>
                            </td>
                        </tr>
                        <tr className="table overview-content row">
                            <td className="table overview-content">Robin Hood</td>
                            <td>
                                <Button
                                    className="powerup-button"
                                    onClick={activatePowerup}>
                                    Activate
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </TableList>
            </div>
        </div>
    )
}

