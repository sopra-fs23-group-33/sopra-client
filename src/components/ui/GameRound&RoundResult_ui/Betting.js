import TextField from "@mui/material/TextField";
import Button from "../Button";
import * as React from "react";

const Betting = () => (
    <div className="round wrapper">
        <TextField id="outlined-basic"
                   label="Enter betting amount..."
                   variant="outlined"
                   margin="normal"
                   fullWidth={true} />
        <div className="long-short-container">
            <Button className="long-button">Long</Button>
            <Button className="short-button">Short</Button>
        </div>
    </div>
)

export default Betting;

