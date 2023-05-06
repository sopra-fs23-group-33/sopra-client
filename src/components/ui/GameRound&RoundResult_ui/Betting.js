import Button from "../Button";
import * as React from "react";
import {useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import PropTypes from "prop-types";


const BettingAmountField = props => {
    return (
        <input
            className="round input"
            placeholder="Please enter betting amount here..."
            type="number"
            pattern="[0-9]*"
            min="0"
            value={props.value}
            disabled={props.disabled}
            onChange={e => props.onChange(e.target.value)}
            >
        </input>
    );
};

BettingAmountField.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

const Betting = () => {

    const [playerID] = useState(localStorage.getItem("playerID"));
    const [amount, setAmount] = useState(null);
    const [disableAmount, setDisableAmount] = useState(false);
    const [disableLong, setDisableLong] = useState(false);
    const [disableShort, setDisableShort] = useState(false);

    const handleClickIncrement = (increment) => {
        let parseAmount = parseInt(amount);
        if (amount === null) {
            setAmount(increment.toString());
        } else {
            setAmount((parseAmount + increment).toString());
        }
    };

    const handleClickDecrement = (decrement) => {
        let parseAmount = parseInt(amount);
        if (amount !== null) {
            if ((parseAmount - decrement) < 0) {
                setAmount("0");
            } else {
                setAmount((parseAmount - decrement).toString());
            }
        }
    };

    const placeBet = async (type) => {
        try {
            const requestBody = JSON.stringify({type, amount});
            await api_with_token().put("/players/" + playerID + "/bet", requestBody);
            console.log(type);
            console.log(amount);
            setDisableAmount(true);
            setDisableShort(true);
            setDisableLong(true);
        } catch (error) {
            console.log(type);
            console.log(amount);
            console.error(`Something went wrong while placing the bet: ${handleError(error)}`);
            alert(`FAIL\n Something went wrong while placing the bet: \n${handleError(error)}`);
        }
    }

    return (
        <div className="round wrapper">
            <div className="round amount-container">
                <Button
                    className="inDecrement-button"
                    width="10%"
                    disabled={disableLong}
                    onClick={() => {handleClickDecrement(100)}}
                    >
                    -100
                </Button>
                <Button
                    className="inDecrement-button"
                    width="10%"
                    disabled={disableLong}
                    onClick={() => {handleClickDecrement(10)}}
                    >
                    -10
                </Button>
                <Button
                    className="inDecrement-button"
                    width="10%"
                    disabled={disableLong}
                    onClick={() => {handleClickDecrement(1)}}
                >
                    -1
                </Button>
                <BettingAmountField
                    label="Betting Amount"
                    value={amount}
                    disabled={disableAmount}
                    onChange={e => setAmount(e)}
                    >
                </BettingAmountField>
                <Button
                    className="inDecrement-button"
                    width="10%"
                    disabled={disableLong}
                    onClick={() => {handleClickIncrement(1)}}
                >
                    +1
                </Button>
                <Button
                    className="inDecrement-button"
                    width="10%"
                    disabled={disableLong}
                    onClick={() => {handleClickIncrement(10)}}
                    >
                    +10
                </Button>
                <Button
                    className="inDecrement-button"
                    width="10%"
                    disabled={disableLong}
                    onClick={() => {handleClickIncrement(100)}}
                    >
                    +100
                </Button>
            </div>
            <div className="long-short-container">
                <Button
                    className="long-button"
                    width="40%"
                    disabled={disableLong}
                    onClick={() => {void placeBet("UP")}}
                    >
                    Long
                </Button>
                <Button
                    className="short-button"
                    width="40%"
                    disabled={disableShort}
                    onClick={() => {void placeBet("DOWN")}}
                    >
                    Short
                </Button>
            </div>
        </div>
    );
}

export default Betting;

