import * as React from "react";
import Grid from '@mui/material/Grid';
import "styles/views/GameRound.scss";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import RenderLineChart from "../ui/GameRound&RoundResult_ui/Chart";
import Timer from "../ui/GameRound&RoundResult_ui/CountDownTimer.js"
import Betting from "../ui/GameRound&RoundResult_ui/Betting";
import TablePowerups from "../ui/GameRound&RoundResult_ui/TablePowerups";
import {api, api_with_token, handleError} from "../../helpers/api";
import {useEffect, useState} from "react";

class Chart {
    constructor(data = {}) {
        this.fromCurrency = null;
        this.toCurrency = null;
        this.dates = null;
        this.numbers = null;
        Object.assign(this, data);
    }
}

let dates = ["2023-05-01 17:10:00", "2023-05-01 17:15:00", "2023-05-01 17:20:00",
    "2023-05-01 17:25:00", "2023-05-01 17:30:00", "2023-05-01 17:35:00",
    "2023-05-01 17:40:00", "2023-05-01 17:45:00", "2023-05-01 17:50:00",
    "2023-05-01 17:55:00", "2023-05-01 18:00:00", "2023-05-01 18:05:00",
    "2023-05-01 18:10:00", "2023-05-01 18:15:00", "2023-05-01 18:20:00",
    "2023-05-01 18:25:00", "2023-05-01 18:30:00", "2023-05-01 18:35:00",
    "2023-05-01 18:40:00", "2023-05-01 18:45:00"]

let numbers = [15.3603, 15.3465, 15.2549, 15.8121, 15.0046,
    15.7888, 15.1042, 15.4487, 15.5519, 15.6120,
    15.7228, 15.8942, 15.0201, 15.6789, 15.4573,
    15.9156, 15.2381, 15.9812, 15.4430, 15.1759]


const GameRound = () => {

    let content = <h2>Currency Pair</h2>;

    const [chart, setChart] = useState(null);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const response = await api.get("/test/api");
                setChart(response.data);
                localStorage.setItem("chart", JSON.stringify(response.data));
            } catch (error) {
                console.error(`Something went wrong while fetching the chart: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the chart.");
            }
        }
        void fetchChartData();
    })

    if (chart) {
        content = (
                <h2>{chart.fromCurrency}/{chart.toCurrency}</h2>
        );
    }

    if (chart) {
        numbers = chart.numbers;
        dates = chart.dates;
        // dates = dates.map(date => {
        //             const time = date.split(' ')[1].split(':');
        //             return time[0] + ':' + time[1];
        //         });
    }

    let data = dates.map((date, index) => {
        return { date: date, value: numbers[index] };
    });


    return (
        <div className="round base-container">
            <h1>Round 1/10</h1>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <div className="round wrapper">
                        {content}
                        <RenderLineChart data={data} />
                    </div>
                    <Betting />
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Timer />
                        </Grid>
                        <Grid item xs={6}>
                            <div className="round wrapper">
                                My Balance
                                <h1 style={{ fontSize: 50 }} align="center">53</h1>
                                <h1 align="center">coins</h1>
                            </div>
                        </Grid>
                    </Grid>
                    <TablePowerups />
                </Grid>
            </Grid>
        </div>
    );
}

export default GameRound;
