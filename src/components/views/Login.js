import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/LoginRegister.scss';
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import ProjectTitle from "../ui/LoginRegister/ProjectTitle";
import LocalStorageManager from "../../helpers/LocalStorageManager";
import BullBearBackground from "../ui/LoginRegister/BullBearBackground";
import {Alert, AlertTitle} from "@mui/material";


const LoginFormField = props => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="welcome field">
            <TextField id="standard-basic"
                       label={props.label}
                       variant="standard"
                       value={props.value}
                       onChange={e => props.onChange(e.target.value)}
                       type={props.type}
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

LoginFormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string
};

LoginFormField.defaultProps = {
    type: "text"
};

const Login = () => {
    const history = useHistory();
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [alertStatus, setAlertStatus] = useState(false);

    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.post('/users/login', requestBody);

            const user = new User(response.data);
            LocalStorageManager.LoginRegister(user);

            history.push(`/dashboard`);
        } catch (error) {
            setAlertStatus(true);
        }
    };

    const handleClose = () => {
        setAlertStatus(false);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 13 && (username && password)) {
                doLogin();
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
            <div className="welcome form">
                <h2>Login</h2>
                <LoginFormField
                    label="Username"
                    value={username}
                    onChange={un => setUsername(un)}
                />
                <LoginFormField
                    label="Password"
                    value={password}
                    onChange={n => setPassword(n)}
                    type="password"
                />
                <div className="welcome button-container">
                    <Button
                        className="login-button"
                        disabled={!username || !password}
                        width="100%"
                        onClick={() => doLogin()}
                    >
                        Login
                    </Button>
                </div>
                <div className="button-container">
                    <Link to="/register">
                        <Button
                            className="login-button"
                            width="100%"
                        >
                            Go To Registration
                        </Button>
                    </Link>
                </div>
            </div>
            <br/>
            <div className="login popup-message">
                {alertStatus && (
                    <Alert variant="filled"
                           severity="error"
                           onClose={handleClose}>
                        <AlertTitle>Login failed</AlertTitle>
                        Either your username or password are wrong - <strong>Check them & try again!</strong>
                    </Alert>
                )}
            </div>

            <BullBearBackground/>

        </div>
    );
};

export default Login;
