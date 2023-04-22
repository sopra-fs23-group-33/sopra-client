import * as React from "react";
import {useEffect, useState} from "react";

function Timer() {
    const [seconds, setSeconds] = useState(15);

    useEffect(() => {
        const timer =
            seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    return (
        <div className="round wrapper">
            Timer
            <h1 style={{ fontSize: 50 }} align="center" >{seconds}</h1>
            <h1 align="center">secs left</h1>
        </div>
    );
}

export default Timer