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
        <Button width="45%">Long</Button>
        <Button width="45%">Short</Button>
    </div>
)

export default Betting;

