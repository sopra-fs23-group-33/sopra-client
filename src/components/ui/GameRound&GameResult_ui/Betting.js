import Button from "../Button";
import * as React from "react";
import {useState} from "react";
import {api_with_token, handleError} from "../../../helpers/api";
import PropTypes from "prop-types";


const BettingAmountField = props => {

    return (
        <input
            className="round input"
            placeholder="Betting amount"
            type="number"
            pattern="[0-9]*"
            min="0"
            max={props.max}
            value={props.value}
            disabled={props.disabled}
            onChange={e => props.onChange(Math.max(0, Math.min(props.max, Number(e.target.value))))}
            >
        </input>
    );
};

BettingAmountField.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

const Betting = (props) => {

    const playerID = JSON.parse(localStorage.getItem("player"))?.playerID;
    const balance = props.balance;
    const [amount, setAmount] = useState(null);
    const [disableAmount, setDisableAmount] = useState(false);
    const [disable, setDisable] = useState(false);

    const handleClickIncrement = (increment) => {
        let parseAmount = parseInt(amount);
        if (amount === null && balance > 0) {
            setAmount(increment.toString());
        } else if (amount <= balance - increment) {
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

    const handleClickAllIn = (allInBalance) => {
        if (allInBalance > 0) {
            setAmount(allInBalance);
        }
    };

    const placeBet = async (type) => {
        try {
            const requestBody = JSON.stringify({type, amount});
            await api_with_token().put("/players/" + playerID + "/bet", requestBody);
            console.log(type);
            console.log(amount);
            setDisableAmount(true);
            setDisable(true);
        } catch (error) {
            console.log(type);
            console.log(amount);
            console.error(`Something went wrong while placing the bet: ${handleError(error)}`);
            // alert(`FAIL\n Something went wrong while placing the bet: \n${handleError(error)}`);
        }
    }

    return (
        <div className="round wrapper">
            <div className="round amount-container">
                <Button
                    className="inDecrement-button"
                    width="20%"
                    disabled={disable}
                    onClick={() => {handleClickDecrement(100)}}
                    >
                    -100
                </Button>
                <Button
                    className="inDecrement-button"
                    width="20%"
                    disabled={disable}
                    onClick={() => {handleClickDecrement(10)}}
                    >
                    -10
                </Button>
                <Button
                    className="inDecrement-button"
                    width="20%"
                    disabled={disable}
                    onClick={() => {handleClickDecrement(1)}}
                >
                    -1
                </Button>
                <BettingAmountField
                    label="Betting Amount"
                    max={balance}
                    value={amount}
                    disabled={disableAmount}
                    onChange={e => setAmount(e)}
                    >
                </BettingAmountField>
                <Button
                    className="inDecrement-button"
                    width="20%"
                    disabled={disable}
                    onClick={() => {handleClickIncrement(1)}}
                >
                    +1
                </Button>
                <Button
                    className="inDecrement-button"
                    width="20%"
                    disabled={disable}
                    onClick={() => {handleClickIncrement(10)}}
                    >
                    +10
                </Button>
                <Button
                    className="inDecrement-button"
                    width="20%"
                    disabled={disable}
                    onClick={() => {handleClickIncrement(100)}}
                    >
                    +100
                </Button>
            </div>
            <div className="long-short-container">
                <Button
                    className="allIn-button"
                    width="50%"
                    disabled={disable}
                    onClick={() => {handleClickAllIn(balance)}}
                >
                    All In
                </Button>
            </div>
            <div className="long-short-container">
                <Button
                    className="long-button"
                    width="40%"
                    disabled={disable}
                    onClick={() => {void placeBet("UP")}}
                    >
                    Long
                </Button>
                <Button
                    className="short-button"
                    width="40%"
                    disabled={disable}
                    onClick={() => {void placeBet("DOWN")}}
                    >
                    Short
                </Button>
            </div>
        </div>
    );
}

export default Betting;

