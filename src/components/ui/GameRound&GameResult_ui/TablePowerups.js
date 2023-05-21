import * as React from "react";
import {useEffect, useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import PropTypes from "prop-types";
import Button from "../Button";
import TableList from "../TableList";
import "styles/ui/Button.scss";


const Powerup = ({powerup}) => {
    const [activated, setActivated] = useState(false);

    const activatePowerup = async () => {
        try {
            const playerID = localStorage.getItem("playerID");
            await api_with_token().put(`/players/${playerID}/powerups/${powerup.powerupID}`, {
                powerupID: powerup.powerupID,
            });

            // Get the name of the activated powerup and store in LocalStorage
            const activatedPowerups = JSON.parse(localStorage.getItem("activatedPowerups")) || {};
            const { name } = powerup;
            activatedPowerups[powerup.powerupID] = name;
            localStorage.setItem("activatedPowerups", JSON.stringify(activatedPowerups));

            // update powerups in LocalStorage (remove activated ones)
            setActivated(true);
            const storedPowerups = JSON.parse(localStorage.getItem("powerups"));
            const updatedPowerups = storedPowerups.filter(p => p.powerupID !== powerup.powerupID);
            localStorage.setItem("powerups", JSON.stringify(updatedPowerups));
            console.log(`Activated powerup #${powerup.powerupID}: ${powerup.name}`)
            // alert(`Powerup ${powerup.powerupID} has been activated!`);
        } catch (error) {
            console.error(`Failed to activate powerup #${powerup.powerupID} (${powerup.name}): ${handleError(error)}`);
            // alert(`Failed to activate powerup ${powerup.powerupID}: ${handleError(error)}`);
        }
    }


    return (
        <tr className="table overview-content row">
            <td className="table overview-content">{powerup.name}</td>
            <td className="powerup">
                <Button
                    className={`powerup-button ${activated ? 'activated' : ''}`}
                    onClick={activatePowerup}
                    disabled={activated}
                >
                    {activated ? 'Activated' : 'Activate'}
                </Button>
            </td>
        </tr>
    )
};

Powerup.propTypes = {
    powerup: PropTypes.object
};


export default function TablePowerups() {

    const [powerups, setPowerups] = useState(null);

    useEffect(() => {
        async function fetchPowerups() {
            try {
                const playerID = localStorage.getItem("playerID")
                const response = await api_with_token().get("/players/" + playerID + "/powerups");
                setPowerups(response.data);
                localStorage.setItem("powerups", JSON.stringify(response.data));
            } catch (error) {
                console.error(`Error while fetching the Powerups: \n${handleError(error)}`);
                console.error("Details: ", error);
                // alert("Error while fetching the Powerups!");
            }
        }
        void fetchPowerups();
    }, []);

    return (
        <div className="round wrapper">
            <h3>Available Powerups</h3>
            <div className="table">
                <TableList>
                    <tbody>
                        {powerups && powerups.map(powerup => (
                            <Powerup
                                className="powerup"
                                powerup={powerup}
                                key={powerup.powerupID}
                            />
                        ))}
                    </tbody>
                </TableList>
            </div>
        </div>
    )
}

