import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const RegisterFormField = props => {
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleValidation = (value) => {
        if (props.label === 'Username') {
            const regex = /^[a-zA-Z0-9_!?#@&$.]{1,30}$/;
            setIsValid(regex.test(value));
            props.handleValidation(regex.test(value));
        } else if (props.label === 'Password') {
            const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[_?!#@&$.])[A-Za-z\d_?!#@&$.]{8,30}$/;
            setIsValid(regex.test(value));
            props.handleValidation(regex.test(value));
        }
    };

    return (
        <div className="welcome field">
            <TextField id="standard-basic"
                       label={props.label}
                       variant="standard"
                       value={props.value}
                       onChange={(e) => {
                           props.onChange(e.target.value);
                           handleValidation(e.target.value);
                       }}
                       type={props.label === 'Password' ? (showPassword ? 'text' : 'password') : 'text'}
                       helperText={
                           isValid ? (
                               <span style={{ color: '#04e72a', transition: 'color 0.2s ease-in-out' }}>{props.helperText}</span>
                           ) : (
                               <span style={{ color: '#da0606', transition: 'color 0.2s ease-in-out' }}>{props.helperText}</span>
                           )
                       }
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

RegisterFormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    helperText: PropTypes.string
};

export default RegisterFormField;