import React, {useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import PropTypes from "prop-types";


const LoginFormField = props => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="welcome field">
            <TextField
                id="standard-basic"
                label={props.label}
                variant="standard"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                type={props.type === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                InputLabelProps={{
                    style: {
                        color: isFocused ? '#d2ccea' : '#252126',
                    },
                }}
                InputProps={
                    props.label === 'Password' ? {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={e => e.preventDefault()}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                        : {}
                }
            />
        </div>
    );
};

LoginFormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string
};

LoginFormField.defaultProps = {
    type: "text"
};

export default LoginFormField;