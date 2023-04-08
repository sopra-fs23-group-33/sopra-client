import * as React from "react";
import Grid from '@mui/material/Grid';
import BaseContainer from "../ui/BaseContainer";
import "styles/views/GameRound.scss";
import TextField from '@mui/material/TextField';
import Button from "../ui/Button";
import "styles/ui/Dashboard_ui/TableUserOverview.scss";

const GameRound = () => {
    return (
        <BaseContainer>
            <h1>Round 1/10</h1>
            <Grid container spacing={2}>

                <Grid item xs={7}>
                    <div className="round wrapper">
                        chart ------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------
                        -------------------------------------

                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div className="round wrapper">
                        Timer
                        <h1 style={{ fontSize: 50 }} align="center" >18</h1>
                        <h1 align="center">seconds left</h1>
                    </div>
                    <div className="round wrapper">
                        My Balance
                        <h1 style={{ fontSize: 50 }} align="center">53</h1>
                        <h1 align="center">coins</h1>
                    </div>
                </Grid>

                <Grid item xs={7}>
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