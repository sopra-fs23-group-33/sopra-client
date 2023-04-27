import TextField from "@mui/material/TextField";
import Button from "../Button";
import * as React from "react";
import {useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import {InputAdornment} from "@mui/material";
import PropTypes from "prop-types";


const BettingAmountField = props => {
    return (
        // <TextField id="outlined-required"
        //    label={props.label}
        //    variant="outlined"
        //    value={props.value}
        //    onChange={e => props.onChange(e.target.value)}
        //    InputProps={{
        //        endAdornment: <InputAdornment position="end">coins</InputAdornment>,
        //    }}
        // />
        <div>
            <label
                className="round label"
                >
                Betting Amount
            </label>
            <input
                className="round input"
                placeholder="Please enter betting amount here..."
                type="number"
                min="1"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                >
            </input>
        </div>
    );
};

BettingAmountField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Betting = () => {

    const [playerID] = useState(localStorage.getItem("playerID"));
    const [type, setType] = useState(null);
    const [amount, setAmount] = useState(null);
    const [disableLong, setDisableLong] = useState(false);
    const [disableShort, setDisableShort] = useState(false);

    const handleClickIncrement = (increment) => {
        if (amount === null) {
            setAmount(increment.toString());
        } else {
            setAmount((parseInt(amount) + increment).toString());
        }
    };

    const handleClickDecrement = (value) => {
        setAmount((parseInt(amount) - value).toString());
    };

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
            <div className="amount-container">
                <Button
                    className="long-button"
                    width="7.5%"
                    disabled={disableLong}
                    onClick={() => {handleClickIncrement(1)}}>
                    -1
                </Button>
                <BettingAmountField
                    label="Betting Amount"
                    value={amount}
                    onChange={e => setAmount(e)}>
                </BettingAmountField>
                <Button
                    className="long-button"
                    width="7.5%"
                    disabled={disableLong}
                    onClick={() => {handleClickIncrement(1)}}>
                    +1
                </Button>
            </div>
            <div className="long-short-container">
                <Button
                    className="long-button"
                    width="40%"
                    disabled={disableLong}
                    onClick={() => {handleClickLong()}}>
                    Long
                </Button>
                <Button
                    className="short-button"
                    width="40%"
                    disabled={disableShort}
                    onClick={() => {handleClickShort()}}>
                    Short
                </Button>
            </div>
        </div>
    );
}

export default Betting;

