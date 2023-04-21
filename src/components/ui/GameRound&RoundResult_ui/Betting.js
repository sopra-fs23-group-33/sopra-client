import TextField from "@mui/material/TextField";
import Button from "../Button";
import * as React from "react";
import {useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import {useTimeout} from "usehooks-ts";


const BettingAmountField = props => {
    return (
        <TextField id="outlined-required"
           label={props.label}
           variant="outlined"
           value={props.value}
           onChange={e => props.onChange(e.target.value)}
        />
    );
};

const Betting = (props) => {

    const [playerID] = useState(localStorage.getItem("playerID"));
    const [type, setType] = useState(null);
    const [amount, setAmount] = useState(0);
    const [disableLong, setDisableLong] = useState(false);
    const [disableShort, setDisableShort] = useState(false);

    const handleClickLong = () => {
        setType("UP");
        setDisableShort(false);
        setDisableLong(true);
    };

    const handleClickShort = () => {
        setType("DOWN");
        setDisableShort(true);
        setDisableLong(false);
    };


    useTimeout(() => {
        const placeBet = async () => {
            try {
                console.log(type);
                console.log(amount);
                const requestBody = JSON.stringify({type, amount});
                await api_with_token().put("/players/" + playerID + "/bet", requestBody);
                alert("SUCCESS\nBet is placed.")
            } catch (error) {
                console.log(type);
                console.log(amount);
                alert(`FAIL\n Something went wrong while placing the bet: \n${handleError(error)}`);
            }
        }
        void placeBet();
    }, 10000);




    return (
        <div className="round wrapper">
            <BettingAmountField
                label="Betting Amount"
                value={amount}
                onChange={e => setAmount(e)}
                />
            <div className="long-short-container">
                <Button
                    className="long-button"
                    width="20%"
                    disabled={disableLong}
                    onClick={() => {handleClickLong()}}>
                    Long
                </Button>
                <Button
                    className="short-button"
                    width="20%"
                    disabled={disableShort}
                    onClick={() => {handleClickShort()}}>
                    Short
                </Button>
            </div>
        </div>
    );
}

export default Betting;

