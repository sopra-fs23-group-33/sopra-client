import * as React from "react";
import Grid from '@mui/material/Grid';
import BaseContainer from "../ui/BaseContainer";
import "styles/views/GameRound.scss";
import TextField from '@mui/material/TextField';
import Button from "../ui/Button";

const GameRound = () => {
    return (
        <BaseContainer>
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

                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div className="round wrapper">
                        Timer
                        <h1>18 sec left</h1>
                    </div>
                    <div className="round wrapper">
                        My Balance
                        <h1>53 coins</h1>
                    </div>
                </Grid>

                <Grid item xs={7}>
                    <div className="round wrapper">
                        <TextField id="outlined-basic"
                                   label="Enter betting amount..."
                                   variant="outlined"
                                   margin="normal"
                                   fullWidth={true} />
                        <Button width="50%">Long</Button>
                        <Button width="50%">Short</Button>
                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div className="round wrapper">
                        My Powerups
                    </div>
                </Grid>

            </Grid>
        </BaseContainer>

    );
}

export default GameRound;