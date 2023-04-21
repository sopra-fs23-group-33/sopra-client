import TextField from "@mui/material/TextField";
import Button from "../Button";
import * as React from "react";
import {useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import {useTimeout} from "usehooks-ts";

const Betting = (props) => {

    const [playerID] = useState(localStorage.getItem("playerID"));
    const [betType, setBetType] = useState("NONE");
    const [betAmount, setBetAmount] = useState("0");

    useTimeout(() => {
        const placeBet = async () => {
            try {
                const requestBody = JSON.stringify({betType, betAmount});
                await api_with_token().put("/players/" + playerID + "/bet", requestBody);
                alert("SUCCESS\nBet is placed.")
            } catch (error) {
                alert(`FAIL\n Something went wrong while placing the bet: \n${handleError(error)}`);
            }
        }
        void placeBet();
    }, 5000);




    return (
        <div className="round wrapper">
            <TextField
                header="Set Game Room Name"
                id="outlined-required"
                label="Game Room Name"
                helperText="At least one alphabetic character."
                onChange={n => setBetAmount(n)}
            />
            <div className="long-short-container">
                <Button
                    className="long-button"
                    width="20%"
                    onClick={() => setBetType("UP")}>Long</Button>
                <Button
                    className="short-button"
                    width="20%"
                    onClick={() => setBetType("DOWN")}>Short</Button>
            </div>
        </div>
    );
}

export default Betting;

