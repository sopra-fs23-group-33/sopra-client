import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/LoginRegister.scss';
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import ProjectTitle from "../ui/ProjectTitle";
import LocalStorageManager from "../../helpers/LocalStorageManager";
import BullBearBackground from "../ui/BullBearBackground";

const RegisterFormField = props => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="welcome field">
            <TextField id="standard-basic"
                       label={props.label}
                       variant="standard"
                       value={props.value}
                       onChange={e => props.onChange(e.target.value)}
                       helperText={props.helperText}
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}
                       InputLabelProps={{
                           style: {
                               color: isFocused ? '#d2ccea' : '#252126',
                           },
                       }}
            />
        </div>
    );
};

RegisterFormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    helperText: PropTypes.string
};

const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const doRegister = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.post("/users/register", requestBody);

            const user = new User(response.data);
            LocalStorageManager.LoginRegister(user);

            history.push(`/dashboard`);
        } catch (error) {
            alert(`Something went wrong during the registration. \n${handleError(error)}`);
            history.push(`/register`);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 13 && (username && password)) {
                doRegister();
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [username, password]);

    return (
        <div className="welcome container">
            <ProjectTitle/>
            <div className="welcome form register">
                <h2>Register</h2>
                <RegisterFormField
                    label="Username"
                    value={username}
                    onChange={n => setUsername(n)}
                    helperText="1-30 characters; only letters, numbers and ,!?"
                />
                <RegisterFormField
                    label="Password"
                    value={password}
                    onChange={n => setPassword(n)}
                    helperText="8-30 characters; at least one letter, number & special character"
                />
                <div className="welcome button-container">
                    <Button
                        className="login-button"
                        disabled={!username || !password}
                        width="100%"
                        onClick={() => doRegister()}
                    >
                        Register
                    </Button>
                </div>
                <div className="button-container">
                    <Link to="/login">
                        <Button
                            className="login-button"
                            width="100%"
                        >
                            Go To Login
                        </Button>
                    </Link>
                </div>
            </div>

            <BullBearBackground/>

        </div>


    );
};

export default Register;