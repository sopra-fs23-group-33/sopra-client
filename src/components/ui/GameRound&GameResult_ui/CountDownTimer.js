import * as React from "react";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.timer);
    const history = useHistory();

    useEffect(() => {
        const timer =
            seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);

        if (seconds === 0) {
            clearInterval(timer);
            history.push("/game/result");
        }

        return () => clearInterval(timer);
    }, [seconds, history]);

    return (
        <div className="round wrapper">
            Timer
            <h1 style={{ fontSize: 50 }} align="center">{seconds}</h1>
            <h1 align="center">secs left</h1>
        </div>
    );
}

export default Timer;
