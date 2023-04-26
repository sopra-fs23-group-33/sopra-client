import TextField from "@mui/material/TextField";
import Button from "../Button";
import * as React from "react";
import {useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import {InputAdornment} from "@mui/material";


const BettingAmountField = props => {
    return (
        <TextField id="outlined-required"
           label={props.label}
           variant="outlined"
           value={props.value}
           onChange={e => props.onChange(e.target.value)}
           InputProps={{
               endAdornment: <InputAdornment position="end">coins</InputAdornment>,
           }}
        />
    );
};

const Betting = () => {

    const [playerID] = useState(localStorage.getItem("playerID"));
    const [type, setType] = useState(null);
    const [amount, setAmount] = useState();
    const [disableLong, setDisableLong] = useState(false);
    const [disableShort, setDisableShort] = useState(false);

    const handleClickLong = () => {
        void placeBet("UP");
        setDisableShort(true);
        setDisableLong(true);
    };

    const handleClickShort = () => {
        void placeBet("DOWN");
        setDisableShort(true);
        setDisableLong(true);
    };

    const placeBet = async (type) => {
        try {
            console.log(type);
            console.log(amount);
            setType(type);
            const requestBody = JSON.stringify({type, amount});
            await api_with_token().put("/players/" + playerID + "/bet", requestBody);
        } catch (error) {
            console.log(type);
            console.log(amount);
            alert(`FAIL\n Something went wrong while placing the bet: \n${handleError(error)}`);
        }
    }

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

