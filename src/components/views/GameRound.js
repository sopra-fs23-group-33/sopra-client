import * as React from "react";
import Grid from '@mui/material/Grid';
import BaseContainer from "../ui/BaseContainer";
import "styles/views/GameRound.scss";
import TextField from '@mui/material/TextField';
import Button from "../ui/Button";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";
import RenderLineChart from "../ui/GameRound&RoundResult_ui/Chart";

const dates = ["2023-05-01 17:10:00",
    "2023-05-01 17:15:00",
    "2023-05-01 17:20:00",
    "2023-05-01 17:25:00",
    "2023-05-01 17:30:00",
    "2023-05-01 17:35:00",
    "2023-05-01 17:40:00",
    "2023-05-01 17:45:00",
    "2023-05-01 17:50:00",
    "2023-05-01 17:55:00",
    "2023-05-01 18:00:00",
    "2023-05-01 18:05:00",
    "2023-05-01 18:10:00",
    "2023-05-01 18:15:00",
    "2023-05-01 18:20:00",
    "2023-05-01 18:25:00",
    "2023-05-01 18:30:00",
    "2023-05-01 18:35:00",
    "2023-05-01 18:40:00",
    "2023-05-01 18:45:00"]

const numbers = [15.3603, 15.3465, 15.2549, 15.8121, 15.0046,
    15.7888, 15.1042, 15.4487, 15.5519, 15.6120,
    15.7228, 15.8942, 15.0201, 15.6789, 15.4573,
    15.9156, 15.2381, 15.9812, 15.4430, 15.1759]

const data = dates.map((date, index) => {
    return { date: date, value: numbers[index] };
});

const GameRound = () => {
    return (
        <BaseContainer>
            <h1>Round 1/10</h1>
            <Grid container spacing={2}>

                <Grid item xs={7}>
                    <div className="round wrapper">
                        <h2>CHF/USD</h2>
                        <RenderLineChart data={data} />
                    </div>
                    <div className="round wrapper">
                        <TextField id="outlined-basic"
                                   label="Enter betting amount..."
                                   variant="outlined"
                                   margin="normal"
                                   fullWidth={true} />
                        <Button width="45%">Long</Button>
                        <Button width="45%">Short</Button>
                    </div>

                </Grid>

                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className="round wrapper">
                                Timer
                                <h1 style={{ fontSize: 50 }} align="center" >18</h1>
                                <h1 align="center">secs left</h1>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="round wrapper">
                                My Balance
                                <h1 style={{ fontSize: 50 }} align="center">53</h1>
                                <h1 align="center">coins</h1>
                            </div>
                        </Grid>
                    </Grid>
                    <div className="round wrapper">
                        My Powerups
                        <div className="table">
                            <thead>
                            <tr>
                                <th>Powerup</th>
                                <th>num left</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>x10</td> <td>2</td> <td> <Button>Activate</Button> </td>
                            </tr>
                            <tr>
                                <td>x10</td> <td>2</td> <td> <Button>Activate</Button> </td>
                            </tr>
                            <tr>
                                <td>x10</td> <td>2</td> <td> <Button>Activate</Button> </td>
                            </tr>
                            <tr>
                                <td>x10</td> <td>2</td> <td> <Button>Activate</Button> </td>
                            </tr>
                            </tbody>
                        </div>
                    </div>
                </Grid>


            </Grid>
        </BaseContainer>

    );
}

export default GameRound;
