import * as React from "react";
import Grid from '@mui/material/Grid';
import {Container} from "../ui/Container";
import BaseContainer from "../ui/BaseContainer";
import "styles/ui/TableContainer.scss";

const GameRound = () => {
    return (
        <BaseContainer>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Container>
                        <div className="table-wrapper">
                            <img
                                scr=""
                                alt="chart"
                            />
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <Container>
                        <div className="table-wrapper">
                            xs=4
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <Container>
                        <div className="table-wrapper">
                            xs=4
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={8}>
                    <Container>
                        <div className="table-wrapper">
                            xs=8
                        </div>
                    </Container>
                </Grid>
            </Grid>
        </BaseContainer>

    );
}

export default GameRound;